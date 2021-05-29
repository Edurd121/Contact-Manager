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
else{

     #Variables with Data
     $firstName = ""
     $lastName = ""
     $login = ""
     $Password = "" 

    $sql = "SELECT login FROM Users where login = '" . $inData["login"] . "'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
        returnWithError( "Username taken" );
    }
    else{

    #Variables with Data 
    #in data gets the id from the html
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $Password = $inData["Password"];
    
    $sql = "INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["login"] . "','" . $inData["Password"] . "')";
    $result = $conn->query($sql);
    if ($result == TRUE)
    {
        returnWithInfo($firstName, $lastName, $login);
    }
    else
    {
        returnWithError( "Insert failed" );
    }
}
}
$conn->close();
}


function getRequestInfo()
{
return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
header('Content-type: application/json');
echo $obj;
}

function returnWithError( $err )
{
$retValue = '{"firstName":"","lastName":"","error":"' . $err . '"}';
sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $login )
{
$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","userName":"' . $login . '","error":""}';
sendResultInfoAsJson( $retValue );
}
?>
