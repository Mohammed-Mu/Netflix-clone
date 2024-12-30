import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import "./App.css"
import Banner from './Components/Banner/banner';
import { action, originals, comedy } from './url'
import RawPost from './Components/RawPost/RawPost';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <div className="row-container">
        <RawPost url={originals} title="Netflix Originals" />
      </div>
      <div className="row-container">
        <RawPost url={action} title="Actions" isSmall />
      </div>
      <div className="row-container">
        <RawPost url={comedy} title="ComedyMovies" isSmall />
      </div>
    </div>
  );
}

export default App;
