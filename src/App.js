import React from "react";
import { Cards, Chart, StatePicker, TableData } from "./components";
import { fetchData, fetchStates } from "./api";
import coronaImage from "./images/covid19.image.jpg";

import styles from "./App.module.css";
class App extends React.Component {
  state = {
    data: {},
    place: "us",
    states: [],
  };

  /* function is called from the StatePicker component that provides which place is picked. 
    This data is then passed on to the API file which sends the deaths, recovery, 
    infected data corresponding to the place picked. This data is passed on as props 
    to the chart and card components
    */
  handlePlaceChange = async (place) => {
    const fetchedData = await fetchData(place);
    this.setState({ data: fetchedData, place: place });
  };

  /*state is assigned based on on which state is returned by the state picker.
    data for states is obtained from the api file.*/
  async componentDidMount() {
    const fetchedData = await fetchData("us");
    const fetchAPI = await fetchStates();
    this.setState({ data: fetchedData, states: fetchAPI });
  }

  render() {
    const { data, place, states } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />

        <Cards data={data} />
        <StatePicker
          handlePlaceChange={this.handlePlaceChange}
          handleDataChange={this.handleDataChange}
          fetchedStates={states}
        />
        <Chart data={data} place={place} />
        <TableData states={states} />
      </div>
    );
  }
}

export default App;
