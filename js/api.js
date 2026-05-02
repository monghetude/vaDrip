const API = "https://script.google.com/macros/s/AKfycbwOMDGkGnzFe4d-f0PEO1MkvM2H65UM5Rf5U9SNSP2pLzk8aWVnH54QOYbynthey_CV/exec";

async function apiGet(action, params = {}) {
  const query = new URLSearchParams({ action, ...params });
  const res = await fetch(`${API}?${query}`);
  return res.json();
}

async function apiPost(data) {
  const formData = new URLSearchParams();

  formData.append("evaluationId", data.evaluationId);
  formData.append("finalDecision", data.finalDecision);
  formData.append("improvementCategories", JSON.stringify(data.improvementCategories));
  formData.append("improvementNotes", JSON.stringify(data.improvementNotes));
  formData.append("evaluationId", data.evaluationId);
  formData.append("evaluator", data.evaluator || "");
  formData.append("evaluatorComments", data.evaluatorComments || "");

  await fetch(API, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  });

  return { success: true };
}
