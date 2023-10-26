<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_manager";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$taskName = $_POST['task_name'];
$sql = "INSERT INTO tasks (task_name) VALUES ('$taskName')";

if ($conn->query($sql) === TRUE) {
    echo "Task added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
