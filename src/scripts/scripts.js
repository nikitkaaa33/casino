import "../css/styles.css";
import "../css/header.css";
import "../css/places.css";
import "../css/perks.css";

async function loadSection(section) {
	try {
		const response = await fetch(`sections/${section}.html`);
		if (!response.ok) {
			throw new Error(
				`Failed to load ${section}.html: ${response.statusText}`
			);
		}
		const data = await response.text();
		const contentDiv = document.getElementById("content");
		const sectionDiv = document.createElement("div");
		sectionDiv.innerHTML = data;
		contentDiv.appendChild(sectionDiv);
	} catch (error) {
		console.error(error);
	}
}

loadSection("header");
loadSection("places");
loadSection("support");
