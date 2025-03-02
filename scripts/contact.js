document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const commentsField = document.getElementById("comments");
    const botField = document.getElementById("bot-field");
    const formErrorsField = document.getElementById("form-errors");

    let form_errors = [];

    contactForm.addEventListener("click", function () {
        botField.value = "false";
    });

    contactForm.addEventListener("input", function () {
        botField.value = "false";
    });

    const regexAllowed = {
        name: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]+$/,
        comments: /^[\w\sÀ-ÖØ-öø-ÿ.,!?'"^*+/=(){|}\[\]\\<>:;~&@#%\$-]+$/
    }

    let flashTimeouts = {};

    function handleInvalidChar(e) {
        const input = e.target;
        const fieldName = input.name.charAt(0).toUpperCase() + input.name.slice(1);
        const rx = regexAllowed[input.id];
        const errorOutput = document.getElementById(`${input.id}-error`);

        if (input.value && !rx.test(input.value)) {
            const invalidChar = [...input.value].find(char => !new RegExp(rx).test(char));
            form_errors.push({ field: input.name, errorType: "invalidCharacter", errorDescription: `User typed invalid character '${invalidChar}' in the ${input.name} field.` });
            
            errorOutput.textContent = `Invalid character "${invalidChar}" detected in ${fieldName} field.`;
            errorOutput.classList.remove("hidden");

            input.classList.remove("flash");
            void input.offsetWidth;

            input.classList.add("flash");

            input.value = input.value.replace(invalidChar, "");

            clearTimeout(flashTimeouts[input.id]);

            flashTimeouts[input.id] = setTimeout(() => {
                errorOutput.classList.add("hidden");
                input.classList.remove("flash");
            }, 1500);
        }
    }

    document.getElementById("name").addEventListener("input", handleInvalidChar);
    document.getElementById("email").addEventListener("input", handleInvalidChar);
    document.getElementById("comments").addEventListener("input", handleInvalidChar);

    const charCounter = document.getElementById("char-counter");
    const maxChars = 300;

    charCounter.textContent = `${maxChars} characters`;

    commentsField.addEventListener("input", function () {
        const currLength = commentsField.value.length;
        const remaining = maxChars - currLength;

        charCounter.textContent = `${remaining} characters`;

        if (remaining <= 30) {
            charCounter.style.color = "#fc1225";
        } else {
            charCounter.style.color = "#f09da8";
        }
    });

    nameField.addEventListener("input", () => nameField.setCustomValidity(""));
    emailField.addEventListener("input", () => emailField.setCustomValidity(""));
    commentsField.addEventListener("input", () => commentsField.setCustomValidity(""));

    contactForm.addEventListener("submit", function (e) {
        let isValid = true;
        
        if (botField.value === "true") {
            isValid = false;
        }

        if (nameField.validity.valueMissing) {
            nameField.setCustomValidity("Oops! The name field cannot be empty. 😧");
            form_errors.push({ field: "name", errorType: "valueMissing", errorDescription: "User tried to submit with an empty name field." })
            isValid = false;
        } else if (nameField.validity.tooShort) {
            nameField.setCustomValidity("Too short! 🌟 Your name needs at least 2 characters.");
            form_errors.push({ field: "name", errorType: "tooShort", errorDescription: `User tried to submit a too short name (length: ${nameField.value.length}). Minimum 2 characters required.` })
            isValid = false;
        } else {
            nameField.setCustomValidity("");
        }

        if (emailField.validity.valueMissing) {
            emailField.setCustomValidity("Looks like you forgot to add your email. 💌");
            form_errors.push({ field: "email", errorType: "valueMissing", errorDescription: "User tried to submit with an empty email field." })
            isValid = false;
        } else if (emailField.validity.typeMismatch) {
            emailField.setCustomValidity("Hmm..🤔 Please enter a valid email address. (e.g., name@example.com)");
            form_errors.push({ field: "email", errorType: "invalidFormat", errorDescription: `User tried to submit an invalid email format: ${emailField.value}` })
            isValid = false;
        } else {
            emailField.setCustomValidity("");
        }

        if (commentsField.validity.valueMissing) {
            commentsField.setCustomValidity("Don't forget to leave a comment! 💭");
            form_errors.push({ field: "comments", errorType: "valueMissing", errorDescription: "User tried to submit with an empty comments field." })
            isValid = false;
        } else if (commentsField.validity.tooShort) {
            commentsField.setCustomValidity("Too short! ✏️ Your comment needs at least 10 characters.")
            form_errors.push({ field: "comments", errorType: "tooShort", errorDescription: `User tried to submit a too short comment (length: ${commentsField.value.length}). Minimum 10 characters required.` })
            isValid = false;
        } else {
            commentsField.setCustomValidity("")
        }

        if (!isValid) {
            e.preventDefault();
            contactForm.reportValidity();
        } else {
            formErrorsField.value = JSON.stringify(form_errors);
            form_errors = [];
        }
    });
});
