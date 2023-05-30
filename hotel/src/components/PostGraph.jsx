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
import axios from 'axios'
import {useSelector} from 'react-redux'
import {getDayWiseDetails } from '../utils/apiRoutesHotel';
function PostGraph() {
    const user = useSelector(state=>state?.hotel?.hotel)
  const [userCount, setUserCount] = useState([]);
  useEffect(() => {
    axios.get(`${getDayWiseDetails}/${user?._id}`)
      .then((res) => {
        const counts = {};
        res.data?.forEach((user) => {
          const date = new Date(user._id).toLocaleDateString();
        //   counts[amount] = counts[amount] ? counts[date] + 1 : 1;
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
        label: 'Bookings by date',
        data: Object.values(userCount),
        backgroundColor: '#B04759',
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
        text: 'Post',
      },
    },
  };
  return (
    <div>
      <h2>Bookings by date</h2>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default PostGraph;