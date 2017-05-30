<?php
$db_user = "root";
$db_host = "127.0.0.1";
$db_password = "";
$db_name = "";
function checksExist($connection)
{
    $selectAllQuery = "SELECT * FROM username";
    $data = mysqli_query($connection, $selectAllQuery);
    if (empty($data)) {
        mysqli_query($connection,"CREATE DATABASE dfs6572");
        mysqli_select_db($connection,'dfs6572');
        createTable($connection);
//        createData($connection);
    }
}

function createTable($connection)
{
    $createQuery = "CREATE TABLE CabsOnlineBookings(customer_booking_number VARCHAR(255) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(255),
    customer_address VARCHAR(255),
    customer_destination_address VARCHAR(255),
    customer_pickup_time VARCHAR(255))";
    mysqli_query($connection, $createQuery);
}
//we input dummy values to make sure the database connects and populates with correct information.
//function createData($connection){
//    $dataQuery = "
//    INSERT INTO CabsOnlineBookings(customer_booking_number,customer_name,customer_phone,
//                              customer_address,customer_destination_address,customer_pickup_time)
//    VALUES ('RK23131', 'Jim Jefferies', '56273562','69lmao ave','24 movelol ave', '11:57am')";
//    mysqli_query($connection, $dataQuery);
//}
?>
