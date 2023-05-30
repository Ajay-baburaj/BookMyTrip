import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import './#booking.css'
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { Box,Modal } from '@mui/material';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { getAllBookingDetails } from "../utils/ApiRoutesAdmin";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
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

function Bookings() {
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
            const { data } = await axios.get(getAllBookingDetails);
            dispatch({
                type: "GET_BOOKINGS",
                payload: data
            })
            const mappedEvents = data?.map((booking) => ({
                title: `${booking.hoteldetails?.name} - ${booking._id}`,
                start: new Date(booking.checkInDate),
                end: new Date(booking.checkInDate),
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
        const Id = event.title.split('-')[1].trim()
        setBookingId(Id)
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
                                <div>
                                    {event.title}
                                </div>
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

export default Bookings;
