<?php
$uname = $_POST['uname'];
$passwd = $_POST['passwd'];

header("Access-Control-Allow-Origin: *", true);
header("Access-Control-Allow-Headers: Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: GET, PUT, POST");

if (empty($uname) && empty($passwd)) {
    echo "The username and password are required!";
} else if (empty($uname)) {
    echo "The username is required!";
} else if (empty($passwd)) {
    echo "The password is required!";
} else {
    echo "It works!";
} ?>