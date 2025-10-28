
/* main event loop */ 
document.addEventListener('click', function(e) {
    console.log(e.target.classList)
    
    if (e.target.dataset.add){
       renderOrderSummary(e.target.dataset.add)
    }
    else if(e.target.dataset.remove) {
        removeFromOrder(e.target.dataset.remove)
    }
    else if (e.target.id === "order-btn") {
        completeOrder(e.target.id)
    }
    else if (e.target.id === "pay-btn") {
        payForOrder(e.target.id);
    }
})

function completeOrder(targetID) {
    console.log('from continue order ',targetID)
    document.querySelector("#payment-modal").style.display="block";
}


function payForOrder(targetID) {
    console.log('from pay for order ',targetID)
    document.querySelector("#payment-modal").style.display="none";
    document.querySelector(".order-summary").style.display="none";
    document.querySelector(".order-confirmation").style.display="block";
}

function renderOrderSummary(add) {
    if (add === "id1") {
        document.querySelector(".order-summary").style.display="block";
    }
}
