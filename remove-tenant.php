<?php
require('db_connect.php');
$tenantId = $_GET['tenantId'];

$notAllowed = mysqli_query($conn, "SELECT tenantId from tenant inner join tenantutility on tenant.tenantId = tenantutility.tenant_id where tenant.tenantId = '{$tenantId}';")->num_rows;
if ($notAllowed > 0) {
    echo json_encode($notAllowed);
} else {
    $deleteNumber = "DELETE FROM tenantnumber where tenant_id = '{$tenantId}'";
    $deleteTenant = "DELETE FROM tenant where tenantId= '{$tenantId}'";
    mysqli_query($conn, $deleteNumber);
    mysqli_query($conn, $deleteTenant);
}