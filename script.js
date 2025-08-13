// ========== INITIALIZATION ========== //
document.addEventListener("DOMContentLoaded", function () {
  initializeParticles();
  initializeTypingEffect();
  initializeTilt();
  initializeAOS();
  initializeScrollEffects();
  initializeNavigation();
  initializeContactForm();
  initializeBackToTop();
});

// ========== PARTICLES.JS BACKGROUND ========== //
function initializeParticles() {
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#8e44ad", "#c084fc", "#a855f7"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#8e44ad",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// ========== TYPING EFFECT ========== //
function initializeTypingEffect() {
  const typedElement = document.getElementById("typed-text");
  if (typedElement && window.Typed) {
    new Typed("#typed-text", {
      strings: [
        "Software Developer",
        "AI Specialist",
        "Web Developer",
        "Problem Solver",
        "Tech Enthusiast",
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });
  }
}

// ========== TILT.JS 3D EFFECTS ========== //
function initializeTilt() {
  if (window.VanillaTilt) {
    // Tilt effect for cards and elements
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
      scale: 1.05,
      transition: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
    });

    // Special tilt for floating cube
    VanillaTilt.init(document.querySelectorAll(".floating-cube"), {
      max: 35,
      speed: 300,
      glare: true,
      "max-glare": 0.8,
      scale: 1.1,
      gyroscope: true,
    });

    // Subtle tilt for skill categories
    VanillaTilt.init(document.querySelectorAll(".skill-category"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.02,
    });

    // Tilt for project cards
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
      max: 20,
      speed: 400,
      glare: true,
      "max-glare": 0.4,
      scale: 1.05,
    });
  }
}

// ========== AOS (ANIMATE ON SCROLL) ========== //
function initializeAOS() {
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
      delay: 0,
    });
  }
}

function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  let lastScrollTop = 0;
  let ticking = false;

  // Navbar scroll effect and show/hide on scroll direction
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > 50) {
          navbar.style.background = "rgba(15, 15, 15, 0.95)";
          navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.3)";
        } else {
          navbar.style.background = "rgba(15, 15, 15, 0.9)";
          navbar.style.boxShadow = "none";
        }

        if (scrollTop > lastScrollTop) {
          // Scrolling down - hide navbar
          navbar.style.transform = "translateY(-100%)";
          navbar.style.transition = "transform 0.3s ease";
        } else {
          // Scrolling up - show navbar
          navbar.style.transform = "translateY(0)";
          navbar.style.transition = "transform 0.3s ease";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
      });

      ticking = true;
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Update active navigation link on scroll
  window.addEventListener("scroll", updateActiveNavLink);
}

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ========== SCROLL EFFECTS ========== //
function initializeScrollEffects() {
  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-cube");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Fade in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });
}

// ========== CONTACT FORM ========== //
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual form submission logic)
      setTimeout(() => {
        // Reset form
        this.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success modal
        const successModal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        successModal.show();

        // Add success animation
        const successIcon = document.querySelector(".success-animation i");
        successIcon.style.animation = "none";
        setTimeout(() => {
          successIcon.style.animation = "successPulse 1.5s ease-in-out";
        }, 10);
      }, 2000);
    });

    // Form field animations
    const formInputs = contactForm.querySelectorAll(".form-control");
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        if (this.value === "") {
          this.parentElement.classList.remove("focused");
        }
      });

      input.addEventListener("input", function () {
        if (this.value !== "") {
          this.parentElement.classList.add("filled");
        } else {
          this.parentElement.classList.remove("filled");
        }
      });
    });
  }
}

// ========== BACK TO TOP BUTTON ========== //
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// ========== SKILL PROGRESS ANIMATION ========== //
function animateSkillProgress() {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    const progressBar = bar.querySelector(".progress-bar");

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  });
}

// ========== COUNTER ANIMATION ========== //
function animateCounters() {
  const counters = document.querySelectorAll(".fact-card h4");

  counters.forEach((counter) => {
    const target = parseFloat(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current * 100) / 100;
      if (counter.textContent.includes(".")) {
        counter.textContent = counter.textContent;
      } else {
        counter.textContent = Math.floor(current);
      }
      if (target > 10) {
        counter.textContent = Math.floor(current) + "+";
      }
    }, 50);
  });
}

// ========== ENHANCED HOVER EFFECTS ========== //
function initializeHoverEffects() {
  // Social icons hover effect
  const socialIcons = document.querySelectorAll(".social-icon");
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) rotateY(360deg) scale(1.1)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateY(0deg) scale(1)";
    });
  });

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const image = this.querySelector(".project-image");
      if (image) {
        image.style.transform = "scale(1.05)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const image = this.querySelector(".project-image");
      if (image) {
        image.style.transform = "scale(1)";
      }
    });
  });
}

// ========== CURSOR TRAIL EFFECT ========== //
function initializeCursorTrail() {
  const cursor = document.createElement("div");
  cursor.className = "cursor-trail";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Add cursor trail styles
  const style = document.createElement("style");
  style.textContent = `
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(192, 132, 252, 0.5) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        }
    `;
  document.head.appendChild(style);
}

// ========== THEME TOGGLE (OPTIONAL) ========== //
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("light-theme");

      const icon = this.querySelector("i");
      if (document.body.classList.contains("light-theme")) {
        icon.className = "fas fa-moon";
      } else {
        icon.className = "fas fa-sun";
      }
    });
  }
}

// ========== LOADING SCREEN ========== //
function initializeLoadingScreen() {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
        <div class="loader-content">
            <div class="cube-loader">
                <div class="cube-face front"></div>
                <div class="cube-face back"></div>
                <div class="cube-face right"></div>
                <div class="cube-face left"></div>
                <div class="cube-face top"></div>
                <div class="cube-face bottom"></div>
            </div>
            <h3 class="loader-text">Loading Portfolio...</h3>
        </div>
    `;
  document.body.appendChild(loader);

  // Add loader styles
  const style = document.createElement("style");
  style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-black);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .cube-loader {
            width: 60px;
            height: 60px;
            margin: 0 auto 2rem;
            transform-style: preserve-3d;
            animation: cubeRotate 2s infinite linear;
        }
        
        .cube-loader .cube-face {
            position: absolute;
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, var(--primary-purple), var(--neon-purple));
            border: 1px solid var(--neon-purple);
        }
        
        .cube-loader .front { transform: rotateY(0deg) translateZ(30px); }
        .cube-loader .back { transform: rotateY(180deg) translateZ(30px); }
        .cube-loader .right { transform: rotateY(90deg) translateZ(30px); }
        .cube-loader .left { transform: rotateY(-90deg) translateZ(30px); }
        .cube-loader .top { transform: rotateX(90deg) translateZ(30px); }
        .cube-loader .bottom { transform: rotateX(-90deg) translateZ(30px); }
        
        @keyframes cubeRotate {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        .loader-text {
            color: var(--neon-purple);
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            font-size: 1.2rem;
            animation: pulse 1.5s ease-in-out infinite;
        }
    `;
  document.head.appendChild(style);

  // Hide loader after page load
  window.addEventListener("load", function () {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1000);
  });
}

// ========== INTERACTIVE BACKGROUND ========== //
function initializeInteractiveBackground() {
  document.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Move particles container slightly
    const particlesContainer = document.getElementById("particles-js");
    if (particlesContainer) {
      const translateX = (mouseX - 0.5) * 20;
      const translateY = (mouseY - 0.5) * 20;
      particlesContainer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    // Move floating cube
    const floatingCube = document.querySelector(".floating-cube");
    if (floatingCube) {
      const rotateX = (mouseY - 0.5) * 10;
      const rotateY = (mouseX - 0.5) * 10;
      floatingCube.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });
}

// ========== MOBILE OPTIMIZATIONS ========== //
function initializeMobileOptimizations() {
  // Disable hover effects on touch devices
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");

    // Add touch-specific styles
    const style = document.createElement("style");
    style.textContent = `
            .touch-device .project-card:hover,
            .touch-device .skill-category:hover,
            .touch-device .timeline-card:hover {
                transform: none;
            }
            
            .touch-device [data-tilt] {
                transform: none !important;
            }
        `;
    document.head.appendChild(style);
  }

  // Optimize animations for mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // Reduce particle count on mobile
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.number.value = 50;
    }

    // Disable complex animations on mobile
    document.body.classList.add("mobile-device");
  }
}

// ========== KEYBOARD NAVIGATION ========== //
function initializeKeyboardNavigation() {
  document.addEventListener("keydown", function (e) {
    // Press 'H' to go to home
    if (e.key === "h" || e.key === "H") {
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    }

    // Press 'A' to go to about
    if (e.key === "a" || e.key === "A") {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    }

    // Press 'P' to go to projects
    if (e.key === "p" || e.key === "P") {
      document
        .getElementById("projects")
        .scrollIntoView({ behavior: "smooth" });
    }

    // Press 'C' to go to contact
    if (e.key === "c" || e.key === "C") {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }

    // Press Escape to close modals
    if (e.key === "Escape") {
      const modals = document.querySelectorAll(".modal.show");
      modals.forEach((modal) => {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
          bsModal.hide();
        }
      });
    }
  });
}

// ========== PERFORMANCE MONITORING ========== //
function initializePerformanceMonitoring() {
  // Monitor frame rate
  let frameCount = 0;
  let lastTime = performance.now();

  function countFrames() {
    frameCount++;
    const currentTime = performance.now();

    if (currentTime - lastTime >= 1000) {
      const fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;

      // Reduce effects if FPS is low
      if (fps < 30) {
        document.body.classList.add("low-performance");
      } else {
        document.body.classList.remove("low-performance");
      }
    }

    requestAnimationFrame(countFrames);
  }

  requestAnimationFrame(countFrames);

  // Add low performance styles
  const style = document.createElement("style");
  style.textContent = `
        .low-performance * {
            animation-duration: 0.1s !important;
            transition-duration: 0.1s !important;
        }
        
        .low-performance .floating-cube,
        .low-performance .cube {
            animation: none !important;
        }
        
        .low-performance #particles-js {
            display: none;
        }
    `;
  document.head.appendChild(style);
}

// ========== EASTER EGGS ========== //
function initializeEasterEggs() {
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      activateEasterEgg();
      konamiCode = [];
    }
  });

  function activateEasterEgg() {
    // Rainbow mode
    document.body.classList.add("rainbow-mode");

    const style = document.createElement("style");
    style.textContent = `
            .rainbow-mode {
                animation: rainbowBackground 3s linear infinite;
            }
            
            @keyframes rainbowBackground {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            
            .rainbow-mode .neon-text {
                animation: rainbowText 1s linear infinite;
            }
            
            @keyframes rainbowText {
                0% { color: #ff0000; }
                16% { color: #ff8000; }
                33% { color: #ffff00; }
                50% { color: #00ff00; }
                66% { color: #0080ff; }
                83% { color: #8000ff; }
                100% { color: #ff0080; }
            }
        `;
    document.head.appendChild(style);

    // Show easter egg message
    setTimeout(() => {
      alert("🎉 Easter egg activated! Rainbow mode enabled!");
    }, 500);

    // Disable after 10 seconds
    setTimeout(() => {
      document.body.classList.remove("rainbow-mode");
    }, 10000);
  }
}

// ========== CONSOLE WELCOME MESSAGE ========== //
function showConsoleWelcome() {
  const styles = [
    "color: #c084fc",
    "font-size: 20px",
    "font-weight: bold",
    "text-shadow: 0 0 10px #c084fc",
  ].join(";");

  console.log("%c🚀 Welcome to Leelam Yadu's Portfolio!", styles);
  console.log(
    "%cThanks for checking out the code! 💻",
    "color: #8e44ad; font-size: 14px;"
  );
  console.log(
    "%cFeel free to reach out: leelamyadu29@gmail.com",
    "color: #a855f7; font-size: 12px;"
  );
  console.log(
    "%c⚡ Built with HTML, CSS, JavaScript, and lots of ☕",
    "color: #c084fc; font-size: 12px;"
  );
}

// ========== ANALYTICS (OPTIONAL) ========== //
function initializeAnalytics() {
  // Track section views
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id;
          // You can send this data to your analytics service
          console.log(`Section viewed: ${sectionName}`);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  // Track button clicks
  document.addEventListener("click", function (e) {
    if (e.target.matches(".btn, .social-icon, .nav-link")) {
      const elementType = e.target.className;
      const elementText = e.target.textContent || e.target.title;
      console.log(`Button clicked: ${elementType} - ${elementText}`);
    }
  });
}

// ========== ACCESSIBILITY ENHANCEMENTS ========== //
function initializeAccessibility() {
  // Skip to content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link sr-only";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-purple);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content id
  const heroSection = document.getElementById("home");
  if (heroSection) {
    heroSection.id = "main-content";
    heroSection.setAttribute("tabindex", "-1");
  }

  // Announce page changes for screen readers
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", "polite");
  announcer.setAttribute("aria-atomic", "true");
  announcer.className = "sr-only";
  document.body.appendChild(announcer);

  // Announce section changes
  window.addEventListener(
    "scroll",
    debounce(function () {
      const currentSection = getCurrentSection();
      if (currentSection) {
        announcer.textContent = `Now viewing ${currentSection} section`;
      }
    }, 1000)
  );
}

// ========== UTILITY FUNCTIONS ========== //
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getCurrentSection() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

  for (let section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      return section.id;
    }
  }
  return null;
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ========== INITIALIZE ALL FEATURES ========== //
document.addEventListener("DOMContentLoaded", function () {
  // Core functionality
  initializeParticles();
  initializeTypingEffect();
  initializeTilt();
  initializeAOS();
  initializeScrollEffects();
  initializeNavigation();
  initializeContactForm();
  initializeBackToTop();

  // Enhanced features
  initializeHoverEffects();
  initializeInteractiveBackground();
  initializeMobileOptimizations();
  initializeKeyboardNavigation();
  initializeAccessibility();

  // Optional features
  initializeLoadingScreen();
  initializePerformanceMonitoring();
  initializeEasterEggs();
  initializeAnalytics();

  // Welcome message
  showConsoleWelcome();

  // Animate counters when about section is visible
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(aboutSection);
  }
});

// ========== WINDOW LOAD EVENT ========== //
window.addEventListener("load", function () {
  // Additional initialization after all resources are loaded
  document.body.classList.add("loaded");

  // Initialize cursor trail (only on desktop)
  if (window.innerWidth > 768) {
    initializeCursorTrail();
  }
});
