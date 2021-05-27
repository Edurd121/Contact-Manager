<?php include ('registerUser.php') ?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
		crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
		crossorigin="anonymous"></script>
</head>

	<body>
		<div class="card border-dark mb-3" style="width: 50rem;">
			<img src="..." class="card-img-top" alt="placeholder for future images">
			<div class="card-body">
				<div class="card-header">
					<h5 class="card-title">Register</h5>
				</div>
				<form class="col g-3" method = "post">
					<div class="mb-3 row">
						<label for="inputFirstName" class="col-sm-2 col-form-label">First Name</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputUser" name = "FirstName" value="<?php echo $firstName; ?>">
						</div>


					</div>

					<div class="mb-3 row">
						<label for="inputLastName" class="col-sm-2 col-form-label">Last Name</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputUser"   name = "LastName" value="<?php echo $lastName; ?>">
						</div>
					</div>

					<div class="mb-3 row">
						<label for="inputUser" class="col-sm-2 col-form-label">User</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputUser"  name = "Login" value="<?php echo $username; ?>">
						</div>
					</div>
					
					<div class="mb-3 row">
						<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
						<div class="col-sm-4">
							<input type="password" class="form-control" id="inputPassword" name = "Password">
						</div>

						<div class="row-auto">
							<button type="submit" class="btn btn-primary mb-3" name = "sign_user" >Sign Up</button>
						</div>

						<p>Got an account? <a href="login.html">Log in here</a>
					</div>
				</form>
			</div>
		<div>

	</body>

</html>
