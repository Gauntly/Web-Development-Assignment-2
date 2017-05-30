<?php
require_once "configureDB.php";
$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (!$connection) {
    exit;
}  else {
    checksExist($connection);
}

if($_POST){
    if($_POST ['action'] == "request-cab"){
    processRequest($connection);
    die();
    }
}


function processRequest($connection){
    $customer_name = mysqli_real_escape_string($connection, $_POST['name']);
    $customer_phone = mysqli_real_escape_string($connection, $_POST['phone']);
    $customer_address = mysqli_real_escape_string($connection, $_POST['address']);
    $customer_destination_address = mysqli_real_escape_string($connection,$_POST['destination']);
    $customer_pickup_time = mysqli_real_escape_string($connection, $_POST['time']);
    $customer_booking_number = generateReference();

//    $timeSql = date('Y-m-d H:i:s', $time);
    $sql = "INSERT INTO CabsOnlineBookings VALUES ('$customer_booking_number', '$customer_name','$customer_phone','$customer_address','$customer_destination_address', 20)";

    mysqli_query($connection,$sql);

}

function generateReference(){
    $jumble = substr(str_shuffle(md5($_POST['address'])),0,8);
    return strtoupper($jumble);
}



?>