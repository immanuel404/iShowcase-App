<?php 

define('DB_HOST', '');
define('DB_USER', '');
define('DB_PASS', '');
define('DB_NAME', '');

function connect() {
	$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if (mysqli_connect_errno($connect)) {
		die("failed to connect:" . mysqli_connect_error());
	}
	
	mysqli_set_charset($connect, 'utf8');

	return $connect;
}

$con = connect();

