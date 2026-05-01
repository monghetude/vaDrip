function renderVolunteerList(list) {
  const container = document.getElementById("volunteerList");
  container.innerHTML = "";

  list.forEach(v => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card">
        <b>${v.name}</b> (${v.id})
        <button onclick="toggleEvaluations('${v.id}')">View</button>
        <div id="eval-${v.id}" class="hidden"></div>
      </div>
    `;

    container.appendChild(div);
  });
}

async function toggleEvaluations(id) {
  const container = document.getElementById(`eval-${id}`);

  if (!container.classList.contains("hidden")) {
    container.classList.add("hidden");
    return;
  }

  const data = await apiGet("getEvaluations", { volunteerId: id });

  container.innerHTML = data.map(e => `
    <div>
      <a href="#" onclick="openModal('${e.evalId}')">
        ${e.evalId}
      </a> (${e.status})
    </div>
  `).join("");

  container.classList.remove("hidden");
}
