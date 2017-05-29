<?php
require_once "configureDB.php";
$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (!$connection) {
    exit;
}  else {
    checksExist($connection);
}



?>