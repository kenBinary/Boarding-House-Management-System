<?php
require('db_connect.php');
$room_number = $_GET['roomNumber'];

$retrieve_tenID = "SELECT tenantId FROM tenant WHERE room_number = '{$room_number}'";
$tenant_id = mysqli_query($conn, $retrieve_tenID)->fetch_row()[0];

$retrieve_amnID = "SELECT amenity_id from tenant where tenantId = '{$tenant_id}'";
$amenity_id = mysqli_query($conn, $retrieve_amnID)->fetch_row()[0];

print_r($room_number);
print_r($tenant_id);
print_r($amenity_id);

$delete_amenity = "DELETE FROM amenity WHERE amenityID = '{$amenity_id}'";
mysqli_query($conn, $delete_amenity);

$update_room = "UPDATE room SET roomStatus = False where roomNumber = '{$room_number}'";
mysqli_query($conn, $update_room);

$remove_roomUtility = "DELETE FROM roomutility where room_number = '{$room_number}'";
mysqli_query($conn, $remove_roomUtility);

$remove_tenantUtility = "DELETE FROM tenantutility where tenant_id = '{$tenant_id}'";
mysqli_query($conn, $remove_tenantUtility);

// -remove amenity
// -update room status to vacant
// -remove room utility
// -remove tenant utility