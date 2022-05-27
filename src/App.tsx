import './App.scss';
import { useState } from 'react';
//@ts-ignore TODO: assign types
import Toggle from 'react-toggle'
import "react-toggle/style.css"
// import Bills from './containers/Bills/Bills';
import { useBill } from './hooks/useBill';
// import DetailNavigation from './containers/DetailNavigation/DetailNavigation';
import { useDispatch } from 'react-redux';
import { resetBillSelected } from './redux/billSlice';
import BillForm from './components/BillForm/BillForm';
import { useCreateBill } from './hooks/useCreateBill';
import { useBillForm } from './hooks/useFormBill';
import 'react-toastify/dist/ReactToastify.css';
import MainRoutes from './routes/MainRoutes';

function App() {
  //TODO: export to redux state, set auto percentage, reset form after success, generate select currency
  const [screen, setScreen] = useState(true)
  //get redux state Bill
  const { isBillSelected } = useBill()
  const { showForm, handleShowForm } = useCreateBill()
  const dispatch = useDispatch();
  const { BillFormToast } = useBillForm()

  const handleChange = () => {
    setScreen(!screen)
  }

  const handleResetBill = () => {
    dispatch(resetBillSelected())
    handleShowForm(false)
  }
  
  return (
    <div className="App">
      <BillFormToast />
      <nav>
        <label>
          <Toggle
            defaultChecked={screen}
            onChange={handleChange}
          />
        </label>
        {
          !isBillSelected && <button onClick={() => handleShowForm(!showForm)}>{ !showForm ? 'Nueva deuda:' : 'Cancelar' }</button>
        }
        {
          isBillSelected && <button onClick={handleResetBill}>volver</button>
        }
      </nav>
      {
        // !isBillSelected && <Bills />
      }
      {
        // isBillSelected && <DetailNavigation screen={screen} />
      }
      <MainRoutes />
      {
        showForm && <BillForm />
      }
    </div>
  );
}

export default App;
