import React, { useState } from 'react';
import Chart from "react-apexcharts";
import TravelDetail from './Modals/TravelDetail';

const AppChar = ({
  travelData
}) =>{

    const[sensor1, setSensor1] = useState(travelData.Temperature.Sensor1);
    const[sensor2, setSensor2] = useState(travelData.Temperature.Sensor2);
    const[sensor3, setSensor3] = useState(travelData.Temperature.Sensor3);
    const[time, setTime] = useState(travelData.Time);
    const[humidity, setHumidity] = useState(travelData.Humidity);

    const [options, setOptions]= useState({
        chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: [8, 8, 8, 1],
            curve: 'smooth'
          },
          colors:["#2173de","#2173de", "#2173de", "#b3deff"],
          xaxis: {
            type: 'datetime',
            categories: time.Data,
            tickAmount: 10,
            labels: {
              formatter: function(value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), 'dd/MMM hh:mm')
              }
            }
          },
          title: {
            text: 'Información de sensores',
            align: 'left',
            style: {
              fontSize: "16px",
              color: '#666'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: [ '#FDD835', '#FDD835', '#FDD835', '#82a8ff'],
              shadeIntensity: 1,
              type: 'vertical',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 500, 500, 500]
            },
          },
          markers: {
            size: 1,
            colors: ["#FDD835", "#FDD835", "#FDD835", "#000000"],
            strokeColors: "#FDD835",
            strokeWidth: 2,
            hover: {
              size: 1,
            }
          },
          yaxis: [{
            // min: -10,
            // max: 40,
            decimalsInFloat:2,
            title: {
              text: 'Temperatura',
            },
          },
          {
            opposite: true,
            min: 0,
            max: 100,
            decimalsInFloat:0,
            axisTicks: {
              show: true
            },
            labels: {
              style: {
                colors: "##b3deff"
              }
            },
            title: {
              text: "Humedad",
              style:{
                  color:"#82a8ff"
              }
            }
          }
        ]});
    const [series, setSeries] = useState([
        {
            name: sensor1.Label,
            type:"line",
            data: sensor1.Data
        },
        {
            name: sensor2.Label,
            type:"line",
            data: sensor2.Data
        },
        {
            name: sensor3.Label,
            type:"line",
            data: sensor3.Data
        },
        {
            name: humidity.Label,
            type:"area",
            data: humidity.Data
        }
    ]);

    return (
        <Chart
            options={options}
            series={series}
            type="line"
            width="680"
        />
    );
};

export default AppChar;