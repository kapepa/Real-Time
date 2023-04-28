import './App.css';
import {Polling} from "./Polling";
import {useState} from "react";
import {Sourcing} from "./Sourcing";

function App() {
  let [way, setWay] = useState('sourcing');
  let onWay = (way) => setWay(way);

  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
          <div className="way">
            <button onClick={() => onWay('polling')} className="way__btn">Polling</button>
            <button onClick={() => onWay('sourcing')} className="way__btn">Sourcing</button>
          </div>
          {way === 'polling' && <Polling/>}
          {way === 'sourcing' && <Sourcing/>}
        </main>
      </header>
    </div>
  );
}

export default App;
