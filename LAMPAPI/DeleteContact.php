
<?php

	$inData = getRequestInfo();

	$id = $inData["id"];

	$conn = new mysqli("localhost", "admin", "password", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE ID=?");
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$result = $stmt->get_result();


		if( $row = $result->fetch_assoc()  )
		{
      $curID = $row['ID'];
      $delete = "DELETE FROM Contacts WHERE ID = '$curID'";
      mysqli_query($conn, $delete);
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


?>
