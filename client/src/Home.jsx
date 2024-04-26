import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { color } from './shared/utils/styles';
import { media } from './shared/utils/global';
import docImage from '../src/assets/doc.png';
import projectImage from '../src/assets/project.png';
import groupImage from '../src/assets/group.png';


// Styled components
export const Container = styled.div`
  background-color: ${color.gray};
  color: ${color.text};
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: ${color.blue};
  color: ${color.white};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.medium2`
    flex-direction: column;
    align-items: center;
  `}
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 2rem;
    height: auto;
    margin-right: 0.5rem;
  }

  & > h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const NavbarLinks = styled.div`
  display: flex;
`;

export const Button = styled(Link)`
  background-color: ${color.white};
  color: ${color.blue};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${color.hover};
  }
`;

export const Hero = styled.section`
  background: ${color.white};
  color: ${color.black};
  padding: 4rem 2rem;
  text-align: center;
  & > img {
    margin-top: 5%;
    width: 45.5%; /* Adjust width as needed */
    height: auto; /* Maintain aspect ratio */
  }
`;

export const Features = styled.section`
  background-color: ${color.white};
  color: ${color.text};
  text-align: center;
  & > img {
    margin-top: 5%;
    width: 60.5%; /* Adjust width as needed */
    height: auto; /* Maintain aspect ratio */
  }
`;

export const Projects = styled.section`
  background-color: ${color.white};
  color: ${color.black};
  padding: 4rem 2rem;
  text-align: center;

  & > img {
    margin-top: 2%;
    width: 4.5%; /* Adjust width as needed */
    height: auto; /* Maintain aspect ratio */
  }
`;

export const Footer = styled.footer`
  background-color: ${color.blue};
  color: ${color.white};
  padding: 2rem;
  text-align: center;
`;

// HomePage component
function HomePage() {
  return (
    <Container>
      {/* Navigation Bar */}
      <Header>
        <Logo>
          <img src="favicon.png" alt="Protasker Logo" />
          <h1>Protasker</h1>
        </Logo>
        <NavbarLinks>
          <Button to="/log">Try Protasker</Button>
        </NavbarLinks>
      </Header>

      {/* Hero Section */}
      <Hero>
        <div>
          <h2>Your tasks, docs, & projects. Together.</h2>
          <p>Organize your work, collaborate with your team, and get things done efficiently with Protasker.</p>
        </div>
        <img src={groupImage} alt="group" />
      </Hero>

      {/* Features Section */}
      <Features>
        <div>
          <h2>The next generation of notes & docs</h2>
          <p>Simple. Powerful. Beautiful. Communicate more efficiently with Protasker’s flexible building blocks.</p>
          <img src={docImage} alt="doc" />
        </div>
      </Features>

      {/* Projects Section */}
      <Projects>
        <div>
          <h2>Projects</h2>
          <p>The "Project" component creates a web dashboard with tabs for managing tasks, notes, and project details. Users can easily switch between tabs, and each tab displays its relevant content (e.g., task list, notes, project details). The design is clean and user-friendly, featuring a title ("Protasker") and a responsive layout.</p>
          <img src={projectImage} alt="project" />
        </div>
      </Projects>

      {/* Footer */}
      <Footer>
        <div>
          <p>&copy; 2024 Protasker. All rights reserved.</p>
        </div>
      </Footer>
    </Container>
  );
}

export default HomePage;
