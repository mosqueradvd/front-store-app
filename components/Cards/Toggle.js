import { useState } from 'react'

function Toggle() {
  const [toggle, setToggle] = useState(true)
  const toggleClass =
    'transition-transform duration-1000 ease-out transform translate-x-5'
  return (
    <div
      className='md:w-14 md:h-7 w-12 h-6 flex items-center bg-black rounded-full p-1 cursor-pointer'
      onClick={() => {
        setToggle(!toggle)
      }}
    >
      {/* Switch */}
      <div
        className={
          'bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md' +
          (toggle ? null : toggleClass)
        }
      ></div>
    </div>
  )
}

export default Toggle
