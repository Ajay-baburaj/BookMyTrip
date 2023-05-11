import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import './booking.css'
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { Box, Grid, Typography, TextField, FormControl, FormLabel, Button, Modal } from '@mui/material';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { getHotelWiseBookingUrl } from "../utils/apiRoutesHotel";
import { GET_BOOKINGS } from "../reduxStore/bookingSlice";
import BookedDetails from "../components/BookedDetails";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Booking() {
    const user = useSelector(state=>state?.hotel?.hotel)
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);
    const [view, setView] = useState(Views.MONTH);
    const [bookingId,setBookingId] = useState()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)};
    const handleClose = () => setOpen(false)
    
    const dispatch = useDispatch()

    useEffect(() => {
        getAllBookings();
    }, []);

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get(`${getHotelWiseBookingUrl}/${user._id}`);
            console.log(data)
            dispatch(GET_BOOKINGS(data))
            const mappedEvents = data?.map((booking) => ({
                title: booking.roomDetails?.roomType,
                id:booking._id,
                start: new Date(booking.checkInDate),
                end: new Date(booking.checkOutDate),
            }))
            setAllEvents(mappedEvents);
        } catch (error) {
            console.error(error);
        }
    };

    const handleView = (view) => {
        setView(view);
    };

    const handleSelectEvent = (event) => {
        setBookingId(event.id)
        handleOpen()
        console.log('Selected event:', event);
    }

    const style = {
        width: '60%',
        maxWidth: '1000px',
        maxHeight: '80vh',
        overflowY: 'auto',
        m: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

    return (
        <div className="App">
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "50px" }}
                view={view}
                onView={handleView}
                components={{
                    day: {
                        header: ({ date }) => (
                            <div style={{ backgroundColor: "lightgray" }}>
                                {localizer.format(date, "dddd")}
                            </div>
                        ),
                        cell: ({ date, children }) => (
                            <div style={{ backgroundColor: "lightblue", height: "100%" }}>
                                <div style={{ fontWeight: "bold" }}>{localizer.format(date, "d")}</div>
                                <div>{children}</div>
                            </div>
                        ),
                        event: ({ event }) => (
                            <div>
                                <div style={{textAlign:'center'}}>
                                    {event.title}
                                </div>
                                <div style={{ display: "none" }}>{event.id}</div>
                                
                            </div>
                        ),
                    },
                }}
                onSelectEvent={handleSelectEvent}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: '60%', maxWidth: 'none' }}>
                   <BookedDetails bookingId ={bookingId}/>
                </Box>
            </Modal>

        </div>
    );
}

export default Booking;
