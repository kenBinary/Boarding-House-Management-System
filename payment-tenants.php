<?php
require('db_connect.php');
$get_tenants = "SELECT tenantId, firstName, lastName , room.isPaid AS roomPaid, amenity.isPaid AS amenityPaid, tenantUtility.isPaid, room_type FROM tenant INNER JOIN room ON tenant.room_number = room.roomNumber INNER JOIN amenity ON tenant.amenity_id = amenity.amenityId INNER JOIN tenantUtility ON tenantUtility.tenant_id = tenant.tenantId";
$result = mysqli_query($conn,$get_tenants)->fetch_all();
echo json_encode($result);