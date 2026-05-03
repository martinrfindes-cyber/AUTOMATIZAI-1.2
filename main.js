// Efecto al hacer scroll en el navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Animación de aparición al hacer scroll (reveal)
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Menú móvil
const mobileNav = document.getElementById('mobile-nav');
const hamburger = document.getElementById('hamburger');
const mobileClose = document.getElementById('mobile-nav-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileNav() {
  mobileNav.classList.toggle('open');
}

hamburger.addEventListener('click', toggleMobileNav);
mobileClose.addEventListener('click', toggleMobileNav);
mobileLinks.forEach(link => link.addEventListener('click', toggleMobileNav));

// Chatbot de bienvenida (aparece tras 4 segundos)
const chatbot = document.getElementById('chatbot-widget');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotWa = document.getElementById('chatbot-wa');
const chatbotInfo = document.getElementById('chatbot-info');

let chatbotShown = false;
setTimeout(() => {
  if (!chatbotShown) {
    chatbot.classList.add('show');
    chatbotShown = true;
  }
}, 4000);

function closeChatbot() {
  chatbot.classList.remove('show');
}

chatbotClose.addEventListener('click', closeChatbot);
chatbotWa.addEventListener('click', () => {
  window.open('https://wa.me/1234567890', '_blank');
});
chatbotInfo.addEventListener('click', closeChatbot);

// Popup de salida (exit intent)
const popup = document.getElementById('popup-overlay');
const popupClose = document.getElementById('popup-close');
const popupCta = document.getElementById('popup-cta');

let popupShown = sessionStorage.getItem('popupShown');

function showPopup() {
  if (popupShown) return;
  popup.classList.add('active');
  popupShown = '1';
  sessionStorage.setItem('popupShown', '1');
}

function closePopup() {
  popup.classList.remove('active');
}

if (!popupShown) {
  // Detecta cuando el cursor sale por la parte superior
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) showPopup();
  });
  // En móvil, mostrar tras 30 segundos
  setTimeout(() => showPopup(), 30000);
}

popupClose.addEventListener('click', closePopup);
popupCta.addEventListener('click', closePopup);
popup.addEventListener('click', (e) => {
  if (e.target === popup) closePopup();
});

// Animación de números en el hero
function animateCounter(el, end, duration = 1500) {
  let start = 0;
  const step = end / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      el.textContent = end;
      clearInterval(timer);
      return;
    }
    el.textContent = Math.floor(start);
  }, 16);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.hero-stat .number span').forEach(span => {
        const val = parseInt(span.textContent);
        if (!isNaN(val)) animateCounter(span, val);
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);
