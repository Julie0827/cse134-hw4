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

    toggle.addEventListener("click", function () {
        if (toggle.classList.contains("dark-mode")) {
            toggle.classList.remove("dark-mode");
            toggle.title = "Switch to Dark Mode";
            inner.classList.remove("dark-mode");
            circles.forEach(circle => {
                circle.classList.remove("dark-mode");
            });
            
        } else {
            toggle.classList.add("dark-mode");
            toggle.title = "Switch to Light Mode";
            inner.classList.add("dark-mode");
            circles.forEach(circle => {
                circle.classList.add("dark-mode");
            });
        }
    });
});
