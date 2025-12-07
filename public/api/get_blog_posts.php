<?php
// api/get_blog_posts.php
require 'db_connect.php';

// Optional: Get specific post by ID
$postId = isset($_GET['id']) ? $_GET['id'] : null;

if ($postId) {
    $sql = "SELECT * FROM blog_posts WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $postId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $post = $result->fetch_assoc();
        echo json_encode($post);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Post not found']);
    }
    $stmt->close();
} else {
    // Get all posts, ordered by date (newest first)
    $sql = "SELECT * FROM blog_posts ORDER BY date DESC";
    $result = $conn->query($sql);
    
    $posts = [];
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $posts[] = $row;
        }
    }
    
    echo json_encode($posts);
}

$conn->close();
?>

