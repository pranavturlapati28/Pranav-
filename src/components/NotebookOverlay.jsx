import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import './NotebookOverlay.css'

const jobs = [
  {
    title: 'FinOps Foundation Member',
    company: 'FinOps Foundation',
    dates: 'December 2025 - February 2026',
  },
  {
    title: 'Claude Campus Builder',
    company: 'Anthropic',
    dates: 'September 2025 - February 2026',
  },
  {
    title: 'Undergraduate Research Assistant',
    company: 'University of North Carolina at Chapel Hill',
    dates: 'October 2023 - February 2026',
  },
  {
    title: 'UNC Basketball Data Analytics Intern',
    company: 'UNC Basketball',
    dates: 'June 2023 - January 2024',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Splunk',
    dates: 'July 2025 - August 2025',
  },
  {
    title: 'Software Engineer Intern',
    company: 'Cisco',
    dates: 'May 2025 - July 2025',
  },
]

// Simplified logo row shown for now instead of the full jobs list above.
const logoExperience = [
  {
    company: 'Cisco',
    role: 'SWE Intern',
    logo: 'images/cisco-logo.png',
    ratio: 1280 / 676,
  },
  {
    company: 'Splunk',
    role: 'SWE Intern',
    logo: 'images/splunk-logo.png',
    ratio: 638 / 193,
  },
  {
    company: 'Merget',
    role: 'Founding Engineer',
    logo: 'images/merget-logo.png',
    ratio: 1,
    height: 100,
    color: true,
  },
]

const experience = [
  {
    title: 'MIT ML Deforestation Prediction',
    description:
      'Developed a machine learning model to predict deforestation patterns using satellite/geospatial data. Python - GeoPandas, AWS',
  },
  {
    title: 'Contractor Lead Generation Platform',
    description:
      'Built a platform that generates and manages leads for contractors, streamlining how they find and convert potential clients. Javascript - React, Python - FastAPI, Vercel, GCP',
  },
  {
    title: 'C Self-Made Compiler',
    description:
      'Designed and implemented a compiler from scratch in C, handling lexing, parsing, and code generation for a custom language. C',
  },
  {
    title: 'AI Basketball Visualization',
    description:
      'Built a system that delivers live AI-generated commentary and real-time statistics for basketball games. Langchain, Python',
  },
]

export default function NotebookOverlay({ visible }) {
  return (
    <div className={`notebook-overlay ${visible ? 'notebook-overlay--visible' : ''}`}>
      <div className="notebook-page">
        <div className="notebook-header-row">
          <img
            className="notebook-profile-image"
            src={import.meta.env.BASE_URL + 'images/60281019-9971-466a-b72e-7d9ba0cb03c3.png'}
            alt="Pranav Turlapati"
          />
          <h1 className="notebook-header notebook-name">
            <span className="notebook-name-first">PRANAV</span>{' '}
            <span className="notebook-name-last">TURLAPATI</span>
          </h1>
        </div>
        <div className="notebook-contact-row">
          <a
            href="https://www.linkedin.com/in/pranavturlapati/"
            target="_blank"
            rel="noopener noreferrer"
            className="notebook-contact-link"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://github.com/pranavturlapati28"
            target="_blank"
            rel="noopener noreferrer"
            className="notebook-contact-link"
          >
            <FaGithub /> GitHub
          </a>
          <a href="mailto:pranavturlapati02@gmail.com" className="notebook-contact-link">
            <FaEnvelope /> Email
          </a>
        </div>
        <p className="notebook-bio">
          Hey my name is Pranav. I just graduated from the University of North Carolina at
          Chapel Hill. I am currently working as a founding engineer creating innovative
          developer tools. My current skills are in web+app development, observability,
          cloud infrastructure, and numerous other skills. Reach out for my resume.
        </p>

        <h2 className="notebook-header notebook-section-title">Experience</h2>
        <div className="notebook-logo-row">
          {logoExperience.map((job) => (
            <div className="notebook-logo-item" key={job.company}>
              <div className="notebook-logo-slot">
                {job.color ? (
                  <img
                    className="notebook-logo-image"
                    src={import.meta.env.BASE_URL + job.logo}
                    alt={job.company}
                    style={{ aspectRatio: job.ratio, height: job.height || 56 }}
                  />
                ) : (
                  <div
                    className="notebook-logo-mask"
                    style={{
                      maskImage: `url(${import.meta.env.BASE_URL + job.logo})`,
                      WebkitMaskImage: `url(${import.meta.env.BASE_URL + job.logo})`,
                      aspectRatio: job.ratio,
                      height: job.height || 56,
                    }}
                  />
                )}
              </div>
              <p className="notebook-logo-role">{job.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="notebook-spine-gap" />

      <div className="notebook-page">
        <h2 className="notebook-header notebook-section-title">Languages</h2>
        <p className="notebook-body-text">Python, Rust, Go, C++, JavaScript, C, Java</p>

        <h2 className="notebook-header notebook-section-title">Technologies</h2>
        <p className="notebook-body-text">
          AWS, GCP, Linode + Akamai, nginx, React, NextJS, Vercel, Fly.io, Tauri, git, Github, CUDA.
        </p>

        <h2 className="notebook-header notebook-section-title">Projects</h2>
        {experience.map((item) => (
          <p className="notebook-body-text notebook-experience-item" key={item.title}>
            • <strong>{item.title}</strong>: {item.description}
          </p>
        ))}
      </div>
    </div>
  )
}
