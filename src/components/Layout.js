import React from 'react';
import { useNavigate } from 'react-router-dom';

// Component is responsible for rendering the main layout of the application.
const Layout = ({ children }) => {
  // Using the useNavigate hook to navigate between routes.
  const navigate = useNavigate();


  return React.createElement(
    'div',
    { className: 'layout' },
    // Hero section of the layout
    React.createElement(
      'div',
      { className: 'hero' },
      // The title of the application
      React.createElement('h1', null, 'CREATORVERSE'),
      React.createElement(
        'div',
        { className: 'hero-buttons' },
        // Button to navigate to the home page
        React.createElement('button', { onClick: () => navigate('/') }, 'VIEW ALL CREATORS'),
        // Button to navigate to the add creator page
        React.createElement('button', { onClick: () => navigate('/add-creator') }, 'ADD A CREATOR')
      )
    ),
    // Content section of the layout
    React.createElement('main', null, children)
  );
};

export default Layout;