import React from 'react';
//import {StatePicker, Cards} from './components'
import {Cards, Chart, StatePicker, TableData} from './components'
import {fetchData, fetchStates} from './api'
import coronaImage from './images/covid19.image.jpg'
//import CoronaBackground from './images/CovidBackground.jpg'

import styles from './App.module.css';
class App extends React.Component {
state={
        data:{},
        place:'us',
        states:[]
        
    };

  handlePlaceChange = async (place) => {

        const fetchedData = await fetchData(place);
        this.setState({data:fetchedData, place:place});
       
    }
    


   

    // handleDataChange = async (dataTime) => {

    //     //const fetchedData = await fetchData(country);
    //     //this.setState({data:fetchedData, country:country});
    //     this.setState({dataTime:dataTime});
    //     //console.log(dataTime);
    // }

    async componentDidMount() {
        const fetchedData = await fetchData('us');
        const fetchAPI = await fetchStates();

        this.setState({data:fetchedData, states:fetchAPI});
        //console.log(this.state.data);
        //console.log(this.state.states)

       
            
       
       
        
    }

    // handleChartChange = (chart) => {
    //     console.log(chart);
    //     this.setState({chart:chart});
    // }

render(){

    const {data, place, states} = this.state;

        return(
        <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt='COVID-19'/>
       
            <Cards data ={data} />
            <StatePicker handlePlaceChange = {this.handlePlaceChange}
                handleDataChange ={this.handleDataChange}
                fetchedStates={states}

        /> 
            <Chart data={data} place={place}/>
            <TableData states={states}/>
           
        </div>);
    }
}

export default App;