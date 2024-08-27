const hamburgerElement  = document.querySelector('#hamburgerButton');
const navElement  = document.querySelector('.navList');

hamburgerElement.addEventListener('click', ()=>{
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});


const todaysDate = new Date();


const options = {year: 'numeric'}
document.getElementById('year').textContent = todaysDate.toLocaleDateString('en-us', options)
const date = document.lastModified;
document.getElementById('date').textContent = date;


//cart scripts
let iconCart = document.querySelector('.icon-cart');
let cart = document.querySelector(".cart");
let productCard = document.querySelector(".products-container");
let close = document.querySelector(".close");

iconCart.addEventListener('click',()=>{
    if(cart.style.right == '-100%'){
        cart.style.right ='0';
        productCard.style.transform ='translateX(-400px)';
    }else{
        cart.style.right ='-100%';
        productCard.style.transform ='translateX(0)';
    }
})
close.addEventListener('click', ()=> {
    cart.style.right ='-100%';
    productCard.style.transform ='translateX(0)';
})

//product
let products = null;

// Get data from the JSON file
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    });

// Show product data in the list
function addDataToHTML() {
    // Remove default data from HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // Add new data
    if (products != null) { // Check if there is data
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product-item'); // Updated class name
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="Product Image">
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button class="button" onclick="addCart(${product.id})">Add to Cart</button>`; // Updated button class

            listProductHTML.appendChild(newProduct);
        });
    }
}
//product
let featuredProducts = null;

// Get data from the JSON file
fetch('featuredProduct.json')
    .then(response => response.json())
    .then(data => {
        featuredProducts = data;
        addFPDataToHTML();
    });

// Show product data in the list
function addFPDataToHTML() {
    // Remove default data from HTML
    let listFPProductHTML = document.querySelector('.listFeaturedProduct');
    listFPProductHTML.innerHTML = '';

    // Add new data
    if (featuredProducts != null) { // Check if there is data
        featuredProducts.forEach(fproduct => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('featured-product-item'); // Updated class name
            newProduct.innerHTML = 
            `<img src="${fproduct.image}" alt="Product Image">
            <h2>${fproduct.name}</h2>
            <div class="price">${fproduct.price}</div>
            <button class="featuredProductsButton" (${fproduct.id})"><a href="products-page.html">Shop Now</a></button>`; // Updated button class

            listFPProductHTML.appendChild(newProduct);
        });
    }
}
// Use cookie so the cart doesn't get lost on refresh
let listCart = [];
function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart'));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    } else {
        listCart = [];
    }
}
checkCart();

function addCart(idProduct) {
    let productsCopy = JSON.parse(JSON.stringify(products));
    // If this product is not in the cart
    if (!listCart[idProduct]) {
        listCart[idProduct] = productsCopy.find(product => product.id == idProduct); // Use find instead of filter
        listCart[idProduct].quantity = 1;
    } else {
        // If this product is already in the cart, increase the quantity
        listCart[idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHTML();
}

function addCartToHTML() {
    // Clear default data
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    // If there are products in the cart
    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('items'); // Updated class name
                newCart.innerHTML = 
                    `<img src="${product.image}" alt="">
                    <div class="content">
                        <div class="name">${product.name}</div>
                    </div>
                    <div class="productPrice">${product.price} / 1 product</div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            }
        });
    }
    totalHTML.innerText = totalQuantity;
}

function changeQuantity(idProduct, type) {
    switch (type) {
        case '+':
            listCart[idProduct].quantity++;
            break;
        case '-':
            listCart[idProduct].quantity--;

            // If quantity <= 0 then remove product from cart
            if (listCart[idProduct].quantity <= 0) {
                delete listCart[idProduct];
            }
            break;
        default:
            break;
    }
    // Save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // Reload HTML view cart
    addCartToHTML();
}


