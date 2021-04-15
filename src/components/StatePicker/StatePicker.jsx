// eslint-disable-line no-use-before-define
import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl, StylesProvider } from "@material-ui/core";
import { fetchStates } from "../../api";
import styles from "./StatePicker.module.css";

/*
Component that detects which state is picked by the user.
The state name is then passed on to the Chart and Cards components 
so that the information corresponding to that state can be displayed.
*/
const StatePicker = ({ handlePlaceChange, fetchedStates }) => {
  return (
    <div>
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue="us"
          onChange={(e) => handlePlaceChange(e.target.value)}
        >
          <option value="us">USA-Total</option>
          {fetchedStates.map((state, i) => (
            <option key={i} value={state.state}>
              {state.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default StatePicker;
