import React from 'react';
import { useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import Layout from './components/Layout';
import './App.css';

function App() {
  let routes = useRoutes([
    { path: '/', element: React.createElement(ShowCreators) },
    { path: '/edit-creator/:name', element: React.createElement(EditCreator) },
    { path: '/add-creator', element: React.createElement(AddCreator) }
  ]);

  return React.createElement(Layout, null, routes);
}

export default App;