import React from 'react';
import { Card, CardContent, CardHeader, Divider, Box, Skeleton } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart = ({ data, loading }) => {
  // Default options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4, // Smoothing curve
      },
      point: {
        radius: 3,
        hitRadius: 10,
        hoverRadius: 5,
      },
    },
  };

  // Default chart data if none is provided
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'User Logins',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(13, 71, 161)',
        backgroundColor: 'rgba(13, 71, 161, 0.5)',
      },
      {
        label: 'New Registrations',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: 'rgb(46, 125, 50)',
        backgroundColor: 'rgba(46, 125, 50, 0.5)',
      },
      {
        label: 'Service Access',
        data: [33, 25, 35, 51, 54, 76, 80],
        fill: false,
        borderColor: 'rgb(198, 40, 40)',
        backgroundColor: 'rgba(198, 40, 40, 0.5)',
      },
    ],
  };

  // Use provided data or default if none is provided
  const chartData = data || defaultData;

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="User Activity Trends" 
        titleTypographyProps={{ variant: 'h6' }} 
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : (
          <Box sx={{ height: 300 }}>
            <Line options={options} data={chartData} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityChart;