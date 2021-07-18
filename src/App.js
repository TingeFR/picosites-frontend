import './App.scss';
import { Provider } from 'react-redux';
import Store from './redux/createStore';
import Main from './components/Main';

function App() {
  return (
    <Provider store={Store}>
      <Main/>
    </Provider>
  );
}

export default App;
