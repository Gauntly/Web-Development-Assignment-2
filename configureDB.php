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

function createTable($connection){
    $createQuery = "CREATE TABLE CabsOnlineBookings(customer_booking_number VARCHAR(8) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(12),
    customer_address VARCHAR(255),
    customer_destination_address VARCHAR(255),
    customer_pickup_date VARCHAR(255),
    customer_pickup_time DateTime NOT NULL,
    customer_status VARCHAR(255))";
    mysqli_query($connection, $createQuery);
}
?>
