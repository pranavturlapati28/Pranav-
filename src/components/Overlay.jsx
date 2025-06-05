import React from 'react';
import './Overlay.css';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

export default function Overlay({ visible, onClose }) {
  const projects = [
    {
      title: "AI Sports Commentary",
      image: import.meta.env.BASE_URL + "/images/basketball.png",
      description:
        "Built a real-time AI sports commentary tool using OpenAI’s Whisper, Three.js, Blender, and Matplotlib.\nDesigned 3D visual overlays for tactical analysis, with potential deployment for UNC Basketball coaching staff.",
      skills: ["AI", "3D Visualization", "Sports Tech"]
    },
    {
      title: "UNC Website Chatbot Integration",
      image: import.meta.env.BASE_URL + "/images/uncchatbot.png",
      description:
        "Created a documented RESTful API using FastAPI and OpenAPI, serving 12,000+ requests in 3 months.\nIntegrated frontend (Angular) and backend (Python), and led CI/CD deployment using GitHub Actions and Kubernetes.",
      skills: ["API Development", "CI/CD", "Full-Stack"]
    },
    {
      title: "SystemVerilog and Assembly Game Design",
      image: import.meta.env.BASE_URL + "/images/Shell.png",
      description:
        "Designed and implemented a custom CPU using SystemVerilog, building the architecture from logic gates upward.\nDeveloped a simple game using custom assembly language and deployed it on an FPGA.",
      skills: ["FPGA", "SystemVerilog", "Computer Architecture"]
    }
  ];

  if (!visible) return null;

  return (
    <div className="overlay-backdrop" role="dialog" aria-modal="true">
      <div className="overlay-container">
        <button className="close-btn" onClick={onClose} aria-label="Close overlay">✕</button>
        <div className="profile-header">
        <img src={import.meta.env.BASE_URL + 'images/pranav.jpg'} alt="Pranav Turlapati" className="profile-image" />
        <div className="profile-info">
          <h1 className="profile-name">Pranav Turlapati</h1>
          <p className="profile-description">
            Hey my name is Pranav! I am currently a senior at the University of North Carolina at Chapel Hill. My goal is to become a software engineer and work on innovative technologies that make a difference. My current skills are in web development, observability, cloud computing in AWS, and numerous other skills. Reach out for my resume! 
          </p>
          
          <div className="profile-links">
            <a href="https://www.linkedin.com/in/pranavturlapati" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="mailto:pranavturlapati02@gmail.com">
              <FaEnvelope /> Email
            </a>
            <a href="https://github.com/pranavturlapati28" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
          </div>



        </div>
      </div>
        <h2 className="overlay-title">
        {Array.from('My Projects!').map((char, index) => (
          <span
            key={index}
            className="animated-letter"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
        <div className="project-carousel">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <img src={project.image} alt={`${project.title} preview`} />
              <h3>{project.title}</h3>
              <p className="project-description">
              {project.description.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block', marginBottom: '0.4rem' }}>
                  • {line}
                </span>
              ))}
            </p>
              <p className="skills"><strong>Skills:</strong> {project.skills.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
