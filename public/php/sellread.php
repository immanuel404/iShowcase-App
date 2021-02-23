<?php
require 'connect.php';


error_reporting(E_ERROR);
$products = [];


$sql = "SELECT * FROM `sell` ORDER BY created_at DESC";

if($result = mysqli_query($con, $sql)) {
	$cr = 0;
	while($row = mysqli_fetch_assoc($result)) {
		$products[$cr]['id'] = $row['id'];
		$products[$cr]['title'] = $row['title'];
		$products[$cr]['details'] = $row['details'];
		$products[$cr]['features'] = $row['features'];
		$products[$cr]['price'] = $row['price'];
		$products[$cr]['phone'] = $row['phone'];
		$products[$cr]['email'] = $row['email'];
		$products[$cr]['img'] = $row['img'];
		$products[$cr]['username'] = $row['username'];
		$products[$cr]['password'] = $row['password'];
		$cr++;
	}

	echo json_encode($products);

} else {
	http_response_code(404);
}

?>