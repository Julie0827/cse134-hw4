document.addEventListener("DOMContentLoaded", function () {
    const dropdownNavBtn = document.querySelector(".dropdown-nav-btn");
    const dropdownNav = document.querySelector(".dropdown-nav");

    dropdownNavBtn.addEventListener("click", function() {
        if (dropdownNav.classList.contains("hide")) {
            dropdownNav.classList.remove("hide");
            dropdownNavBtn.src = "assets/images/x.svg";
            dropdownNavBtn.alt = "Close navigation menu";

        } else {
            dropdownNav.classList.add("hide");
            dropdownNavBtn.src = "assets/images/hamburger.svg";
            dropdownNavBtn.alt = "Open navigation menu";
        }
    });
});
