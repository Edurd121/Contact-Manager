
<?php

	$inData = getRequestInfo();

	$id = 0;
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
  $phone = $inData["phone"];
  $email = $inData["email"];
  $userId = $inData["userId"];


	$conn = new mysqli("localhost", "admin", "password", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE ID=?");
		$stmt->bind_param("s", $inData["id"]);
		$stmt->execute();
		$result = $stmt->get_result();


		if( $row = $result->fetch_assoc()  )
		{
      $curID = $row['ID'];
      $update = "UPDATE Contacts SET FirstName = '$firstName', LastName = '$lastName', Phone = '$phone', Email = '$email' WHERE ID = '$curID'";
      mysqli_query($conn, $update);
			returnWithInfo( $row['FirstName'], $row['LastName'], $row['Phone'], $row['Email'], $row['userID'] );
		}
		else
		{
			returnWithError("No Records Found");
		}


		$stmt->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $phone, $email, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","phone":"' . $phone . '","email":"' . $email .'","userID":"' .$userId .'","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
