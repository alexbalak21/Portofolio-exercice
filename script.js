// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate the position to scroll to, accounting for the fixed header
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active link
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Handle form submission for recommendations
const recommendationForm = document.getElementById("recommendation-form");
if (recommendationForm) {
  recommendationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");

    if (nameInput.value.trim() === "" || messageInput.value.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    // Create new recommendation element
    const recommendationsList = document.getElementById("recommendations-list");
    const newRecommendation = document.createElement("div");
    newRecommendation.className = "recommendation";
    newRecommendation.innerHTML = `
            <p>"${messageInput.value}"</p>
            <p class="recommender">- ${nameInput.value}</p>
        `;

    // Add the new recommendation to the list
    recommendationsList.appendChild(newRecommendation);

    // Show success message
    alert("Thank you for your recommendation!");

    // Reset the form
    this.reset();
  });
}

// Home icon functionality
const homeIcon = document.getElementById("home-icon");
if (homeIcon) {
  homeIcon.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Highlight active navigation link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function highlightNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNav);
