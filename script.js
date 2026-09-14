const completedUsers = [
  ["홍길동", "강사팀 > 1팀", "2026. 08. 06 / 14:00"],
  ["홍길동", "축구팀 > 국대", "2026. 08. 06 / 14:00"],
  ["홍길동", "축구팀 > 국대", "2026. 08. 06 / 14:00"],
  ["홍길동", "축구팀 > 국대", "2026. 08. 06 / 14:00"],
];

const progressUsers = [
  ["홍길동", "강사팀 > 1팀", "2026. 08. 06 / 14:00"],
  ["홍길동", "축구팀 > 국대", "2026. 08. 06 / 14:00"],
];

const createRow = ([name, group, date]) => `
  <div class="table-row">
    <strong>${name}</strong>
    <span class="group">${group}</span>
    <time>${date}</time>
    <button class="report-button" type="button" data-toast="${name}님의 결과 리포트를 확인합니다.">결과보기</button>
  </div>
`;

const renderRows = () => {
  document.querySelector("#completed-list").innerHTML = completedUsers.map(createRow).join("");
  document.querySelector("#progress-list").innerHTML = progressUsers.map(createRow).join("");
};

const toast = document.querySelector(".toast");
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
};

document.addEventListener("click", (event) => {
  const toastTarget = event.target.closest("[data-toast]");
  if (toastTarget) showToast(toastTarget.dataset.toast);

  const navItem = event.target.closest(".side-nav__item");
  if (navItem) {
    document.querySelectorAll(".side-nav__item").forEach((item) => item.classList.remove("is-active"));
    navItem.classList.add("is-active");
    if (navItem.dataset.page !== "홈") showToast(`${navItem.dataset.page} 화면은 다음 단계에서 연결할 수 있습니다.`);
  }

  if (event.target.closest("[data-add-row]")) {
    completedUsers.unshift(["새 검사자", "미지정 그룹", "방금 전"]);
    renderRows();
    showToast("검사자 예시 행을 추가했습니다.");
  }
});

renderRows();
