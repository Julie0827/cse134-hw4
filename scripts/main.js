document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.classList.remove("no-js");

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

    function enableDarkMode() {
        toggle.title = "Switch to Light Mode";
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        toggle.title = "Switch to Dark Mode";
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }

    toggle.addEventListener("click", function () {
        if (document.documentElement.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
});
