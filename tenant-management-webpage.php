<?php
require('tenant-management.html');
require('db_connect.php');

if (isset($_POST['submit'])) {
    $tenantFirstname = $_POST['first-name'];
    $tenantLastname = $_POST['last-name'];
    $tenantNumber = $_POST['contact'];

    $sqlValues = "INSERT INTO `tenant`(`firstName`, `lastName`) VALUES ('$tenantFirstname','$tenantLastname')";
    $result = mysqli_query($conn, $sqlValues);

    $sqlValues1 = "SELECT `tenantId` FROM `tenant` WHERE firstName = '$tenantFirstname' AND lastName = '$tenantLastname'";
    $results = mysqli_query($conn, $sqlValues1);

    if (mysqli_num_rows($results) > 0) {
        $row = mysqli_fetch_row($results);
        $tenantID = $row[0];
        $sqlValues2 = "INSERT INTO `tenantnumber`(`tenant_id`,`contactNumber`) VALUES ('$tenantID', '$tenantNumber')";
        mysqli_query($conn, $sqlValues2);

    } else {
        echo "Not Found";
    }
}