const login = document.getElementById("loginForm");
const signup = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const backLogin = document.getElementById("backLogin");

// Form Toggle Handlers
showSignup.onclick = function (e) {
    e.preventDefault();
    login.style.display = "none";
    if (showSignup.parentElement) {
        showSignup.parentElement.style.display = "none"; // Hide "Don't have an account?" section
    }
    signup.style.display = "block";
    backLogin.style.display = "block";
};

backLogin.onclick = function (e) {
    e.preventDefault();
    login.style.display = "block";
    if (showSignup.parentElement) {
        showSignup.parentElement.style.display = "block";
    }
    signup.style.display = "none";
    backLogin.style.display = "none";
};

// Password Visibility Toggle
function togglePassword(id, btn) {
    let input = document.getElementById(id);
    let icon = btn.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// SIGNUP 
signup.addEventListener("submit", function (e) {
    e.preventDefault();

    // Select form inputs
    const inputs = signup.querySelectorAll("input");
    const fullName = inputs[0].value.trim();
    const email = inputs[1].value.trim().toLowerCase();
    const pass = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    // Validate matching passwords
    if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    // Retrieve existing accounts or create an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        alert("An account with this email already exists!");
        return;
    }

    // Save new account object
    const newUser = {
        fullName: fullName,
        email: email,
        password: pass
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Save active session user data
    localStorage.setItem("currentUser", JSON.stringify({ fullName, email }));

    alert("Registration Successful!");
    window.location.href = "account.html"; // Redirect to account page
});

// LOGIN 
login.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const pass = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user matching email and password
    const user = users.find((u) => u.email === email && u.password === pass);

    if (user) {
        // Save logged-in user details to localStorage
        localStorage.setItem("currentUser", JSON.stringify({ fullName: user.fullName, email: user.email }));
        
        alert("Login Successful!");
        window.location.href = "account.html"; // Redirect to account page
    } else {
        alert("Invalid email or password!");
    }
});