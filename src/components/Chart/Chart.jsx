import React, { useState, useEffect } from "react";

import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

// Component for displaying a bar chart with USA and states data
const Chart = ({ data: { recovered, death, total, dateChecked }, place }) => {
  const barChar = total ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [total, recovered, death],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: "Current State in " + place },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {barChar}
    </div>
  );
};

export default Chart;
