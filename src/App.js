import React from 'react';
import { useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import CreatorDetails from './pages/CreatorDetails';
import Layout from './components/Layout';
import './App.css';

function App() {
  let routes = useRoutes([
    { path: '/', element: React.createElement(ShowCreators) },
    { path: '/edit-creator/:name', element: React.createElement(EditCreator) },
    { path: '/add-creator', element: React.createElement(AddCreator) },
    { path: '/creator/:name', element: React.createElement(CreatorDetails) }
  ]);

  return React.createElement(Layout, null, routes);
}

export default App;