// import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
//@ts-ignore TODO: assign types
import Toggle from 'react-toggle'
import Creditor from './containers/Creditor/Creditor';
import Debtor from './containers/Debtor/Debtor';
import "react-toggle/style.css"
import Bills from './containers/Bills/Bills';

function App() {
  const [screen, setScreen] = useState(true)
  const [billIndex, setBillIndex] = useState<null | number>(null)

  const handleChange = () => {
    setScreen(!screen)
  }

  const handleChangeBill = (value: number) => {
    console.log(value)
    setBillIndex(value)
  }

  return (
    <div className="App">
      <label>
        <Toggle
          defaultChecked={screen}
          onChange={handleChange} />
      </label>
      <Bills actionCallback={handleChangeBill} />
      
      { screen ? <Creditor /> : <Debtor /> }
    </div>
  );
}

export default App;
