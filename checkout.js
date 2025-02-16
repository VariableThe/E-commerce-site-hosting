document.addEventListener("DOMContentLoaded", function() {
    const orderForm = document.getElementById("order-form");
    const emailInput = document.getElementById("email");

    if (orderForm && emailInput) {
        orderForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Retrieve cart data from localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // Construct order details
            let orderDetails = "Your Order Details:\n\n";
            let totalAmount = 0;

            cart.forEach((item, index) => {
                let itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;
                orderDetails += `${index + 1}. ${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}\n`;
            });

            orderDetails += `\nTotal Amount: $${totalAmount.toFixed(2)}\n`;
            orderDetails += "\nThank you for shopping with us at Wapple!";

            // Encode email content for `mailto:` link
            const subject = encodeURIComponent("Order Confirmation - Wapple");
            const body = encodeURIComponent(orderDetails);

            // Open default email client
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

            // Show confirmation and clear cart
            alert("Order placed! Check your email for confirmation.");
            localStorage.removeItem("cart"); // Clear cart after order
            emailInput.value = "";
        });
    }
});
