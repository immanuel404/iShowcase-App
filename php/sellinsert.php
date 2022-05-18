<?php
require 'connect.php';


$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

    // $title =  $request->title;
    // $username = $request->username;
    $details = $request->details;
    $features = $request->features;
    $price = $request->price;
    $phone = $request->phone;
    $email = $request->email;
    $password = $request->password;

    
    // Prepared Statement---TITLE_VALIDATION---
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
                echo "Sorry, item title already taken!";

            } else{
                $title = $request->title;
            }
        } else{
            echo "Error Something Went Wrong, Try Again!";
        }
        // Close statement
        mysqli_stmt_close($stmt);
    }


    
    // Prepared Statement---USERNAME_VALIDATION---
    $sql = "SELECT `id` FROM `sell` WHERE `username` = ?";
    
    if($stmt = mysqli_prepare($con, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $param_username);
        
        // Set parameters
        $param_username = $request->username;
        
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            /* store result */
            mysqli_stmt_store_result($stmt);
            
            if(mysqli_stmt_num_rows($stmt) > 0){
                echo "Sorry, username already taken!";

            } else{
                $username = $request->username;
            }
        } else{
            echo "Error Something Went Wrong, Try Again!";
        }
        // Close statement
        mysqli_stmt_close($stmt);
    }




    // SEND DATA
    $sql = "INSERT INTO `sell` (`title`,`details`,`features`, `price`,`phone`,`email`, `username`, `password`) VALUES (?,?,?,?,?,?,?,?);";

    $stmt = mysqli_stmt_init($con);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL error";
    } else {
    	// Creates a password hash
    	// $param_password = password_hash($password, PASSWORD_DEFAULT); 
    	// Send Data
        mysqli_stmt_bind_param($stmt, "ssssssss", $title, $details, $features, $price, $phone, $email, $username, $password);
        mysqli_stmt_execute($stmt);
    }

    // Close statement
    mysqli_stmt_close($stmt);
}


?>