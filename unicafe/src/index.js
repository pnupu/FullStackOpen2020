import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return <tbody><tr><td>{props.text}</td><td>{props.value}</td></tr></tbody>
}

const Statistics = (props) => {
  let all = props.good + props.bad + props.neutral
  if(all === 0){
    return (
      <div>
        <h1>statistics</h1>
        No Feedback given
      </div>

    
    )
  }
  let average = 0
  let positive = 0

  if(all !== 0) {
    average = ((props.good - props.bad) / all)
    positive = (props.good / all) * 100
    positive += " %"
  }

  return(
    <div>
      <h1>statistics</h1>
        <table>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
        </table>
    </div> 
  )
 
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



const handleGoodClick = () => {
  setGood(good + 1)
}

const handleNeutralClick = () => {
  setNeutral(neutral + 1)
}

const handleBadClick = () => {
  setBad(bad + 1)
}


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)