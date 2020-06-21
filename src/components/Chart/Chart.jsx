import React, {useState, useEffect} from 'react';
//import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {recovered, death, total, dateChecked}, place}) => {
// const [dailyData, setDailyData] = useState([]);

// useEffect(()=>{
//     const fetchAPI = async () =>{
//        setDailyData(await fetchDailyData()); 
//     }
// //console.log(dailyData);
//     fetchAPI();
// }, []);

// const lineChart = (
//     dailyData.length!=0
// ?
// <Line 
// data={{
// labels:dailyData.map(({date}) => date),
// datasets:[{
//     data:dailyData.map(({confirmed}) => confirmed),
//     label:'Infected',
//     borderColor:'#3333ff',
//     fill:true,

// }, {
//     data:dailyData.map(({deaths})=>deaths),
//     label:'Deaths',
//     borderColor:'red',
//     backgroundColor:'rgba(255,0,0,0.5)',
//     fill:true,


// }],
//     }}

// /> :null
// );

//console.log(confirmed, recovered, deaths);

const barChar= (
total
?(
    <Bar
    data={{

labels: ['Infected', 'Recovered', 'Deaths'],
        datasets:[{
             label:'People',
             backgroundColor:[ 'rgba(0,0,255,0.5)',
             'rgba(0,255,0,0.5)',
             'rgba(255,0,0,0.5)'],
             data:[total, recovered, death]
             }]

        }} 

    options={{
legend: {display:false},
title:{display:true, text:'Current State in '+place},

        }}       
    

    
    
     />
): null
)

    return(
       <div className={styles.container}>
        {/* {country? barChar: lineChart} */}
        {barChar}

       </div>
    )
}

export default Chart;