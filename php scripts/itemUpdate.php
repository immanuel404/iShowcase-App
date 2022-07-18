<?php
require 'connect.php';


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	$id = $_GET['id'];
    $details = $request->details;
    $features = $request->features;
    $price = $request->price;
    $phone = $request->phone;
    $email = $request->email;

		// sanitized
		mysqli_real_escape_string($con, $details);
		mysqli_real_escape_string($con, $features);
		mysqli_real_escape_string($con, $price);
		mysqli_real_escape_string($con, $phone);
		mysqli_real_escape_string($con, $email);


	$sql = "UPDATE `sell` SET `details`=?, `features`=?, `price`=?, `phone`=?, `email`=? WHERE `id` = '{$id}' LIMIT 1";

	$stmt = mysqli_stmt_init($con);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL error";
    } else {
    	// Send Data
        mysqli_stmt_bind_param($stmt, "sssss", $details, $features, $price, $phone, $email);
        mysqli_stmt_execute($stmt);

        echo "Update Succesful";
    }
    // Close statement
    mysqli_stmt_close($stmt);
}

?>
