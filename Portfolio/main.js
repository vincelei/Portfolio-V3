// Global variables
let isLoading = true;
let particles = [];
let mouseX = 0;
let mouseY = 0;

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      isLoading = false;
      initAnimations();
    }, 500);
  }, 1500);
});

// Particle System
function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 10,
    size: Math.random() * 3 + 1,
    speedY: Math.random() * 3 + 1,
    speedX: Math.random() * 2 - 1,
    opacity: Math.random() * 0.5 + 0.3,
  };
}

function initParticles() {
  const particlesContainer = document.getElementById("particles");

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Typewriter Effect
function typeWriter() {
  const texts = [
    "professional",
    "amazing",
    "modern",
    "eye-catching",
    "responsive",
    "clean",
    "aesthetic",
    "unique",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById("typewriter");

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
        return;
      }
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    }

    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Navigation Active State
function updateActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

// Header Scroll Effect
function handleHeaderScroll() {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Scroll to Top Button
function handleScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTop");
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

// Intersection Observer for Animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate skill bars
        if (entry.target.classList.contains("skill-category")) {
          const skillBars = entry.target.querySelectorAll(
            ".skill-progress-bar"
          );
          skillBars.forEach((bar) => {
            setTimeout(() => {
              bar.style.width = bar.getAttribute("data-width") + "%";
            }, 200);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Form Handling
function initContactForm() {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(
        `Thanks ${data.name}! Your message has been sent. I'll get back to you soon!`
      );
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Mouse Movement Effect
function initMouseEffects() {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor glow effect
    document.documentElement.style.setProperty("--mouse-x", mouseX + "px");
    document.documentElement.style.setProperty("--mouse-y", mouseY + "px");
  });
}

// Project Demo Functions
function showDemo(projectName) {
  alert(
    `🚀 Opening ${projectName} demo!\n\nThis would normally open the live project in a new tab.`
  );
}

function showGithub(projectName) {
  alert(
    `📱 Opening ${projectName} on GitHub!\n\nThis would normally open the GitHub repository.`
  );
}

// Social Media Functions
function openSocial(platform) {
  const messages = {
    facebook: "Opening facebook profile!",
    github: "Opening GitHub profile!",
    instagram: "Opening Instagram profile!",
  };
  alert(
    messages[platform] +
      "\n\nThis would normally open the social media profile."
  );
}

// Scroll Event Listeners
window.addEventListener("scroll", () => {
  handleHeaderScroll();
  handleScrollTop();
  updateActiveNav();

  // Parallax effect for hero section
  const hero = document.querySelector(".hero");
  const scrolled = window.pageYOffset;
  const parallax = scrolled * 0.5;

  if (hero) {
    hero.style.transform = `translateY(${parallax}px)`;
  }
});

// Scroll to top functionality
document.getElementById("scrollTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Initialize all animations and effects
function initAnimations() {
  initParticles();
  typeWriter();
  initSmoothScrolling();
  initIntersectionObserver();
  initContactForm();
  initMouseEffects();

  // Add stagger animation to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}

// Easter Eggs and Fun Interactions
let clickCount = 0;
document.querySelector(".logo").addEventListener("click", () => {
  clickCount++;
  if (clickCount === 3) {
    alert(
      "VLC | Vince Lei Caventa" +
        "\n\n🎉CodeWithVLC! Thanks for exploring my portfolio!"
    );
    clickCount = 0;
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Press 'h' to go to home
  if (e.key === "h" && !e.ctrlKey && !e.altKey) {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  }
  // Press 'c' to go to contact
  if (e.key === "c" && !e.ctrlKey && !e.altKey) {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  }
});

// Add some dynamic color changes based on time
function updateThemeByTime() {
  const hour = new Date().getHours();
  const root = document.documentElement;

  if (hour >= 6 && hour < 12) {
    // Morning theme
    root.style.setProperty("--primary-color", "#667eea");
    root.style.setProperty("--secondary-color", "#764ba2");
  } else if (hour >= 12 && hour < 18) {
    // Afternoon theme
    root.style.setProperty("--primary-color", "#f093fb");
    root.style.setProperty("--secondary-color", "#f5576c");
  } else {
    // Evening/Night theme
    root.style.setProperty("--primary-color", "#4facfe");
    root.style.setProperty("--secondary-color", "#00f2fe");
  }
}

// Initialize theme
updateThemeByTime();

// Mobile menu functionality (basic implementation)
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Console message for developers
console.log(`
        🚀 Welcome to Alex Chen's Portfolio!
        
        Built with:
        • Vanilla JavaScript
        • CSS3 Animations
        • Intersection Observer API
        • Modern ES6+ Features
        
        Thanks for checking out the code! 
        Feel free to reach out if you have any questions.
        
        Keyboard shortcuts:
        • Press 'h' to go to Home
        • Press 'c' to go to Contact
        • Click the logo 5 times for a surprise!
        `);
