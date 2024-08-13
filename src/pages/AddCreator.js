import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

// Component for adding a new creator
const AddCreator = () => {
  // State for form fields and error/success messages
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Function to validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!url) newErrors.url = 'URL is required';
    if (!description) newErrors.description = 'Description is required';
    return newErrors;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const { error } = await supabase.from('creators').insert({ name, url, description, imageURL });
    if (error) {
      console.error(error);
      setErrorMessage('An error occurred while adding the creator.');
    } else {
      // Clear form fields and display success message after successful insertion
      setName('');
      setUrl('');
      setDescription('');
      setImageURL('');
      setSuccessMessage('Creator added successfully!');
      navigate('/'); // Navigate to the home page after adding a creator
    }
  };

 
  // Rendering the form to add a creator
  return React.createElement(
    'div',
    { className: 'form-1' },
    React.createElement(
      'form',
      { onSubmit: handleSubmit, className: 'creator-form' },
      // Displaying success and error messages
      successMessage && React.createElement('p', { className: 'success' }, successMessage),
      errorMessage && React.createElement('p', { className: 'error' }, errorMessage),
      // Input field for creator's name
      React.createElement('input', {
        id: 'name',
        value: name,
        onChange: (e) => setName(e.target.value),
        placeholder: 'Name',
        required: true,
        'aria-describedby': errors.name ? 'name-error' : null
      }),
      // Error message for name field
      errors.name && React.createElement('p', { id: 'name-error', className: 'error' }, errors.name),
      // Input field for creator's URL
      React.createElement('input', {
        id: 'url',
        value: url,
        onChange: (e) => setUrl(e.target.value),
        placeholder: 'URL',
        required: true,
        'aria-describedby': errors.url ? 'url-error' : null
      }),
      // Error message for URL field
      errors.url && React.createElement('p', { id: 'url-error', className: 'error' }, errors.url),
      // Textarea for creator's description
      React.createElement('textarea', {
        id: 'description',
        value: description,
        onChange: (e) => setDescription(e.target.value),
        placeholder: 'Description',
        required: true,
        'aria-describedby': errors.description ? 'description-error' : null
      }),
      // Error message for description field
      errors.description && React.createElement('p', { id: 'description-error', className: 'error' }, errors.description),
      // Input field for creator's image URL
      React.createElement('input', {
        id: 'imageURL',
        value: imageURL,
        onChange: (e) => setImageURL(e.target.value),
        placeholder: 'Image URL (optional)'
      }),
      // Submit button for the form
      React.createElement('button', { type: 'submit', className: 'contrast' }, 'Add Creator')
    )
  );
};

export default AddCreator;