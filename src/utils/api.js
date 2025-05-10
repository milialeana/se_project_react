const baseUrl = "http://localhost:3001";

// Check response
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    return Promise.reject({
      status: res.status,
      message: data.message || `Error: ${res.status}`,
    });
  });
};

// Fetch with token
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
export function getItems() {
  return request(`${baseUrl}/items`);
}

// Add new item
export function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

// Delete an item
export function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

// Add like
export function addCardLike(cardId) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
  });
}

// Remove like
export function removeCardLike(cardId) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
  });
}

// Sign up new user
export function register({ email, password, name, avatar }) {
  return request(`${baseUrl}/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, name, avatar }),
  });
}

// Log in existing user
export function login({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Get current user info
export function getUserInfo() {
  return request(`${baseUrl}/users/me`);
}

// Update user info
export function updateUserInfo({ name, avatar }) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ name, avatar }),
  });
}
