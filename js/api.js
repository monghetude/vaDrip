const API = "https://script.google.com/macros/s/AKfycbxF1RufSWkyhQVrK6GIDsosUbCZUk-LgdeMOkrUDdtqrucXNEDa9v4RtKWGf2gA-eOq/exec";

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
