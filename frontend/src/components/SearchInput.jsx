import React from 'react';
import { FaSearch } from "react-icons/fa";


export default function SearchInput() {
  return (
    <form className='flex itmes-center gap-2'>
        <input type='text' placeholder='Search...' className='input input-bordered rounded-full'/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white' >{<FaSearch/>}</button>
      
    </form>
  )
}





// import React from 'react';
// import { FaSearch } from "react-icons/fa";


// export default function SearchInput() {
//   return (
//     <form className='flex itmes-center gap-2'>
//         <input type='text' placeholder='Search...' className='input input-bordered rounded-full'/>
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white' >{<FaSearch/>}</button>
      
//     </form>
//   )
// }

