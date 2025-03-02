"use client";
import React from "react";

const Template1 = ({
  about,
  header,
  experiences = [],
  educations = [],
  Volunterring = [],
  achievements = [],
  Interests = [],
  skills = [],
  Certificates = [],
}) => {
  return (
    <div className="resume-wrapper">
      <section className="profile section-padding">
        <div className="container">
          {/* Profile Picture Section */}
          <div className="picture-resume-wrapper">
            <div className="picture-resume">
              <span>
                <img
                  src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"
                  alt="Profile"
                />
              </span>
              <svg version="1.1" viewBox="0 0 350 350">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="8"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
                      result="cm"
                    />
                  </filter>
                </defs>

                <g filter="url(#goo)">
                  <circle
                    id="main_circle"
                    className="st0"
                    cx="171.5"
                    cy="175.6"
                    r="130"
                  />
                  <circle
                    id="circle"
                    className="bubble0 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble1 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble2 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble3 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble4 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble5 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble6 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble7 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble8 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble9 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                  <circle
                    id="circle"
                    className="bubble10 st1"
                    cx="171.5"
                    cy="175.6"
                    r="122.7"
                  />
                </g>
              </svg>
            </div>
            <div className="clearfix"></div>
          </div>

          {/* Name Section */}
          <div className="name-wrapper">
            <h1>
              {header?.name?.split(" ")[0]} <br />
              {header?.name?.split(" ").slice(1).join(" ")}
            </h1>
          </div>
          <div className="clearfix"></div>

          {/* Contact Information */}
          <div className="contact-info clearfix">
            <ul className="list-titles">
              <li>Call</li>
              <li>Mail</li>
              <li>Web</li>
              <li>Home</li>
            </ul>
            <ul className="list-content">
              <li>{header?.phone}</li>
              <li>{header?.email}</li>
              <li>
                <a href={header?.website}>{header?.website?.replace("https://", "")}</a>
              </li>
              <li>
                {header?.city}, {header?.country}
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="contact-presentation">
            <p>{about}</p>
          </div>

          {/* Social Links */}
          <div className="contact-social clearfix">
            <ul className="list-titles">
              <li>Twitter</li>
              <li>Dribbble</li>
              <li>Codepen</li>
            </ul>
            <ul className="list-content">
              <li>
                <a href="#">@{header?.name?.toLowerCase().replace(" ", "")}</a>
              </li>
              <li>
                <a href="#">{header?.name?.toLowerCase().replace(" ", "")}</a>
              </li>
              <li>
                <a href="#">{header?.name?.toLowerCase().replace(" ", "")}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience section-padding">
        <div className="container">
          <h3 className="experience-title">Experience</h3>

          <div className="experience-wrapper">
            {experiences.map((exp, index) => (
              <React.Fragment key={index}>
                <div className="company-wrapper clearfix">
                  <div className="experience-title">{exp.company}</div>
                  <div className="time">{exp.months}</div>
                </div>

                <div className="job-wrapper clearfix">
                  <div className="experience-title">{exp.jobtitle}</div>
                  <div className="company-description">
                    <p>{exp.description}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Skills Section */}
          <div className="section-wrapper clearfix">
            <h3 className="section-title">Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index} className="skill-percentage">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Hobbies Section */}
          <div className="section-wrapper clearfix">
            <h3 className="section-title">Hobbies</h3>
            <p>
              {Interests.map((interest, index) => (
                <span key={index}>
                  {interest.interests}
                  {index < Interests.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <div className="clearfix"></div>

      {/* CSS for the resume template */}
      <style jsx>{`
        @import url(https://fonts.googleapis.com/css?family=Varela+Round);
        @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700);

        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }

        html,
        body {
          height: 100%;
        }

        body {
          font-family: 'Open Sans', sans-serif;
          font-size: 16px;
          line-height: 1.5em;
        }

        a {
          color: #66cc99;
          text-decoration: none;
        }

        .clearfix::after {
          content: "";
          display: table;
          clear: both;
        }

        .bold {
          font-weight: 700;
        }

        .resume-wrapper {
          position: relative;
          text-align: center;
          height: 100%;
        }

        .container {
          min-height: 600px;
        }

        .profile {
          background: #fff;
          width: 40%;
          float: left;
          color: #9099a0;
        }

        .profile .name-wrapper {
          float: left;
          width: 60%;
        }

        .profile h1 {
          font-size: 2.5em;
          text-align: left;
          font-family: 'Varela Round', sans-serif;
          color: #4a4e51;
          text-transform: uppercase;
          line-height: 1em;
          padding-top: 40px;
        }

        .profile .picture-resume-wrapper {
          width: 40%;
          display: block;
          float: left;
        }

        .profile .picture-resume {
          width: 220px;
          height: 220px;
          background-size: cover;
          border-radius: 50%;
          margin-right: 0px;
          display: table;
          position: relative;
          overflow: hidden;
        }

        .profile .picture-resume span {
          display: table-cell;
          vertical-align: middle;
          position: relative;
          margin: 0 auto;
          z-index: 10;
          text-align: center;
        }

        .profile .picture-resume img {
          border-radius: 50%;
          width: 130px;
        }

        .profile .contact-info {
          margin-top: 100px;
          font-weight: 300;
        }

        .profile .list-titles {
          float: left;
          text-align: left;
          font-weight: 600;
          width: 40%;
          color: #4a4e51;
        }

        .profile .list-content {
          float: left;
          width: 60%;
          text-align: left;
          font-weight: 300;
        }

        .profile .contact-presentation {
          text-align: left;
          font-weight: 300;
          margin-top: 100px;
          margin-bottom: 100px;
        }

        .profile svg {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .profile .st0,
        .profile .st1 {
          fill: #66cc99;
        }

        .experience {
          background: #3d3e42;
          width: 60%;
          float: left;
          position: relative;
          color: #9099a0;
          font-weight: 300;
          min-height: 100%;
          min-height: 100vh;
        }

        .experience h3.experience-title {
          color: #66cc99;
          text-align: left;
          text-transform: uppercase;
          font-size: 1.2em;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .experience .company-wrapper {
          width: 30%;
          float: left;
          text-align: left;
          padding-right: 5%;
          margin-bottom: 60px;
        }

        .experience .job-wrapper {
          width: 70%;
          float: left;
          text-align: left;
          padding-right: 5%;
          margin-bottom: 60px;
        }

        .experience .experience-title {
          color: white;
          margin-bottom: 15px;
        }

        .section-padding {
          padding: 60px 60px 40px 40px;
        }

        .section-wrapper {
          width: 100%;
          float: left;
          text-align: left;
          color: #9099a0;
          font-weight: 300;
          margin-bottom: 20px;
        }

        .section-wrapper:last-child {
          margin-bottom: 0;
        }

        .section-title {
          color: #66cc99;
          text-transform: uppercase;
          font-size: 1.2em;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .skill-percentage {
          margin-bottom: 10px;
          position: relative;
        }

        .skill-percentage::after {
          content: "";
          width: 100%;
          height: 6px;
          background: #4a4e51;
          display: block;
          margin-top: 3px;
        }

        .skill-percentage::before {
          content: "";
          height: 6px;
          background: #66cc99;
          position: absolute;
          margin-top: 3px;
          bottom: 0;
          width: 0%;
        }

        @media (max-width: 850px) {
          .profile,
          .experience {
            width: 100%;
          }
          
          .profile .name-wrapper {
            float: none;
            width: 100%;
          }
          
          .profile .picture-resume-wrapper {
            float: none;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Template1;