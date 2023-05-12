<?php
require('db_connect.php');
$query = "SELECT tenantId,firstName, lastName FROM tenant WHERE room_number IS NULL";
$result = mysqli_query($conn,$query);
$tenants = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($tenants);

