import './App.css';
import RelationVis from './components/RelationVis';
import { Theme } from './Colors';

const App = () => {
  return (
    <div id="App">
      <div style={{
        borderRadius: "0 0 10px 10px",
        padding: "10px 20px",
        color: "#fff",
        backgroundColor: Theme.primary
      }}>
        <h1 style={{ marginBlock: 0 }}>ARG</h1>
        <p style={{ marginBlock: 0 }}>Anime Relation Graph Visualization</p>
      </div>
      <div style={{ padding: "10px" }} className='main-grid'>
        <RelationVis></RelationVis>
      </div>
    </div>
  );
}

export default App;
