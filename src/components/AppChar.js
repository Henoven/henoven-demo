import React, { useState } from 'react';
import Chart from "react-apexcharts";

const AppChar = () =>{
    const [options, setOptions]= useState({
        chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: [10, 1],
            curve: 'smooth'
          },
          colors:["#2173de", "#b3deff"],
          xaxis: {
            type: 'datetime',
            categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001',],
            tickAmount: 10,
            labels: {
              formatter: function(value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM')
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
              gradientToColors: [ '#FDD835', '#82a8ff'],
              shadeIntensity: 1,
              type: 'vertical',
              opacityFrom: 5,
              opacityTo: 5,
              stops: [0, 100, 100, 100]
            },
          },
          markers: {
            size: 4,
            colors: ["#FFA41B"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
              size: 7,
            }
          },
          yaxis: [{
            min: -10,
            max: 40,
            title: {
              text: 'Temperatura',
            },
          },
          {
            opposite: true,
            min: 0,
            max: 100,
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
            name: 'Temperatura',
            type:"line",
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        },
        {
            name: "Humedad",
            type:"column",
            data: [20, 29, 37, 36, 44, 45, 50, 58, 40,38,34,36,25]
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