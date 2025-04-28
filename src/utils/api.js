const baseUrl = "http://localhost:3001";

// Check response
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// Fetch wrapper
const request = (url, options = {}) => {
  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, { ...options, headers }).then(checkResponse);
};

// Get all items
function getItems() {
  return request(`${baseUrl}/items`);
}

// Add a new item
function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({ name, link: imageUrl, weather }),
  });
}

// Delete an item
function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

// Like an item
function likeItem(itemId, liked) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ liked }),
  });
}

// Handle Signup
export function signup({ email, password, name, avatar }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password, name, avatar }),
  });
}

// Handle Login
export function login({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Get user info
export function getUserInfo() {
  return request(`${baseUrl}/users/me`);
}

export { getItems, addItem, deleteItem, likeItem, checkResponse };
