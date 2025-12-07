<?php
// api/disable_maintenance.php
// Quick script to disable maintenance mode directly in database
require 'db_connect.php';

// Update maintenance_mode to false
$sql = "UPDATE site_settings SET maintenance_mode = 0 WHERE id = 1";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Maintenance mode disabled']);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>

