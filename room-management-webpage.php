<?php
require('room-management.html');
if (isset($_POST['assign-tenant'])) {
    $tenant_ID = $_POST['tenant-list'];
    $amenity = isset($_POST['amenity'])? $_POST['amenity']: "Null";
    $room_number = $_POST['room_number'];
    echo $tenant_ID;
    echo $amenity;
    echo $room_number;
}
