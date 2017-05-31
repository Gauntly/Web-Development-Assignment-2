<?php
require_once "configureDB.php";
$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (!$connection) {
    exit;
}  else {
    checksExist($connection);
}
$result_code = "";
if($_POST){
    if($_POST['action'] == "request-cab"){
    processRequest($connection);
    die();
    }
    else if($_POST['action'] == "get"){
        retrieveResults($connection);
        die();
    }
}


function processRequest($connection){
    $customer_name = mysqli_real_escape_string($connection, $_POST['name']);
    $customer_phone = mysqli_real_escape_string($connection, $_POST['phone']);
    $customer_address = mysqli_real_escape_string($connection, $_POST['address']);
    $customer_destination_address = mysqli_real_escape_string($connection,$_POST['destination']);
    $dateTime = mysqli_real_escape_string($connection, $_POST['time']);
    $customer_pickup_date = substr($dateTime,0,10);
    $customer_pickup_time = substr($dateTime,11,5);
    $timeSql = date("Y-m-d H:i:s",strtotime($_POST['time']));
    $customer_booking_number = generateReference();
    postResult($customer_name,$customer_booking_number, $customer_pickup_time, $customer_pickup_date, $customer_address);
    $sql = "INSERT INTO CabsOnlineBookings VALUES ('$customer_booking_number', '$customer_name','$customer_phone','$customer_address','$customer_destination_address','$customer_pickup_date', '$timeSql', 'unassigned')";
    mysqli_query($connection,$sql);

}
//We generate a unique reference code using the address and using md5 crypto jumbling it before making the string all uppercase and returning the value.
function generateReference(){
    $jumble = substr(str_shuffle(md5($_POST['address'])),0,8);
    return strtoupper($jumble);
}
// Processing the results we can return meaning confirmation to the user that the booking has been created.
function postResult($customer_name,$result_code, $customer_pickup_time, $customer_pickup_date, $customer_address){
    $customer_pickup_time =  date('h:i a', strtotime($customer_pickup_time));
    $customer_pickup_date = date('d-m-Y', strtotime($customer_pickup_date));
    echo '<div class="well well-lg">';
    echo '<h1 class="display-3 text-center">Cab booked!</h1>';
    echo '<p  class="lead">Thank you '.$customer_name.',</p>';
    echo '<p  class="lead">Your pickup time is set for '.$customer_pickup_time.' on '.$customer_pickup_date.'</p>';
    echo '<p  class="lead">from '.'<span style="color: 2C7F92">'.$customer_address.'</p>';
    echo '<p  class="lead">Your booking confirmation code is: '.'<span style="color: ff852b">'.$result_code.'</span>'.'</p>';
    echo '</div>';
}

function retrieveResults($connection){
    mysqli_select_db($connection, 'dfs6572');
//    $booking_get = mysqli_real_escape_string($connection, $_POST['customer_booking_number']);

    $sql = "SELECT * FROM CabsOnlineBookings WHERE DATE_ADD(NOW(), INTERVAL 2 HOUR) > customer_pickup_time AND customer_pickup_time > CURRENT_TIMESTAMP";

    $results = mysqli_query($connection, $sql);
    if ($results->num_rows > 0) // We have bookings in the next two hours - Display it in a table format
    {
        echo("Kill confirmed.");
    }else{
        echo("test.");
    }
}
?>