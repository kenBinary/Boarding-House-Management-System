<?php
require('db_connect.php');
$tenantId = $_GET['tenantId'];
$sql_query = "select tenantId,room_number,firstName,lastName,contactNumber from tenant inner join tenantnumber on tenant.tenantId = tenantnumber.tenant_id where tenant.tenantID = '{$tenantId}';";
// $sql_query = "select tenantId,firstName,lastName,contactNumber from tenant inner join tenantnumber on tenant.tenantId = tenantnumber.tenant_id where tenant.tenantID = '{$tenantId}';";
$result = mysqli_query($conn,$sql_query);
$roomRecords = $result->fetch_row();
echo json_encode($roomRecords);
