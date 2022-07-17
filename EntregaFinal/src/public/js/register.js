//Js Code for register page

// Take fields and make them variables

let fieldName = document.getElementById("name");
let fieldUsername = document.getElementById("username");
let fieldEmail = document.getElementById("email");
let fieldPassword = document.getElementById("password");
let fieldConfirmPassword = document.getElementById("repassword");
let fieldPhone = document.getElementById("phone");
let fieldAddress = document.getElementById("address");
let fieldAge = document.getElementById("age");


//EVENTO SUBMIT
let form = document.getElementById("registerForm");
form.addEventListener("submit", validateForm);
let divName = document.createElement('div');
let divUsername = document.createElement('div');
let divEmail = document.createElement('div');
let divPassword = document.createElement('div');
let divConfirmPassword = document.createElement('div');
let divPhone = document.createElement('div');
let divAddress = document.createElement('div');
let divAge = document.createElement('div');


let div = document.createElement('div');
div.id = 'content';

function validateForm(ev) {

    // Name field validation
    var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let divFieldName = document.getElementById("divFieldName");
    let divFieldUsername = document.getElementById("divFieldUsername");
    let divFieldEmail = document.getElementById("divFieldEmail");
    let divFieldPassword = document.getElementById("divFieldPassword");
    let divFieldConfirmPassword = document.getElementById("divFieldConfirmPassword");
    let divFieldPhone = document.getElementById("divFieldPhone");
    let divFieldAddress = document.getElementById("divFieldAddress");
    let divFieldAge = document.getElementById("divFieldAge");

    div.innerHTML = "";
    divName.innerHTML = "";
    divUsername.innerHTML = "";
    divEmail.innerHTML = "";
    divPassword.innerHTML = "";
    divConfirmPassword.innerHTML = "";
    divPhone.innerHTML = "";
    divAddress.innerHTML = "";
    divAge.innerHTML = "";

    checkNameField();
    checkEmailField();
    checkUsernameField();
    checkPasswordField();
    checkConfirmPasswordField();
    checkPhoneField();
    checkAddressField();
    checkAgeField();


    if ((checkNameField() == true) && (checkEmailField() == true) && (checkUsernameField == true) && (checkPasswordField == true) && (checkConfirmPasswordField == true) && (checkPhoneField == true) && (checkAddressField == true) && (checkAgeField == true)) {

    }

    function checkNameField() {
        if (fieldName.value != "") {
            if (isNaN(fieldName.value)) {
                if (fieldName.value.match(specialChars)) {
                    divNombre.innerHTML = `<h2 style="text-align: center;text-shadow:2px 2px 4px black;font-family: Roboto;color: white;font-size:15px;"
            >* Field Name can't have special characters </h2>`;
                    divFieldName.appendChild(divName);
                    ev.preventDefault();
                    return false;
                }
            } else {
                divName.innerHTML = `<h2 style="text-align: center;font-family: Roboto;text-shadow:2px 2px 4px black;color: white;font-size:15px;">* Field Name can't have numbers</h2>`;
                divFieldName.appendChild(divName);
                ev.preventDefault();
                return false;
            }
        } else {
            divName.innerHTML = `<h2 style="text-align: center;text-shadow:2px 2px 4px black;font-family: Roboto;color: white;font-size:15px;">* Field Name shouldn't be empty </h2>`;
            divFieldName.appendChild(divName);
            ev.preventDefault();
            return false;
        }
        return true;

    }

    function checkUsernameField() {
        if (fieldUsername.value != "") {
            if (isNaN(fieldUsername.value)) {
                if (fieldUsername.value.match(specialChars)) {
                    divFieldUsername.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;text-shadow:2px 2px 4px black;font-size:25px;
            ">* Field Username can't have special characters </h2>`;
                    divFieldUsername.appendChild(divUsername);
                    ev.preventDefault();
                    return false;
                }
            } else {
                divUsername.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;text-shadow:2px 2px 4px black;font-size:15px;
                ">* Field Username can't have numbers</h2>`;
                divFieldUsername.appendChild(divUsername);
                ev.preventDefault();
                return false;
            }
        } else {
            divUsername.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;text-shadow:2px 2px 4px black;font-size:15px;
            ">* Field Username shouldn't be empty </h2>`;
            divFieldUsername.appendChild(divUsername);
            ev.preventDefault();
            return false;
        }
        return true;

    }

    function checkEmailField() {
        if (fieldEmail.value != "") {
            var filterMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filterMail.test(fieldEmail.value)) {
                divEmail.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;text-shadow:2px 2px 4px black;font-size:15px;
                    ">* The Email field is not valid </h2>`;
                divFieldEmail.appendChild(divEmail);
                ev.preventDefault();
                return false;

            }

        } else {
            divEmail.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* The Email field can't be empty </h2>`;
            divFieldEmail.appendChild(divEmail);
            ev.preventDefault();
            return false;
        }
        return true;
    }

    function checkPasswordField() {
        if (fieldPassword.value != "") {
            if (fieldPassword.value.length < 6) {
                divPassword.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Password must be at least 6 characters </h2>`;
                divFieldPassword.appendChild(divPassword);
                ev.preventDefault();
                return false;
            }
            if (Nan(fieldPassword.value)) {
                divPassword.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
                ">* Password can't have only numbers </h2>`;
                divFieldPassword.appendChild(divPassword);
                ev.preventDefault();
                return false;
            }

        } else {
            divPassword.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Password field can't be empty </h2>`;
            divFieldPassword.appendChild(divPassword);
            ev.preventDefault();
            return false;
        }

        return true;
    }

    function checkConfirmPasswordField() {
        if (fieldConfirmPassword.value != "") {
            if (fieldConfirmPassword.value != fieldPassword.value) {
                divConfirmPassword.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Password doesn't match </h2>`;
                divFieldConfirmPassword.appendChild(divConfirmPassword);
                ev.preventDefault();
                return false;
            }

        } else {
            divConfirmPassword.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Confirm Password field can't be empty </h2>`;
            divFieldConfirmPassword.appendChild(divConfirmPassword);
            ev.preventDefault();
            return false;
        }
        return true;

    }

    function checkPhoneField() {
        if (fieldPhone.value != "") {
            if (isNaN(fieldPhone.value)) {
                divPhone.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Phone field can't have letters </h2>`;
                divFieldPhone.appendChild(divPhone);
                ev.preventDefault();
                return false;
            }

        } else {
            divPhone.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Phone field can't be empty </h2>`;
            divFieldPhone.appendChild(divPhone);
            ev.preventDefault();
            return false;
        }

        return true;

    }

    function checkAddressField() {
        if (fieldAddress.value != "") {
            if (fieldAddress.value.length < 6) {
                divAddress.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Address must be at least 6 characters </h2>`;
                divFieldAddress.appendChild(divAddress);
                ev.preventDefault();
                return false;
            }

        } else {
            divAddress.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Address field can't be empty </h2>`;
            divFieldAddress.appendChild(divAddress);
            ev.preventDefault();
            return false;
        }
        return true;

    }

    function checkAgeField() {
        if (fieldAge.value != "") {
            if (isNaN(fieldAge.value)) {
                divAge.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Age field can't have letters </h2>`;
                divFieldAge.appendChild(divAge);
                ev.preventDefault();
                return false;
            }
            if (fieldAge.value < 18 || fieldAge.value > 100) {
                divAge.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Age must be between 18 and 100 </h2>`;
                divFieldAge.appendChild(divAge);
                ev.preventDefault();
                return false;

            }



        } else {
            divAge.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
       ">* Age field can't be empty </h2>`;
            divFieldAge.appendChild(divAge);
            ev.preventDefault();
            return false;
        }
        return true;

    }
}