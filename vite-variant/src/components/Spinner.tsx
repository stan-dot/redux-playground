export const Spinner = ({ text = "", size = "5em" }) => {
  const header = text ? <h4>{text}</h4> : <p>defult text</p>
  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  )
}
