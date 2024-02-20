import React, { useEffect } from 'react'
import './Homepage.css'


function Homepage() {
const getallmobile=async()=>{
  let url='http://localhost:4000/mobile/all'
  let data= await fetch(url)
  let parsedata=await data.json()
  console.log(parsedata);
}
useEffect(()=>{
  getallmobile()
},[])

  return (
    <div>
        <p></p>
    </div>
  )
}

export default Homepage