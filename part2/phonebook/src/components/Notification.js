
const Notification = ({ content, type }) => {
    if (content === null) {
        return null
    }

    return (
        <div className={type}>
            <div className="notification">
                {content}
            </div>
        </div>
    )
}

export default Notification
