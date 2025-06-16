// Toggle UI Panels
let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#login-btn').onclick = () => {
  loginForm.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
};

window.onscroll = () => {
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

// Swiper JS for product and review sliders
new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1020: { slidesPerView: 3 },
  },
});

new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1020: { slidesPerView: 3 },
  },
});

// ===================
// Shopping Cart Logic
// ===================

// Store cart items
const cartItems = [];

// Select all add to cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Get reference to cart container and total display
const cartContainer = document.querySelector(".shopping-cart");
const totalElement = document.createElement("div");
totalElement.className = "total";
cartContainer.appendChild(totalElement);

// Update total price
function updateTotal() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  totalElement.textContent = `total : $${total.toFixed(2)}/-`;
}

// Render cart items
function renderCart() {
  const oldBoxes = cartContainer.querySelectorAll(".box");
  oldBoxes.forEach(box => box.remove());

  cartItems.forEach((item, index) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
      <i class="fas fa-trash" data-index="${index}"></i>
      <img src="${item.img}" alt="">
      <div class="content">
        <h3>${item.name}</h3>
        <span class="price">$${item.price}/-</span>
        <span class="quantity">qty : ${item.quantity}</span>
      </div>
    `;
    cartContainer.insertBefore(box, totalElement);
  });

  updateTotal();
}

// Add to cart functionality
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const img = button.getAttribute("data-img");

    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name, price, img, quantity: 1 });
    }

    renderCart();
  });
});

// Remove from cart functionality
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    const index = e.target.getAttribute("data-index");
    cartItems.splice(index, 1);
    renderCart();
  }
});
document.querySelectorAll(".read-more-btn").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent jump on click

    const moreDetail = this.previousElementSibling; // Get the <p class="more-detail">

    if (moreDetail.style.display === "none") {
      moreDetail.style.display = "block";
      this.textContent = "read less";
    } else {
      moreDetail.style.display = "none";
      this.textContent = "read more";
    }
  });
});
document.querySelectorAll(".read-more").forEach(function(button) {
    button.addEventListener("click", function() {
      const extraText = this.previousElementSibling.querySelector(".extra-text");
      if (extraText.style.display === "none") {
        extraText.style.display = "inline";
        this.textContent = "read less";
      } else {
        extraText.style.display = "none";
        this.textContent = "read more";
      }
    });
  });
  function loginUser() {
      // Store login success flag
      localStorage.setItem("loginSuccess", "true");

      // Redirect to main page
      window.location.href = "index.html";
      return false; // Prevent default form submission
    }
     window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loginSuccess") === "true") {
      alert("Login successful!");
      localStorage.removeItem("loginSuccess"); // Prevent showing it again
    }
  });
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Your existing cart logic...

        // ✅ Show "Product added!" message
        const msg = document.getElementById('cart-added-msg');
        msg.style.display = 'inline-block';

        setTimeout(() => {
            msg.style.display = 'none';
        }, 500);
    });
});
