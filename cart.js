   const cartBtns = document.querySelectorAll(".cart-btn");

    // Loop each button
    cartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {

        const card = btn.closest(".product-card");
        const name = card.querySelector(".card-title").innerText;
        const img = card.querySelector("img").src;
        const price = parseInt(
          card.querySelector(".text-success").innerText.replace("₹", "").replace(",", "")
        );

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.name === name);

        if (existing) {
          existing.quantity = Math.min(existing.quantity + 1, 100); // max 5
        } else {
          cart.push({
            name: name,
            price: price,
            img: img,
            quantity: 1
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      });
    });

    function updateCartCount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let total = cart.reduce((sum, p) => sum + p.quantity, 0);

      document.getElementById("cart-count").innerText = total;
    }

    // Update count when page loads
    updateCartCount();

    function showPopup(message) {
  const popup = document.getElementById("popup-msg");
  popup.innerText = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 1500);  // hide after 1.5 sec
}

