<?php 

define('DB_HOST', 'sql209.epizy.com');
define('DB_USER', 'epiz_30484459');
define('DB_PASS', 'TcLlPH5cUAhqgF');
define('DB_NAME', 'epiz_30484459_ishowcase');

function connect() {
	$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if (mysqli_connect_errno($connect)) {
		die("failed to connect:" . mysqli_connect_error());
	}
	
	mysqli_set_charset($connect, 'utf8');

	return $connect;
}

$con = connect();

