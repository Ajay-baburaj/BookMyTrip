import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFectch';
import {useNavigate} from 'react-router-dom'




function Featured() {
  const navigate = useNavigate()
  const {data,loading,error} = useFetch(
    'http://localhost:5000/countByCity?cities=kochi,munnar,alleppy,banglore'
  );
  



  const handleClick=(obj)=>{
    const destination = obj?.destination
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate()+1)
    console.log(currentDate);
    console.log(nextDay)
  
    const date = [{startDate:currentDate,endDate:nextDay,key:'selection'}]
    const options = {adult:1,children:0,room:1}

  
    navigate('/hotels',{state:{destination,date,options}})
  }
  console.log(data)

  return (
    <div className='featured' >
      <div className="featuredItem" style={{cursor:'pointer'}} onClick={()=>handleClick({destination:"munnar"})}>
        <img src="https://r-xx.bstatic.com/xdata/images/city/250x250/684720.jpg?k=fdb1d9397eeb9b17d4a1ef6fdf806e6b4366d5ebda38d7f0c212b9c1bec8dcea&o=" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Munnar</h1>
          <h3>{data[1]} properties</h3>
          
        </div>
      </div>
      <div className="featuredItem" style={{cursor:'pointer'}} onClick={()=>handleClick({destination:"kochi"})}>
        <img src="https://q-xx.bstatic.com/xdata/images/city/250x250/684572.jpg?k=f74af2be72834d9953c8096834db666c7769c5f6c1ba230d6fe5591ba84dd33d&o=" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Kochi</h1>
          <h3>{data[0]} properties</h3>
          
        </div>
      </div>
      <div className="featuredItem" style={{cursor:'pointer'}} onClick={()=>handleClick({destination:"banglore"})}>
        <img src="https://q-xx.bstatic.com/xdata/images/city/250x250/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Banglore</h1>
          <h3>{data[3]} properties</h3>
          
        </div>
      </div>
     <div className="featuredItem" style={{cursor:'pointer'}} onClick={()=>handleClick({destination:"alleppy"})}>
        <img src="https://q-xx.bstatic.com/xdata/images/city/250x250/684514.jpg?k=94a24874ade1e734dd61fa72b85a246a86a682b1e6e8a0e257cf82ad151ed1f0&o=" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Alleppy</h1>
          <h3>{data[2]}properties</h3>
          
        </div>
      </div>
    </div>
  )
}

export default Featured