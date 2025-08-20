import React from 'react';
import '/SignInRegister.css'; // External CSS for cleaner JSX

const providers = [
  {
    name: 'Facebook',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
  },
  {
    name: 'Google',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg',
  },
  {
    name: 'Apple',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  {
    name: 'Amazon',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
  },
  {
    name: 'Twitter',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Twitter%E3%81%AE%E3%83%AD%E3%82%B4.jpg',
  },
];

const SignInRegister = () => {
  const handleEmailSignUp = (e) => {
    e.preventDefault();
    alert('Signed up with email!');
  };

  return (
    <div className="container">
      {providers.map((provider) => (
        <button className="btn" key={provider.name}>
          <img src={provider.icon} alt={provider.name} />
          Continue with {provider.name}
        </button>
      ))}

      <div className="divider"><span>or</span></div>

      <form onSubmit={handleEmailSignUp}>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit" className="signup-btn">Sign up</button>
      </form>

      <footer>
        &copy; 2025 Commune+. All rights reserved.
      </footer>
    </div>
  );
};

export default SignInRegister;