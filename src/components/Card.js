import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Card = ({ name, url, description, imageURL, onUpdate }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-creator/${encodeURIComponent(name)}`, {
      state: { name, url, description, imageURL, onUpdate }
    });
  };

  return React.createElement(
    'article',
    { className: 'card' },
    React.createElement(
      'div',
      { className: 'card-image-container' },
      React.createElement('div', { 
        className: 'card-image-background',
        style: { backgroundImage: `url(${imageURL})` }
      }),
      React.createElement('img', { 
        src: imageURL, 
        alt: name, 
        className: 'card-image' 
      })
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
            title: 'Visit Creator\'s Page'
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