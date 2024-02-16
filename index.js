function loginvalidate() {
  event.preventDefault();
  var email = document.forms.LoginForm.email.value;

  var password = document.forms.LoginForm.Password.value;

  var emailError = document.getElementsByClassName("emailError");
  var passwordError = document.getElementsByClassName("passwordError");

  // Reset errors
  emailError[0].innerHTML = "";
  passwordError[0].innerHTML = "";

  //Javascript reGex for Email Validation.
  var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email == "" || !regEmail.test(email)) {
    emailError.innerHTML = "Invalid email address";
    console.log("emailError.innerHTML");
    // window.alert("Please enter a valid e-mail address.");
  }

  if (password.length < 5) {
    console.log("passw.innerHTML");

    passwordError.innerHTML = "Password must be at least 5 characters";
  }
  if (!regEmail.test(email) || password.length < 5) {
    if (email == "" || !regEmail.test(email)) {
      emailError[0].innerHTML = "Invalid email address";
      console.log("emailError");
      // window.alert("Please enter a valid e-mail address.");
    }

    if (password.length < 5) {
      console.log("pwdError");
      passwordError[0].innerHTML = "Password must be at least 5 characters";
    }

    console.log(passwordError.innerHTML);
    console.log(!regEmail.test(email));
    console.log(password.length < 5);
    console.log("invalid password or email" + email + password);
    console.log("invalid password or email");
    return false;
  } else {
    console.log("valid login");
    window.location.href = "http://127.0.0.1:5500";
  }
  return true;
}
function signupvalidate(event) {
  event.preventDefault();
  var name = document.forms.SignUpForm.username.value;

  var email = document.forms.SignUpForm.email.value;

  var password = document.forms.SignUpForm.Password.value;

  var ConfirmPassword = document.forms.SignUpForm.ConfirmPassword.value;

  var usernameError = document.getElementById("usernameError");
  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");
  var confirmPasswordError = document.getElementById("confirmPasswordError");

  // Reset errors
  usernameError.innerHTML = "";
  passwordError.innerHTML = "";
  confirmPasswordError.innerHTML = "";
  emailError.innerHTML = "";
  // Javascript reGex for Name validation
  var regName = /\d+$/g;
  //Javascript reGex for Email Validation.
  var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    name == "" ||
    regName.test(name) ||
    email == "" ||
    !regEmail.test(email) ||
    password == "" ||
    password.length < 5 ||
    !(password === ConfirmPassword)
  ) {
    if (name == "" || regName.test(name)) {
      usernameError.innerHTML = "Username is required";
    }
    if (email == "" || !regEmail.test(email)) {
      emailError.innerHTML = "Invalid email address";
    }

    if (password == "") {
      passwordError.innerHTML = "Password must be at least 5 characters";
    }

    if (password.length < 5) {
      passwordError.innerHTML = "Password must be at least 5 characters";
    }

    if (!(password === ConfirmPassword)) {
      confirmPasswordError.innerHTML = "Password must be at least 5 characters";
    }
    console.log("invalid signup");

    return false;
  } else {
    console.log("valid signup");
    window.location.href = "http://127.0.0.1:5500/";
  }
  return true;
}
function forgetPwValidate() {
  event.preventDefault();
  var email = document.forms.ForgetPwForm.email.value;


  var emailError = document.getElementsByClassName("emailError");

  // Reset errors
  emailError.innerHTML = "";

  //Javascript reGex for Email Validation.
  var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
 
  if (!regEmail.test(email) ) {
    if (email == "" || !regEmail.test(email)) {
      emailError[0].innerHTML = "Invalid email address";
      console.log("emailError");
      // window.alert("Please enter a valid e-mail address.");
    }
    
    return false;
  } else {
    console.log("valid login");
    window.location.href = "http://127.0.0.1:5500/resetpw.html";
  }
  return true;
}

function resetPwValidate() {
  event.preventDefault();
  var code = document.forms.resetPwForm.verificationCode.value;

  var password = document.forms.resetPwForm.Password.value;

  var ConfirmPassword = document.forms.resetPwForm.ConfirmPassword.value;

  var codeError = document.getElementById("codeError");
  var passwordError = document.getElementById("passwordError");
  var confirmPasswordError = document.getElementById("confirmPasswordError");

  // Reset errors
  codeError.innerHTML = "";
  passwordError.innerHTML = "";
  confirmPasswordError.innerHTML = "";


  if (
    (code == "") ||
    (code.length !== 4) ||
    (password == "") ||
    (password.length < 5 )||
    !(password === ConfirmPassword)
  ) {
    if (code == "" ) {
      codeError.innerHTML = "Verification Code is required";
    }
    if (code.length !== 4) {
      codeError.innerHTML = "Verification Code must be of 4 digits";
    }

    if (password == "") {
      passwordError.innerHTML = "Password must be at least 5 characters";
    }

    if (password.length < 5) {
      passwordError.innerHTML = "Password must be at least 5 characters";
    }

    if (!(password === ConfirmPassword)) {
      confirmPasswordError.innerHTML = "Password must be at least 5 characters";
    }
    console.log("invalid signup");

    return false;
  } else {
    console.log("valid signup");
    window.location.href = "http://127.0.0.1:5500/resetpwdone.html";
  }
  return true;
}