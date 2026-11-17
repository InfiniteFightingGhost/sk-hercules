const copyBtn = document.getElementById("copy-btn");
const copyStatus = document.getElementById("copy-status");
const year = document.getElementById("year");

let resetTimer;

const fallbackCopy = (text) => {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-1000px";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  let succeeded = false;
  try {
    succeeded = document.execCommand("copy");
  } catch (error) {
    succeeded = false;
  }
  field.remove();
  return succeeded;
};

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      return fallbackCopy(text);
    }
  }
  return fallbackCopy(text);
};

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const copied = await copyText(copyBtn.dataset.iban);

    if (copied) {
      copyBtn.textContent = "Копирано";
      copyBtn.classList.add("copied");
      copyStatus.textContent = "IBAN-ът е копиран.";
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        copyBtn.textContent = "Копирай";
        copyBtn.classList.remove("copied");
        copyStatus.textContent = "";
      }, 3500);
    } else {
      copyStatus.textContent = "Неуспешно копиране. Изберете IBAN-а ръчно.";
    }
  });
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}
