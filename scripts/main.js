document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const botField = document.getElementById("bot-field");

    contactForm.addEventListener("click", function () {
        botField.value = "false";
    });

    contactForm.addEventListener("input", function () {
        botField.value = "false";
    });
});