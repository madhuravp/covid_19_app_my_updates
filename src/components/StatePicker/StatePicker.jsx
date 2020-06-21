// eslint-disable-line no-use-before-define
import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl, StylesProvider} from '@material-ui/core';
import {fetchStates} from '../../api';

import styles from './StatePicker.module.css';








const StatePicker = ({handlePlaceChange, fetchedStates})  => {

    //const [fetchedStates, setFetchedStates] = useState([]);

    // useEffect(()=>{
    //     const fetchAPI = async () =>{
    //       setFetchedStates(await fetchStates());
          
    //     }
    //     fetchAPI();
    //     //console.log(fetchedStates)
    //     },[setFetchedStates]);
    //console.log(props.fetchedStates);


        
        

        
 return(
<div>
        <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="us" onChange={(e) => handlePlaceChange(e.target.value)}>
          <option value="us">USA-Total</option>
          {fetchedStates.map((state, i) => <option key={i} value={state.state}>{state.name}</option>)}

          </NativeSelect>
            
        </FormControl>

        {/* <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="" onChange={(ev) => handleDataChange(ev.target.value)}>
          <option value="">States-Total</option>
          <option value="daily">States-Daily</option>

          </NativeSelect>
            
        </FormControl> */}
      

{/* //       <FormControl className={styles.formControl}>
//           <NativeSelect defaultValue="global" onChange={(event) => handleCountryChange(event.target.value)}>
//           <option value="">Global</option>
//           {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}

//           </NativeSelect>
          
//       </FormControl> */}
       </div>
    )
}

export default StatePicker;

