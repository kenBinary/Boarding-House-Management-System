<?php
require('db_connect.php');
$room_num = mysqli_query($conn,"select COUNT(roomNumber) from room;")->fetch_row()[0];

$occupied_num = mysqli_query($conn,"select COUNT(roomNumber) from room where roomStatus = True;")->fetch_row()[0];

$vacant_num = mysqli_query($conn,"select COUNT(roomNumber) from room where roomStatus = False;")->fetch_row()[0];

$single_num = mysqli_query($conn,"select COUNT(roomNumber) from room where room_type = 'Single_Room';")->fetch_row()[0];

$double_num = mysqli_query($conn,"select COUNT(roomNumber) from room where room_type = 'Double_Room';")->fetch_row()[0];

$details = array($room_num,$occupied_num,$vacant_num,$single_num,$double_num);

echo json_encode($details);
