<?php
// api/check_maintenance.php
// Check current maintenance mode status
require 'db_connect.php';

$sql = "SELECT maintenance_mode FROM site_settings WHERE id = 1 LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $maintenanceMode = $row['maintenance_mode'];
    
    echo json_encode([
        'maintenance_mode' => (bool)$maintenanceMode,
        'value' => $maintenanceMode,
        'message' => $maintenanceMode ? 'Maintenance mode is ON' : 'Maintenance mode is OFF'
    ]);
} else {
    echo json_encode([
        'maintenance_mode' => false,
        'value' => 0,
        'message' => 'No settings found, using default (OFF)'
    ]);
}

$conn->close();
?>

