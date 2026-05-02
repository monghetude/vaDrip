function renderDecisionForm(evalId) {
  return `
    <h3>Decision</h3>

    <select id="decision">
      <option>Pass</option>
      <option>Conditional Pass</option>
      <option>For Reassessment</option>
      <option>For Retraining</option>
    </select>

    <div id="improvements"></div>

    <button onclick="addImprovement()">Add Improvement Area</button>

    <button onclick="submitDecision('${evalId}')">
      Submit
    </button>
  `;
}

function addImprovement() {
  const container = document.getElementById("improvements");

  const div = document.createElement("div");

  div.innerHTML = `
    <select>
      <option>Info - HIV 101</option>
      <option>Info - LY Services</option>
      <option>Info - Prevention</option>
      <option>Info - Treatment</option>
      <option>Info - Testing modalities</option>
      
      <option>Active Listening - Non Verbal</option>
      <option>Active Listening - Asking Questions</option>
      <option>Active Listening - Clarifying</option>
      <option>Active Listening - Reflecting</option>
      <option>Active Listening - Summarizing</option>
      
      <option>Building and/or mainatining rapport</option>
      <option>Expressing empathy</option>
      
      <option>SAC - Presence</option>
      <option>SAC - Empathic Stance</option>
      <option>SAC - Range of Feeling</option>
      <option>SAC - Boundary Awareness</option>
      <option>SAC - Somatic Awareness</option>
      <option>SAC - Courage to challenge</option>
      
      <option>Counseling Process</option>
      <option>HTS Form Mastery</option>
      <option>SOGIE Sensitivity</option>
      <option>Risk Assessment</option>
      <option>Scenario rehearsal (prior results)</option>
      <option>Results interpretation</option>
      <option>Post-test Counseling  & Linkage to Care</option>
      
      <option>Code of ethics</option>
      <option>Unconditional Positive Regard</option>
    </select>

    <input type="text" placeholder="Details">
  `;

  container.appendChild(div);
}

async function submitDecision(evalId) {
  if (!confirm("Submit decision?")) return;

  const rows = [...document.querySelectorAll("#improvements div")];

  const payload = {
    evaluationId: evalId,
    finalDecision: document.getElementById("decision").value,
    improvementCategories: rows.map(r => r.querySelector("select").value),
    improvementNotes: rows.map(r => r.querySelector("input").value),

    // ✅ ADD THESE
    lyId: window.currentEvaluation?.lyId || "",
    nickname: window.currentEvaluation?.name || "",
    achieved: window.currentEvaluation?.achieved || [],
    missed: window.currentEvaluation?.missed || [],
    evaluator: window.currentEvaluation?.evaluator || "",
    evaluatorComments: window.currentEvaluation?.comments || ""
  };

  await apiPost(payload);

  alert("Saved!");
  location.reload();
}
