const API = "https://script.google.com/macros/s/AKfycbwOMDGkGnzFe4d-f0PEO1MkvM2H65UM5Rf5U9SNSP2pLzk8aWVnH54QOYbynthey_CV/exec";

async function apiGet(action, params = {}) {
  const query = new URLSearchParams({ action, ...params });
  const res = await fetch(`${API}?${query}`);
  return res.json();
}

async function apiPost(data) {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
