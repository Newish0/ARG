import logo from './logo.svg';
import './App.css';
import RelationVis from './components/RelationVis';

const App = () => {
  return (
    <div>
      <h1>Anime Relation Visualization</h1>
      <div className='app-container'>
        <RelationVis></RelationVis>
      </div>
    </div>

  );
}

export default App;
