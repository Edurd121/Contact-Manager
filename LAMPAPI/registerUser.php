<?php

#Variables
$inData = getRequestInfo();

$serverName = "localhost";
$connUser = "root";
$connPass = "74d40daad74e0908bb448dae28536cfa732ac308b2a28a36";
$connDataName = "COP4331";


#Create and Check Connection
$conn = new mysqli($serverName, $connUser, $connPass, $connDataName);

if($conn -> connect_error){
    returnWithError( $conn->connect_error);
}
#if passed no error has occured
else{

    #Variables with Data
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $Login = $inData["Login"];
    $Password = $inData["Password"];


    $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?,?,?,?)");
    $stmt->bind_param("ssss", $firstName, $lastName, $Login, $Password);
    $stmt->execute();

    $stmt->close();
    $conn->close();

    returnWithError("Error");
}

#Returns the an Error
function returnWithError($err){

    $retValue =  '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue);
}

function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

#Requests Info
function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function returnWithInfo( $firstName, $lastName)
{
  $retValue = '{"first_name":"' . $first_name . '","last_name":"' . $last_name . '","error":""}';
  sendResultInfoAsJson( $retValue );
}


?>
