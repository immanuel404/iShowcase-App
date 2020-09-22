<?php
require 'connect.php';

$response = array();
$upload_dir = 'uploads/';
$server_url = 'http://localhost/10iShowcase-App/';


    if($_FILES['avatar'])
    {   
        $id = $_GET['id'];

        $avatar_name = $_FILES["avatar"]["name"];
        $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
        $fileSize = $_FILES['avatar']['size'];
        $error = $_FILES["avatar"]["error"];

        if($error > 0){
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }else 
        {
            if ($fileSize < 4000000) {

            $random_name = rand(1000,1000000)."-".$avatar_name;
            $upload_name = $upload_dir.strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);
        
                if(move_uploaded_file($avatar_tmp_name, $upload_name)) {
                    
                    $sql = "INSERT INTO `images` (`file_name`, `image_id`) VALUES (?,?)";
                    $stmt = mysqli_stmt_init($con);
                        if (!mysqli_stmt_prepare($stmt, $sql)) {
                            echo "SQL error";
                        } else {
                            mysqli_stmt_bind_param($stmt, "ss", $random_name, $id);
                            mysqli_stmt_execute($stmt);
                        }
                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "File uploaded successfully",
                        "url" => $server_url."/".$upload_name
                    );
                }else
                {
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "Error uploading the file!"
                    );
                }
            }else 
            {
                $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Your file is too big"
                );
            }
        }   

    }else{
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "No file was sent!"
        );
    }

    echo json_encode($response);

?>