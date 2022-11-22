import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [niceChildren, setNiceChilds] = useState([]);
  const [naughtyChildren, setNaughtChilds] = useState([]);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(true);

// GETTERS
  const fetchNiceChildren = async() => {
    try {      
      const response = await axios.get("/api/niceList");
      setNiceChilds(response.data);
    } catch(error) {
      setError("error retrieving nice children: " + error);
    }
  }
  const fetchNaughtyChildren = async() => {
    try {      
      const response = await axios.get("/api/naughtyList");
      setNaughtChilds(response.data);
    } catch(error) {
      setError("error retrieving naughty children: " + error);
    }
  }
  
  
// SETTERS
  const createNiceChild = async(child) => {
    console.log(child);
    try {
      await axios.post("/api/niceList", {name: child.name, score: 1, good: child.good, bad: child.bad});
    } catch(error) {
      setError("error adding a new nice child: " + error);
    }
  }
  const createNaughtyChild = async(child) => {
    console.log(child);
    try {
      await axios.post("/api/naughtyList", {name: child.name, score: -1, good: child.good, bad: child.bad});
    } catch(error) {
      setError("error adding a new naughty child: " + error);
    }
  }

  
// DELETERS
  const deleteFromNiceList = async(child) => {
    console.log(child);
    try {
      await axios.delete("/api/niceList/" + child.id);
      // fetchNaughtyChildren();
      updateList();
   } catch(error) {
      setError("error removing a nice child: " + error);
    }
  }
  const deleteFromNaughtyList = async(child) => {
    console.log(child);
    try {
      await axios.delete("/api/naughtyList/" + child.id);
      updateList();
   } catch(error) {
      setError("error removing a naughty child: " + error);
    }
  }
  
// SWITCHERS
  const switchNaughtyToNice = async(child) => {
    createNiceChild(child);
    deleteFromNaughtyList(child);
  }
  const switchNiceToNaughty = async(child) => {
    createNaughtyChild(child);
    deleteFromNiceList(child);
  }
  
// SCORES
  const incrementNice = async(child) => {
    try {
      const inc = parseInt(child.score) + 1;
      await axios.put("/api/niceList/" + child.id + "/" + inc.toString());
      updateList();
   } catch(error) {
      setError("error decrementing a child's score: " + error);
    }
  }
  const decrementNice = async(child) => {
    try {
      const dec = parseInt(child.score) - 1;
      await axios.put("/api/niceList/" + child.id + "/" + dec.toString());
      updateList();
   } catch(error) {
      setError("error incrementing a child's score: " + error);
    }
  }
  const increment = async(child) => {
    try {
      const inc = parseInt(child.score) + 1;
      await axios.put("/api/naughtyList/" + child.id + "/" + inc.toString());
      updateList();
   } catch(error) {
      setError("error decrementing a child's score: " + error);
    }
  }
  const decrement = async(child) => {
    try {
      const dec = parseInt(child.score) - 1;
      await axios.put("/api/naughtyList/" + child.id + "/" + dec.toString());
      updateList();
   } catch(error) {
      setError("error incrementing a child's score: " + error);
    }
  }


  // UPDATERS
  useEffect(() => {
    fetchNiceChildren();
  },[]);
  
  useEffect(() => {
    if (update) {
      fetchNaughtyChildren();
      fetchNiceChildren();
      setUpdate(false);
    }
  },[update]);
  
  const updateList = () => {
    setUpdate(true);
  };
  
  
  // RENDER RESULTS
  return (
    <div className="App">
      {error}
      <h1>Santa's Open-Sourced Naughty and Nice List</h1>
      <div className="santa-list">
        <div className="left">
          <h2>Nice List</h2>
          <div className="nice-list">
            {niceChildren.map( child => (
              <div key={child.id} className="child">
                  <div className='description'>
                    <p><strong onClick={e=> switchNiceToNaughty(child)}>{child.name} - Score: {child.score}</strong></p>
                    <p className='good'><u>Good:</u> {child.good}</p>
                    <p className='bad'><u>Bad:</u> {child.bad}</p>
                  </div>
                  <div className='buttons'>
                    <button onClick={e => incrementNice(child)} className="upvote-button">Upvote</button>
                    <button onClick={e => decrementNice(child)} className="downvote-button">Downvote</button>
                    <button onClick={e => switchNiceToNaughty(child)} className="to-naughty-button">Move to Naughty List</button>
                  </div>
              </div>
            ))}   
          </div>
        </div>
        <div className="right">
            <h2>Naughty List</h2>
            <div className="naughty-list">
            {naughtyChildren.map( child => (
              <div key={child.id} className="child">
                  <div className='description'>
                    <p><strong>{child.name} - Score: {child.score}</strong></p>
                    <p className='good'><u>Good:</u> {child.good}</p>
                    <p className='bad'><u>Bad:</u> {child.bad}</p>
                  </div>
                  <div className='buttons'>
                    <button onClick={e => increment(child)} className="upvote-button">Upvote</button>
                    <button onClick={e => decrement(child)} className="downvote-button">Downvote</button>
                    <button onClick={e => switchNaughtyToNice(child)} className="to-nice-button ">Move to Nice List</button>
                  </div>
              </div>
            ))}   
          </div>
          </div>
      </div>
      <footer><p class="pull-left"><a 
                  href="https://github.com/binDebug3/CL4_SantaList" 
                  target="_blank">https://github.com/binDebug3/CL4_SantaList</a>
              </p>
      </footer>
    </div>
  );
}

export default App;