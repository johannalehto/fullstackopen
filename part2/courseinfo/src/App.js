const Header = ({ content }) => {
  return (
    <>
      <h2>{content}</h2>
    </>
  )
}

const Part = ({ name, exercises}) => {
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}


const Content = ({ parts }) => {
  return (
    <>
      { parts.map(part => 
        <Part 
          key={part.id} 
          name={part.name} 
          exercises={part.exercises} 
        />
        )}
    </>
  )
}

const Total = ({ parts }) => {

  const totalExcercises = parts.reduce((total, part) => {
    return total + part.exercises
  }, 0) 

  return (
    <h4>total of {totalExcercises} exercises</h4>
  )
}

const Course = ({ course }) => {
  return(
    <>
      <Header content={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return(
          <Course key={course.id} course={course} />
        )
      })
      }
    </div>
  )
}

export default App