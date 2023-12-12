import './App.css';
import React from 'react';
import Favorites from './components/favorites.js'
import Search from './components/search.js'
import Meals from './components/meals.js'
import Modal from './components/modal.js'
import { useGlobalContext } from './Context';

function App() {
  
  const {showModal, favorites} = useGlobalContext()
  return (
    <div className="App">
      <Search/>
      { favorites.length > 0 && <Favorites/> }
      <Meals/>
      {showModal && <Modal/>}
    </div>
  );
}

export default App;
