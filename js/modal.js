async function openModal(evalId) {
  const data = await apiGet("getEvaluationDetails", {
    evaluationId: evalId
  });

  const modal = document.getElementById("modal");

  modal.classList.add("show");

  modal.innerHTML = `
    <div class="modal-content">

      <button onclick="closeModal()">X</button>

      <h3>Splash Evaluation</h3>
      ${renderSplash(data.splash)}

      <h3>CT Evaluation</h3>
      ${renderCT(data.ct)}

      ${
        data.status === "Pending"
          ? renderDecisionForm(evalId)
          : renderFinalResult(data)
      }

    </div>
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}
