// Image Slider
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#slider");
  const slides = [...document.querySelectorAll("#slide-wrapper figure")];
  const tabs = [...document.querySelectorAll("#slide-tabs a")];
  let currentSlide = 0;
  let autoplayTimer;

  if (!slider || !slides.length) return;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentSlide;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === currentSlide;
      tab.parentElement.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      showSlide(index);
      startAutoplay();
    });
  });

  slider.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
  slider.addEventListener("mouseleave", startAutoplay);
  slider.addEventListener("focusin", () => clearInterval(autoplayTimer));
  slider.addEventListener("focusout", startAutoplay);

  showSlide(0);
  startAutoplay();
});

// Toggle Contact Address
document.addEventListener("DOMContentLoaded", () => {
  const studentLoginLink = document.getElementById("studentLoginLink");
  const heading = document.getElementById("headingContactUs");
  const dropdown = document.getElementById("contactAddress");

  if (studentLoginLink) {
    studentLoginLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "student-login.html";
    });
  }

  if (heading && dropdown) {
    heading.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });
  }
});

function searchFunction(event){
  event.preventDefault();

  const searchInput = document.querySelector('.js-search-button');
  const searchMessage = document.querySelector('#searchMessage');
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchMessage.textContent = 'Enter a search term.';
    searchInput.focus();
    return false;
  }

  const pageText = document.body.innerText.toLowerCase();
  searchMessage.textContent = pageText.includes(query)
    ? 'This page contains your search term.'
    : 'No match found on this page.';
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("chatbot-toggle");
  const close = document.getElementById("chatbot-close");
  const panel = document.getElementById("chatbot-panel");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const message = document.querySelector(".chatbot-message");

  if (!toggle || !close || !panel || !form || !input || !message) return;

  function setOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.remove("is-closing"));
      input.focus();
      return;
    }

    panel.classList.add("is-closing");
    window.setTimeout(() => {
      if (panel.classList.contains("is-closing")) panel.hidden = true;
    }, 180);
  }

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim().toLowerCase();
    if (!question) return;

    if (question.includes("admission") || question.includes("apply")) {
      message.textContent = "Admissions information is available through the school office and the application link in Quick Information.";
    } else if (question.includes("tour")) {
      message.textContent = "Use Virtual School Tour under Engage or the Virtual Tour panel on this page.";
    } else if (question.includes("contact") || question.includes("phone") || question.includes("email")) {
      message.textContent = "You can find our phone number and email address in the footer under Contact Us.";
    } else {
      message.textContent = "I can help with admissions, a virtual tour, or contacting the school.";
    }
    input.value = "";
  });
});

