// import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
//@ts-ignore TODO: assign types
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import Bills from './containers/Bills/Bills';
import { useBill } from './hooks/useBill';
import DetailNavigation from './containers/DetailNavigation/DetailNavigation';

function App() {
  const [screen, setScreen] = useState(true)
  //get redux state Bill
  const { isBillSelected } = useBill()

  const handleChange = () => {
    setScreen(!screen)
  }

  return (
    <div className="App">
      <label>
        <Toggle
          defaultChecked={screen}
          onChange={handleChange}
        />
      </label>
      {
        !isBillSelected && <Bills />
      }
      {
        isBillSelected && <DetailNavigation screen={screen} />
      }
    </div>
  );
}

export default App;
