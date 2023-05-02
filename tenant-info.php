<?php
require('db_connect.php');
$sql_query = "SELECT tenantId, firstName, lastName, contactNumber FROM tenant INNER JOIN tenantnumber ON tenant.tenantId = tenantnumber.tenant_id;";
$result = mysqli_query($conn,$sql_query);
$roomRecords = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($roomRecords);
