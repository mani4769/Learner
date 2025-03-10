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

    const result = await response.text();
    alert(result);
});

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        const response = await fetch("http://localhost:5000/auth/login", { // Make sure this URL is correct
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json(); // Read JSON response

        if (data.success) {
            message.style.color = "green";
            message.textContent = "Login Successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);
        } else {
            message.style.color = "red";
            message.textContent = data.message;
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "Error connecting to server!";
        console.error("Fetch error:", error);
    }

});
