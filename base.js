  // DOM Elements
    const landingPage = document.getElementById('landingPage');
    const authModal = document.getElementById('authModal');
    const openLoginModal = document.getElementById('openLoginModal');
    const openSignupModal = document.getElementById('openSignupModal');
    const closeModal = document.getElementById('closeModal');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const forgotPasswordTab = document.getElementById('forgotPasswordTab');
    const verificationContainer = document.getElementById('verificationContainer');
    const logoutBtn = document.getElementById('logoutBtn');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    // Sample search data (in a real app, this would come from an API)
    const searchData = [
      { title: "Introduction to HTML", category: "ICT Lab", link: "ict.html" },
      { title: "Ethiopian History Videos", category: "Learning Media", link: "media.html" },
      { title: "Mathematics Quiz", category: "Practice Quizzes", link: "quiz.html" },
      { title: "Physics Textbook", category: "Digital Library", link: "library.html" },
      { title: "Science Assignment", category: "Assignments", link: "assignment.html" },
      { title: "Online Calculator", category: "Study Materials", link: "materials.html" },
      { title: "CSS Fundamentals", category: "ICT Lab", link: "ict.html" },
      { title: "Biology Diagrams", category: "Learning Media", link: "media.html" }
    ];

    // Search functionality
    function performSearch(query) {
      if (!query.trim()) {
        searchResults.classList.remove('active');
        return;
      }

      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      );

      displaySearchResults(results);
    }

    function displaySearchResults(results) {
      searchResults.innerHTML = '';

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found. Try a different search term.</div>';
        searchResults.classList.add('active');
        return;
      }

      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <div class="search-result-title">${result.title}</div>
          <div class="search-result-category">${result.category}</div>
        `;
        resultItem.addEventListener('click', () => {
          window.location.href = result.link;
          searchResults.classList.remove('active');
        });
        searchResults.appendChild(resultItem);
      });

      searchResults.classList.add('active');
    }

    // Check login state on page load
    document.addEventListener('DOMContentLoaded', function() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const username = localStorage.getItem('username');
      
      if (isLoggedIn && username) {
        document.body.classList.add('logged-in');
        welcomeMessage.textContent = `Welcome back, ${username}!`;
      }
    });

    // Logout function
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      document.body.classList.remove('logged-in');
      welcomeMessage.textContent = '';
      
      // Reset forms
      document.getElementById('loginForm').reset();
      document.getElementById('signupForm').reset();
      document.getElementById('forgotPasswordForm').reset();
      
      // Hide verification if shown
      document.getElementById('signupForm').style.display = 'block';
      verificationContainer.style.display = 'none';
    });

    // Modal control functions
    function showAuthModal(tab = 'login') {
      authModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Switch to the requested tab
      if (tab === 'signup') {
        document.querySelector('.auth-tab[data-tab="signup"]').click();
      } else {
        document.querySelector('.auth-tab[data-tab="login"]').click();
      }
    }
    
    function hideAuthModal() {
      authModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    // Event listeners for modal control
    openLoginModal.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthModal('login');
    });
    
    openSignupModal.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthModal('signup');
    });
    
    closeModal.addEventListener('click', hideAuthModal);
    
    // Close modal when clicking outside content
    authModal.addEventListener('click', function(e) {
      if (e.target === authModal) {
        hideAuthModal();
      }
    });
    
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.auth-content').forEach(content => {
          content.classList.remove('active');
        });
        
        document.getElementById(`${this.dataset.tab}Tab`).classList.add('active');
      });
    });
    
    // Navigation links
    document.getElementById('showSignupLink').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.auth-tab[data-tab="signup"]').click();
    });
    
    document.getElementById('showLoginLink').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.auth-tab[data-tab="login"]').click();
    });
    
    document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.auth-content').forEach(content => {
        content.classList.remove('active');
      });
      forgotPasswordTab.classList.add('active');
    });
    
    document.getElementById('backToLoginLink').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.auth-tab[data-tab="login"]').click();
    });
    
    // Password toggle functionality
    function setupPasswordToggle(passwordFieldId, toggleButtonId) {
      const passwordField = document.getElementById(passwordFieldId);
      const toggleButton = document.getElementById(toggleButtonId);
      
      toggleButton.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        toggleButton.classList.toggle('fa-eye');
        toggleButton.classList.toggle('fa-eye-slash');
      });
    }
    
    setupPasswordToggle('loginPassword', 'toggleLoginPassword');
    setupPasswordToggle('signupPassword', 'toggleSignupPassword');
    setupPasswordToggle('signupConfirmPassword', 'toggleConfirmPassword');
    
    // Verification code input handling
    const verificationInputs = document.querySelectorAll('.verification-input');
    verificationInputs.forEach(input => {
      input.addEventListener('input', function(e) {
        const value = e.target.value;
        const index = parseInt(this.dataset.index);
        
        if (value.length === 1 && index < verificationInputs.length - 1) {
          verificationInputs[index + 1].focus();
        }
      });
      
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value === '') {
          const index = parseInt(this.dataset.index);
          if (index > 0) {
            verificationInputs[index - 1].focus();
          }
        }
      });
      
      // Prevent non-numeric input
      input.addEventListener('keypress', function(e) {
        if (e.key < '0' || e.key > '9') {
          e.preventDefault();
        }
      });
    });
    
    // Password strength indicator
    document.getElementById('signupPassword').addEventListener('input', function() {
      const password = this.value;
      const strengthBar = document.getElementById('passwordStrengthBar');
      let strength = 0;
      
      // Length check
      if (password.length > 7) strength += 25;
      
      // Contains lowercase
      if (/[a-z]/.test(password)) strength += 25;
      
      // Contains uppercase
      if (/[A-Z]/.test(password)) strength += 25;
      
      // Contains number or special char
      if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
      
      strengthBar.style.width = `${strength}%`;
      
      // Update strength class
      strengthBar.className = 'password-strength-bar';
      if (strength < 50) {
        strengthBar.classList.add('strength-weak');
      } else if (strength < 75) {
        strengthBar.classList.add('strength-medium');
      } else {
        strengthBar.classList.add('strength-strong');
      }
    });
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      
      // Show loading state
      document.getElementById('loginBtnText').style.display = 'none';
      document.getElementById('loginSpinner').style.display = 'block';
      
      // Simple validation
      let isValid = true;
      
      if (!email) {
        document.getElementById('loginEmailError').textContent = 'Username or email is required';
        document.getElementById('loginEmailError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('loginEmailError').style.display = 'none';
      }
      
      if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        document.getElementById('loginPasswordError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('loginPasswordError').style.display = 'none';
      }
      
      if (isValid) {
        // Simulate API call
        setTimeout(() => {
          // Hide loading state
          document.getElementById('loginBtnText').style.display = 'inline';
          document.getElementById('loginSpinner').style.display = 'none';
          
          // In a real app, you would send this to your backend
          console.log('Login submitted:', { email, password });
          
          // Store login state
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', email.split('@')[0]);
          
          // Update UI
          document.body.classList.add('logged-in');
          welcomeMessage.textContent = `Welcome, ${email.split('@')[0]}!`;
          
          hideAuthModal();
        }, 1500);
      } else {
        document.getElementById('loginBtnText').style.display = 'inline';
        document.getElementById('loginSpinner').style.display = 'none';
      }
    });
    
    document.getElementById('signupForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const fullName = document.getElementById('signupFullName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;
      
      // Show loading state
      document.getElementById('signupBtnText').style.display = 'none';
      document.getElementById('signupSpinner').style.display = 'block';
      
      // Simple validation
      let isValid = true;
      
      if (!fullName) {
        document.getElementById('signupFullNameError').textContent = 'Full name is required';
        document.getElementById('signupFullNameError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('signupFullNameError').style.display = 'none';
      }
      
      if (!email) {
        document.getElementById('signupEmailError').textContent = 'Email is required';
        document.getElementById('signupEmailError').style.display = 'block';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('signupEmailError').textContent = 'Please enter a valid email';
        document.getElementById('signupEmailError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('signupEmailError').style.display = 'none';
      }
      
      if (!password) {
        document.getElementById('signupPasswordError').textContent = 'Password is required';
        document.getElementById('signupPasswordError').style.display = 'block';
        isValid = false;
      } else if (password.length < 8) {
        document.getElementById('signupPasswordError').textContent = 'Password must be at least 8 characters';
        document.getElementById('signupPasswordError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('signupPasswordError').style.display = 'none';
      }
      
      if (!confirmPassword) {
        document.getElementById('signupConfirmPasswordError').textContent = 'Please confirm your password';
        document.getElementById('signupConfirmPasswordError').style.display = 'block';
        isValid = false;
      } else if (password !== confirmPassword) {
        document.getElementById('signupConfirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('signupConfirmPasswordError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('signupConfirmPasswordError').style.display = 'none';
      }
      
      if (isValid) {
        // Simulate API call
        setTimeout(() => {
          // Hide loading state
          document.getElementById('signupBtnText').style.display = 'inline';
          document.getElementById('signupSpinner').style.display = 'none';
          
          // Show verification UI
          document.getElementById('verificationEmail').textContent = email;
          document.getElementById('signupForm').style.display = 'none';
          verificationContainer.style.display = 'block';
        }, 1500);
      } else {
        document.getElementById('signupBtnText').style.display = 'inline';
        document.getElementById('signupSpinner').style.display = 'none';
      }
    });
    
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('forgotEmail').value.trim();
      
      // Show loading state
      document.getElementById('forgotBtnText').style.display = 'none';
      document.getElementById('forgotSpinner').style.display = 'block';
      
      // Simple validation
      if (!email) {
        document.getElementById('forgotEmailError').textContent = 'Email is required';
        document.getElementById('forgotEmailError').style.display = 'block';
        document.getElementById('forgotBtnText').style.display = 'inline';
        document.getElementById('forgotSpinner').style.display = 'none';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('forgotEmailError').textContent = 'Please enter a valid email';
        document.getElementById('forgotEmailError').style.display = 'block';
        document.getElementById('forgotBtnText').style.display = 'inline';
        document.getElementById('forgotSpinner').style.display = 'none';
      } else {
        document.getElementById('forgotEmailError').style.display = 'none';
        
        // Simulate API call
        setTimeout(() => {
          // Hide loading state
          document.getElementById('forgotBtnText').style.display = 'inline';
          document.getElementById('forgotSpinner').style.display = 'none';
          
          // Show success message
          document.getElementById('forgotSuccess').textContent = `Password reset link sent to ${email}`;
          document.getElementById('forgotSuccess').style.display = 'block';
          
          // In a real app, you would send a reset link
          console.log('Password reset requested for:', email);
        }, 1500);
      }
    });
    
    // Verify button
    document.getElementById('verifyBtn').addEventListener('click', function() {
      const code = Array.from(verificationInputs).map(input => input.value).join('');
      
      // Show loading state
      document.getElementById('verifyBtnText').style.display = 'none';
      document.getElementById('verifySpinner').style.display = 'block';
      
      if (code.length === 6) {
        // Simulate API call
        setTimeout(() => {
          // Hide loading state
          document.getElementById('verifyBtnText').style.display = 'inline';
          document.getElementById('verifySpinner').style.display = 'none';
          
          // In a real app, you would verify the code with your backend
          console.log('Verification code submitted:', code);
          
          // Store login state
          const email = document.getElementById('verificationEmail').textContent;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', email.split('@')[0]);
          
          // Update UI
          document.body.classList.add('logged-in');
          welcomeMessage.textContent = `Welcome, ${email.split('@')[0]}!`;
          
          hideAuthModal();
          
          // Reset verification UI
          verificationInputs.forEach(input => input.value = '');
          document.getElementById('signupForm').style.display = 'block';
          verificationContainer.style.display = 'none';
          document.getElementById('signupForm').reset();
        }, 1500);
      } else {
        document.getElementById('verifyBtnText').style.display = 'inline';
        document.getElementById('verifySpinner').style.display = 'none';
        alert('Please enter the full 6-digit code');
      }
    });
    
    // Resend code
    document.getElementById('resendCode').addEventListener('click', function(e) {
      e.preventDefault();
      
      // Show loading state
      this.style.display = 'none';
      document.getElementById('resendSuccess').style.display = 'none';
      
      // Simulate API call
      setTimeout(() => {
        // In a real app, you would resend the verification code
        console.log('Resending verification code to:', document.getElementById('verificationEmail').textContent);
        
        // Show success message
        document.getElementById('resendSuccess').style.display = 'block';
        this.style.display = 'inline';
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          document.getElementById('resendSuccess').style.display = 'none';
        }, 3000);
      }, 1000);
    });
    
    // Social login buttons (demo only)
    document.querySelectorAll('[id^="google"], [id^="apple"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.id.includes('Login') ? 'login' : 'signup';
        alert(`${this.textContent.trim()} ${action} would be implemented with OAuth in a real app`);
      });
    });
    
    // Auto-focus first input on tab switch
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        setTimeout(() => {
          if (tabId === 'login') {
            document.getElementById('loginEmail').focus();
          } else if (tabId === 'signup') {
            document.getElementById('signupFullName').focus();
          }
        }, 100);
      });
    });

    // Event listeners for search
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performSearch(searchInput.value);
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !searchBtn.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });