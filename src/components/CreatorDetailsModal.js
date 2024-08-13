import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTimes } from '@fortawesome/free-solid-svg-icons';

const CreatorDetailsModal = ({ creator, onClose }) => {
  if (!creator) return null;

  return React.createElement(
    'div',
    { className: 'modal-backdrop', onClick: onClose },
    React.createElement(
      'div',
      { className: 'modal-card', onClick: e => e.stopPropagation() },
      React.createElement(
        'button',
        { className: 'close-button', onClick: onClose },
        React.createElement(FontAwesomeIcon, { icon: faTimes })
      ),
      React.createElement(
        'div',
        { className: 'modal-image-container' },
        React.createElement('div', {
          className: 'modal-image-background',
          style: { backgroundImage: `url(${creator.imageURL})` }
        }),
        React.createElement('img', { 
          src: creator.imageURL, 
          alt: creator.name,
          className: 'modal-image'
        })
      ),
      React.createElement(
        'div',
        { className: 'modal-content' },
        React.createElement('h2', { className: 'modal-title' }, creator.name),
        React.createElement('p', { className: 'modal-description' }, creator.description),
        React.createElement(
          'a',
          { 
            href: creator.url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'modal-url'
          },
          React.createElement(FontAwesomeIcon, { icon: faGlobe }),
          ' Visit Creator\'s Page'
        )
      )
    )
  );
};

export default CreatorDetailsModal;