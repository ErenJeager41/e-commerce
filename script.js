// Form switching// Form switching// Form switching
const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('signinBtn');
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');
const formTitle = document.getElementById('form-title');

signupBtn.addEventListener('click', () => {
  signupForm.style.display = 'block';
  signinForm.style.display = 'none';
  formTitle.textContent = 'Sign Up';
});

signinBtn.addEventListener('click', () => {
  signupForm.style.display = 'none';
  signinForm.style.display = 'block';
  formTitle.textContent = 'Sign In';
});

// Signup form handler
signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters and include a number or special character.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const user = {
    firstName,
    lastName,
    email,
    password,
  };

  localStorage.setItem(email, JSON.stringify(user));
  alert("Registration successful!");
  signupForm.reset();
});

// Signin form handler
signinForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  if (password.length < 6) {
    alert("Please enter a valid password.");
    return;
  }

  const userData = localStorage.getItem(email);
  if (!userData) {
    alert("User not found. Please register first.");
    return;
  }

  const user = JSON.parse(userData);

  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }

  alert(`Welcome back, ${user.firstName}!`);
  signinForm.reset();
});

// Utility: Email validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Utility: Password strength validation
function validatePassword(password) {
  const regex = /^(?=.*[0-9!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  return regex.test(password);
}
