import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const AppChar = ({
  travelData
}) =>{

    const[sensor1, setSensor1] = useState(travelData?.Temperature?.Sensor1);
    const[sensor2, setSensor2] = useState(travelData?.Temperature?.Sensor2);
    const[sensor3, setSensor3] = useState(travelData?.Temperature?.Sensor3);
    const[time, setTime] = useState(travelData?.Time);

    useEffect(()=> {
      setSensor1(travelData?.Temperature?.Sensor1);
      setSensor2(travelData?.Temperature?.Sensor2);
      setSensor3(travelData?.Temperature?.Sensor3);
      setTime(travelData?.Time);
      // eslint-disable-line react-hooks/exhaustive-deps
    }, [travelData])

    const [options]= useState({
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
            text: 'Temperatura de sensores',
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
        ]});
    const [series] = useState([
        {
            name: sensor1?.Label,
            type:"line",
            data: sensor1?.Data
        },
        {
            name: sensor2?.Label,
            type:"line",
            data: sensor2?.Data
        },
        {
            name: sensor3?.Label,
            type:"line",
            data: sensor3?.Data
        },
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