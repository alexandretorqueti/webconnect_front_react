function ErrorComponent({ message, errorList }) {
  if (errorList && errorList.length > 0)
    return (
      <div style={{ 'color': 'red' }}>
        {errorList.map((message, index) => {
          return <div key={index} style={{ 'color': 'red' }}> {message} </div>
        })}
      </div>
    )
  else
    if (message)
      return <div style={{ 'color': 'red' }}> {message} </div>
    else
      return null
}

export default ErrorComponent;