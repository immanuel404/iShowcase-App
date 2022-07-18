<?php
require 'connect.php';


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	$id = $_GET['id'];
	$color = $request->color;
	// $radius = $request->radius;

	$sql = "UPDATE `sell` SET `color`=? WHERE `id` = '{$id}' LIMIT 1";

	$stmt = mysqli_stmt_init($con);
	if (!mysqli_stmt_prepare($stmt, $sql)) {
	    echo "SQL error";
	}
	else {
	    mysqli_stmt_bind_param($stmt, "s", $color);
	    mysqli_stmt_execute($stmt);

	    echo "Update Succesful";
	}
	// Close statement
	mysqli_stmt_close($stmt);
}

?>
