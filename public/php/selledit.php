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
    $password = $request->password;


	$sql = "UPDATE `sell` SET `details`=?, `features`=?, `price`=?, `phone`=?, `email`=?, `password`=? WHERE `id` = '{$id}' LIMIT 1";

	$stmt = mysqli_stmt_init($con);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL error";
    } else {
    	// Creates a password hash
    	// $param_password = password_hash($password, PASSWORD_DEFAULT); 
    	// Send Data
        mysqli_stmt_bind_param($stmt, "ssssss", $details, $features, $price, $phone, $email, $password);
        mysqli_stmt_execute($stmt);

        echo "Update Succesfull";
    }
    // Close statement
    mysqli_stmt_close($stmt);

}

?>