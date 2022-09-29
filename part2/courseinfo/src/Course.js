const Header = ({ content }) => {
    return (
        <>
            <h2>{content}</h2>
        </>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <>
            <p>{name} {exercises}</p>
        </>
    )
}


const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
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
    return (
        <>
            <Header content={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course