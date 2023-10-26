<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_manager";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$taskId = $_POST['id'];
$updatedTaskName = $_POST['task_name'];
$sql = "UPDATE tasks SET task_name = '$updatedTaskName' WHERE id = $taskId";

if ($conn->query($sql) === TRUE) {
    echo "Task updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
