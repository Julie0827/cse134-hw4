document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const botField = document.getElementById("bot-field");

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

    let flashTimeout;

    function handleIllegalChar(e) {
        const input = e.target;
        const fieldName = input.name.charAt(0).toUpperCase() + input.name.slice(1);
        const rx = regexAllowed[input.id];
        const errorOutput = document.getElementById(`${input.id}-char-error`);

        if (input.value && !rx.test(input.value)) {
            console.log("invalid");
            const illegalChar = [...input.value].find(char => !new RegExp(rx).test(char));
            
            errorOutput.textContent = `Illegal character "${illegalChar}" detected in ${fieldName} field.`;
            errorOutput.classList.remove("hidden");

            input.classList.remove("flash");
            void input.offsetWidth;

            input.classList.add("flash");

            input.value = input.value.replace(illegalChar, "");

            clearTimeout(flashTimeout);

            flashTimeout = setTimeout(() => {
                errorOutput.classList.add("hidden");
                input.classList.remove("flash");
            }, 2000);
        }
    }

    document.getElementById("name").addEventListener("input", handleIllegalChar);
    document.getElementById("email").addEventListener("input", handleIllegalChar);
    document.getElementById("comments").addEventListener("input", handleIllegalChar);
});
