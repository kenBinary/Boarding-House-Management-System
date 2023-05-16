<?php
require('db_connect.php');
$tenantId = $_GET['tenantId'];
$firstName = $_GET['firstName'];
$lastName = $_GET['lastName'];
$contactNumber = $_GET['contactNumber'];

// echo json_encode(array($tenantId,$firstName,$lastName,$contactNumber));

$notAllowed = mysqli_query($conn, "SELECT tenantId from tenant where tenantId = '{$tenantId}';")->num_rows;
// echo json_encode($notAllowed);


if ($notAllowed > 0) {
    $updateTenant = "UPDATE tenant set firstName = '{$firstName}', lastName = '{$lastName}' where tenantId = '{$tenantId}'";
    mysqli_query($conn, $updateTenant);
    $updateTenantNumber = "UPDATE tenantnumber set contactNumber = '{$contactNumber}' where tenant_id = '{$tenantId}'";
    mysqli_query($conn, $updateTenantNumber);
    echo json_encode($notAllowed);
} else {
    echo json_encode($notAllowed);
}