let cart = [];

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const card = button.closest('.card');
        const productName = card.querySelector('.card-title').textContent;
        const productPrice = parseFloat(card.querySelector('p').textContent.replace('Price: ₹', ''));
        const quantity = parseInt(card.querySelector('input').value);
        addToCart(productName, productPrice, quantity);
    });
});

// Update Cart
function addToCart(name, price, quantity) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    updateCartCount();
}

// Update Cart Count Display
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);
        cart.push({ name: productName, price: productPrice });
        updateCart();
        showNotification(`${productName} added to cart!`);
    });
});

function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}



document.getElementById('cart-button').addEventListener('click', () => {
    $('#cartModal').modal('show');
});


// Add products to cart and update cart display
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);
        cart.push({ name: productName, price: productPrice });
        updateCart();
        alert(`${productName} added to cart!`);
    });
});

// Update cart UI with products and total
function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Open address modal on checkout button click
document.getElementById('checkout-button').addEventListener('click', () => {
    $('#addressModal').modal('show');
});

// Handle form submission and send details via WhatsApp
document.getElementById('address-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    const whatsappNumber = "7981726626";  // Send to this number
    const message = `Order Details:%0A${cart
        .map(item => `${item.name} - ₹${item.price}`)
        .join('%0A')}%0ATotal: ₹${document.getElementById('cart-total').textContent}%0AName: ${name}%0AAddress: ${address}%0APhone: ${phone}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp with prefilled message
    window.open(whatsappUrl, '_blank');

    // Clear cart and close modals
    cart = [];
    updateCart();
    $('#cartModal').modal('hide');
    $('#addressModal').modal('hide');
});


// Function to discard an item from the cart
function discardItem(index) {
    cart.splice(index, 1); // Remove the item from the cart
    updateCart(); // Update the cart display
    showNotification('Item removed from the cart');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
        document.body.removeChild(notification);
    }, 3000); // Display for 3 seconds
}


// Add to Cart Function
function addToCart(name, price, quantity) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    updateCartCount();
    renderCartItems();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Render Cart Items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item d-flex justify-content-between align-items-center';
        itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    updateCheckoutTotal();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
}

// Update Total Price
function updateCheckoutTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('checkout-total').textContent = `₹${total.toFixed(2)}`;
}

// Show Cart Modal on Button Click
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        const quantity = parseInt(this.closest('.input-group').querySelector('.quantity').value);
        
        addToCart(name, price, quantity);
        $('#cartModal').modal('show'); // Show cart modal when an item is added
    });
});

// Checkout Button Logic
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        $('#addressModal').modal('show');
    }
});

// Address Form Submission
document.getElementById('address-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    const whatsappNumber = "7981726626"; // Your WhatsApp number
    const message = `Order Details:%0A${cart
        .map(item => `${item.name} - ₹${(item.price * item.quantity).toFixed(2)}`)
        .join('%0A')}%0ATotal: ₹${document.getElementById('checkout-total').textContent}%0AName: ${name}%0AAddress: ${address}%0APhone: ${phone}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Clear cart after placing the order
    cart = [];
    updateCartCount();
    renderCartItems();
    $('#addressModal').modal('hide');
});

// Show Notification
function showNotification(message) {
    const bell = document.getElementById('notification-bell');
    bell.classList.add('notify');
    setTimeout(() => bell.classList.remove('notify'), 3000);
}
document.querySelectorAll('.dropdown-item[data-category]').forEach(item => {
    item.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        filterProductsByCategory(category); // Call your filter function here
    });
});

function filterProductsByCategory(category) {
    // Logic to filter products based on the category
    // For example, show/hide product cards based on the selected category
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.id === category) {
            product.style.display = 'block'; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
}
