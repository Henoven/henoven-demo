import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const AppChar = ({
  travelData
}) =>{

  const [options, setOptions]= useState(null);
  const [series, setSeries] = useState(null);

    useEffect(()=> {
      setOptions({
        chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: [8, 8, 8, 1],
            curve: 'smooth'
          },
          colors:["#ff0000", "#2173de", "#00e600"],
          xaxis: {
            type: 'datetime',
            categories: travelData?.Time.Data,
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
          // fill: {
          //   type: 'gradient',
          //   gradient: {
          //     shade: 'dark',
          //     gradientToColors: [ '#FDD835', '#FDD835', '#FDD835', '#82a8ff'],
          //     shadeIntensity: 1,
          //     type: 'vertical',
          //     opacityFrom: 1,
          //     opacityTo: 1,
          //     stops: [0, 500, 500, 500]
          //   },
          // },
          markers: {
            size: 1,
            colors: ["#FDD835", "#FDD835", "#FDD835"],
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
      setSeries([
          {
              name: travelData?.Temperature?.Sensor1?.Label,
              type:"line",
              data: travelData?.Temperature?.Sensor1?.Data,
          },
          {
              name: travelData?.Temperature?.Sensor2?.Label,
              type:"line",
              data: travelData?.Temperature?.Sensor2?.Data
          },
          {
              name: travelData?.Temperature?.Sensor3?.Label,
              type:"line",
              data: travelData?.Temperature?.Sensor3?.Data
          },
      ]);
      // eslint-disable-line react-hooks/exhaustive-deps
    }, [travelData])


    return (
      <>
      {
        series && options &&
        <Chart
            options={options}
            series={series}
            type="line"
            width="680"
        />
      }
      </>
    );
};

export default AppChar;