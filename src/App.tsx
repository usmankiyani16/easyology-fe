import { useRoutes } from 'react-router-dom';
import './App.css';
import { routes } from './routes/routes';

function App() {
  const pages = useRoutes(routes);
  return <div className="App">{pages}</div>;
}

export default App;
