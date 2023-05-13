<?php
require('db_connect.php');
$sql_query = "select room_type,roomNumber from room where roomStatus = 1";
$result = mysqli_query($conn,$sql_query);
$roomRecords = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($roomRecords);