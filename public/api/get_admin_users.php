<?php
// api/get_admin_users.php
require 'db_connect.php';

$sql = "SELECT id, name, email, role, avatar, last_login, created_at FROM admin_users ORDER BY created_at DESC";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);
$conn->close();
?>
