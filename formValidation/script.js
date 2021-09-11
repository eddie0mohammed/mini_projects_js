
const form = document.getElementById('form');
const pass1 = document.getElementById('password1');
const pass2 = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function validateForm(){

    isValid = form.checkValidity();

    if (!isValid){
        message.textContent = 'Please fill out all fields...';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return ;
    }


    if (pass1.value === pass2.value){
        passwordsMatch = true;
        pass1.style.borderColor = 'green';
        pass2.style.borderColor = 'green';
    } else {
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match...';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        pass1.style.borderColor = 'red';
        pass2.style.borderColor = 'red';
        return ;
    }

    if (isValid && passwordsMatch){
        message.textContent = 'Successfully registered';
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';


        storeFormData();
    }

}


function storeFormData(){
    const userData = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value,
    }

    // make request to store data
    console.log(userData);
}

const processFormData = (e) => {
    e.preventDefault();

    validateForm();
}


// event listener 
form.addEventListener('submit', processFormData);