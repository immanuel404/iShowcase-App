<?php
require 'connect.php';


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);
    // $title =  $request->title;
    $details = $request->details;
    $features = $request->features;
    $price = $request->price;
    $phone = $request->phone;
    $email = $request->email;
		$username = $request->username;
    $password = $request->password;
		$color = $request->color;

		// sanitized
		mysqli_real_escape_string($con, $details);
    mysqli_real_escape_string($con, $features);
    mysqli_real_escape_string($con, $price);
    mysqli_real_escape_string($con, $phone);
    mysqli_real_escape_string($con, $email);
		mysqli_real_escape_string($con, $username);
    mysqli_real_escape_string($con, $password);
		mysqli_real_escape_string($con,  $color);


    // ---TITLE_VALIDATION---
    $sql = "SELECT `id` FROM `sell` WHERE `title` = ?";

    if($stmt = mysqli_prepare($con, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $param_title);

        // Set parameters
        $param_title = $request->title;

        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            /* store result */
            mysqli_stmt_store_result($stmt);

            if(mysqli_stmt_num_rows($stmt) > 0){
                echo "Sorry, item name already taken!";

            } else{
							$title = $request->title;
							mysqli_real_escape_string($con, $title);
            }
        } else{
            echo "Error Something Went Wrong, Try Again!";
        }
        // Close statement
        mysqli_stmt_close($stmt);
    }


    // SEND DATA
    $sql = "INSERT INTO `sell` (`title`,`details`,`features`,`price`,`phone`,`email`,`username`,`password`, `color`) VALUES (?,?,?,?,?,?,?,?,?);";

    $stmt = mysqli_stmt_init($con);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL error";
    } else {
    	// Password hash
    	// $param_password = password_hash($password, PASSWORD_DEFAULT);
    	// Send Data
        mysqli_stmt_bind_param($stmt, "sssssssss", $title, $details, $features, $price, $phone, $email, $username, $password, $color);
        mysqli_stmt_execute($stmt);
    }
    // Close statement
    mysqli_stmt_close($stmt);
}

?>
