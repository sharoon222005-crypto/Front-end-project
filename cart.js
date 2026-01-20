// Simulated cart storage (normally this could be localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Function to display cart
function displayCart() {
    cartItems.innerHTML = ""; // clear table
    let total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <input type="number" min="1" max="5" value="${item.quantity}" data-index="${index}" class="qty-input">
                </td>
                <td>₹${subtotal}</td>
                <td><button class="btn btn-danger remove-btn" data-index="${index}"><i class="bi bi-trash"></i></button></td>
            </tr>
        `;
    });

    cartTotal.innerText = total;
    addEvents();
}

// Function to handle quantity change and remove buttons
function addEvents() {
    const qtyInputs = document.querySelectorAll(".qty-input");
    const removeBtns = document.querySelectorAll(".remove-btn");

    qtyInputs.forEach(input => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            let value = parseInt(e.target.value);
            if (value < 1) value = 1;
            if (value > 5) value = 5;
            cart[index].quantity = value;
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        });
    });

    removeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.closest("button").dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        });
    });
}

// Initial display
displayCart();
