<?php 
session_start();

//variables 
$firstName = "";
$lastName = "";
#$Phone = "";
#$Email = "";
$username = "";
$errors = array();

//connect to database
$conn = new mysqli("localhost", "admin", "password", "COP4331");

//To register the user 
//reg_user  == user on the button
if(isset($_POST['sign_user'])) {

    //Below recieves the input from the user

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
    $lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
    $Password = mysqli_real_escape_string($conn, $_POST['Password']);
  

    #Validation to ensure that the form is completed
    if(empty($username)) { array_push($errors, "Username required")};
    if(empty($firstName)) { array_push($errors, "First name required")}
    if(empty($lastName)) { array_push($errors, "Last name required")}
    if(empty($Password)) { array_push($errors, "First name required")}



//check if used

$contacts_check = "SELECT * FROM Users WHERE Login = '$username' LIMIT 1" ;

$result = mysqli_query($conn, $contacts_check);
$user = mysqli_fetch_assoc($result);

//if the user exists 
if($user) {

    if($user['Login'] === $username){ array_push($errors, "Username already exists"); }

}

//register the user if there are no errors 
if(count($errors) == 0 ){
    
    //password encrypt
    $Password = md5($Password);

    $query = "INSERT TO Users (FirstName, LastName, Login, Password) VALUES ('$firstName','$lastName', '$username', '$Password')";

    mysqli_query($conn, $query);

    $_SESSION['username'] = $username;
    $_SESSION['success'] = "you are now logged in";
    
    #when finished looks for the next page to go
    header('location: login.html');

    }

}
