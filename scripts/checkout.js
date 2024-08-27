// Function to update the Checkout page
function updateCheckoutPage() {
    // Retrieve the cart from cookies
    let cartData = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart'))
        ?.split('=')[1];

    if (cartData) {
        try {
            // Parse the cart data from JSON
            let listCart = JSON.parse(cartData);
            console.log("Retrieved cart data:", listCart); // Debugging line

            // Filter out null values
            listCart = listCart.filter(product => product !== null);

            // Check if listCart is an array
            if (Array.isArray(listCart)) {
                // Clear the existing list
                let listCartHTML = document.querySelector('.listCart');
                listCartHTML.innerHTML = '';

                let totalQuantity = 0;
                let totalPrice = 0;

                // Iterate through the cart items
                listCart.forEach(product => {
                    if (product && product.image && product.name && product.price && product.quantity) {
                        // Ensure price is a string
                        let price = typeof product.price === 'string' ? product.price : product.price.toString();
                        
                        // Handle price format (e.g., 'NGN100' to '100')
                        let numericPrice = parseFloat(price.replace('NGN', ''));

                        let cartItem = document.createElement('div');
                        cartItem.classList.add('items');
                        cartItem.innerHTML = `
                            <img src="${product.image}" alt="${product.name}">
                            <div class="content">
                                <div class="name">${product.name}</div>
                            </div>
                            <div class="productPrice">${price} x ${product.quantity}</div>
                            <div class="quantity">Quantity: ${product.quantity}</div>
                        `;
                        listCartHTML.appendChild(cartItem);

                        // Update totals
                        totalQuantity += product.quantity;
                        totalPrice += numericPrice * product.quantity;
                    } else {
                        console.error("Invalid product data:", product); // Debugging line
                    }
                });

                // Update the total quantity and price in the checkout page
                document.querySelector('.totalQuantity').innerText = totalQuantity;
                document.querySelector('.totalPrice').innerText = `NGN ${totalPrice.toFixed(2)}`;
            } else {
                console.error("listCart is not an array:", listCart); // Debugging line
            }
        } catch (e) {
            console.error("Error parsing cart data:", e); // Debugging line
        }
    } else {
        console.warn("No cart data found in cookies."); // Debugging line
    }
}

// Call this function when the checkout page is loaded
document.addEventListener('DOMContentLoaded', updateCheckoutPage);
