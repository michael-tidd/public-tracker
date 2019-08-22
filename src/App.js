import React, { Component} from 'react';
import './App.css';
import Map from "./component/map";

require('dotenv').config();

class App extends Component {
  render(){
    return (
      <Map {...this.props}></Map>
    );
  }



}

export default App;
