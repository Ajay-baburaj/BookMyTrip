import { faBed, faCab, faCalendar, faParachuteBox, faPerson, faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './header.css'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'

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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      }
    })
  }

  console.log(date, options)

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
                  onChange={e => setDestination(e.target.value)}
                />
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