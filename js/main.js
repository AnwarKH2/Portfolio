let currentLang = "en";

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.getElementById("langToggle").textContent =
    lang === "en" ? "AR" : "EN";
}
document.getElementById("langToggle").onclick = () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  applyLanguage(currentLang);
};
const text = {
  en: ["Web Developer", "UI Designer", "3D Designer","translator","Technology teacher"],
  ar: ["مطور ويب", "مصمم واجهات", "مصمم ثلاثي الأبعاد","مترجم","معلم تقنية"]
};

let i = 0, j = 0, deleting = false;

function type() {
  let words = text[currentLang];
  let current = words[i];
  let el = document.getElementById("typing");

  if (!deleting) {
    el.textContent = current.substring(0, j++);
    if (j > current.length) {
      deleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    el.textContent = current.substring(0, j--);

    if (j <= 1) {
      deleting = false;
      i = (i + 1) % words.length;
    }
  }

  setTimeout(type, deleting ? 40 : 80);
}
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    if (card.getBoundingClientRect().top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
});
/* SLIDER */
const slides = document.querySelectorAll(".slides img");
const dotsContainer = document.querySelector(".dots");

let index = 0;

/* create dots */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.onclick = () => showSlide(i);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");

  index = i;
}

/* auto slide */
function autoSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

setInterval(autoSlide, 3000);

/* init */
showSlide(0);
applyLanguage("en");
type();