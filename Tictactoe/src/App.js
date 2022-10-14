import logo from './logo.svg';
import './App.css';

import Board from './components/Board/Board';
import { calculateWinner } from './components/functions/calculateWinner';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './components/store/userSlice'

function App() {

  const [gameState, setGameState] = useState(false)

  const dispatch = useDispatch()

  const user1 = useRef();
  const user2 = useRef();

  const handleStart = (e) => {
    e.preventDefault()

    if (!user1.current.value || !user2.current.value) {
      alert('Please enter your name')
      return
    }

    dispatch(setUser({
      user1: user1.current.value,
      user2: user2.current.value
    }))

    setGameState(true)
  }

  return (
    <div className="App">

      {!gameState &&
        <form>
          <input ref={user1} placeholder='User X' required />
          <input ref={user2} placeholder='User O' required />
          <button type='submit' onClick={handleStart}>START</button>
          <br />
          X will go first
        </form>
      }
      {
        gameState && <Board />
      }
    </div>
  );
}

export default App;
