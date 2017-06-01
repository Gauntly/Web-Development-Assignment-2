<?php
require_once "configureDB.php";
$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (!$connection) {
    exit;
}  else {
    checksExist($connection);
}
$result_code = "";

//Looks at the XHR for the params.
if($_POST){
    if($_POST['action'] == "request-cab"){
    processRequest($connection);
    die();
    }
    else if($_POST['action'] == "retrieve"){
        retrieveResults($connection);
        die();
    }else if($_POST['action']=="update"){
        updateBooking($connection,$_POST['id']);
    }
}

//processRequest submits the data to the DB. No checking is done at this point.
//I explicitly made sure it was all handled by the js.
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

//Trivial functions that essentially just present the time and the date in a very user friendly way.
    function prettifyDate($dateString){
        $customer_pickup_date = substr($dateString,0,10);
        $customer_pickup_date = date('d-m-Y', strtotime($customer_pickup_date));
        return $customer_pickup_date;
    }
    function prettifyTime($dateString){
        $customer_pickup_time = substr($dateString,11,5);
        $customer_pickup_time =  date('h:i a', strtotime($customer_pickup_time));
        return $customer_pickup_time;
    }

function retrieveResults($connection){
    mysqli_select_db($connection, 'dfs6572');
    $sql = "SELECT * FROM CabsOnlineBookings WHERE DATE_ADD(NOW(), INTERVAL 2 HOUR) > customer_pickup_time AND customer_pickup_time > CURRENT_TIME";
    $results = mysqli_query($connection, $sql);
    //If bookings are made in the next 2 hours display them here.
    //We render some nice bootstrap styled html here.
    //Since the last assignment ive learnt that I could just use one echo call the generate all the html.
    if ($results->num_rows > 0) {

        while($row = $results->fetch_assoc()){
            $time = prettifyTime($row['customer_pickup_time']);
            $date = prettifyDate($row['customer_pickup_date']);
            echo("<ul class='list-group'>");
            echo "<li class='list-group-item' id=".$row['customer_booking_number']."><b>"."Booking Number: ".'</b><span class="text-info">'.$row['customer_booking_number']."</span>
                  <li class='list-group-item'><b>"."Name: ".'</b><span class="text-info">'.$row['customer_name']." 
                  <li class='list-group-item'><b>"."Phone Number: ".'</b><span class="text-info">'.$row['customer_phone'] ."
                  <li class='list-group-item'><b>"."Pickup Address: ".'</b><span class="text-info">'.$row['customer_address'] ."</span> ⟶ <b>"."Destination Address: ".'</b><span class="text-info">'.$row['customer_destination_address'] ."
                  <li class='list-group-item'><b>"."Pickup Date: ".'</b><span class="text-info">'.$date."
                  <li class='list-group-item'><b>"."Pickup Time: ".'</b><span class="text-info">'.$time."
                  <li class='list-group-item'><b>"."Booking Status: ".'</b><span class="text-info">'.$row['customer_status'] ." </li>";
            echo("</ul>");
        }
    //If no data was returned we send a simple error message.
    }else if($results->num_rows == 0){
        echo("No data found.");
    }
}

//we are first checking if the reference exists
//if so we can update it. We use "Success" and "Failure" as values to render the correct html in the idResults div from the bookingFunctions.js.
function updateBooking($connection,$reference){
    $sql = "SELECT * FROM CabsOnlineBookings WHERE customer_booking_number = '$reference'";
    $results = mysqli_query($connection,$sql);
    if($results->num_rows > 0){
        $sql = "UPDATE CabsOnlineBookings SET customer_status='assigned' WHERE customer_booking_number = '$reference'";
        mysqli_query($connection,$sql);
        die("Success");
    }else{
        die("Failure");
    }
}
?>