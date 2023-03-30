const listBoxIntensityPassword = document.querySelectorAll('.form-password_intensity-box');
const inputPassword = document.querySelector('.form-password_input input');

inputPassword.addEventListener("keyup", function () {
    checkpassword(this.value);
});

function checkpassword(password) {
    let strength = 0;
    let isLengthEnough = false;
    if (password.length >= 8) {
        isLengthEnough = true;
    }
    if (isLengthEnough && password.match(/[A-Z]+/)) {
        strength += 1;
    }
    if (isLengthEnough && password.match(/[a-z]+/)) {
        strength += 1;
    }
    if (isLengthEnough && password.match(/[0-9]+/)) {
        strength += 1;
    }
    if (isLengthEnough && password.match(/[$@#&!]+/)) {
        strength += 1;
    }

    listBoxIntensityPassword.forEach(item => {
        item.classList.remove('active');
    })

    if (strength > 0) {
        for (let i = 0; i < strength; i++) {
            if (isLengthEnough) {
                console.log(789)
                listBoxIntensityPassword[i].classList.add('active');
            };
        }
    }
}