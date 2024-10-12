/* eslint-disable react/prop-types */
import { forwardRef, useId } from 'react'

function Input({
  label,
  type = 'text',
  className = '',
  ...props
}, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      
      {/* display label */}
      {label && <label
        className='inline-block mb-1 pl-1'
        htmlFor={id}>
        {label}
      </label>
      }

      {/* display input tag */}
      <input
        type={type}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `}
        ref={ref} // give reference to parent components (we are using input tag it require some reference to point that inputbox and access the data and gice data to provide that forwaedRef need)
        id={id}
        {...props}
      />
    </div>
  )
}

export default forwardRef(Input)