import axios from 'axios'

const url ='https://covidtracking.com/api/';









// const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (place) =>{
 let changeableUrl = url; 

   
    changeableUrl = url+place;
    //console.log(changeableUrl); 

    if(place === 'us'){
try{
        const {data:[{recovered, death, total, dateChecked}]}  = await axios.get(changeableUrl);
        //const {data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        return { recovered, death, total, dateChecked};
        
    } catch(error){
console.log(error);
    }
} else {
    try{
        const {data}  = await axios.get('https://covidtracking.com/api/states');
        let stateData = data.filter(function(indState) {
            return indState.state == place 
        });

const [{recovered, death, total, dateChecked}]= stateData;

return { recovered, death, total, dateChecked};
       
    } catch(error){
console.log(error);
    }

}
}

// export const fetchDailyData = async () =>{
//     try{
// const {data} = await axios.get(url+"/daily");

// const modifiedData= data.map((dailyData) =>({
// confirmed: dailyData.confirmed.total,
// deaths: dailyData.deaths.total,
// date: dailyData.reportDate,
// })
//     );

//     return modifiedData;

//     }
//     catch(error){

//     }
// }

export const fetchStates = async () =>{
   try{ 
       const {data} = await axios.get(url+'states/info');

       

//return data.map((state)=> state.name);
//console.log(data)
return data;






}
catch(error){
console.log(error);
}

}

export const tableData = async () =>{

try{
    const {data}  = await axios.get('https://covidtracking.com/api/states');
    const fetchedTableData = data.map((impTableData)=> {
        return({
                 recovered:impTableData.recovered,
                total:impTableData.total,
            death:impTableData.death,
            state:impTableData.state
        })
      
    })
    return fetchedTableData;
}
catch(error){
    console.log(error)
}



}