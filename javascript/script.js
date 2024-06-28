let menu = document.querySelector('#check-btn');
let ul = document.querySelector('ul');

menu.onclick = () =>{
    ul.classList.toggle('active');
    if(ul.className !="active"){
        menu.classList.add('fa-bars');
        menu.classList.remove('fa-times');    
    }
    else{
        menu.classList.add('fa-times');
        menu.classList.remove('fa-bars');
    }
}

window.onscroll = () =>{
     ul.classList.remove('active');
     menu.classList.add('fa-bars');
     menu.classList.remove('fa-times');   
}



//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//remove
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//cart working js
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

//making function
function ready(){
    //Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for(var i=0; i<removeCartButtons.length; i++){
        var button=removeCartButtons[i];
        button.addEventListener('click' , removeCartItem);
    }

    //Quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    //Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click" , addCartClicked)
    }

    //Buy Button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

//Buy Button
function buyButtonClicked() {
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal();
}


//Remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

//Quantity changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
        input.value=1;
    }
    updatetotal();
}

//Add To Cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var tittle = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var Image = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(tittle,price,Image);
    updatetotal();
}

function addProductToCart(tittle,price,Image){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box")
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title') 
    for(var i=0; i< cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == tittle){
            alert("You have already add this item to cart");
            return;
        }
}

var cartBoxContent = `
<img src="${Image}" alt="" class="cart-img">
<div class="detail-box">
<div class="cart-product-title">₹{tittle}</div>
<div class="cart-price">${price}</div>
<input type="number" value="1" class="cart-quantity">
</div>
<i class="fas fa-trash-alt cart-remove"></i> `;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}


//update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total=0;
    for(var i=0; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + price*quantity;

    }
        // if price contains some floating value
        total = Math.round(total*100)/100;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

