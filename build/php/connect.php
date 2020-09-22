<?php 

define('DB_HOST', 'sql304.epizy.com');
define('DB_USER', 'epiz_26791495');
define('DB_PASS', 'BIWadJBNErae');
define('DB_NAME', 'epiz_26791495_ishowcase');

function connect() {
	$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if (mysqli_connect_errno($connect)) {
		die("failed to connect:" . mysqli_connect_error());
	}
	
	mysqli_set_charset($connect, 'utf8');

	return $connect;
}

$con = connect();

