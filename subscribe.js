
document.addEventListener("DOMContentLoaded", function() {
    const subscribeForm = document.getElementById("subscribe-form");
    const emailInput = document.getElementById("email-input");

    if (subscribeForm && emailInput) {
        subscribeForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            window.location.href = `mailto:${email}?subject=Latest Deals Subscription&body=Thank you for subscribing! Check out this link: https://app.daily.dev/`;
            alert("Subscription successful! Check your email.");
            emailInput.value = "";
        });
    }
});
