import React,{useState,useEffect} from 'react'
import {Line} from "react-chartjs-2"
import numeral from "numeral"

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const buildChartData = (data,casesType)=>{
    let chartData = [] 
    let lastDataPoint;
    for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x:date,
                y:data[casesType][date]- lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint=data[casesType][date] 
    }
    return chartData
}

function LineGraph({casesType="cases"}) {
    const [data,setData] = useState({});
    const [bgcolor,setBGcolor] = useState()
    const [bordercolor,setBordercolor] = useState()

    useEffect(()=>{
      if (casesType == "cases"){
        setBGcolor("a5a5a5")
        setBordercolor("626663")
      }
      else if(casesType=="recovered"){
          setBGcolor("ADFF2F")
          setBordercolor("38bc3f")
      }
      else{
        setBGcolor("ff9191")
        setBordercolor("CC1034")
      }
        const fetchData=async()=>{
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response)=>response.json())
        .then((data)=>{
            let chartData = buildChartData(data,casesType)
            setData(chartData)
            // console.log(chartData);
        })}
        fetchData()
        {console.log(casesType);}
    },[casesType])

    return (
        <div>
            {data?.length>0 &&(
                <Line 
                data={{
                datasets:[{
                    backgroundColor:`#${bgcolor}`,
                    borderColor: `#${bordercolor}`,
                    data:data,
                }]
            }}
            options={options}
            />
            )}
        </div>
    )
}

export default LineGraph
