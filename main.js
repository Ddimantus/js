let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
    email = id("email"),
    password = id("password"),
    confirmPassword = id("confirm-password"),
    form = id("form"),
    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon"),
    matchText = id("match-text"),
    sendMailBtn = id("send-mail-btn"); // Добавлена кнопка отправки почты

// Получаем элементы для проверки сложности пароля
let lowercase = id("lowercase"),
    uppercase = id("uppercase"),
    number = id("number"),
    length = id("length");

// Функция обновления иконок требований
function updateRequirementIcon(element, isValid) {
    let icon = element.querySelector("i");
    if (isValid) {
        icon.className = "fas fa-check";
        icon.style.color = "green";
        element.style.color = "green";
    } else {
        icon.className = "fas fa-times";
        icon.style.color = "red";
        element.style.color = "red";
    }
}

// Функция проверки сложности пароля
function checkPasswordStrength(passwordValue) {
    let hasLowercase = /[a-z]/.test(passwordValue);
    let hasUppercase = /[A-Z]/.test(passwordValue);
    let hasNumber = /\d/.test(passwordValue);
    let hasMinLength = passwordValue.length >= 8;
    
    // Обновляем иконки
    updateRequirementIcon(lowercase, hasLowercase);
    updateRequirementIcon(uppercase, hasUppercase);
    updateRequirementIcon(number, hasNumber);
    updateRequirementIcon(length, hasMinLength);
    
    return hasLowercase && hasUppercase && hasNumber && hasMinLength;
}

// Функция проверки совпадения паролей
function checkPasswordMatch() {
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;
    
    if (confirmPasswordValue === "") {
        matchText.innerHTML = '<i class="fas fa-times"></i> Please confirm your password';
        matchText.className = "not-matched";
        errorMsg[3].innerHTML = "Please confirm your password";
        confirmPassword.style.border = "2px solid #c4c4c4";
        failureIcon[3].style.opacity = "0";
        successIcon[3].style.opacity = "0";
        return false;
    } else if (passwordValue === confirmPasswordValue) {
        matchText.innerHTML = '<i class="fas fa-check"></i> Passwords match';
        matchText.className = "matched";
        errorMsg[3].innerHTML = "";
        confirmPassword.style.border = "2px solid green";
        failureIcon[3].style.opacity = "0";
        successIcon[3].style.opacity = "1";
        return true;
    } else {
        matchText.innerHTML = '<i class="fas fa-times"></i> Passwords do not match';
        matchText.className = "not-matched";
        errorMsg[3].innerHTML = "Passwords do not match";
        confirmPassword.style.border = "2px solid red";
        failureIcon[3].style.opacity = "1";
        successIcon[3].style.opacity = "0";
        return false;
    }
}

// Функция сохранения данных в localStorage
function saveFormData() {
    let formData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value, // Внимание: пароль в localStorage - небезопасно!
        timestamp: new Date().toISOString()
    };
    
    // Сохраняем данные в localStorage
    localStorage.setItem('registrationData', JSON.stringify(formData));
    
    // Сохраняем данные в sessionStorage
    //sessionStorage.setItem('registrationData', JSON.stringify(formData));
    
    console.log('Form data saved to localStorage and sessionStorage');
}

// Обработчик ввода пароля
password.addEventListener("input", (e) => {
    let passwordValue = e.target.value;
    checkPasswordStrength(passwordValue);
    
    checkPasswordMatch();
    
    if (passwordValue.trim() !== "") {
        let isValid = checkPasswordStrength(passwordValue);
        if (isValid) {
            errorMsg[2].innerHTML = "";
            password.style.border = "2px solid green";
            failureIcon[2].style.opacity = "0";
            successIcon[2].style.opacity = "1";
        } else {
            errorMsg[2].innerHTML = "Password does not meet all requirements";
            password.style.border = "2px solid red";
            failureIcon[2].style.opacity = "1";
            successIcon[2].style.opacity = "0";
        }
    } else {
        errorMsg[2].innerHTML = "";
        password.style.border = "2px solid #c4c4c4";
        failureIcon[2].style.opacity = "0";
        successIcon[2].style.opacity = "0";
    }
});

// Обработчик ввода подтверждения пароля
confirmPassword.addEventListener("input", () => {
    checkPasswordMatch();
});

// Инициализация иконок при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    updateRequirementIcon(lowercase, false);
    updateRequirementIcon(uppercase, false);
    updateRequirementIcon(number, false);
    updateRequirementIcon(length, false);
    
    checkPasswordMatch();
});

// Обработчик отправки формы
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Проверка имени пользователя
    let isUsernameValid = username.value.trim() !== "";
    if (!isUsernameValid) {
        errorMsg[0].innerHTML = "Username cannot be blank";
        username.style.border = "2px solid red";
        failureIcon[0].style.opacity = "1";
        successIcon[0].style.opacity = "0";
    } else {
        errorMsg[0].innerHTML = "";
        username.style.border = "2px solid green";
        failureIcon[0].style.opacity = "0";
        successIcon[0].style.opacity = "1";
    }
    
    // Проверка email
    let isEmailValid = email.value.trim() !== "";
    if (!isEmailValid) {
        errorMsg[1].innerHTML = "Email cannot be blank";
        email.style.border = "2px solid red";
        failureIcon[1].style.opacity = "1";
        successIcon[1].style.opacity = "0";
    } else {
        errorMsg[1].innerHTML = "";
        email.style.border = "2px solid green";
        failureIcon[1].style.opacity = "0";
        successIcon[1].style.opacity = "1";
    }
    
    // Проверка пароля
    let passwordValue = password.value.trim();
    let isPasswordValid = true;
    let passwordMessage = "";
    
    if (passwordValue === "") {
        isPasswordValid = false;
        passwordMessage = "Password cannot be blank";
    } else if (!checkPasswordStrength(passwordValue)) {
        isPasswordValid = false;
        passwordMessage = "Password does not meet all requirements";
    }
    
    if (!isPasswordValid) {
        errorMsg[2].innerHTML = passwordMessage;
        password.style.border = "2px solid red";
        failureIcon[2].style.opacity = "1";
        successIcon[2].style.opacity = "0";
    } else {
        errorMsg[2].innerHTML = "";
        password.style.border = "2px solid green";
        failureIcon[2].style.opacity = "0";
        successIcon[2].style.opacity = "1";
    }
    
    // Проверка подтверждения пароля
    let isConfirmPasswordValid = checkPasswordMatch();
    let confirmPasswordValue = confirmPassword.value.trim();
    
    if (confirmPasswordValue === "") {
        errorMsg[3].innerHTML = "Please confirm your password";
        confirmPassword.style.border = "2px solid red";
        failureIcon[3].style.opacity = "1";
        successIcon[3].style.opacity = "0";
        isConfirmPasswordValid = false;
    } else if (!isConfirmPasswordValid) {
        errorMsg[3].innerHTML = "Passwords do not match";
        confirmPassword.style.border = "2px solid red";
        failureIcon[3].style.opacity = "1";
        successIcon[3].style.opacity = "0";
    } else {
        errorMsg[3].innerHTML = "";
        confirmPassword.style.border = "2px solid green";
        failureIcon[3].style.opacity = "0";
        successIcon[3].style.opacity = "1";
    }
    
    // Если все поля валидны
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Сначала сохраняем данные в localStorage
        saveFormData();
        
        // Показываем сообщение
        alert("Registration successful! Opening confirmation page...");
        
        // Ждём немного, чтобы alert успел показаться, потом открываем страницу
        setTimeout(() => {
            // Открываем confirmation.html в новой вкладке
            window.location.href = 'confirmation.html';
            
            // Очищаем форму
            form.reset();
            
            // Сбрасываем иконки требований пароля
            updateRequirementIcon(lowercase, false);
            updateRequirementIcon(uppercase, false);
            updateRequirementIcon(number, false);
            updateRequirementIcon(length, false);
            
            // Сбрасываем стили полей
            username.style.border = "2px solid #c4c4c4";
            email.style.border = "2px solid #c4c4c4";
            password.style.border = "2px solid #c4c4c4";
            confirmPassword.style.border = "2px solid #c4c4c4";
            
            // Скрываем иконки
            for (let i = 0; i < 4; i++) {
                if (failureIcon[i]) failureIcon[i].style.opacity = "0";
                if (successIcon[i]) successIcon[i].style.opacity = "0";
            }
            
            // Очищаем сообщения об ошибках
            for (let i = 0; i < errorMsg.length; i++) {
                errorMsg[i].innerHTML = "";
            }
        }, 100);
    }
});