let volunteerData = [];

window.onload = () => {
  loadVolunteers();

  document.getElementById("includeAll")
    .addEventListener("change", loadVolunteers);

  document.getElementById("search")
    .addEventListener("input", handleSearch);
};

async function loadVolunteers() {
  const includeAll = document.getElementById("includeAll").checked;

  volunteerData = await apiGet("getVolunteers", {
    includeAll
  });

  renderVolunteerList(volunteerData);
}

function handleSearch(e) {
  const term = e.target.value.toLowerCase();

  const filtered = volunteerData.filter(v =>
    v.name.toLowerCase().includes(term) ||
    v.id.toLowerCase().includes(term)
  );

  renderVolunteerList(filtered);
}
