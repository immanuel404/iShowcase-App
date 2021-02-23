<?php
require 'connect.php';


$id = $_GET['id'];

$sql = "DELETE FROM `images` WHERE `file_name` = '{$id}' LIMIT 1 ";

if(mysqli_query($con, $sql)) {
	http_response_code(204);
} else {
	http_response_code(422);
}