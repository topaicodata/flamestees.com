// Show/hide the Navbar for responsive design
let navbar = document.querySelector('.navbar');
if (navbar) {
    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        cartItem.classList.remove('active');
        searchForm.classList.remove('active');
    }
}
// Show/hide the CartItem
let cartItem = document.querySelector('.cart-items-container');
if (cartItem) {
    document.querySelector('#cart-btn').onclick = () => {
        cartItem.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    }
}
// Show/hide the SearchForm
let searchForm = document.querySelector('.search-form');
if (searchForm) {
    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartItem.classList.remove('active');
    }
}

//Live search filter
const searchBar = document.getElementById('searchBar');
const productBox = document.querySelectorAll('.box-container .box');
if (searchBar) {
    searchBar.addEventListener('keyup', (e) => {
        const query = searchBar.value.toLowerCase().trim();
        
        productBox.forEach(box => {
            const titleElement = box.querySelector('h3');
            if (!titleElement) {
                return;
            }
            const productName = titleElement.textContent.toLowerCase();
            if (productName.includes(query)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    
    });
}

//Background image blur on scroll
const blurEffect = document.body.querySelector('.blur');
if (blurEffect) {
    window.addEventListener("scroll", () => {
        let blurValue = Math.min(window.scrollY / 100, 10);
        blurEffect.style.backdropFilter = `blur(${blurValue}px)`;
    });

    //Hide active bar when scrolling
    if (navbar) {
        window.onscroll = () => {
            navbar.classList.remove('active');
            cartItem.classList.remove('active');
            searchForm.classList.remove('active');
        };
    }
}

// CART SECTION START
const cartContainer = document.querySelector('.cart-items-container');
const cartitemContainer = document.querySelector('.cart-item-container');

const subtotal = document.querySelector('.subtotal');
const salestax = document.querySelector('.sales-tax');
const finaltotal = document.querySelector('.final-total');

const couponcode = document.getElementById('coupon-code');
const applycoupon = document.getElementById('apply-coupon');

//Create a container for total calculation
const totalContainer = document.querySelector('.cart-total');

//Initialize Cart
let cartItemStore = []; //store cart item
let subTotal = 0;
let salesTaxRate = 0.13; //13% sates tax
let discount = 0;

//Add item to cart
function addItemCart(product) {
    let existingItem = cartItemStore.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            product.quantity = 1;
            product.total = product.price;
            cartItemStore.push(product);
        }
    updateCartDisplay();
}

//Update cart display
function updateCartDisplay() {
    cartitemContainer.innerHTML = ""; //Clear items
    
    cartItemStore.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <div class="cart-img"><img src="${item.img}" alt=""></div>
            <div class="item-price">Rs.${item.price}</div>
            <div class="cart-qty">
                <button class="decrease" data-index="${index}">-</button>
                ${item.quantity}
                <button class="increase" data-index="${index}">+</button>
            </div>
            <div class="cart-itm-total">Rs.${item.total}</div>
            <button class="remove-item" data-index="${index}">x</button>
            `;
        cartitemContainer.appendChild(cartItem);
    });
    updateTotal();
}

//Update Total
function updateTotal() {
    subTotal = cartItemStore.reduce((sum, item) => sum + item.total, 0);
    let salesTax = subTotal * salesTaxRate;
    let finalTotal = subTotal + salesTax - discount;

    subtotal.textContent = `Subtotal: Rs.${subTotal}`;
    salestax.textContent = `Sales Tax (13%): Rs.${salesTax.toFixed(2)}`;
    finaltotal.textContent = `Total: ${finalTotal.toFixed(2)}`;
}

//Handle Buttons Quantity + Remove
if (cartitemContainer) {
    cartitemContainer.addEventListener('click', (e) => {
    let index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('increase')) {
        cartItemStore[index].quantity++;
        cartItemStore[index].total = cartItemStore[index].quantity * cartItemStore[index].price;
        updateCartDisplay();
    }
    if (e.target.classList.contains('decrease')) {
        if (cartItemStore[index].quantity > 1) {
            cartItemStore[index].quantity--;    
            cartItemStore[index].total = cartItemStore[index].quantity * cartItemStore[index].price;
            updateCartDisplay();
        }
    }
    if (e.target.classList.contains('remove-item')) {
        cartItemStore.splice(index, 1);
        updateCartDisplay();
    }
    });
}

//Apply Coupon
if (applycoupon) {
    applycoupon.addEventListener('click', () => {
        const couponCode = couponcode.value.trim();
        if (couponCode === "DISCOUNT10") {
            discount = subTotal * 0.1; //10% discount
        } else {
            discount = 0;
        }
        updateTotal();
    });
}

//Cart Btn
const addCart = document.querySelectorAll('.cartBtn');

addCart.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const box = button.closest('.box');
        const name = box.querySelector('h3').innerText;
        const priceT = box.querySelector('.price').innerText;
        const img = box.querySelector('img').getAttribute('src');
        const priceIn = extractPrice(priceT);
        
        const product = {
            name,
            price: priceIn,
            img
        };
        addItemCart(product);
    });
});

//Extract Price
function extractPrice(price) {
    const priceMatch = price.match(/Rs\.*\s*(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
}
// CART SECTION END

// WHOLESALE SECTION START
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".linkBtn");
    const details = document.querySelectorAll(".detailCont");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            // Figure out which link was clicked
            const text = link.textContent.trim().toLowerCase();
            const detail = document.getElementById(`${text}Detail`);
            if (!detail) return;
            if (detail.style.display === "block") {
                // If it visible hide it
                detail.style.display = "none";
            } else {
                // Hide all other
                details.forEach(d => d.style.display = "none");
                // Show the clicked one
                detail.style.display = "block";
            }
        });
    });
});
// WHOLESALE SECTION END


// CONTACT US SECTION
//FETCH data from Contact
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(form);
    
        const urlencoded = new URLSearchParams(formData).toString();
    
        const data = {
            contact: formData.get('contact'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        };
    
        fetch("/api/contact", {
            method: "POST",
            // body: JSON.stringify(data),
            body: urlencoded,
            headers: { "Content-type": "application/x-www-form-urlencoded" }
        })
        .then(response => response.json())
        .then(data => alert('Form submitted successfully:', data))
        .catch(error => console.error('Error form submit:', error))
    });
}

//FROM PRODUCT.HTML
const mainImg = document.getElementById("mainImg");
const imgGroup = document.getElementsByClassName("smallImg");
if (mainImg) {
    imgGroup[0].onclick = function() {
        mainImg.src = imgGroup[0].src;
    }
    imgGroup[1].onclick = function() {
        mainImg.src = imgGroup[1].src;
    }
    imgGroup[2].onclick = function() {
        mainImg.src = imgGroup[2].src;
    }
}

// Function to extract URL parameters
function getQueryParam(name) {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(name);
}

//Get the product ID from the URL
const productId = getQueryParam("id");

if (productId) {
    fetch('/product.json')
    .then(response => response.json())
    .then(product => {
        const products = product.find(p => p.id === productId);
        if (products) {
            displayProduct(products);
        } else {
            document.getElementById("productSlider").innerHTML = "<p>Product not found</p>";
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById("productSlider").innerHTML = "<p>Error loading product</p>";
    });
} else {
    if (productId) {
        document.getElementById("productSlider").innerHTML = "<p>No product specified</p>";
    }
}

//Function to inject product HTML
function displayProduct(product) {
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productDetail").textContent = product.description;
    document.getElementById("price").textContent = product.price;
    document.getElementById("mainImg").src = product.image;
    document.getElementById("mainImg").alt = product.name;
    document.getElementById("smallImg1").src = product.image1;
    document.getElementById("smallImg2").src = product.image2;
    document.getElementById("smallImg3").src = product.image3;
}