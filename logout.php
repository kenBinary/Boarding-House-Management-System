<?php
include 'db_connect.php';
session_unset();
session_destroy();
header('location:login.php');
exit();
?>