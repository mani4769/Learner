document.addEventListener('DOMContentLoaded', () => {
    // Add active class to current page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Handle logout
    const logoutBtn = document.querySelector('a[href="index.html"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to logout?')) {
                e.preventDefault();
            }
        });
    }
});
// Signup Form Submission
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        try {
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
        } catch (error) {
            console.error("Signup error:", error);
            alert("Failed to signup. Please try again.");
        }
    });
}

// Login Form Submission
const loginForm = document.getElementById("loginform");
if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
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
        } catch (error) {
            console.error("Login error:", error);
            alert("Failed to login. Please try again.");
        }
    });
}
// ...existing code...

// Forgot Password Form Handler
const forgotPasswordForm = document.getElementById("forgotpassword");
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const email = document.getElementById("forgotEmail").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (newPassword !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const response = await fetch("http://localhost:5000/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    newPassword
                })
            });

            if (!response.ok) {
                throw new Error("Failed to reset password");
            }

            const data = await response.json();
            alert(data.message);

            if (data.success) {
                window.location.href = "index.html";
            }
        } catch (error) {
            console.error("Reset password error:", error);
            alert("Failed to reset password. Please try again.");
        }
    });
}