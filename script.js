// ===== LANGUAGE MENU =====
const globeIcon = document.getElementById("globe-icon");
const languageMenu = document.getElementById("language-menu");

globeIcon.addEventListener("click", () => {
    languageMenu.style.display =
        languageMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".language")) {
        languageMenu.style.display = "none";
    }
});

const translations = {
    en: { title: "Welcome to GaanHub", description: "Your boat of tunes awaits." },
    bn: { title: "গানহাবে স্বাগতম", description: "তোমার সুরের নৌকা অপেক্ষায় আছে।" },
    jp: { title: "ガーンハブへようこそ", description: "あなたの音楽の船が待っています。" }
};

const title = document.getElementById("title");
const description = document.getElementById("description");

document.querySelectorAll(".language-menu div").forEach(option => {
    option.addEventListener("click", () => {
        const lang = option.getAttribute("data-lang");
        title.textContent = translations[lang].title;
        description.textContent = translations[lang].description;
        languageMenu.style.display = "none";
    });
});

title.textContent = translations.en.title;
description.textContent = translations.en.description;

// ===== EVENT SECTION SCROLL =====
const eventButtons = document.querySelectorAll('.event_section div[data-target]');
const header = document.querySelector('.header');

eventButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        eventButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Scroll to the target section
        const targetId = button.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: sectionTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL BUTTONS FOR HORIZONTAL CONTAINERS =====
document.querySelectorAll(".scroll").forEach(button => {
    button.addEventListener("click", function () {
        let container;
        if (this.closest(".musicTypes_section")) {
            container = document.querySelector(".mt_song");
        } else if (this.closest(".all_section")) {
            container = document.querySelector(".all_song1");
        } else if (this.closest(".artist_section")) {
            container = document.querySelector(".art_song");
        }
        if (container) {
            let scrollAmount = 340; // Adjust according to item width + gap
            container.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    });
});

// ===== AUDIO VOLUME CONTROL =====
const audio = document.getElementById("audio");
const slider = document.getElementById("volume-slider");

if (audio && slider) {
    slider.addEventListener("input", function() {
        audio.volume = this.value;
    });
}

// ===== SIGNUP =====
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = this.email.value.trim();
        const password = this.password.value.trim();
        const repeatPassword = this.repeat_password.value.trim();

        if (!email || !password || !repeatPassword) {
            alert("All fields are required.");
            return;
        }
        if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some((user) => user.email === email)) {
            alert("User already exists. Please login.");
            return;
        }

        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! You can now login.");
        signupForm.reset();
        window.location.href = "login.html";
    });
}

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = this.email.value.trim();
        const password = this.password.value.trim();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            const notification = document.getElementById("notification_login");
            if (notification) {
                notification.classList.remove("hidden");
                setTimeout(() => {
                    notification.classList.add("hidden");
                    window.location.href = "dashboard.html";
                }, 1500);
            } else {
                window.location.href = "dashboard.html";
            }
        } else {
            alert("Invalid email or password.");
        }
    });
}

// ===== DASHBOARD CHECK =====
document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.querySelector("#dashboard");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (dashboard && !loggedInUser) {
        alert("You must login first!");
        window.location.href = "login.html";
    }
});

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
