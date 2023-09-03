import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import date-fns adapter
import * as ChartJs from 'chart.js';

ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));

new ChartJs.Chart()

const CovidDashboard = () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
                );
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching COVID-19 data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-4 bg-white rounded shadow">
            {loading ? (
                <p>Loading COVID-19 data...</p>
            ) : (
                <Line data={{
                    labels: Object.keys(data.cases),
                    datasets: [
                        {
                            label: 'Total Cases',
                            data: Object.values(data.cases),
                            borderColor: 'rgba(75, 192, 192)',
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1
                        },
                    ],
                }}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    displayFormats: {
                                        day: 'MMM D',
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Total Cases',
                                },
                            },
                        },
                    }} />
            )}
        </div>
    );
};

export default CovidDashboard;
