import Routes from './routes';

import { AppContextProvider } from './context/App';
import { AutenticacaoProvider } from './context/autenticacao';

import './styles/global.css';

function App() {
  return (
    <div className="App">      
      <AppContextProvider>
        <AutenticacaoProvider>
          <Routes />
        </AutenticacaoProvider>
      </AppContextProvider>
    </div>
  );
}

export default App;
