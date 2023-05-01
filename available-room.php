<?php
require('db_connect.php');
$sql_query = "select roomNumber,roomStatus,room_type from room";
$result = mysqli_query($conn,$sql_query);
$roomRecords = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($roomRecords);
