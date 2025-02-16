document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully!");

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents double event execution

            const product = {
                id: this.getAttribute("data-id"),
                name: this.getAttribute("data-name"),
                price: parseFloat(this.getAttribute("data-price")), // Ensure price is a number
                quantity: 1 // Default quantity
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if the item already exists
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++; // Increment quantity
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${product.name} added to cart!`);
        });
    });

    // Load Cart Items on Cart Page
    const cartContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    function updateCartDisplay() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotalElement.textContent = "$0.00";
            return;
        }

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item", "p-4", "border-b", "flex", "justify-between", "items-center");
            cartItem.innerHTML = `
                <div>
                    <p><strong>${item.name}</strong> - $${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="bg-red-500 text-white px-3 py-2 rounded remove-item" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        // Remove item from cart
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.splice(this.dataset.index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
                alert("Item removed from cart");
            });
        });
    }

    // Checkout Function
    window.checkout = function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        console.log("Proceeding to checkout...");
        localStorage.setItem("cart", JSON.stringify(cart)); // Ensure cart data persists
        window.location.href = "checkout.html"; // Redirect to checkout page
    };

    // Only update cart if cart page is loaded
    if (cartContainer) {
        updateCartDisplay();
    }
});
