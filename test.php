<?php
require('db_connect.php');
$room_number = '6';
$occupants = "Select * from tenant where room_number = '{$room_number}'";
$numberOfOccupants = mysqli_query($conn, $occupants)->num_rows;
echo $numberOfOccupants;
