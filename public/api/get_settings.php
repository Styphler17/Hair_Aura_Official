<?php
// api/get_settings.php
require 'db_connect.php';

$sql = "SELECT * FROM site_settings WHERE id = 1 LIMIT 1";
$result = $conn->query($sql);

$settings = null;

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
} else {
    // Return default settings if none exist
    $settings = [
        'id' => 1,
        'phone_number' => '',
        'address' => '',
        'currency_symbol' => 'GH₵',
        'color_text' => '#0a0a0a',
        'color_background' => '#ffffff',
        'color_accent' => '#D4AF37',
        'logo' => null,
        'favicon' => null,
        'default_social_image' => null,
        'hero_image' => null,
        'hero_headline' => null,
        'hero_subheadline' => null,
        'hero_cta_text' => null,
        'about_title' => 'Our Story',
        'about_content' => null,
        'contact_title' => 'Get in Touch',
        'contact_content' => null,
        'maintenance_mode' => false,
        'socialLinks' => []
    ];
}

echo json_encode($settings);
$conn->close();
?>

