// Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();
    alert(result.message);

    if (result.success) {
        window.location.href = "index.html"; // Redirect to login page
    }
});

// Login Form Submission
document.getElementById("loginform").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
        window.location.href = "home.html"; // Redirect to home page
    }
});

// Forgot Password Form Submission
document.getElementById("forgotpassword").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("forgotEmail").value;

    const response = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.message);
});

// Reset Password Form Submission
document.getElementById("resetPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = document.getElementById("resetToken").value;
    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch("http://localhost:5000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
        window.location.href = "index.html"; // Redirect to login page
    }
});
