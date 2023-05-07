import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import './#booking.css'
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { getAllBookingDetails } from "../utils/ApiRoutesAdmin";
import { useEffect } from "react";

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

    useEffect(() => {
        getAllBookings();
    }, []);

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get(getAllBookingDetails);
            const mappedEvents = data.map((booking) => ({
                title: booking.hotel,
                start: new Date(booking.checkInDate),
                end: new Date(booking.checkInDate),
            }));
            setAllEvents(mappedEvents);
        } catch (error) {
            console.error(error);
        }
    };

    const handleView = (view) => {
        setView(view);
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
                        event: ({ event }) => <div>{event.title}</div>,
                    },
                }}
            />

        </div>
    );
}

export default Bookings;
