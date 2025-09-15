// ===== Mobile Menu =====
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.2);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    // Get section's top relative to the document
    const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop, // scroll exactly to section top
      behavior: 'smooth'
    });
  });
});


// ===== Typing Effect =====
const typedPhrases = ["CSE'23 Graduate", "DSA Learner", "Problem Solver"];
let typedIndex = 0, charIndex = 0, currentText = '';
const typingSpeed = 200, erasingSpeed = 50, delayBetween = 2000;
const typedTextSpan = document.getElementById('typed-text');

function type() {
  if (charIndex < typedPhrases[typedIndex].length) {
    currentText += typedPhrases[typedIndex].charAt(charIndex);
    typedTextSpan.innerText = currentText;
    charIndex++;
    setTimeout(type, typingSpeed);
  } else setTimeout(erase, delayBetween);
}
function erase() {
  if (charIndex > 0) {
    currentText = currentText.slice(0, -1);
    typedTextSpan.innerText = currentText;
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    typedIndex = (typedIndex + 1) % typedPhrases.length;
    setTimeout(type, typingSpeed);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  if (typedPhrases.length) setTimeout(type, delayBetween);
});

// ===== Fade-in on Scroll =====
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.2 });
faders.forEach(fader => appearOnScroll.observe(fader));

// ===== Skills Animations =====
(function () {
  function animateValue(el, end, duration) {
    const startTime = performance.now();
    function frame(now) {
      const elapsed = Math.min(now - startTime, duration);
      const value = Math.round(end * (elapsed / duration));
      el.textContent = value + "%";
      if (elapsed < duration) requestAnimationFrame(frame);
      else el.textContent = end + "%";
    }
    requestAnimationFrame(frame);
  }

  function animateSkillBars(container) {
    container.querySelectorAll(".progress").forEach(bar => {
      const v = parseInt(bar.dataset.value, 10);
      setTimeout(() => (bar.style.width = v + "%"), 50);
    });
    container.querySelectorAll(".skill-percent").forEach(num => {
      animateValue(num, parseInt(num.dataset.value, 10), 1200);
    });
  }

  function animateCircular(container) {
    const cp = container.querySelector(".circular-progress");
    const center = container.querySelector(".circle-percent");
    const target = parseInt(container.dataset.perc, 10);
    const duration = 1300;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = Math.min(now - startTime, duration);
      const current = Math.round(target * (elapsed / duration));
      const deg = (current / 100) * 360;
      cp.style.background = `conic-gradient(var(--accent-ring) ${deg}deg, var(--track) ${deg}deg)`;
      center.textContent = current + "%";
      if (elapsed < duration) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      animateSkillBars(skillsSection);
      animateCircular(skillsSection.querySelector(".ak-skills-highlight"));
      obs.unobserve(skillsSection);
    }
  }, { threshold: 0.25 });
  observer.observe(skillsSection);
})();
