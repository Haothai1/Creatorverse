import React, { useEffect, useState } from 'react';
import { supabase } from '../client'; // Importing supabase for database operations
import Card from '../components/Card'; 
import { useNavigate } from 'react-router-dom';

// Component for displaying all creators
const ShowCreators = () => {
  // State for storing the creators
  const [creators, setCreators] = useState([]);
  // Using the navigate hook for navigation
  const navigate = useNavigate();

  // Effect to fetch creators on component 
  useEffect(() => {
    const fetchCreators = async () => {
      console.log('Fetching creators'); // Logging the start of the fetch operation
      let { data: creators, error } = await supabase.from('creators').select('*'); // Fetching all creators
      if (error) {
        console.error('Fetch error:', error); // Logging the error if any
      } else {
        console.log('Creators fetched:', creators); // Logging the fetched creators
        setCreators(creators); // Updating the state with fetched creators
      }
    };
    fetchCreators();
  }, []);

  // Function to handle the navigation to the add creator page
  const handleAddCreator = () => {
    navigate('/add-creator');
  };

  // Rendering the creators
  return React.createElement(
    'div',
    { className: 'show-creators' },
    React.createElement(
      'button',
      { onClick: () => navigate('/') },
      'View Creators'
    ),
    React.createElement(
      'button',
      { onClick: handleAddCreator },
      'Add Creator'
    ),
    creators.length > 0
      ? creators.map((creator) =>
          React.createElement(Card, { key: creator.id, ...creator }) // Mapping creators to Card components
        )
      : React.createElement('p', null, 'No content creators available.') // Displaying a message if no creators are available
  );
};

export default ShowCreators;