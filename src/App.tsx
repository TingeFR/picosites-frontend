import './App.scss';
import { CookiesProvider } from 'react-cookie';
import MainView from './components/views/MainView';

function App() {
  return (
    <CookiesProvider>
      <MainView/>
    </CookiesProvider>
  );
}

export default App;
