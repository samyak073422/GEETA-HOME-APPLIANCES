// Store cart items
let cart = [];

// Add to Cart functionality
function addToCart(name, price, quantity = 1) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity; // Increase quantity if item already in cart
    } else {
        cart.push({ name, price, quantity }); // Add new item to cart
    }
    updateCartCount(); // Update cart count
    displayCartItems(); // Update cart display
    const sound = document.getElementById('add-to-cart-sound');
    sound.play();
}

// Update the cart count in the navbar
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Display cart items in the modal
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Clear previous items
    let total = 0; // Initialize total cost

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal; // Add to total cost

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (₹${item.price}) x ${item.quantity} = ₹${itemTotal}</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });

    document.getElementById("checkout-total").textContent = `₹${total}`;
}

// Remove an item from the cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name); // Remove item from cart
    updateCartCount(); // Update cart count
    displayCartItems(); // Refresh cart display
}

// Submit the order via WhatsApp
function submitOrder() {
    const fullName = document.getElementById("fullName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Constructing the message to send via WhatsApp
    const cartDetails = cart.map(item => `${item.name} (₹${item.price}) x ${item.quantity}`).join(', ');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `Order Details:\n\nName: ${fullName}\nAddress: ${address}, ${city}, ${state}, ${zip}\n\nCart Items:\n${cartDetails}\n\nTotal: ₹${total}`;
    
    // Replace this number with the desired recipient number
    const whatsappNumber = "9533224903"; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp to send the order message
    window.open(whatsappUrl, '_blank');
    
    // Clear the cart and close the modal after sending order
    cart = []; 
    updateCartCount(); 
    displayCartItems(); 
    $('#addressModal').modal('hide'); 
}

// Event listener for all Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        const quantityInput = this.closest('.input-group').querySelector('.quantity');
        const quantity = parseInt(quantityInput.value) || 1; // Default to 1 if input is empty

        addToCart(name, price, quantity); // Add item to cart
    });
});

// Checkout button event listener
document.getElementById("checkout-button").addEventListener("click", displayCartItems);

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out to us! We will get back to you shortly.');
    this.reset(); // Clear the form
});
