import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="brand">
          <span className="clipper-cut-emoji">🎬</span> Movie Watch
        </h1>
        <p>&copy; 2025 MovieWatch | bblackjew ENTj. All rights reserved.</p>
        <nav className="footer-nav">
          <a
            href="https://github.com/bblack-jewENT"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/bblack-jewent/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://x.com/moses44044"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.instagram.com/mo.ses_themessiah/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="mailto:mrswartz4@icloud.com"
            aria-label="Contact Email"
          >
            <FaEnvelope size={24} />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
