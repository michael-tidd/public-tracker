import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const element = document.getElementById('root');


function getReactAttributes(element){
  let attributeModel = {};

  if (element.hasAttributes()) {
    const attrs = element.attributes;

    for(let i = attrs.length - 1; i >= 0; i--) {
      if(attrs[i].value){
        attributeModel[attrs[i].name] = attrs[i].value;
      } else {
        attributeModel[attrs[i].name] = "1";
      }

    }
  }

  return attributeModel;
}

ReactDOM.render(<App {...getReactAttributes(element)} />, element);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
