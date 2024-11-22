// Array to store menu items with pre-loaded dishes
let menuItems = [
  { dishName: "Caesar Salad", description: "Crispy romaine lettuce with Caesar dressing", course: "Starter", price: 8.99 },
  { dishName: "Spaghetti Bolognese", description: "Classic Italian pasta with meat sauce", course: "Main", price: 14.99 },
  { dishName: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", course: "Dessert", price: 6.99 },
  { dishName: "Tomato Soup", description: "Rich and creamy tomato soup", course: "Starter", price: 5.99 },
  { dishName: "Grilled Salmon", description: "Fresh salmon fillet with lemon butter sauce", course: "Main", price: 18.99 },
  { dishName: "Lemon Sorbet", description: "Refreshing citrus sorbet", course: "Dessert", price: 4.99 }
];

// Function to add menu item
function addMenuItem() {
  const dishName = document.getElementById("dishName").value;
  const description = document.getElementById("description").value;
  const course = document.getElementById("course").value;
  const price = parseFloat(document.getElementById("price").value);

  // Ensure all fields are filled
  if (!dishName || !description || !course || isNaN(price)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  // Create new menu item object
  const newItem = { dishName, description, course, price };

  // Add new item to the array
  menuItems.push(newItem);

  // Clear input fields
  document.getElementById("dishName").value = '';
  document.getElementById("description").value = '';
  document.getElementById("price").value = '';

  // Update the display
  updateMenuDisplay();
}

// Function to update the menu display
function updateMenuDisplay() {
  const menuList = document.getElementById("menuItemsList");
  menuList.innerHTML = "";  // Clear the list

  menuItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.dishName} - ${item.course} - $${item.price.toFixed(2)} <button onclick="removeMenuItem('${item.dishName}')">Remove</button>`;
    menuList.appendChild(li);
  });

  // Update total items count
  document.getElementById("totalItems").innerText = menuItems.length;

  // Update average prices by course
  updateAveragePrices();

  // Filter menu by course (All, Starter, Main, Dessert)
  filterMenu();
}

// Function to remove a menu item
function removeMenuItem(dishName) {
  menuItems = menuItems.filter(item => item.dishName !== dishName);
  updateMenuDisplay();
}

// Function to filter menu items based on selected course
function filterMenu() {
  const filterCourse = document.getElementById("filterCourse").value;
  const filteredItems = filterCourse === "All" ? menuItems : menuItems.filter(item => item.course === filterCourse);

  const menuList = document.getElementById("menuItemsList");
  menuList.innerHTML = "";  // Clear the list

  filteredItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.dishName} - ${item.course} - $${item.price.toFixed(2)} <button onclick="removeMenuItem('${item.dishName}')">Remove</button>`;
    menuList.appendChild(li);
  });
}

// Function to update the average prices for each course
function updateAveragePrices() {
  const starterItems = menuItems.filter(item => item.course === "Starter");
  const mainItems = menuItems.filter(item => item.course === "Main");
  const dessertItems = menuItems.filter(item => item.course === "Dessert");

  const starterPrice = starterItems.reduce((acc, item) => acc + item.price, 0) / (starterItems.length || 1);
  const mainPrice = mainItems.reduce((acc, item) => acc + item.price, 0) / (mainItems.length || 1);
  const dessertPrice = dessertItems.reduce((acc, item) => acc + item.price, 0) / (dessertItems.length || 1);

  document.getElementById("starterPrice").innerText = starterPrice.t