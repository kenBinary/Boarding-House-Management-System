<?php
require ('login.html');
require ('db_connect.php');
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM admin WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $_SESSION['loggedin'] = true;
        setcookie('userLogin', $username, time() + 3600);
        header('Location: dashboard.php');
        exit;
    } else {
        echo "<script>alert('Invalid login');</script>";
    }
}
