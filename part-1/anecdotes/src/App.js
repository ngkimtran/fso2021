import React, { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display =({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const Anecdote = ({ anecdotes, points, selected, setPoints, setSelected }) => {
  const next = () => {
    setSelected(Math.floor(Math.random() * 7));
  }

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected] +=1
    setPoints(newPoints)
  }
  return (
    <>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button text='vote' handleClick={vote} />
      <Button text='next anecdote' handleClick={next} />
    </>
  )
}

const BestAnecdote = ({ anecdotes, points, best }) => {

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <Display anecdote={best} votes={points[anecdotes.indexOf(best)]} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0));
  const best = anecdotes[points.indexOf(Math.max(...points))]

  return (
    <div>
      <Anecdote anecdotes={anecdotes} points={points} selected={selected} setPoints={setPoints} setSelected={setSelected}/>
      <BestAnecdote anecdotes={anecdotes} points={points} best={best} />
    </div>
  )
}

export default App