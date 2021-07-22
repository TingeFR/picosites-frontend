import './App.scss';
import { Provider } from 'react-redux';
import Store from './redux/createStore';
import Main from './components/Main';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <Provider store={Store}>
      <CookiesProvider>
        <Main/>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
