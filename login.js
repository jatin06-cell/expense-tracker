// Dummy user data storage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Toggle Login/Register Forms
function toggleForm() {
    document.getElementById("login-box").classList.toggle("hidden");
    document.getElementById("register-box").classList.toggle("hidden");
}

// Register User
function register() {
    let name = document.getElementById("register-name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    if (users.some(user => user.email === email)) {
        alert("Email already registered. Please login.");
        return;
    }

    users.push({ name, email, password, expenses: [] });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    toggleForm();
}

// Login User
function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "project2.html";  // Redirect to expense tracker page
    } else {
        alert("Invalid email or password.");
    }
}
