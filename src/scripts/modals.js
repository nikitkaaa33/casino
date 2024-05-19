document.addEventListener("DOMContentLoaded", function () {
	function showModal(modalId) {
		const modal = document.getElementById(modalId);
		modal.style.display = "block";
		document.body.style.overflow = "hidden"; // Disable scrolling on body
		setTimeout(() => {
			modal.classList.add("show");
		}, 10);
	}

	function closeModal(modalId) {
		const modal = document.getElementById(modalId);
		modal.classList.remove("show");
		setTimeout(() => {
			modal.style.display = "none";
			document.body.style.overflow = ""; // Re-enable scrolling on body
		}, 400);
	}

	document
		.getElementById("privacy-link")
		.addEventListener("click", () => showModal("privacy-modal"));
	document
		.getElementById("terms-link")
		.addEventListener("click", () => showModal("terms-modal"));
	document
		.getElementById("cookies-link")
		.addEventListener("click", () => showModal("cookies-modal"));

	// Close modal by clicking on the close button
	document.querySelectorAll(".close").forEach((button) => {
		button.addEventListener("click", function () {
			closeModal(this.closest(".modal").id);
		});
	});

	// Optionally close modals by clicking outside the modal content
	document.querySelectorAll(".modal").forEach((modal) => {
		modal.addEventListener("click", function (event) {
			if (event.target === modal) {
				closeModal(modal.id);
			}
		});
	});
});
