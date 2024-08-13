import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';

// Component for displaying all creators
const ShowCreators = () => {
  // State for storing the creators
  const [creators, setCreators] = useState([]);

  // Function to fetch all creators
  const fetchCreators = async () => {
    let { data: creators, error } = await supabase.from('creators').select('*');
    if (error) console.error(error);
    else setCreators(creators);
  };

  // Effect to fetch creators on component 
  useEffect(() => {
    fetchCreators();
  }, []);

  // Rendering the creators
  return React.createElement(
    'div',
    { className: 'card-grid' },
    creators.length > 0
      ? creators.map((creator) =>
          React.createElement(Card, {
            key: creator.id,
            id: creator.id,
            name: creator.name,
            url: creator.url,
            description: creator.description,
            imageURL: creator.imageURL
          })
        )
      : React.createElement('p', null, 'No content creators available.')
  );
};

export default ShowCreators;