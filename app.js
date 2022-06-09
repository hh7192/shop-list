// Grabbing elements from DOM
const itemInput = document.querySelector("#item");
const priceInput = document.querySelector("#price");
const quantityInput = document.querySelector("#quantity");
const unitInput = document.querySelector("#unit");
const addButton = document.querySelector("#add-button");
const shopListItem = document.querySelector("#shop-list");
const blankError = document.querySelector("#error");
const totalItemCost = document.querySelector("#total");
const sumValue = document.querySelector("#sum");

// Test Data
const shopList = [
  {
    itemName: "Meat",
    price: 200,
    quantity: 2,
    unitValue: "Kilogram",
    isBought: true,
  },
  {
    itemName: "Cigrette",
    price: 250,
    quantity: 1,
    unitValue: "Box",
    isBought: false,
  },
];

// functions
function updateUI() {
  let result,
    sum = "";
  shopList.forEach((item, i) => {
    result += `
    <tr class="${item.isBought === true ? "bought" : "pending"}">
        <th>${item.itemName}</th>
        <th>${item.price}</th>
        <th>${item.quantity}</th>
        <th>${item.unitValue}</th>
        <th>${item.quantity * item.price}</th>
        <th>
            <button class="btn ${
              item.isBought === true ? "btn-success" : " btn-warning"
            } btn-sm" onclick=itemBought(${i})>
                <i class="fa fa-check" aria-hidden="true"></i>
            </button>
        </th>
        <th>
            <button class="btn btn-danger btn-sm" onclick=deleteItem(${i})>
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </th>
        </tr>
        `;

    shopListItem.innerHTML = result;

    itemInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";

    if (shopList.length === 0)
      return (shopListItem.innerHTML = "There is no item in the list!");
  });
  sum += shopList.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  sumValue.innerHTML = `  ${sum} Tomans`;
}

updateUI();

function addItem(e) {
  e.preventDefault();
  let itemInputVal = itemInput.value;
  let priceInputVal = priceInput.value;
  let quantityInputVal = quantityInput.value;
  let unitInputVal = unitInput.value;
  //   console.log(unitInputVal);

  if (!itemInputVal || !priceInputVal || !quantityInputVal)
    return (
      (blankError.innerHTML = "Please Enter All Values!"),
      setTimeout(() => blankError.remove(), 3000)
    );

  const shoppingItem = {
    itemName: itemInputVal,
    price: priceInputVal,
    quantity: quantityInputVal,
    unitValue: unitInputVal,
    isBought: false,
  };

  shopList.push(shoppingItem);

  totalItemCost.innerHTML = `${priceInputVal * quantityInputVal} Tomans`;

  updateUI();
}

function deleteItem(i) {
  shopList.splice(i, 1);
  updateUI();
}

function itemBought(i) {
  shopList[i].isBought = !shopList[i].isBought;
  updateUI();
}

// events
addButton.onclick = addItem;
