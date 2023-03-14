const hamburgerMenuBtn = document.querySelector("[data-header-nav-btn]");
const headerNav = document.querySelector("[data-header-nav]");
const bookmarkLogo = document.querySelector(".bookmark");
const emailInput = document.querySelector(".email");
const errorMessage = document.querySelector("[data-error-message]");
const body = document.querySelector("body");
hamburgerMenuBtn.addEventListener("click", () => {
  hamburgerMenuBtn.classList.toggle("nav-open");
  headerNav.classList.toggle("nav-open");
  bookmarkLogo.children[0].classList.toggle("nav-open");
  bookmarkLogo.children[1].children[0].classList.toggle("nav-open");
  bookmarkLogo.children[1].children[1].classList.toggle("nav-open");

  body.classList.toggle("active-body");
});

window.addEventListener("click", (e) => {
  const target = e.target;

  featureTabs(target);
  questionAndAnswers(target);
});

function questionAndAnswers(target) {
  const questionList = target.matches("[data-question]");
  if (questionList) {
    const questionContainer = target.closest("[data-question-container]");
    questionContainer.classList.toggle("active");
  }
}

function featureTabs(target) {
  const tabHeading = target.matches("[aria-controls]") && !target.matches("[aria-selected='true']");
  const activeHeading = document.querySelector("[aria-selected='true']");
  const activeTab = document.querySelector("[data-active-tab]");

  if (tabHeading) {
    target.classList.add("active-tab");
    target.setAttribute("aria-selected", true);
    activeHeading.setAttribute("aria-selected", false);

    const tabNo = target.getAttribute("aria-controls");
    const targetTab = document.querySelector(`#${tabNo}`);

    targetTab.dataset.activeTab = true;
    delete activeTab.dataset.activeTab;
  }
}

const isValidEmail = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // sample@g.co
  return re.test(String(email).toLowerCase());
};

emailInput.addEventListener("keyup", () => {
  if (!isValidEmail(emailInput.value)) {
    emailInput.classList.add("invalid");
    errorMessage.style.setProperty("display", "block");
  } else {
    emailInput.classList.remove("invalid");
    errorMessage.style.setProperty("display", "none");
  }
});

window.addEventListener("load", () => {
  emailInput.value = "";
});
