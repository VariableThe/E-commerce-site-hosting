document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    console.log("Cart on Load:", cart); // Debugging

    function updateCartDisplay() {
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p class='text-gray-700'>Your cart is empty.</p>";
            cartTotalElement.textContent = "$0.00";
            return;
        }

        cart.forEach((item, index) => {
            let itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
            let quantity = parseInt(item.quantity, 10) || 1; // Ensure quantity is a number

            let itemTotal = itemPrice * quantity;
            total += itemTotal;

            console.log(`Item: ${item.name}, Price: ${itemPrice}, Quantity: ${quantity}, Subtotal: ${itemTotal}`); // Debugging

            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item", "flex", "justify-between", "items-center", "border-b", "pb-2");
            itemElement.innerHTML = `
                <span>${item.name} (x${quantity})</span>
                <span>$${itemTotal.toFixed(2)}</span>
                <button class="bg-red-500 text-white px-4 py-2 rounded remove-btn" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        console.log("Updated Total:", total); // Debugging

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const itemIndex = parseInt(this.dataset.index, 10);
                cart.splice(itemIndex, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
                alert("Item removed from cart");
            });
        });
    }

    window.checkout = function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        console.log("Checkout button clicked!");
        alert("Proceeding to checkout...");
        localStorage.removeItem("cart");

        // Redirect to checkout page (change to actual checkout page)
        window.location.href = "checkout.html";
    };

    updateCartDisplay();
});
