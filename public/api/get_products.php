<?php
// api/get_products.php
require 'db_connect.php';

$sql = "SELECT * FROM products ORDER BY created_at DESC";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Handle JSON fields manually if needed
        if (isset($row['tags']) && is_string($row['tags'])) {
            $row['tags'] = json_decode($row['tags'], true) ?: [];
        }
        if (isset($row['images']) && is_string($row['images'])) {
            $row['images'] = json_decode($row['images'], true) ?: [];
        }
        if (isset($row['colors']) && is_string($row['colors'])) {
            $row['colors'] = json_decode($row['colors'], true) ?: [];
        }
        $products[] = $row;
    }
}

echo json_encode($products);
$conn->close();
?>

