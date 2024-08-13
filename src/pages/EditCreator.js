import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../client';

// Component for editing a creator
const EditCreator = () => {
  // Extracting name from the URL parameters
  const { name: encodedName } = useParams();
  // Decoding the name from the URL
  const name = decodeURIComponent(encodedName);
  // Using the navigate hook for navigation
  const navigate = useNavigate();
  // Using the location hook to access the current location
  const location = useLocation();
  // Setting the initial state for the form fields
  const [url, setUrl] = useState(location.state?.url || '');
  const [description, setDescription] = useState(location.state?.description || '');
  const [imageURL, setImageURL] = useState(location.state?.imageURL || '');
  const [newName, setNewName] = useState(name);
  // State for success and error messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // State to track if the component is currently loading
  const [isLoading, setIsLoading] = useState(!location.state);

  // Effect to fetch creator data if not provided in location state
  useEffect(() => {
    if (!location.state) {
      const fetchCreator = async () => {
        setIsLoading(true);
        let { data: creator, error } = await supabase
          .from('creators')
          .select('*')
          .eq('name', name)
          .single();
        
        if (error) {
          console.error('Fetch error:', error);
          setErrorMessage(`Failed to fetch creator data: ${error.message}`);
        } else if (creator) {
          setUrl(creator.url);
          setDescription(creator.description);
          setImageURL(creator.imageURL);
        } else {
          setErrorMessage('Creator not found.');
        }
        setIsLoading(false);
      };
      fetchCreator();
    }
  }, [name, location.state]);

  // Function to handle form submission for updating the creator
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({ url, description, imageURL, name: newName })
      .eq('name', name);
    
    if (error) {
      console.error('Update error:', error);
      setErrorMessage(`An error occurred while updating the creator: ${error.message}`);
    } else {
      setSuccessMessage('Creator updated successfully!');
      if (location.state?.onUpdate) location.state.onUpdate();
      setTimeout(() => navigate('/'), 2000);
    }
  };

  // Function to handle the deletion of a creator
  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('name', name);
    
    if (error) {
      console.error('Delete error:', error);
      setErrorMessage(`An error occurred while deleting the creator: ${error.message}`);
    } else {
      setSuccessMessage('Creator deleted successfully!');
      if (location.state?.onUpdate) location.state.onUpdate();
      setTimeout(() => navigate('/'), 2000);
    }
  };

  // Displaying a loading message if the component is loading
  if (isLoading) {
    return React.createElement('div', { className: 'form-1' }, 'Loading...');
  }

  // Displaying an error message if there's an error and no data
  if (errorMessage && !url && !description && !imageURL) {
    return React.createElement(
      'div',
      { className: 'form-1' },
      React.createElement('p', { className: 'error' }, errorMessage),
      React.createElement('button', { onClick: () => navigate('/'), className: 'contrast' }, 'Back to Home')
    );
  }

  // The main form for editing the creator
  return React.createElement(
    'div',
    { className: 'form-1' },
    React.createElement(
      'form',
      { onSubmit: handleSubmit, className: 'creator-form' },
      successMessage && React.createElement('p', { className: 'success' }, successMessage),
      errorMessage && React.createElement('p', { className: 'error' }, errorMessage),
      React.createElement('input', {
        value: newName,
        onChange: (e) => setNewName(e.target.value),
        placeholder: 'Name',
        required: true,
      }),
      React.createElement('input', {
        value: url,
        onChange: (e) => setUrl(e.target.value),
        placeholder: 'URL',
        required: true,
      }),
      React.createElement('textarea', {
        value: description,
        onChange: (e) => setDescription(e.target.value),
        placeholder: 'Description',
        required: true,
      }),
      React.createElement('input', {
        value: imageURL,
        onChange: (e) => setImageURL(e.target.value),
        placeholder: 'Image URL (optional)',
      }),
      React.createElement('button', { type: 'submit', className: 'contrast' }, 'Update Creator'),
      React.createElement('button', { type: 'button', onClick: handleDelete, className: 'contrast delete-button' }, 'Delete Creator')
    )
  );
};

export default EditCreator;