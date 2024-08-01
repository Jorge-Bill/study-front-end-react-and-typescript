import 'h8k-components';
import './App.css';
import WeatherList from './components/WeatherList';

const title = "Weather Dashboard";

function App() {
  return (
    <div className="App">
      <h8k-navbar header={title} data-testId="navbar"></h8k-navbar>
      <WeatherList />
    </div>
  );
}

export default App;
