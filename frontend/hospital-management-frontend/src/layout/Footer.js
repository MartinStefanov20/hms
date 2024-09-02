import React from 'react';
import '../styles/Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} MyHealth. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
