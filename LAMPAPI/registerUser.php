<?php

#Variables
$inData = getRequestInfo();

$serverName = "localhost";
$connUser = "admin";
$connPass = "password";
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
    $login = $inData["login"];
    $password = $inData["password"];


    $stmt = $conn->prepare("INSERT INTO Users (FirstName,LastName,Login, Password) VALUES (?,?,?,?)");
    $stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
    $stmt->execute();

    $stmt->close();
    $conn->close();
	
    returnWithInfo($firstName, $lastName, $login );

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

function returnWithInfo( $firstName, $lastName , $login)
{
  $retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","User":"' . $login . '","error":""}';
  sendResultInfoAsJson( $retValue );
}


?>
