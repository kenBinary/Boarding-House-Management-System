<?php
require('db_connect.php');
$tenantId = $_GET['tenantId'];
$deleteNumber = "DELETE FROM tenantnumber where tenant_id = '{$tenantId}'";
$deleteTenant = "DELETE FROM tenant where tenantId= '{$tenantId}'";
mysqli_query($conn, $deleteNumber);
mysqli_query($conn, $deleteTenant);

