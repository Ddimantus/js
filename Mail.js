// mail.js

// Функция для отправки подтверждения на почту
function sendMail() {
    // Получаем данные из localStorage
    let registrationData = localStorage.getItem('registrationData');
    
    if (!registrationData) {
        alert("No registration data found. Please fill out the form first.");
        return;
    }
    
    let data = JSON.parse(registrationData);
    
    // Формируем тело письма
    let subject = "Registration Confirmation";
    let body = `
Hello ${data.username}!

Thank you for registering with us.

Your registration details:
- Username: ${data.username}
- Email: ${data.email}
- Registration Date: ${new Date(data.timestamp).toLocaleString()}

Please keep this information secure.

Best regards,
Registration Team
    `;
    
    // Кодируем тему и тело письма для URL
    let encodedSubject = encodeURIComponent(subject);
    let encodedBody = encodeURIComponent(body);
    
    // Формируем mailto ссылку
    let mailtoLink = `mailto:Ddimantus@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Открываем почтовый клиент
    window.location.href = mailtoLink;
}

// Сделаем функцию глобально доступной
window.sendMail = sendMail;