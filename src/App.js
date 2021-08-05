import Routes from './routes';

import { ToastContainer } from "react-toastify";

import { AppContextProvider } from './context/App';
import { AutenticacaoProvider } from './context/autenticacao';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-credit-cards/es/styles-compiled.css';

function App() {
  return (
    <div className="App">      
      <AppContextProvider>
        <AutenticacaoProvider>
          <Routes />
        </AutenticacaoProvider>
      </AppContextProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
