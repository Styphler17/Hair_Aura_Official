<?php
// db_connect.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost"; // Hostinger usually uses 'localhost'
$username = "u509059322_admin"; // YOUR Hostinger DB Username - UPDATE THIS
$password = "YourStrongPassword!"; // YOUR Hostinger DB Password - UPDATE THIS
$dbname = "u509059322_hairaura"; // YOUR Hostinger DB Name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>

