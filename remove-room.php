<?php
require('db_connect.php');
$room_number = $_GET['roomNumber'];

// $retrieve_tenID = "SELECT tenantId FROM tenant WHERE room_number = '{$room_number}'";
// $tenant_id = mysqli_query($conn, $retrieve_tenID)->fetch_all();
// // echo json_encode($tenant_id[0][0]);
// echo json_encode($tenant_id[1][0]);


// $retrieve_amnID = "SELECT amenity_id from tenant where tenantId = '{$tenant_id}'";
// $amenity_id = mysqli_query($conn, $retrieve_amnID)->fetch_row()[0];

// $remove_roomUtility = "DELETE FROM roomutility where room_number = '{$room_number}'";
// mysqli_query($conn, $remove_roomUtility);

$retrieve_tenID = "SELECT tenantId FROM tenant WHERE room_number = '{$room_number}'";
$tenant_ids = mysqli_query($conn, $retrieve_tenID)->fetch_all();
$tenant_id = $tenant_ids[0][0];

$retrieve_amnID = "SELECT amenity_id from tenant where tenantId = '{$tenant_id}'";
$amenity_id = mysqli_query($conn, $retrieve_amnID)->fetch_row()[0];

$remove_roomUtility = "DELETE FROM roomutility where room_number = '{$room_number}'";
mysqli_query($conn, $remove_roomUtility);

$double_rooms = array("3", "15", "16", "17");
if (in_array($room_number, $double_rooms)) {
    $delete_amenity = "DELETE FROM amenity WHERE amenityID = '{$amenity_id}'";
    mysqli_query($conn, $delete_amenity);

    $remove_tenantUtility = "DELETE FROM tenantutility where tenant_id = '{$tenant_id}'";
    mysqli_query($conn, $remove_tenantUtility);

    $tenant_id_second = $tenant_ids[1][0];
    $retrieve_amnID_second = "SELECT amenity_id from tenant where tenantId = '{$tenant_id_second}'";
    $amenity_id_second = mysqli_query($conn, $retrieve_amnID_second)->fetch_row()[0];

    $delete_amenity_second = "DELETE FROM amenity WHERE amenityID = '{$amenity_id_second}'";
    mysqli_query($conn, $delete_amenity_second);

    $remove_tenantUtility_second = "DELETE FROM tenantutility where tenant_id = '{$tenant_id_second}'";
    mysqli_query($conn, $remove_tenantUtility_second);



} else {
    $delete_amenity = "DELETE FROM amenity WHERE amenityID = '{$amenity_id}'";
    mysqli_query($conn, $delete_amenity);

    $remove_tenantUtility = "DELETE FROM tenantutility where tenant_id = '{$tenant_id}'";
    mysqli_query($conn, $remove_tenantUtility);
}





$update_room = "UPDATE room SET roomStatus = False where roomNumber = '{$room_number}'";
mysqli_query($conn, $update_room);

// -remove amenity
// -update room status to vacant
// -remove room utility
// -remove tenant utility