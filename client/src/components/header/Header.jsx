import { faBed, faCab, faCalendar, faParachuteBox, faPerson, faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Link, Grid, Typography } from '@mui/material';
import './header.css'
import axios from 'axios'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import { searchCities } from '../../utils/APIRoutes'


function Header({ type }) {

  const search = (state => console.log("state", state))
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: tomorrow,
      key: 'selection'
    }
  ])
  const [openDate, setOpenDate] = useState(false)
  const [destination, setDestination] = useState("")
  const [options, setOption] = useState({ adult: 1, children: 0, room: 1 })
  const [openOptions, setOpenOptions] = useState(false)
  const [values, setValues] = useState(1)
  const [city,setCity] = useState([])
  const [value, setValue] = useState(null);
  const [roomCount, setRoomCount] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handleOption = (name, operation) => {
    setOption((prev) => {
      let updatedValue;
      if (operation === "i") {
        updatedValue = prev[name] + 1;
      } else if (operation === "d") {
        updatedValue = prev[name] - 1;
        if (updatedValue < 0) {
          updatedValue = 0; // Prevent count from going below 0
        }
      } else {
        updatedValue = prev[name];
      }
  
      calculateRoomCount({ ...prev, [name]: updatedValue });
  
      return {
        ...prev,
        [name]: updatedValue
      };
    });
  };

  function calculateRoomCount(updatedValue) {
    const ratio = 2;
    const adultCount = typeof updatedValue.adult === 'number' ? updatedValue.adult : 0;
    const childrenCount = typeof updatedValue.children === 'number' ? updatedValue.children : 0;
    const total = adultCount + childrenCount;
    const roomsNeeded = Math.ceil(total / ratio);
    setRoomCount(roomsNeeded);
  }
  

  useEffect(() => {
    setOption(prev => ({
      ...prev,
      ['room']: roomCount
    }));
  }, [roomCount]);

  useMemo(() => {
    if(value){
      axios.get(`${searchCities}/?city=${value}`).then((res) => {
        setCity(res.data)
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [value]);



  const handleInputChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  

  const handleSearch = () => {
    if (destination == "") {
      toast.error("Please enter the city")
    } else {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, date, options }
      })
      navigate("/hotels", { state: { destination, date, options } })
    }
  }

  const handleSearchClick = (data)=>{
    setValue('');
      setDestination(data)
      setCity([])
  }


  return (
    <div className='header'>
      <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
        </div>
        {type !== "list" &&
          <>
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerDesc">
              Search low prices on hotels, homes and much more...
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  value={value||destination}
                  onChange={e => handleInputChange(e)}
                />
              { city.length > 0 && city?.map((data,index) => (
            <Box key={index} onClick={()=>handleSearchClick(data)}>
              <Link

                style={{ textDecoration: 'none' }}
               
              >
                <Grid
                  sx={{
                    overflow: 'hidden',
                    padding: '.2rem 1rem',
                    '&:hover': {
                      backgroundColor: '#eee',
                    },
                  }}
                  container
                  alignItems="center"
                >
                
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#000',
                          }}
                        >
                          {data}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{
                              fontSize: '14px',
                              mr: '6px',
                              color: '#555',
                            }}
                          >
                          
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          ))}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendar} onClick={() => setOpenDate(!openDate)} className="headerIcon" />
                <span className='headersearchText' onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                {
                  openDate && <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="date"
                  />
                }


              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" onClick={() => setOpenOptions(!openOptions)} />
                <span className='headersearchText' onClick={() => setOpenOptions(!openOptions)}>{`${options.adult} adult • ${options.children} children • ${options.room}room`}</span>
                {openOptions &&
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCount">
                        <button className="optionCounterBtn" onClick={() => handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                        <span className="optionCounterNum">{options.adult}</span>
                        <button className="optionCounterBtn" onClick={() => handleOption("adult", "i")}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCount">
                        <button className="optionCounterBtn" onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                        <span className="optionCounterNum">{options.children}</span>
                        <button className="optionCounterBtn" onClick={() => handleOption("children", "i")}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCount">
                        <button className="optionCounterBtn" onClick={() => handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                        <span className="optionCounterNum">{options.room}</span>
                        <button className="optionCounterBtn" onClick={() => handleOption("room", "i")}>+</button>
                      </div>
                    </div>
                  </div>
                }


              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>search</button>
              </div>
            </div>
          </>
        }

      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default Header