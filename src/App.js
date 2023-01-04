import logo from './logo.svg';
import './App.css';
import RelationVis from './components/RelationVis';

const App = () => {
  return (
    <div id="App">
      <div>
        <h1>ARG</h1>
        <p>Anime Relation Graph Visualization</p>
      </div>
      <div className='row fill-height'>
        <RelationVis></RelationVis>
      </div>
    </div>
  );
}

export default App;
