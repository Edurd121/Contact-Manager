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
     $Login = ""
     $Password = "" 

    $sql = "SELECT Login FROM Users where Login = '" . $inData["userName"] . "'";
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
    $Login = $inData["Login"];
    $Password = $inData["Password"];
    
    $sql = "INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["userName"] . "','" . $inData["password"] . "')";
    $result = $conn->query($sql);
    if ($result == TRUE)
    {
        returnWithInfo($firstName, $lastName, $Login );
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

function returnWithInfo( $firstName, $lastName, $Login )
{
$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","userName":"' . $Login . '","error":""}';
sendResultInfoAsJson( $retValue );
}
?>
