<?php
require 'connect.php';


error_reporting(E_ERROR);
$id = $_GET['id'];
$imglist = [];


$sql = "SELECT * FROM `images` WHERE `image_id` = '{$id}' ";

if($result = mysqli_query($con, $sql)) {
	$cr = 0;
	while($row = mysqli_fetch_assoc($result)) {
		$imglist[$cr]['id'] = $row['id'];
		$imglist[$cr]['name'] = $row['file_name'];
		$cr++;
	}

	echo json_encode($imglist);

} else {
	http_response_code(404);
}

?>