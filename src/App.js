import logo from './logo.svg';
import './App.css';
import RelationVis from './components/RelationVis';

const App = () => {
  return (
    <div>
      <div>
        <h1>ARG</h1>
        <p>Anime Relation Graph Visualization</p>
      </div>
      <div className='app-container'>
        <RelationVis></RelationVis>
      </div>
    </div>
  );
}

export default App;
