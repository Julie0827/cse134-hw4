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

    const audio = document.querySelector("audio");
    const playPauseBtn = document.querySelector(".play-pause-btn");
    const icon = document.querySelector(".play-pause-icon");

    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            icon.src = "assets/images/pause.svg";
            icon.alt = "Pause Icon";
            playPauseBtn.classList.add("playing");
            playPauseBtn.title = "Pause Music";
        } else {
            audio.pause();
            icon.src = "assets/images/play.svg";
            icon.alt = "Play Icon";
            playPauseBtn.classList.remove("playing");
            playPauseBtn.title = "Play Music";
        }
    });

    const toggle = document.querySelector(".toggle-container");
    const inner = document.querySelector(".inner-container");
    const circles = document.querySelectorAll(".circle");
    const sunMoon = document.querySelector(".sun-moon");

    function enableDarkMode() {
        toggle.classList.add("dark-mode");
        toggle.title = "Switch to Light Mode";
        inner.classList.add("dark-mode");
        circles.forEach(circle => {
            circle.classList.add("dark-mode");
        });

        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        toggle.classList.remove("dark-mode");
        toggle.title = "Switch to Dark Mode";
        inner.classList.remove("dark-mode");
        circles.forEach(circle => {
            circle.classList.remove("dark-mode");
        });

        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }

    if (localStorage.getItem("darkMode") === "enabled") {
        toggle.style.transition = "none";
        inner.style.transition = "none";
        sunMoon.style.transition = "none";
        
        enableDarkMode();

        setTimeout(() => {
            toggle.style.transition = "background-color 0.5s ease-in-out";
            inner.style.transition = "transform 0.6s cubic-bezier(0.2, 1.5, 0.3, 1.25)";
            sunMoon.style.transition = "background-color 0.3s ease-in-out";
        }, 50);

    }

    toggle.addEventListener("click", function () {
        if (toggle.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
});
