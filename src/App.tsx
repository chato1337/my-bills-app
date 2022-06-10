import './App.scss';
//@ts-ignore TODO: assign types
import "react-toggle/style.css"
import 'react-toastify/dist/ReactToastify.css';
import MainRoutes from './routes/MainRoutes';

function App() {
  //TODO: set auto percentage
  return (
    <div className="App">
      <MainRoutes />
    </div>
  );
}

export default App;
