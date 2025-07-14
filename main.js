// CLOCK WIDGET
const clockElement = document.getElementById("clock");
const timezoneSelect = document.getElementById("timezone-select");

function updateClock() {
  const tz = timezoneSelect.value === "local" ? undefined : timezoneSelect.value;
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: tz || Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  clockElement.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
}

if (timezoneSelect) {
  timezoneSelect.addEventListener("change", () => {
    localStorage.setItem("preferredTimezone", timezoneSelect.value);
    updateClock();
  });

  const savedTz = localStorage.getItem("preferredTimezone");
  if (savedTz) timezoneSelect.value = savedTz;
  updateClock();
  setInterval(updateClock, 1000);
}

// DARK/LIGHT MODE
const modeBtn = document.getElementById("toggle-mode");
function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem("theme", mode);
}

if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    const current = document.body.className;
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

// COLOR THEMES
const themeSelect = document.getElementById("theme-select");

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;
    document.body.dataset.theme = selectedTheme;
    localStorage.setItem("colorTheme", selectedTheme);
  });

  const savedColorTheme = localStorage.getItem("colorTheme") || "default";
  themeSelect.value = savedColorTheme;
  document.body.dataset.theme = savedColorTheme;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const dobInput = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("pwd").value;
    const confirmPwd = document.getElementById("confirm_pwd").value;
    const role = document.getElementById("role").value;

    const errors = [];

    // Validate name
    if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.push("Name must contain only letters.");
    }

    // Validate username
    if (!/^[A-Za-z]+$/.test(username)) {
      errors.push("Username must contain only letters (no numbers or spaces).");
    }

    // Validate DOB and Age
    if (!dobInput) {
      errors.push("Date of birth is required.");
    } else {
      const dob = new Date(dobInput);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--; // Adjust age if birthday hasn't occurred this year
      }
      if (age < 18) {
        errors.push("You must be at least 18 years old to register.");
      }
    }

    // Validate phone number
    if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      errors.push("Enter a valid phone number.");
    }

    // Validate password strength
    const strongPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPwd.test(password)) {
      errors.push("Password must include uppercase, lowercase, number, special character, and be at least 8 characters long.");
    }

    // Validate confirm password
    if (password !== confirmPwd) {
      errors.push("Passwords do not match.");
    }

    // Final result
    if (errors.length > 0) {
      alert("Please fix the following:\n\n" + errors.join("\n"));
    } else {
      alert(`✅ You have successfully registered as a ${role}.`);
      form.reset();
    }
  });
});