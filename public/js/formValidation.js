function validateForm() {
	var x = document.forms["signup"]["username"].value;
	var y = document.forms["signup"]["password"];
	var z = document.forms["signup"]["cpassword"];
	var u = document.forms["signup"]["name"].value;
	var i = document.forms["signup"]["surname"].value;
	if (x == "") {
		event.preventDefault();
		notification("Email field must be filled out");
		x.focus();
		returnToPreviousPage();
		return false;
	} else if (u == "") { 
		event.preventDefault();
		notification("First name field must be filled out");
		z.focus();
		returnToPreviousPage();
		return false; 
	} else if (i == "") {
		event.preventDefault();
		notification("Last name field must be filled out");
		z.focus();
		returnToPreviousPage();
		return false; 
	} else if (y.value != z.value) { 
		event.preventDefault();
		notification("Given password and confirmation password do not match.");
		z.focus();
		returnToPreviousPage();
		return false; 
	} else {
		return true;
	}
}