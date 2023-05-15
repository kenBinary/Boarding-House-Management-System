<?php
require('db_connect.php');

$tenant_num = mysqli_query($conn, "SELECT COUNT(tenantID) from tenant;")->fetch_row()[0];

$rooms_paid = mysqli_query($conn, "SELECT COUNT(room_number) FROM tenant inner join room on tenant.room_number = room.roomNumber where room.isPaid = True;")->fetch_row()[0];

$utilities_num = mysqli_query($conn, "SELECT COUNT(tenantId) FROM tenant INNER JOIN tenantutility ON tenant.tenantId = tenantutility.tenant_id WHERE tenantutility.isPaid = TRUE;")->fetch_row()[0];

$amenity_num = mysqli_query($conn, "SELECT COUNT(amenity_id) from tenant inner join amenity on tenant.amenity_id = amenity.amenityID where amenity.isPaid = True; ")->fetch_row()[0];

$details = array($tenant_num,$rooms_paid,$utilities_num,$amenity_num);
echo json_encode($details);