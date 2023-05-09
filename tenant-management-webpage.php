<?php
require('tenant-management.html');
require('db_connect.php');

if (isset($_POST['add-tenant'])) {
    $first_name = $_POST['first-name'];
    $last_name = $_POST['last-name'];
    $contact_number = $_POST['contact'];
    $add_tenant = mysqli_query($conn, "Insert Into tenant(firstName,lastName) values('{$first_name}','{$last_name}')");
    $tenantId = mysqli_query($conn, "select tenantid from tenant where firstName ='{$first_name}' and lastName = '{$last_name}'");
    $tenant_number = $tenantId->fetch_row()[0];
    $add_contact = mysqli_query($conn, "insert into tenantnumber(tenant_id,contactNumber) values('{$tenant_number}','{$contact_number}')");
}