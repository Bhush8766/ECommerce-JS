// ELEMENTS
titleElmt = document.querySelector('#title')
descriptionElmt = document.querySelector('#description')
categoryElmt = document.querySelector('#category')
brandElmt = document.querySelector('#brand')
priceElmt = document.querySelector('#price')
quantityElmt = document.querySelector('#quantity')
cartLengthElmt = document.getElementById('cartLength')

const renderProductsElmt = document.querySelector('#renderProducts')

// LOCAL STORAGE
function getFromLocal(){
    return JSON.parse(localStorage.getItem('B81')) || []
}

function saveToLocal(data){
    localStorage.setItem('B81', JSON.stringify(data))
}

function getCartFromLocal(){
    return JSON.parse(localStorage.getItem('Cart81')) || []
}

function saveCartToLocal(data){
    localStorage.setItem('Cart81', JSON.stringify(data))
}

// ADD PRODUCT
function AddNewProduct(){

    let products = getFromLocal()

    let newProduct = {
        id: Date.now(),
        title: titleElmt.value,
        description: descriptionElmt.value,
        category: categoryElmt.value,
        brand: brandElmt.value,
        price: Number(priceElmt.value),
        quantity: Number(quantityElmt.value)
    }

    products.push(newProduct)
    saveToLocal(products)

    renderProducts()
}

// RENDER PRODUCTS
function renderProducts(){

    let products = getFromLocal()

    renderProductsElmt.innerHTML = products.map(p=>`
        <div class="col-4 mb-3">
            <div class="card p-3">
                <h5>${p.title}</h5>
                <p>${p.category}</p>
                <p>₹${p.price}</p>
                <button onclick="addToCart(${p.id})" class="btn btn-primary">Add</button>
            </div>
        </div>
    `).join("")
}

// ADD TO CART
function addToCart(id){

    let cart = getCartFromLocal()
    let products = getFromLocal()

    let product = products.find(p=>p.id==id)

    let exist = cart.find(c=>c.product_id==id)

    if(exist){
        exist.quantity_inCart++
    } else {
        cart.push({
            product_id: product.id,
            product_name: product.title,
            product_price: product.price,
            quantity_inCart:1
        })
    }

    saveCartToLocal(cart)
    cartLengthElmt.textContent = cart.length
}

// CART PAGE
function renderCart(){

    let cart = getCartFromLocal()
    let total = 0

    let cartItems = document.getElementById("cartItems")
    let totalEl = document.getElementById("totalPrice")

    if(!cartItems) return

    cartItems.innerHTML = cart.map(item=>{

        let t = item.product_price * item.quantity_inCart
        total += t

        return `
        <div class="col-4 mb-3">
            <div class="card p-3">
                <h5>${item.product_name}</h5>
                <p>₹${item.product_price}</p>
                <p>Qty: ${item.quantity_inCart}</p>
                <button onclick="removeFromCart(${item.product_id})" class="btn btn-danger">Remove</button>
            </div>
        </div>
        `
    }).join("")

    totalEl.textContent = total
}

// REMOVE
function removeFromCart(id){
    let cart = getCartFromLocal()
    cart = cart.filter(c=>c.product_id!=id)
    saveCartToLocal(cart)
    renderCart()
}

// CHECKOUT
function checkout(){
    alert("Order Placed 🎉")
    saveCartToLocal([])
    renderCart()
}

// SEARCH
function searchProducts(){
    let val = document.getElementById("searchInput").value.toLowerCase()
    let products = getFromLocal()

    let filtered = products.filter(p=>p.title.toLowerCase().includes(val))

    renderProductsElmt.innerHTML = filtered.map(p=>`
        <div class="col-4">
            <div class="card p-2">
                <h5>${p.title}</h5>
            </div>
        </div>
    `).join("")
}

// FILTER
function filterProducts(){
    let cat = document.getElementById("filterCategory").value
    let products = getFromLocal()

    let filtered = cat ? products.filter(p=>p.category==cat) : products

    renderProductsElmt.innerHTML = filtered.map(p=>`
        <div class="col-4">
            <div class="card p-2">
                <h5>${p.title}</h5>
            </div>
        </div>
    `).join("")
}

// LOAD
window.onload = () => {
    renderProducts()
    renderCart()

    let cart = getCartFromLocal()
    if(cartLengthElmt) cartLengthElmt.textContent = cart.length
}