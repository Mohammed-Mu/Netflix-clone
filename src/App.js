import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import "./App.css"
import Banner from './Components/Banner/banner';
import RawPost from './Components/RawPost/RawPost';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <RawPost/>
    </div>
  );
}

export default App;
