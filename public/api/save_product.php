<?php
// api/save_product.php
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

// Validate required fields
if (empty($data['name'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Product name is required']);
    exit;
}

if (!isset($data['price']) || $data['price'] < 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Valid product price is required']);
    exit;
}

// Validate images array - must have at least 4 images
if (!isset($data['images']) || !is_array($data['images']) || count($data['images']) < 4) {
    http_response_code(400);
    echo json_encode(['error' => 'Product must have at least 4 images']);
    exit;
}

// Helper function to safely encode JSON fields
function safeJsonEncode($value) {
    if (is_null($value) || (is_array($value) && empty($value))) {
        return null;
    }
    if (is_string($value)) {
        // Already a JSON string, validate it
        json_decode($value);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $value;
        }
    }
    return json_encode($value);
}

// Determine if this is create or update
$isUpdate = isset($data['action']) && $data['action'] === 'update';
if (!$isUpdate && isset($data['id']) && !empty($data['id'])) {
    // Check if ID already exists in database
    $checkSql = "SELECT id FROM products WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $data['id']);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();
    
    if ($checkResult->num_rows > 0) {
        $isUpdate = true;
    }
}

if ($isUpdate) {
    // UPDATE existing product
    if (!isset($data['id']) || empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Product ID is required for update']);
        exit;
    }
    
    // First check if product exists
    $checkSql = "SELECT id FROM products WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $data['id']);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();
    
    if ($checkResult->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
        $conn->close();
        exit;
    }
    
    // Encode JSON fields
    $images = safeJsonEncode($data['images'] ?? null);
    $tags = safeJsonEncode($data['tags'] ?? null);
    $colors = safeJsonEncode($data['colors'] ?? null);
    
    $sql = "UPDATE products SET
        name = ?,
        price = ?,
        description = ?,
        image = ?,
        images = ?,
        category = ?,
        tags = ?,
        colors = ?,
        seo_keywords = ?
    WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $name = $data['name'] ?? '';
    $price = $data['price'] ?? 0;
    $description = $data['description'] ?? '';
    $image = $data['image'] ?? '';
    $category = $data['category'] ?? 'wigs';
    $seo_keywords = $data['seo_keywords'] ?? '';
    
    $stmt->bind_param("sdssssssss",
        $name,
        $price,
        $description,
        $image,
        $images,
        $category,
        $tags,
        $colors,
        $seo_keywords,
        $data['id']
    );
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $data['id'], 'message' => 'Product updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update product: ' . $stmt->error]);
    }
    $stmt->close();
    
} else {
    // CREATE new product
    $id = isset($data['id']) && !empty($data['id']) ? $data['id'] : time() . '_' . uniqid();
    
    // Check for duplicate ID
    $checkSql = "SELECT id FROM products WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();
    
    if ($checkResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Product with this ID already exists']);
        $conn->close();
        exit;
    }
    
    // Encode JSON fields
    $images = safeJsonEncode($data['images'] ?? null);
    $tags = safeJsonEncode($data['tags'] ?? null);
    $colors = safeJsonEncode($data['colors'] ?? null);
    
    $sql = "INSERT INTO products (id, name, price, description, image, images, category, tags, colors, seo_keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $name = $data['name'] ?? '';
    $price = $data['price'] ?? 0;
    $description = $data['description'] ?? '';
    $image = $data['image'] ?? '';
    $category = $data['category'] ?? 'wigs';
    $seo_keywords = $data['seo_keywords'] ?? '';
    
    $stmt->bind_param("ssdsssssss",
        $id,
        $name,
        $price,
        $description,
        $image,
        $images,
        $category,
        $tags,
        $colors,
        $seo_keywords
    );
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $id, 'message' => 'Product created successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create product: ' . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>

