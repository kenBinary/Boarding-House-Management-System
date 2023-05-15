<?php
require('payment-management.html');
require('db_connect.php');
if (isset($_GET['room'])) {
    $tenant_id = $_GET['tenant_id'];
    $paid_status = $_GET['status']?"False":"True";
    $room_number = mysqli_query($conn,"select room_number from tenant where tenantId = '{$tenant_id}'")->fetch_row()[0];
    $update_room = "UPDATE room set isPaid = {$paid_status} WHERE roomNumber = '{$room_number}'";
    mysqli_query($conn,$update_room);
}
if (isset($_GET['amenity'])) {
    $tenant_id = $_GET['tenant_id'];
    $paid_status = $_GET['status']?"False":"True";
    $amenity_id = mysqli_query($conn,"select amenity_id from tenant where tenantId = '{$tenant_id}'")->fetch_row()[0];
    $update_amenity = "UPDATE amenity set isPaid = {$paid_status} where amenityID = '{$amenity_id}'";
    mysqli_query($conn,$update_amenity);
}
if (isset($_GET['Electricity'])) {
    $tenant_id = $_GET['tenant_id'];
    $paid_status = $_GET['status']?"False":"True";
    $utilityID = "1";
    $updateElectriciy = "UPDATE tenantutility set isPaid = {$paid_status} where utility_id = '{$utilityID}' and tenant_id = '{$tenant_id}'";
    mysqli_query($conn,$updateElectriciy);
}
if (isset($_GET['Water'])) {
    $tenant_id = $_GET['tenant_id'];
    $paid_status = $_GET['status']?"False":"True";
    $utilityID = "2";
    $updateWater = "UPDATE tenantutility set isPaid = {$paid_status} where utility_id = '{$utilityID}' and tenant_id = '{$tenant_id}'";
    mysqli_query($conn,$updateWater);
}