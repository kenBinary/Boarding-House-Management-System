<?php
require('payment-management.html');
require('db_connect.php');
if (isset($_GET['amenity'])) {
    $tenant_id = 16;
    $tenant_info = "SELECT tenantId, firstName, lastName , room.isPaid AS roomPaid, amenity.isPaid AS amenityPaid, tenantUtility.isPaid FROM tenant INNER JOIN room ON tenant.room_number = room.roomNumber INNER JOIN amenity ON tenant.amenity_id = amenity.amenityId INNER JOIN tenantUtility ON tenantUtility.tenant_id = tenant.tenantId WHERE tenant.tenantId = {$tenant_id}";
    $result = mysqli_query($conn, $tenant_info)->fetch_all();
    print_r($result);
}