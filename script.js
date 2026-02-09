const cart = new Map();

const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function formatCurrency(value) {
  return `GHS ${value}`;
}

function updateCart() {
  cartItems.innerHTML = '';

  if (cart.size === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty';
    emptyMessage.textContent = 'Your cart is empty. Add a flavour to get started.';
    cartItems.appendChild(emptyMessage);
    cartTotal.textContent = formatCurrency(0);
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const row = document.createElement('div');
    row.className = 'cart-item';

    const name = document.createElement('span');
    name.textContent = item.name;

    const quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls';

    const decrement = document.createElement('button');
    decrement.type = 'button';
    decrement.textContent = '–';
    decrement.addEventListener('click', () => updateQuantity(item.name, -1));

    const quantity = document.createElement('span');
    quantity.textContent = item.quantity;

    const increment = document.createElement('button');
    increment.type = 'button';
    increment.textContent = '+';
    increment.addEventListener('click', () => updateQuantity(item.name, 1));

    quantityControls.append(decrement, quantity, increment);

    const price = document.createElement('span');
    price.textContent = formatCurrency(lineTotal);

    row.append(name, quantityControls, price);
    cartItems.appendChild(row);
  });

  cartTotal.textContent = formatCurrency(total);
}

function updateQuantity(name, change) {
  const item = cart.get(name);
  if (!item) {
    return;
  }

  item.quantity += change;
  if (item.quantity <= 0) {
    cart.delete(name);
  }

  updateCart();
}

function handleAddToCart(event) {
  const button = event.currentTarget;
  const name = button.dataset.name;
  const price = Number(button.dataset.price);

  if (cart.has(name)) {
    cart.get(name).quantity += 1;
  } else {
    cart.set(name, { name, price, quantity: 1 });
  }

  updateCart();
}

document.querySelectorAll('.add-btn').forEach((button) => {
  button.addEventListener('click', handleAddToCart);
});

updateCart();
