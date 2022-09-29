import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const DailyAnecdote = ({ anecdote, points }) => {
  const Container = {
    height: '40px'
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div style={Container}>
        <p>{anecdote}</p>
      </div>
      <p>has {points} votes</p>
    </>
  )
}

const MostPopularAnecdote = ({ anecdote, points }) => {
  if (points > 0) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>{anecdote}</p>
        <p>has {points} votes</p>
      </>
    )
  }
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>No votes yet</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))

  const handleNext = () => {
    let nextAnecdote
    do {
      nextAnecdote = Math.floor(Math.random() * (anecdotes.length - 1))
    } while (nextAnecdote === selected)
    setSelected(nextAnecdote)
  }

  const findMostVoted = () => {
    const maxVotes = Math.max(...points)
    return points.indexOf(maxVotes)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <DailyAnecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleNext} text='next anecdote' />
      <MostPopularAnecdote
        anecdote={anecdotes[findMostVoted()]}
        points={points[findMostVoted()]}
      />
    </div>
  )
}

export default App
