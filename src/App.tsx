import './App.scss';
//@ts-ignore TODO: assign types
import "react-toggle/style.css"
import BillForm from './components/BillForm/BillForm';
import { useCreateBill } from './hooks/useCreateBill';
import { useBillForm } from './hooks/useFormBill';
import 'react-toastify/dist/ReactToastify.css';
import MainRoutes from './routes/MainRoutes';

function App() {
  //TODO: export to redux state, set auto percentage, generate select currency
  //get redux state Bill
  const { showForm } = useCreateBill()
  const { BillFormToast } = useBillForm()
  
  return (
    <div className="App">
      <BillFormToast />
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
