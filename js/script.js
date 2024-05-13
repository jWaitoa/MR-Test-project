// Fetches API and updates the HTML
function updateProductDetails() {
  fetch(
    "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.getElementById("title").textContent = data.title;
      document.getElementById("price").textContent =
        "$" + data.price.toFixed(2);
      document.getElementById("description").textContent = data.description;

      // Displays size options
      const sizeOptionsContainer = document.getElementById("sizeOptions");
      data.sizeOptions.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.label;
        button.classList.add("sizeButton");
        button.addEventListener("click", function () {
          // Removes the 'selected' class from all size options
          sizeOptionsContainer
            .querySelectorAll(".sizeButton")
            .forEach((option) => {
              option.classList.remove("selected");
            });
          // Add the 'selected' class to the clicked size option
          button.classList.add("selected");
          const sizeLabel = document.getElementById("sizeLabel");
          sizeLabel.textContent = option.label; // Updates size text content
        });
        sizeOptionsContainer.appendChild(button);
      });
    });
}

// Calls function when page loads
window.onload = function () {
  updateProductDetails();
};

let shoppingCart = document.querySelector(".shopping-cart");
let card = document.querySelector(".card");
let quantity = document.querySelector(".quantity");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");

let isCartOpen = false;

// Opens / Closes shopping cart
shoppingCart.addEventListener("click", () => {
  if (!isCartOpen) {
    card.classList.add("active");
    shoppingCart.classList.add("active");
    isCartOpen = true;
  } else {
    card.classList.remove("active");
    shoppingCart.classList.remove("active");
    isCartOpen = false;
  }
});

// Add event listener to the Add to Cart button
let currentQuantity = 0;
function addToCart() {
  // Get the selected size
  let selectedSize = document.querySelector(".sizeButton.selected").textContent;
  let title = document.getElementById("title").textContent;
  let price = document.getElementById("price").textContent;
  let quantity = 1;

  var cartRow = document.createElement("div");
  cartRow.innerText = selectedSize;
  var cartItems = document.getElementsByClassName("card")[0];

  // checks if the item is already in the cart
  let itemExists = false;

  // Checks if any items are in cart.
  var cards = document.getElementById("card").childElementCount;
  if (cards > 0) {

    var cards = document.querySelectorAll(".card > div");
    cards.forEach((cartItem) => {
      // Get the size of the current cart item
      let itemSize = cartItem.querySelector(".cart-size").textContent;
      console.log("ItemSize" + itemSize + " SelectedSize " + selectedSize);

      // Check if the current item's size matches the selected size
      if (itemSize === selectedSize) {
        // Increment the quantity of the existing item
        let quantityElement = cartItem.querySelector(".quantity");
        let newQuantity = parseInt(quantityElement.textContent) + 1;
        quantityElement.textContent = newQuantity;
        itemExists = true;
      }
    });
  }
  if (!itemExists) {

    // Creates a new cart row
    var cartRowContents = `
    <div class="cart-row">
        <img class="cart-img" src="images/classic-tee.jpg">
        <div class="cart-column">
            <p>${title}</p>
            <div>
            <span class="quantity">
            ${quantity}
            </span>
            x ${price}
            <p>Size: <span class="cart-size" id="cart-size">${selectedSize}</span></p>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
  }
}
