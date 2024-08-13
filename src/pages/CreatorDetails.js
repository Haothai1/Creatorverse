import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CreatorDetails = () => {
  const { name: encodedName } = useParams();
  const name = decodeURIComponent(encodedName);
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      setIsLoading(true);
      let { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('name', name)
        .single();

      if (error) {
        setError('Failed to fetch creator details');
        console.error('Fetch error:', error);
      } else {
        setCreator(data);
      }
      setIsLoading(false);
    };

    fetchCreator();
  }, [name]);

  if (isLoading) {
    return React.createElement('div', { className: 'loading' }, 'Loading...');
  }

  if (error) {
    return React.createElement('div', { className: 'error' }, error);
  }

  return React.createElement(
    'div',
    { className: 'creator-details' },
    React.createElement(
      'button',
      { 
        onClick: () => navigate('/'),
        className: 'back-button'
      },
      React.createElement(FontAwesomeIcon, { icon: faArrowLeft }),
      ' Back to Creators'
    ),
    React.createElement('h1', null, creator.name),
    React.createElement('img', { 
      src: creator.imageURL, 
      alt: creator.name,
      className: 'creator-image'
    }),
    React.createElement('p', { className: 'creator-description' }, creator.description),
    React.createElement(
      'a',
      { 
        href: creator.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'creator-url'
      },
      React.createElement(FontAwesomeIcon, { icon: faGlobe }),
      ' Visit Creator\'s Page'
    )
  );
};

export default CreatorDetails;