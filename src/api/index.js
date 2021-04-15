import axios from "axios";
import dataFile from "../data/covid_data_simple.txt";
import statesDataFile from "../data/states-info-simple.txt";
const url = "https://api.covidtracking.com/";

/*
Based on selected 'state', it returns the data object containing recovered, death, total 
cases and date.
*/
export const fetchData = async (place) => {
  let changeableUrl = url;
  changeableUrl = url + place;
  if (place === "us") {
    try {
      let origData = await tableData();
      return getCumulativeNationalData(origData);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let origData = await tableData();
      let data1 = [...origData];

      let stateData = data1.filter(function (indState) {
        return indState.state == place;
      });
      const [{ recovered, death, total, dateChecked }] = stateData;
      return { recovered, death, total, dateChecked };
    } catch (error) {}
  }
};

// Calculate the total stats for USA by adding data from all the states
function getCumulativeNationalData(statesDataArray) {
  let usaData = {
    recovered: 0,
    death: 0,
    total: 0,
    dateChecked: "",
  };
  for (const stateData of statesDataArray) {
    usaData.recovered = usaData.recovered + stateData.recovered;
    usaData.death = usaData.death + stateData.death;
    usaData.total = usaData.total + stateData.total;
    usaData.dateChecked = stateData.dateChecked;
  }
  return usaData;
}

// Fetch the list of state names in the available data collection.
export const fetchStates = async () => {
  try {
    const { data } = await axios.get(url + "v1/states/info.json");
    
    if (isValidData(data)) {
      return data;
    } else {
      // Try from the local snapshot file...
      let localData = await loadDataSnapshot(localStatesFile, statesDataFile);
      return localData;
    }
  } catch (error) {
    console.log(error);

    // Try from the local snapshot file...
    let localData = await loadDataSnapshot(localStatesFile, statesDataFile);
    return localData;
  }
};

const localSnapshotFile = "../data/covid_data_simple.txt";
const localStatesFile = "../data/states-info-simple.txt";

/*
 Returns the data array of all states.  
 Initial attempt is made to get latest data from 3rd party source over web.
 Returns the externally retrived data if valid, 
 Otherwise returns the internally loaded snapshot data.
 */
export const tableData = async () => {
  let origData = null;
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/states/daily.json"
    );

    // If 3rd party data is valid then use it otherwise fallback to local snapshot
    if (isValidData(data)) {
      origData = data;
    } else {
      console.log(
        "No live data received, Falling back to local data snapshot!"
      );

      // Try from the local snapshot file...
      origData = await loadDataSnapshot(localSnapshotFile, dataFile);
    }
  } catch (error) {
    console.log(error);
    console.log("Falling back to local data snapshot!");

    // Try from the local snapshot file...
    origData = await loadDataSnapshot(localSnapshotFile, dataFile);
  }

  return normalizeData(origData);
};

// Validates that the data received has minimum 50 states entries.
function isValidData(data) {
  const normalizedData = normalizeData(data);

  // Make sure normalized data of at least 50 states is received.
  return (
    normalizedData && normalizedData != null && normalizedData.length >= 50
  );
}

/*
Normalize the raw data loaded from the source with below operations..
1. Remove duplicates
2. Convert the object for each state into the new object suited for our needs.

Returns the normalized array of states statistics.  
*/
function normalizeData(data) {
  // Return null if data is empty/undefined.
  if (!data) {
    return null;
  }

  let statesVisited = new Set();
  let normalizedData = [];

  // Normalize the data to remove duplicates
  const fetchedTableData = data.map((impTableData) => {
    const updatedData = {
      recovered: getAdjustedRecoveredCases(impTableData),
      total: impTableData.total,
      death: impTableData.death,
      state: impTableData.state,
      dateChecked: impTableData.dateChecked,
    };

    // Check for duplicates
    if (!statesVisited.has(updatedData.state)) {
      statesVisited.add(updatedData.state);
      normalizedData.push(updatedData);
    }
    return updatedData;
  });

  return normalizedData;
}

// Calculate the number of people recovered based on total cases and deaths
function getAdjustedRecoveredCases(impTableData) {
  let total = impTableData.total;
  let death = impTableData.death;
  if (total || death) {
    return total - death;
  }
  return 0;
}

// Parse and process the back up text file to provide the data in json format
const loadDataSnapshot = (fileName, fileToLoad) => {
  console.log("Loading snapshot data from file : ", fileName);
  return new Promise((callback) => {
    try {
      fetch(fileToLoad)
        .then((r) => r.text())
        .then((text) => {
          const data = parseJSONText(text);
          callback(data);
        });
    } catch (error) {
      console.log(error);
      callback(null);
    }
  });
};

// Parse the plain text into JSON object
const parseJSONText = function (text) {
  try {
    let data = JSON.parse(text);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
