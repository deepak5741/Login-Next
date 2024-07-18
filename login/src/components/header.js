import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';

function header() {
    useEffect(() =>{
        let userData = localStorage.getItem('UserData')
        userData = JSON.parse(userData)
        if(!userData){
            router.push('/')
        }
    }, [])
    const router = useRouter();
    const [user, setUser] = useState({})
    const logOutUser = () =>{
        localStorage.removeItem('UserData');
        router.push('/')
    }

    const getIntial = () =>{
        let userData = localStorage.getItem('UserData')
         userData = JSON.parse(userData)
        if(userData){
        return userData.currentUser.charAt(0)
        }
    }
  return (
    <div className='bg-gray-800 text-white shadow-md' >

<div className="container mx-auto px-4 py-2 flex justify-between items-center md:flex-row flex-col">
    <a href="#" className="text-xl font-bold uppercase">star wars </a>
    
    <div className="flex items-center space-x-2">
      <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={logOutUser}>Logout</button>
      <a href="#" className="text-white hover:text-gray-400 flex items-center justify-center rounded-full bg-blue-500 h-8 w-8">
  <span className="text-white font-bold text-lg uppercase">{getIntial()}</span> </a>

    </div>
  </div>
    </div>
  )
}

export default header