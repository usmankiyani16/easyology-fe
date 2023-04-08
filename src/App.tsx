import { useRoutes } from 'react-router-dom';
import './App.css';
import { routes } from './routes/routes';
import Loader from './components/common/loader/loader';
import { useAppSelector } from './store/store';

function App() {
  const { isLoading } = useAppSelector(state => state.loader)
  const pages = useRoutes(routes);
  return <div className="App">
    {isLoading && <Loader />}
    {pages}</div>;
}

export default App;
