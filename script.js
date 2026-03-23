
// /***********local storage concept***********/
// // str = 'Batch81'

// // localStorage.setItem('batch', str)
// // str2 = localStorage.getItem('batch')
// // console.log(str2)

// // objBatch = {
// //     id:243,
// //     name:'Batch81'
// // }

// // localStorage.setItem('b', JSON.stringify(objBatch))
// // newObj = JSON.parse(localStorage.getItem('b'))
// // console.log(newObj)
// // console.log(typeof(newObj))









// titleElmt = document.querySelector('#title')
// descriptionElmt = document.querySelector('#description')
// categoryElmt = document.querySelector('#category')
// brandElmt = document.querySelector('#brand')
// priceElmt = document.querySelector('#price')
// quantityElmt = document.querySelector('#quantity')
// cartLengthElmt = document.getElementById('cartLength')

// const renderProductsElmt = document.querySelector('#renderProducts')

// products = []
// cart = []

// function saveToLocal(p) {
//     localStorage.setItem('B81', JSON.stringify(p))
// }

// // ✅ FIX
// function getFromLocal() {
//     return JSON.parse(localStorage.getItem('B81')) || []
// }

// function saveCartToLocal(c){
//     localStorage.setItem('Cart81', JSON.stringify(c))
// }

// // ✅ FIX
// function getCartFromLocal (){
//     return JSON.parse(localStorage.getItem('Cart81')) || []
// }


// // ================= RENDER =================
// function renderProducts() {

//     let renderProductsData = getFromLocal()   // ✅ FIX

//     if (renderProductsData.length === 0) {
//         renderProductsElmt.innerHTML = "<p>No Products</p>"
//         return
//     }

//     renderProductsElmt.innerHTML = `
//     <div class="row">

//     ${renderProductsData.map((prod, index) => `
//         <div class='col-12 col-md-6 col-lg-4 mb-3'>

//             <div class="card h-100">
//                 <div class="card-body">
//                     <h4>${prod.title}</h4>
//                     <p>${prod.description}</p>
//                     <h5>Price : ₹${prod.price}</h5>

//                     <button class="btn btn-primary" onclick="addToCart(${prod.id})">
//                         Add To Cart
//                     </button>
//                 </div>
//             </div>

//         </div>
//     `).join('')}

//     </div>
//     `
// }


// // ================= ADD PRODUCT =================
// function AddNewProduct() {

//     titleV = titleElmt.value
//     descrV = descriptionElmt.value
//     categoryV = categoryElmt.value
//     brandV = brandElmt.value
//     priceV = Number(priceElmt.value)
//     quantityV = Number(quantityElmt.value)

//     newProduct = {
//         id: Date.now(),
//         title: titleV,
//         description: descrV,
//         category: categoryV,
//         brand: brandV,
//         price: priceV,
//         quantity: quantityV
//     }

//     getProd = getFromLocal()  // ✅ always array

//     getProd.push(newProduct)

//     saveToLocal(getProd)

//     renderProducts()

//     // clear inputs
//     titleElmt.value = ''
//     descriptionElmt.value = ''
//     categoryElmt.value = ''
//     brandElmt.value = ''
//     priceElmt.value = ''
//     quantityElmt.value = ''
// }


// // ================= ADD TO CART =================
// function addToCart(id){

//     const getCArtFromLocal = getCartFromLocal()  // ✅ FIX

//     getProd = getFromLocal()

//     findIndex1 = getProd.findIndex((p)=> p.id == id)

//     if(findIndex1 == -1 ){
//         alert('Cant add to cart')
//         return
//     }

//     newCartItem = getProd[findIndex1]

//     // ✅ CHECK IF ALREADY IN CART
//     let existingIndex = getCArtFromLocal.findIndex((c)=> c.id == id)

//     if(existingIndex !== -1){
//         getCArtFromLocal[existingIndex].quantity += 1
//     } else {
//         getCArtFromLocal.push({
//             id: newCartItem.id,
//             title: newCartItem.title,
//             price: newCartItem.price,
//             quantity: 1
//         })
//     }

//     saveCartToLocal(getCArtFromLocal)

//     cartLengthElmt.textContent = getCArtFromLocal.length
// }


// // ================= LOAD =================
// window.addEventListener('DOMContentLoaded', () => {

//     getProd = getFromLocal()

//     if (!getProd) {
//         saveToLocal(products)
//     }

//     getCart = getCartFromLocal()

//     if(!getCart){
//         saveCartToLocal(cart)
//     }

//     cartLengthElmt.textContent = getCart.length

//     renderProducts()   // ✅ moved after init
// })





























// ================= ELEMENTS =================
titleElmt = document.querySelector('#title')
descriptionElmt = document.querySelector('#description')
categoryElmt = document.querySelector('#category')
brandElmt = document.querySelector('#brand')
priceElmt = document.querySelector('#price')   // ⚠️ HTML id must be "price"
quantityElmt = document.querySelector('#quantity')
cartLengthElmt = document.getElementById('cartLength')

const renderProductsElmt = document.querySelector('#renderProducts')

// ================= DATA =================
products = []
cart = []


// ================= LOCAL STORAGE =================

// Safe Save
function saveToLocal(p) {
    if (!Array.isArray(p)) p = []
    localStorage.setItem('B81', JSON.stringify(p))
}

// Safe Get
function getFromLocal() {
    let data = localStorage.getItem('B81')

    if (!data || data === "undefined") {
        return []
    }

    return JSON.parse(data)
}

function saveCartToLocal(c){
    if (!Array.isArray(c)) c = []
    localStorage.setItem('Cart81', JSON.stringify(c))
}

function getCartFromLocal (){
    let data = localStorage.getItem('Cart81')

    if (!data || data === "undefined") {
        return []
    }

    return JSON.parse(data)
}


// ================= RENDER PRODUCTS =================
function renderProducts() {

    let renderProductsData = getFromLocal()

    if (renderProductsData.length === 0) {
        renderProductsElmt.innerHTML = "<p>No Products Available</p>"
        return
    }

    renderProductsElmt.innerHTML = `
    <div class="row">

    ${renderProductsData.map((prod) => `
        <div class='col-12 col-md-6 col-lg-4 mb-3'>

            <div class="card h-100 shadow-sm">
                <div class="card-body d-flex flex-column">
                    
                    <h4>${prod.title}</h4>
                    <p>${prod.description}</p>
                    <p>${prod.category}</p>
                    <h5>Price : ₹${prod.price}</h5>

                    <button class="btn btn-primary mt-auto" onclick="addToCart(${prod.id})">
                        Add To Cart
                    </button>

                </div>
            </div>

        </div>
    `).join('')}

    </div>
    `
}


// ================= ADD PRODUCT =================
function AddNewProduct() {

    let titleV = titleElmt.value
    let descrV = descriptionElmt.value
    let categoryV = categoryElmt.value
    let brandV = brandElmt.value
    let priceV = Number(priceElmt.value)
    let quantityV = Number(quantityElmt.value)

    if (!titleV || !priceV) {
        alert("Please fill required fields")
        return
    }

    let newProduct = {
        id: Date.now(),
        title: titleV,
        description: descrV,
        category: categoryV,
        brand: brandV,
        price: priceV,
        quantity: quantityV
    }

    let getProd = getFromLocal()

    getProd.push(newProduct)

    saveToLocal(getProd)

    renderProducts()

    // Clear inputs
    titleElmt.value = ''
    descriptionElmt.value = ''
    categoryElmt.value = ''
    brandElmt.value = ''
    priceElmt.value = ''
    quantityElmt.value = ''

    // Close modal (if using Bootstrap)
    let modalEl = document.getElementById('addProduct')
    if(modalEl){
        let modal = bootstrap.Modal.getInstance(modalEl)
        if(modal) modal.hide()
    }
}


// ================= ADD TO CART =================
function addToCart(id){

    let getCArtFromLocal = getCartFromLocal()
    let getProd = getFromLocal()

    let findIndex1 = getProd.findIndex((p)=> p.id == id)

    if(findIndex1 == -1 ){
        alert('Cant add to cart')
        return
    }

    let newCartItem = getProd[findIndex1]

    let productInCart = getCArtFromLocal.find((p)=> p.product_id == newCartItem.id)

    let indexOfProdInCart = getCArtFromLocal.findIndex((p)=> p.product_id == newCartItem.id)

    if(indexOfProdInCart == -1){

        let newProdINCart = {
            id: Date.now(),
            product_id: newCartItem.id,
            product_name: newCartItem.title,
            product_price: newCartItem.price,
            quantity_inCart: 1
        }

        getCArtFromLocal.push(newProdINCart)

    } else {

        getCArtFromLocal[indexOfProdInCart].quantity_inCart =
            productInCart.quantity_inCart + 1
    }

    saveCartToLocal(getCArtFromLocal)

    cartLengthElmt.textContent = getCArtFromLocal.length
}


// ================= INITIAL LOAD =================
window.addEventListener('DOMContentLoaded', () => {

    let getProd = getFromLocal()
    if (!getProd || getProd.length === 0) {
        saveToLocal(products)
    }

    let getCart = getCartFromLocal()
    if(!getCart || getCart.length === 0){
        saveCartToLocal(cart)
    }

    cartLengthElmt.textContent = getCart.length

    renderProducts()
})