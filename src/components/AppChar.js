import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const AppChar = ({
  travelData,
  minTemp,
  maxTemp
}) =>{

  const [options, setOptions]= useState(null);
  const [series, setSeries] = useState(null);
  const offSet= 10;

    useEffect(()=> {
      setOptions({
        chart: {
          height: 350,
          type: 'line',
          zoom:{
            enabled: true,
            type: 'x',  
            autoScaleYaxis: true,  
            zoomedArea: {
              fill: {
                color: '#90CAF9',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
          }

          }
        },
        annotations: {
          yaxis: [ {
            y: parseFloat(minTemp),
            y2: parseFloat(maxTemp),
            borderColor: '#000',
            fillColor: '#a0a0a0',
            opacity: 0.2,
            label: {
              borderColor: '#333',
              style: {
                fontSize: '14px',
                fontType: "bold",
                color: 'white',
                background: '#404040',
                margin:10
              },
              text: 'Temperatura aceptable',
            }
          }],
        },
        stroke: {
          width: [8, 8, 8],
          curve: 'smooth',
          dashArray: [0, 0, 0],
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
          min: -40,
          max:100,
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