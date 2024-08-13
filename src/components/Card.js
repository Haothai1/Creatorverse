import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPenToSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Card = ({ id, name, url, description, imageURL, onUpdate }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-creator/${encodeURIComponent(name)}`, {
      state: { id, name, url, description, imageURL, onUpdate }
    });
  };

  const handleImageClick = () => {
    navigate(`/creator/${encodeURIComponent(name)}`);
  };

  return React.createElement(
    'article',
    { className: 'card' },
    React.createElement(
      'div', 
      { 
        className: 'card-image-container',
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onClick: handleImageClick
      },
      React.createElement('div', { 
        className: 'card-image-background',
        style: { backgroundImage: `url(${imageURL})` }
      }),
      React.createElement('img', { 
        src: imageURL, 
        alt: name, 
        className: 'card-image' 
      }),
      isHovered && React.createElement(
        'div',
        { className: 'info-overlay' },
        React.createElement(
          'div',
          { className: 'info-content' },
          React.createElement(FontAwesomeIcon, { icon: faInfoCircle, className: 'info-icon' }),
          React.createElement('span', { className: 'info-text' }, 'View Details')
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'card-content' },
      React.createElement('h2', { className: 'card-title' }, name),
      React.createElement('p', { className: 'card-description' }, description),
      React.createElement(
        'div',
        { className: 'card-actions' },
        React.createElement(
          'a',
          { 
            href: url, 
            target: '_blank', 
            rel: 'noopener noreferrer',
            className: 'icon-button',
            title: 'Visit Creator\'s Page',
            onClick: (e) => e.stopPropagation()
          },
          React.createElement(FontAwesomeIcon, { icon: faGlobe })
        ),
        React.createElement(
          'button',
          { 
            onClick: handleEdit,
            className: 'icon-button',
            title: 'Edit Creator'
          },
          React.createElement(FontAwesomeIcon, { icon: faPenToSquare })
        )
      )
    )
  );
};

export default Card;