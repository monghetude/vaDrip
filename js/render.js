console.log("render.js loaded");

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

function renderSplash(s) {
  if (!s) return "<p>No Splash data</p>";

  return `
    <div class="section">

      <p><b>Evaluator:</b> ${s.evaluator}</p>
      <p><b>Recommendation:</b> ${s.recommendation}</p>
      <p><b>Knowledge Areas:</b> ${s.knowledge}</p>

      <p><b>Achieved:</b> ${s.achieved.join(", ")}</p>
      <p><b>Missed:</b> ${s.missed.join(", ")}</p>
      <p><b>Not Applicable:</b> ${s.na.join(", ")}</p>

      <p><b>Comments:</b></p>
      <div class="comment-box">${s.comments}</div>

      <p><b>Evaluation ID:</b> ${s.evalId}</p>

      ${renderSkills(s.skills)}

    </div>
  `;
}

function renderCT(c) {
  if (!c) return "<p>No CT data</p>";

  return `
    <div class="section">

      <p><b>Evaluator:</b> ${c.evaluator}</p>
      <p><b>Recommendation:</b> ${c.recommendation}</p>
      <p><b>Knowledge Areas:</b> ${c.knowledge}</p>

      ${renderSkills(c.skills)}

      <p><b>Comments:</b></p>
      <div class="comment-box">${c.comments}</div>

      <p><b>Evaluation ID:</b> ${c.evalId}</p>

    </div>
  `;
}

function renderSkills(skills) {
  if (!skills) return "";

  return `
    <div class="skills">
      ${skills.map(val => `
        <div class="skill-bar">
          <div class="fill" style="width:${val * 20}%"></div>
        </div>
      `).join("")}
    </div>
  `;
}


