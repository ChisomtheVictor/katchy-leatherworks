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
let productCard = document.querySelector(".products");
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
//get info from json file
fetch('products.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

//list data in html
function addDataToHTML(){
    //remove default data in html
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    //add new info
    if(products!= null){
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
            `<img src=${product.image} alt="Product Image">
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button onclick= "addCart(${product.id})">Add to Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }

}