import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { getAllBookings } from '../utils/apiRoutesHotel';

function UserGraph() {
    const user = useSelector(state=>state?.hotel?.hotel)
  const [userCount, setUserCount] = useState([]);
  useEffect(() => {
    axios.get(`${getAllBookings}/${user?._id}`)
      .then((res) => {
        console.log(res.data.data)
        const counts = {};
        res.data?.data.forEach((user) => {
          const date = new Date(user.bookedDate).toLocaleDateString();
          counts[date] = counts[date] ? counts[date] + 1 : 1;
        });
        setUserCount(counts);
      })
      .catch((err) => console.log(err));
  }, []);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  const chartData = {
    labels: Object.keys(userCount),
    datasets: [
      {
        label: 'Number of booking per day',
        data: Object.values(userCount),
        backgroundColor: '#537188',
      },
    ],
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Users',
      },
    },
  };
  return (
    <div>
      <h2>Bookings by date </h2>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default UserGraph;