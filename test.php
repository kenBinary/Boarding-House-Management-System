<!DOCTYPE html>
<html>
<head>
  <title>Command Execution</title>
</head>
<body>
  <form method="POST" action="test.php">
    <label for="command">Select a command:</label>
    <select name="command" id="command">
      <option value="command1">Command 1</option>
      <option value="command2">Command 2</option>
      <option value="command3">Command 3</option>
    </select>
    <br>
    <input type="submit" value="Execute Command" name="bruh">
  </form>
</body>
</html>

<?php
if (isset($_POST['command'])) {
    echo "aslkdjflkasjdfk";
}
if (isset($_POST['bruh'])) {
    echo "laf";
}
