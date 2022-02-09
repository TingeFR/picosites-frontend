import './App.scss';
import { CookiesProvider } from 'react-cookie';
import Main from './components/Main';

function App() {
  return (
    <CookiesProvider>
      <Main/>
    </CookiesProvider>
  );
}

export default App;
