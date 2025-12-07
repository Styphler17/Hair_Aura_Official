<?php
// api/update_settings.php
require 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Helper function to handle NULL values for optional fields
function getValueOrNull($value) {
    if (is_null($value) || (is_string($value) && trim($value) === '')) {
        return null;
    }
    return $value;
}

// Map frontend field names to database column names with proper NULL handling
$logo = getValueOrNull($data['logo'] ?? null);
$favicon = getValueOrNull($data['favicon'] ?? null);
$heroImage = getValueOrNull($data['heroImage'] ?? null);
$defaultSocialImage = getValueOrNull($data['defaultSocialImage'] ?? null);

// Check if settings row exists
$checkSql = "SELECT id FROM site_settings WHERE id = 1";
$checkResult = $conn->query($checkSql);

if ($checkResult->num_rows === 0) {
    // Insert new row
    $sql = "INSERT INTO site_settings (
        id, phone_number, address, currency_symbol,
        color_text, color_background, color_accent,
        logo, favicon, default_social_image, hero_image,
        hero_headline, hero_subheadline, hero_cta_text,
        about_title, about_content, contact_title, contact_content,
        maintenance_mode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $id = 1;
    $phoneNumber = $data['phoneNumber'] ?? '';
    $address = $data['address'] ?? '';
    $currencySymbol = $data['currencySymbol'] ?? 'GH₵';
    $colorText = $data['colorText'] ?? '#0a0a0a';
    $colorBackground = $data['colorBackground'] ?? '#ffffff';
    $colorAccent = $data['colorAccent'] ?? '#D4AF37';
    $heroHeadline = $data['heroHeadline'] ?? '';
    $heroSubheadline = $data['heroSubheadline'] ?? '';
    $heroCtaText = $data['heroCtaText'] ?? '';
    $aboutTitle = $data['aboutTitle'] ?? 'Our Story';
    $aboutContent = $data['aboutContent'] ?? '';
    $contactTitle = $data['contactTitle'] ?? 'Get in Touch';
    $contactContent = $data['contactContent'] ?? '';
    $maintenanceMode = isset($data['maintenanceMode']) ? ($data['maintenanceMode'] ? 1 : 0) : 0;
    
    $stmt->bind_param("isssssssssssssssssi",
        $id,
        $phoneNumber,
        $address,
        $currencySymbol,
        $colorText,
        $colorBackground,
        $colorAccent,
        $logo,
        $favicon,
        $defaultSocialImage,
        $heroImage,
        $heroHeadline,
        $heroSubheadline,
        $heroCtaText,
        $aboutTitle,
        $aboutContent,
        $contactTitle,
        $contactContent,
        $maintenanceMode
    );
} else {
    // Update existing row
    $sql = "UPDATE site_settings SET
        phone_number = ?,
        address = ?,
        currency_symbol = ?,
        color_text = ?,
        color_background = ?,
        color_accent = ?,
        logo = ?,
        favicon = ?,
        default_social_image = ?,
        hero_image = ?,
        hero_headline = ?,
        hero_subheadline = ?,
        hero_cta_text = ?,
        about_title = ?,
        about_content = ?,
        contact_title = ?,
        contact_content = ?,
        maintenance_mode = ?
    WHERE id = 1";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $phoneNumber = $data['phoneNumber'] ?? '';
    $address = $data['address'] ?? '';
    $currencySymbol = $data['currencySymbol'] ?? 'GH₵';
    $colorText = $data['colorText'] ?? '#0a0a0a';
    $colorBackground = $data['colorBackground'] ?? '#ffffff';
    $colorAccent = $data['colorAccent'] ?? '#D4AF37';
    $heroHeadline = $data['heroHeadline'] ?? '';
    $heroSubheadline = $data['heroSubheadline'] ?? '';
    $heroCtaText = $data['heroCtaText'] ?? '';
    $aboutTitle = $data['aboutTitle'] ?? 'Our Story';
    $aboutContent = $data['aboutContent'] ?? '';
    $contactTitle = $data['contactTitle'] ?? 'Get in Touch';
    $contactContent = $data['contactContent'] ?? '';
    $maintenanceMode = isset($data['maintenanceMode']) ? ($data['maintenanceMode'] ? 1 : 0) : 0;
    
    $stmt->bind_param("sssssssssssssssssi",
        $phoneNumber,
        $address,
        $currencySymbol,
        $colorText,
        $colorBackground,
        $colorAccent,
        $logo,
        $favicon,
        $defaultSocialImage,
        $heroImage,
        $heroHeadline,
        $heroSubheadline,
        $heroCtaText,
        $aboutTitle,
        $aboutContent,
        $contactTitle,
        $contactContent,
        $maintenanceMode
    );
}

if ($stmt->execute()) {
    $stmt->close();
    
    // Handle social links with smart update (UPDATE existing, INSERT new, DELETE removed)
    if (isset($data['socialLinks']) && is_array($data['socialLinks'])) {
        // Get existing social links from database
        $existingSql = "SELECT id, platform, url FROM social_links WHERE settings_id = 1";
        $existingResult = $conn->query($existingSql);
        $existingLinks = [];
        
        if ($existingResult->num_rows > 0) {
            while ($row = $existingResult->fetch_assoc()) {
                $existingLinks[$row['platform']] = [
                    'id' => $row['id'],
                    'url' => $row['url']
                ];
            }
        }
        
        // Track which platforms are in the new data
        $newPlatforms = [];
        
        // Process each social link from the request
        foreach ($data['socialLinks'] as $link) {
            if (!isset($link['platform']) || !isset($link['url'])) {
                continue;
            }
            
            $platform = $link['platform'];
            $url = $link['url'];
            $newPlatforms[] = $platform;
            
            // Check if this platform already exists
            if (isset($existingLinks[$platform])) {
                // UPDATE if URL changed
                if ($existingLinks[$platform]['url'] !== $url) {
                    $updateSocial = $conn->prepare("UPDATE social_links SET url = ? WHERE id = ?");
                    $updateSocial->bind_param("si", $url, $existingLinks[$platform]['id']);
                    $updateSocial->execute();
                    $updateSocial->close();
                }
            } else {
                // INSERT new platform
                $insertSocial = $conn->prepare("INSERT INTO social_links (settings_id, platform, url) VALUES (1, ?, ?)");
                $insertSocial->bind_param("ss", $platform, $url);
                $insertSocial->execute();
                $insertSocial->close();
            }
        }
        
        // DELETE platforms that are no longer in the new data
        foreach ($existingLinks as $platform => $data) {
            if (!in_array($platform, $newPlatforms)) {
                $deleteSocial = $conn->prepare("DELETE FROM social_links WHERE id = ?");
                $deleteSocial->bind_param("i", $data['id']);
                $deleteSocial->execute();
                $deleteSocial->close();
            }
        }
    }
    
    echo json_encode(['success' => true, 'message' => 'Settings updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update settings: ' . $stmt->error]);
    $stmt->close();
}

$conn->close();
?>

