const API = "https://script.google.com/macros/s/AKfycbxF1RufSWkyhQVrK6GIDsosUbCZUk-LgdeMOkrUDdtqrucXNEDa9v4RtKWGf2gA-eOq/exec";

async function apiGet(action, params = {}) {
  const query = new URLSearchParams({ action, ...params });
  const res = await fetch(`${API}?${query}`);
  return res.json();
}

async function apiPost(data) {
  const formData = new URLSearchParams();

  Object.keys(data).forEach(key => {
    formData.append(key, JSON.stringify(data[key]));
  });

  await fetch(API, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  });

  return { success: true };
}
