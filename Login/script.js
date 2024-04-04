function validate() {
  let firstname = document.forms["regForm"]["firstName"];
  let lastname = document.forms["regForm"]["lastName"];
  let email = document.forms["regForm"]["email"];
  let password = document.forms["regForm"]["password"];
  let cpassword = document.forms["regForm"]["cPassword"];

  console.log(firstname, lastname, email, password, cpassword);

  if (firstname.value == "") {
    alert("Please enter your first name");
    firstname.focus();
    return false;
  }
  if (lastname.value == "") {
    alert("Please enter your last name");
    lastname.focus();
    return false;
  }
  if (email.value == "") {
    alert("Please enter your email");
    email.focus();
    return false;
  }
  if (password.value == "") {
    alert("Please enter your password");
    password.focus();
    return false;
  }
  if (password.value !== cpassword.value) {
    alert("Password does not match");
    cpassword.focus();
    return false;
  }

  if (
    registerLocalStorage(
      firstname.value,
      lastname.value,
      email.value,
      password.value,
      cpassword.value
    )
  ) {
    alert("User Registered successfully");
    return true;
  } else {
    return false;
  }
}

const registerLocalStorage = (fName, lName, gmail, pass, cPass) => {
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  console.log(user);

  let verify = user.some((person) => {
    return person.gmail === gmail;
  });

  console.log(verify);

  if (verify) {
    alert("User already exists");
    return false;
  } else {
    let obj = {
      fName: fName,
      lName: lName,
      gmail: gmail,
      pass: pass,
      cPass: cPass,
    };

    user.push(obj);
    localStorage.setItem("user", JSON.stringify(user));

    return true;
  }
};
