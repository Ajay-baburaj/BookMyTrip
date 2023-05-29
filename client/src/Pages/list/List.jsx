import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./list.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFectch'
import {getHotels,getHotelImagesURL} from '../../utils/APIRoutes'
import { LoadingSkeleton } from '../../components/LoadingSkeleton'
import { Box, Grid } from '@mui/material'


function List() {

  const location = useLocation()

  const [destination, setDestination] = useState(location.state.destination)
  console.log(destination)
  const [date, setDate] = useState(location.state.date)
  const [options, setOptions] = useState(location.state.options)
  console.log(options)
  const [openDate, setOpenDate] = useState(false)
  const [hotelImgData,setHotelImgData] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [newDest,setNewDest] = useState()
  const [minPrice,setMinPrice] = useState(0)
  const [maxPrice,setMaxPrice] = useState(0)
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  console.log(destination);
  const {data,loading,error,reFetch}= useFetch(
      `${getHotels}/?city=${destination}&min=${min ? min : 0}&max=${max ? max: 0}`
  )

  
  useEffect(()=>{
    appendImagesWithDetails(data)
  },[data])
  

  
  const appendImagesWithDetails = async (data) => {
    try {
      setIsLoading(true)
      setTimeout(async()=>{
        
        const promises = data.map(async (hotel) => {
            const hotelDetails = await axios.get(`${getHotelImagesURL}/?id=${hotel._id}`)
            return hotelDetails?.data?.hotelData
        })
        const hotelDetails = await Promise.all(promises)
        setHotelImgData(hotelDetails); 
        setIsLoading(false)
      },1000)
     
    } catch (err) {
      console.log(err.message)
    }
  }
 
console.log(minPrice,maxPrice)
  const handleClick = ()=>{
    setDestination(newDest)
    console.log(destination)
    setMin(minPrice)
    setMax(maxPrice)
     reFetch()
  }

  
  
  
  return isLoading ? (
    <LoadingSkeleton/>
  ) :(
    <div>
    <Navbar />
    <Header type="list" />


    <div className="listContainer">
      <div className="listWrapper">
      <div className="listSearch" sx={{display: {sm: 'none', lg: 'block'}}}>
          <h1 className="lsTitle">search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input type="text" name="" id="" placeholder={destination} onChange={(e)=>setNewDest(e.target.value)}/>
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span onClick={() => setOpenDate(!openDate)}>
              {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
            </span>
            {
              openDate &&
              <DateRange onChange={item => setDate([item.selection])} minDate={new Date} ranges={date} />
            }
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div className="lsOPtions">
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min price <small>per night</small>
                </span>
                <input type="number" className="lsOptionInput" onChange={(e)=>setMinPrice(e.target.value)}/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max price <small>per night</small>
                </span>
                <input type="number" className="lsOptionInput" onChange={(e)=>setMaxPrice(e.target.value)} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Adult
                </span>
                <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  children
                </span>
                <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Room
                </span>
                <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
              </div>

            </div>



          </div>
          <button className='listSearchBtn' onClick={handleClick}>Search</button>
        </div>
        <div className="listResult">
          {
            hotelImgData && hotelImgData?.map((item,index)=>
            <Grid container spacing={2} sx={{marginTop:'0.5rem'}}>
              <Grid lg={12} md={10} sm={10}>
                <SearchItem hotel ={item} key={index} search={true}/>
              </Grid>
            </Grid>
             )
          }
          
        </div>
      </div>

    </div>
  </div>
  )
 
}

export default List