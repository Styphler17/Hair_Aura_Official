<?php
// api/get_settings.php
require 'db_connect.php';

// Check if settings row exists, if not create it with defaults
$checkSql = "SELECT COUNT(*) as count FROM site_settings WHERE id = 1";
$checkResult = $conn->query($checkSql);
$checkRow = $checkResult->fetch_assoc();

if ($checkRow['count'] == 0) {
    // Create default settings row
    $insertSql = "INSERT INTO site_settings (
        id, phone_number, address, currency_symbol,
        color_text, color_background, color_accent,
        about_title, contact_title, maintenance_mode
    ) VALUES (
        1, '233508007873', 'Odumase GA West Accra, Ghana', 'GH₵',
        '#0a0a0a', '#ffffff', '#D4AF37',
        'Our Story', 'Get in Touch', 0
    )";
    
    if (!$conn->query($insertSql)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create default settings: ' . $conn->error]);
        $conn->close();
        exit;
    }
}

// Fetch settings
$sql = "SELECT * FROM site_settings WHERE id = 1 LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $settings = $result->fetch_assoc();
    
    // Convert maintenance_mode to proper boolean (handle both string and int)
    $settings['maintenance_mode'] = ($settings['maintenance_mode'] == 1 || $settings['maintenance_mode'] === '1' || $settings['maintenance_mode'] === true);
    
    // Fetch social links
    $socialSql = "SELECT platform, url FROM social_links WHERE settings_id = 1";
    $socialResult = $conn->query($socialSql);
    $socialLinks = [];
    
    if ($socialResult->num_rows > 0) {
        while($row = $socialResult->fetch_assoc()) {
            $socialLinks[] = $row;
        }
    }
    
    $settings['socialLinks'] = $socialLinks;
    
    echo json_encode($settings);
} else {
    // This should not happen after the insert above, but handle it anyway
    http_response_code(500);
    echo json_encode(['error' => 'Failed to retrieve settings']);
}

$conn->close();
?>

