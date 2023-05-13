<html>
<title>
</title>

<body>
    <form action="" method="get">
        <input type="hidden" name="test" value="bruh">
        <div>
            blaksjdflfj
        </div>
        <input type="submit" value="submit" name="submit">
    </form>
</body>

</html>
<?php
if (isset($_GET['submit'])) {
    echo $_GET['test'];
}

?>