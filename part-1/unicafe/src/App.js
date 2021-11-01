import React, { useState } from 'react'


const Button = ({ text, handleClick }) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Feedback = ({ good, neutral, bad, setGood, setNeutral, setBad }) => {

  return (
    <>
      <h1>give feedback</h1>
      <div>  
        <Button text='good' handleClick={() => setGood(good + 1)} />
        <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
        <Button text='bad' handleClick={() => setBad(bad + 1)} />
      </div> 
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const sum = () => good + neutral + bad;
  const average = () => (good - bad) / Sum();
  const positive = () => good / Sum() * 100;

  if (good=== 0 && bad === 0 && neutral === 0 )
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
      
    )

  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={sum()} />
        <StatisticLine text='average' value={average()} />
        <StatisticLine text='positive' value={`${positive()}%`} />
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        setGood={setGood} 
        setNeutral={setNeutral} 
        setBad={setBad}
      />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
      />
    </div>
  )
}

export default App