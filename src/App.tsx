// import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
//@ts-ignore TODO: assign types
import Toggle from 'react-toggle'
import Creditor from './containers/Creditor/Creditor';
import Debtor from './containers/Debtor/Debtor';
import "react-toggle/style.css"

function App() {
  const [screen, setScreen] = useState(true)

  const handleChange = () => {
    setScreen(!screen)
  }

  return (
    <div className="App">
      <label>
        <Toggle
          defaultChecked={screen}
          onChange={handleChange} />
      </label>
      { screen ? <Creditor /> : <Debtor /> }
    </div>
  );
}

export default App;
