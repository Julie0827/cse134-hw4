document.addEventListener("DOMContentLoaded", function () {
    const dropdownNavBtn = document.querySelector(".dropdown-nav-btn");
    const dropdownNav = document.querySelector(".dropdown-nav");

    dropdownNavBtn.addEventListener("click", function() {
        if (dropdownNav.classList.contains("hide")) {
            dropdownNavBtn.src = "assets/images/x.svg";
            dropdownNavBtn.alt = "Close navigation menu";
            dropdownNav.classList.remove("hide");

        } else {
            dropdownNavBtn.src = "assets/images/hamburger.svg";
            dropdownNavBtn.alt = "Open navigation menu";
            dropdownNav.classList.add("hide");
        }
    });
});
