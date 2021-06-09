var userId = 0;
var firstName = "";
var lastName = "";

var urlBase = 'http://cop4331-29.xyz/Contact-Manager';
var extension = 'php';

function doLogin() {
	console.log("inside doLogin");
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
				console.log(firstName + lastName)

				window.location.href = "contacts.html";

			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		alert("error")
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie() {
	console.log("inside save cookie")
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	console.log("inside read cookie");
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
		document.getElementById("welcomeName").innerHTML = "Welcome to the Cornucopia, " + firstName + " " + lastName;
	}
}

function doLogout() {
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "login.html";
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
	console.log("In add user")
	var first = document.getElementById("inputFirst").value
	var last = document.getElementById("inputLast").value
	var username = document.getElementById("inputUser").value
	var password = document.getElementById("inputPassword").value
	document.getElementById("userAddResult").innerHTML = "";
	var hash = md5( password );
	
	var creds = '{"firstName" : "' + first + '", "lastName" : "' + last + '", "login" : "' + username + '", "password" : "' + hash + '"}';
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

function addContact() {
	var first = document.getElementById("contactFirst").value
	var last = document.getElementById("contactLast").value
	var phone = document.getElementById("contactPhone").value
	var email = document.getElementById("contactEmail").value
	document.getElementById("contactAddResult").innerHTML = "";

	var creds = '{"firstName" : "' + first + '", "lastName" : "' + last + '", "phone" : "' + phone + '", "email" : "' + email + '", "userId" : ' + userId + '}';
	var url = urlBase + '/LAMPAPI/AddContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				searchContact();
			}
		};
		xhr.send(creds);
	}
	catch (err) {
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

function searchContact() {
	console.log("Inside searchContact()")
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactsSearchResult").innerHTML = "";

	var contactList = "";

	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/LAMPAPI/SearchContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactsSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse(xhr.responseText);

				// Uncomment to see a print out of the parsed JSON object
				// for (var i = 0; i < jsonObject.results.length; i++) {
				// 	contactList += jsonObject.results[i];
				// 	if (i < jsonObject.results.length - 1) {
				// 		contactList += "<br />\r\n";
				// 	}
				// }
				// console.log(JSON.parse(jsonObject));
				console.log(jsonObject);
				// document.getElementsByTagName("p")[0].innerHTML = contactList;
				displayContacts(jsonObject)
				
			}
		};
		xhr.send(jsonPayload);

	}
	catch (err) {
		document.getElementById("contactsSearchResult").innerHTML = err.message;
	}

}

// Helper function for the search which renders each contact as a card
function displayContacts(contacts) {
	console.log("inside displayContacts")
	document.getElementById("contactsList").innerHTML =	contacts.results.map((contact) => {
		let temp = contact.split(", ");
		let id = temp[0].split(": ")[1];
		let name = temp[1].split(": ")[1];
		let phone = temp[2].split(": ")[1];
		let email = temp[3].split(": ")[1];

		console.log(temp)
		return(
		`<div class="card text-dark bg-light mb-6" style="max-width: 32rem;">
			<div class="card-header" id="${id}name">${name}</div>
				<div class="card-body">
					<p class="card-title" id="${id}phone">${phone}</p>
					<p class="card-text" id="${id}email">${email}</p>
					<button type="button" class="btn btn-danger" id="${id}" onclick="deleteContact(${id})">Delete</button>
					<button type="button" class="btn btn-warning" id="${id}Update" onclick="addUpdateToggle(${true}, ${id})">Update</button>
				</div>
			</div>
		</div>`)
	})
}

window.onload = () => {
	searchContact();
}

function deleteContact(id) {
	console.log("Inside deleteContact()")

	if (!confirm("Do you really want to delete this contact?"))
		return;

	console.log("Got through the confirm")
	// var srch = document.getElementById("searchText").value;
	// document.getElementById("contactsSearchResult").innerHTML = "";
	// document.getElementById(id)

	var jsonPayload = '{"id" : "' + id + '"}';
	var url = urlBase + '/LAMPAPI/DeleteContact.' + extension;
	console.log("PRINTING JSONPAYLOAD")
	console.log(jsonPayload)
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactsSearchResult").innerHTML = "Contact(s) has been deleted";
				// var jsonObject = JSON.parse(xhr.responseText);
				// console.log("PRINTING JSONOBJECT")
				// console.log(jsonObject);
				// var jsonObject = JSON.parse(xhr.responseText);
				
				searchContact();
			}
		};
		xhr.send(jsonPayload);

	}
	catch (err) {
		document.getElementById("contactsSearchResult").innerHTML = err.message;
	}
}

function updateContact(id) {
	console.log("Inside updateContact()")

	let first = document.getElementById("contactFirst").value
	let last = document.getElementById("contactLast").value
	let phone = document.getElementById("contactPhone").value
	let email = document.getElementById("contactEmail").value
	document.getElementById("contactAddResult").innerHTML = "";

	var jsonPayload = '{"id" : "' + id + '", "firstName" : "' + first + '", "lastName" : "' + last + '", "phone" : "' + phone + '", "email" : "' + email + '"}';
	var url = urlBase + '/LAMPAPI/UpdateContact.' + extension;

	// Switch the modal back to add mode
	addUpdateToggle(false)
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactAddResult").innerHTML = "Contact has been updated";
				searchContact();
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

function addUpdateToggle(mode, toEdit) {
	console.log(mode)
	console.log(toEdit)
	// If we want to update
	if (mode)
	{
		// Prepopulates the modal with the data we currently have
		let name = document.getElementById(toEdit+"name").innerHTML
		let first = ""
		let last = ""
		if (name.includes(" "))
		{
			let temp = name.split(" ");
			first = temp[0];
			last = temp[1];
		}
		else
		{
			first = name;
			last = "";
		}

		document.getElementById("contactFirst").innerHTML = first
		document.getElementById("contactLast").innerHTML = last
		document.getElementById("contactEmail").innerHTML = document.getElementById(toEdit + "phone").innerHTML;
		document.getElementById("contactPhone").innerHTML = document.getElementById(toEdit + "email").innerHTML;
		document.getElementById("modalButton").onclick = () => {updateContact(toEdit);}
	}
	// If we want to add
	else
	{
		// Prepopulates modal with empty data
		document.getElementById("contactFirst").innerHTML = ""
		document.getElementById("contactLast").innerHTML = ""
		document.getElementById("contactEmail").innerHTML = ""
		document.getElementById("contactPhone").innerHTML = ""
		document.getElementById("modalButton").onclick = addContact;
	}
}



