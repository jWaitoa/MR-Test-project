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
      document.getElementById("price").textContent = "$" + data.price.toFixed(2);
      document.getElementById("description").textContent = data.description;
    });
}

// Calls function when page loads
window.onload = function () {
  updateProductDetails();
};

// Sets the sizeLabel's size when button's selected.
function selectButton(size) {
  const sizeLabel = document.getElementById("sizeLabel");
  sizeLabel.textContent = size; // Updates size text content
}

let shoppingCart = document.querySelector(".shopping-cart");
let card = document.querySelector(".card");
let isCartOpen = false;

// Opens / closes shopping cart
function accessCart(){
  if (!isCartOpen) {
    card.classList.add("active");
    shoppingCart.classList.add("active");
    isCartOpen = true;
  } else {
    card.classList.remove("active");
    shoppingCart.classList.remove("active");
    isCartOpen = false;
  }
}

// Adds and updates items in cart
let totalQuantity = 0;
function addToCart() {
  const sizeLabel = document.getElementById("sizeLabel");
  let selectedSize = sizeLabel.textContent;

  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
  }

  else {
    // Increment cart quantity
    totalQuantity++;
    document.querySelector(".quantity").textContent = `(${totalQuantity})`;

    let existingSize = cartHasExistingSize(selectedSize);
    if (!existingSize) {
      // Creates a new item in cart
      createNewRow(selectedSize);
    }
  }
}

// Looks for existing sizes in cart and updates quantity if true.
function cartHasExistingSize(selectedSize) {
  let sizeExists = false;

  if (totalQuantity > 0) {
    var cards = document.querySelectorAll(".card > div");
    // Iterates through each cart item
    cards.forEach((cartItem) => {
      // Get the size of the current cart item
      let cartItemSize = cartItem.querySelector(".cart-size").textContent;

      if (cartItemSize === selectedSize) {
        // Increment the quantity of the current item
        let currentQuantity = cartItem.querySelector(".quantity");
        let updatedQuantity = parseInt(currentQuantity.textContent) + 1;
        currentQuantity.textContent = updatedQuantity;
        sizeExists = true;
      }
    });
  }
  return sizeExists;
}

let currentHeight = 0;
// Creates a new item in shopping cart
function createNewRow(selectedSize) {
  let title = document.getElementById("title").textContent;
  let price = document.getElementById("price").textContent;

  var cartRow = document.createElement("div");
  var cartItems = document.getElementsByClassName("card")[0];

  var cartRowContents = `
    <div class="cart-row">
        <img class="cart-img" src="images/classic-tee.jpg">
        <div class="cart-column">
            <p>${title}</p>
            <div><span class="quantity" id="quantity">1</span> x ${price}</div>
            <p>Size: <span class="cart-size" id="cart-size">${selectedSize}</span></p>
        </div>
    `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

  // Increments height of the cart
  currentHeight += 26;
  document.getElementById("card").style.height = currentHeight + "vh";
}
