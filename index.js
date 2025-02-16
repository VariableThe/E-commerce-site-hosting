document.addEventListener("DOMContentLoaded", function() {
    console.log("Script Loaded Successfully");

    // Add to Cart Functionality
    const cartButtons = document.querySelectorAll(".add-to-cart");
    
    if (cartButtons.length === 0) {
        console.error("No Add to Cart buttons found! Make sure they have the correct class.");
    } else {
        cartButtons.forEach(button => {
            button.addEventListener("click", function() {
                let itemName = this.getAttribute("data-name");
                let itemPrice = this.getAttribute("data-price");

                if (!itemName || !itemPrice) {
                    console.error("Missing product data attributes!");
                    return;
                }

                console.log(`Adding to Cart: ${itemName} - $${itemPrice}`); // Debugging

                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push({ name: itemName, price: parseFloat(itemPrice) });
                localStorage.setItem("cart", JSON.stringify(cart));

                alert(`${itemName} added to cart!`);
            });
        });
    }

    // Subscription Form Functionality
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

            alert("Subscription successful! Check your email.");
            emailInput.value = "";
        });
    } else {
        console.error("Subscription form not found!");
    }
});
