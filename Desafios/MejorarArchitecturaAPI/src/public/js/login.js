//Js Code for login page

// Take fields and make them variables

let fieldUsername = document.getElementById("email");
let fieldPassword = document.getElementById("password");



//EVENTO SUBMIT
let form = document.getElementById("loginForm");
form.addEventListener("submit", validateForm);

let divUsername = document.createElement('div');
let divPassword = document.createElement('div');

let div = document.createElement('div');
div.id = 'content';

function validateForm(ev) {

    // Name field validation

    let divFieldUsername = document.getElementById("usernameLoginDiv");
    let divFieldPassword = document.getElementById("passwordLoginDiv");


    div.innerHTML = "";

    divUsername.innerHTML = "";
    divPassword.innerHTML = "";

    checkUsernameField();
    checkPasswordField();



    if ((checkUsernameField == true) && (checkPasswordField == true)) {

    }

    function checkUsernameField() {
        if (fieldUsername.value !== "") {
            let filterMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filterMail.test(fieldUsername.value)) {
                divUsername.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;text-shadow:2px 2px 4px black;font-size:15px;
                    ">* The Email field is not valid </h2>`;
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


    function checkPasswordField() {
        if (fieldPassword.value == "") {
            divPassword.innerHTML = `<h2 style="text-align: center;font-family: Roboto;color: white;font-size:15px;text-shadow:2px 2px 4px black;
            ">* Password field can't be empty </h2>`;
            divFieldPassword.appendChild(divPassword);
            ev.preventDefault();
            return false;

        }

        return true;
    }


}