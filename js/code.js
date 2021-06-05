var userId = 0;
var firstName = "";
var lastName = "";

var urlBase = 'http://cop4331-29.xyz/Contact-Manager';
var extension = 'php';

function doLogin() {

	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/LAMPAPI/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;

				if (userId < 1) {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contacts.html";

			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie() {
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for (var i = 0; i < splits.length; i++) {
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}
		else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0) {
		window.location.href = "login.html";
	}
	else {
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function test() {
	console.log("We are in test!");
	var first = document.getElementById("inputFirst").value
	var last = document.getElementById("inputLast").value
	var username = document.getElementById("inputUser").value
	var password = document.getElementById("inputPassword").value
	// var creds = "uname="+username+"&passwd="+passwrd;
	// var creds = "firstName=" + first + "&lastName=" + last + "&Login="+username+"&Password="+passwrd;
	var creds = '{"firstName" : "' + first + '", "lastName" : "' + last + '", "Login" : "' + username + '", "Password" : "' + password + '"}';

	var ajx = new XMLHttpRequest();
	ajx.onreadystatechange = function () {
		if (ajx.readyState == 4 && ajx.status == 200) {
			alert(ajx.responseText);
		}
	};

	// ajx.open("POST", "./LAMPAPI/Signup.php", true);

	ajx.open("POST", "./LAMPAPI/registerUser.php", true);
	// ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajx.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	ajx.send(creds);
	console.log("We got through the function, without killing our website");
}

function addUser() {

	var first = document.getElementById("inputFirst").value
	var last = document.getElementById("inputLast").value
	var username = document.getElementById("inputUser").value
	var password = document.getElementById("inputPassword").value
	document.getElementById("userAddResult").innerHTML = "";

	var creds = '{"firstName" : "' + first + '", "lastName" : "' + last + '", "login" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/LAMPAPI/registerUser.' + extension;

	console.log(creds);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("userAddResult").innerHTML = "User has been added";
			}
		};
		xhr.send(creds);
	}
	catch (err) {
		document.getElementById("userAddResult").innerHTML = err.message;
	}

}

function test() {
	alert("working");
}