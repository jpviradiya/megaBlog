/* eslint-disable react/prop-types */
function Button({
  text, // (calling => <Button text="Edit" bgColor="bg-green-500" className="mr-3"/>)
  // children (calling => <Button bgColor="" className="">Edit</Button>) //this one is better
  bgColor,
  className = '',
  ...props
}) {
  return (
    <button className={`${className} ${bgColor} bg-blue-600 text-white px-4 py-2 rounded-lg`} {...props} >
      {text}
    </button>
  )
}

export default Button



