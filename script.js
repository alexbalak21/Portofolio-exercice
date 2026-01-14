// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    // Special handling for home icon - scroll to top
    if (this.classList.contains("home-icon")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

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

// Show popup function
function showPopup(show) {
  const popup = document.getElementById("popup");
  if (show) {
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  } else {
    popup.classList.remove("show");
  }
}

// Popup button close functionality
const popupBtn = document.getElementById("popup-btn");
if (popupBtn) {
  popupBtn.addEventListener("click", function () {
    showPopup(false);
  });
}

// Contact form submission handler
function sendEmail(event) {
  event.preventDefault();
  
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Here you would typically send the form data to a server
  // For now, we'll just show a success message
  const popup = document.getElementById('popup');
  const popupMessage = popup.querySelector('p');
  popupMessage.textContent = 'Thank you for your message! I will get back to you soon.';
  showPopup(true);
  
  // Reset the form
  event.target.reset();
  
  // In a real application, you would send the data to your server here
  // Example using fetch:
  /*
  fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, subject, message })
  })
  .then(response => response.json())
  .then(data => {
    showPopup(true);
    event.target.reset();
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('There was an error sending your message. Please try again later.');
  });
  */
}

// Add recommendation function
function addRecommendation() {
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

  // Show popup message
  showPopup(true);

  // Clear the form
  nameInput.value = "";
  messageInput.value = "";
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

// Initialize - highlight the first nav link by default
window.addEventListener("load", () => {
  document.querySelector("nav a").classList.add("active");
});

// Add animation on scroll for projects, recommendations, and experience
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".project, .recommendation, .experience");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial styles for animation
window.addEventListener("load", () => {
  const elements = document.querySelectorAll(".project, .recommendation, .experience");
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Trigger initial animation
  setTimeout(animateOnScroll, 100);
});

window.addEventListener("scroll", animateOnScroll);
