import { menuArray } from "./data.js"
const menuEl = document.getElementById("menu-feed"); 
const orderEl = document.getElementById("order-items"); 
const totalPriceEl = document.getElementById("text-price"); 
const orderConfirmationEl = document.getElementById("order-confirmation"); 
let totalPrice = 0; 

// Main event loop 
 
document.addEventListener('click', function(e) {
    
    if (e.target.dataset.add){
        document.querySelector(".order-summary").style.display="block";
        getOrderHTML(e.target.dataset.add)
    }
    else if(e.target.dataset.remove) {
        removeItemAndUpdateTotal(e.target)
    }
    else if (e.target.id === "order-btn") {
        showEnterCardDetails()
    }
})

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    orderConfirmation(document.querySelector('#name').value)
}) 

// Create food menu HTML

function getMenuHTML() {
    let menuHTML = ''; 
    menuArray.forEach(function(item){
        menuHTML += `
            <article class="menu-item">
                <img class="item-picture" src="/images/${item.name}-item.png" alt="${item.alt}">
                <ul class="item-details">
                    <li class="item-name text-heading">${item.name}</li>
                    <li class="item-ingredients text-subheading">${item.ingredients}</li>
                    <li class="item-price text-price">$${item.price}</li>
                </ul>
            <button class="item-add-btn text-icon" data-add="${item.id}">+</button>
            </article>
        ` 
    }) 
    return menuHTML; 
}

// Create order 

function getOrderHTML(itemNumber) {
    const orderItem = findItem(itemNumber); 
    
    let orderList = ''
    
    orderList = `
        <div class="order-item">
            <dt class="text-heading">${orderItem.name}</dt>
            <button class="text-secondary-sm" type="button" aria-label="Remove ${orderItem.name}" data-remove="${orderItem.id}">remove</button>
            <dd class="text-price">$${orderItem.price}</dd>
        </div>
    `
    orderEl.innerHTML += orderList;
    updateOrderTotal(orderItem.price); 
}

// Find which item add to order 

function findItem(itemNumber) {
    const orderItem = menuArray.filter(function(item){
        return +itemNumber === item.id
     })[0]; 
     
    return orderItem; 
}

// Remove item from order 

function removeItemAndUpdateTotal(row) {
    row.parentElement.remove();
    
    //find the price of the removed item, then subtract its value from total  
    updateOrderTotal(-`${findItem(row.dataset.remove).price}`) 
}


// Update order total as the items are added or removed 

function updateOrderTotal(price) {
    totalPrice += +price; 
    totalPriceEl.textContent = `$${totalPrice.toString()}`; 
}


// Complete order 

function showEnterCardDetails() {
    document.querySelector("#modal").style.display="block";
    document.querySelector("#order-summary").style.display="none";
}

// Modal: pay for order and display confirmation 

function orderConfirmation(name) {
    document.querySelector("#modal").style.display="none";
    document.querySelector("#order-confirmation").style.display="block";
    
    orderConfirmationEl.innerHTML = `<p class="text-heading">Thanks, ${name}! Your order is on its way!</p>`
}

// Render menu items 

function render() {
    menuEl.innerHTML = getMenuHTML();
}

render(); 
