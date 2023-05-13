<?php
require('db_connect.php');
if (isset($_POST['assign-tenant'])) {
    $tenant_ID = $_POST['tenant-list'];
    $amenity;
    $room_number = $_POST['room_number'];

    if (isset($_POST['amenity'])) {
        $last_id = mysqli_query($conn, "SELECT amenityID FROM amenity ORDER BY amenityID DESC LIMIT 1");
        if ($last_id->num_rows == 0) {
            $amenity = 1;
            $newAmenity = "INSERT INTO `amenity`(`amenityID`, `Amenity_type`, `isPaid`) VALUES ({$amenity},'Internet','False')";
            mysqli_query($conn, $newAmenity);
        } else {
            $amenity = $last_id->fetch_row()[0] + 1;
            $newAmenity = "INSERT INTO `amenity`(`amenityID`, `Amenity_type`, `isPaid`) VALUES ({$amenity},'Internet','False')";
            mysqli_query($conn, $newAmenity);
        }
    } else {
        $amenity = "Null";
    }
    $update_query = "UPDATE `tenant` SET `amenity_id`='{$amenity}',`room_number`='{$room_number}' WHERE tenantId = {$tenant_ID}";
    mysqli_query($conn, $update_query);
    $tenant_utility = "INSERT INTO tenantutility VALUES('1', {$tenant_ID}, 'False'),('2',{$tenant_ID},'False')";
    mysqli_query($conn, $tenant_utility);
    $room_utility = "INSERT INTO `roomutility`(`room_number`, `utility_id`) VALUES ('{$room_number}','1'),('{$room_number}','2')";
    mysqli_query($conn, $room_utility);
}
header("Location: room-management-webpage.php");
exit();