import React from 'react'
// import bootstrap from 'bootstrap'
import axios from 'axios';

if ( window.location.href === "http://localhost:3000/Incapacidades"){
 
axios({
    method: 'get',
    url: 'https://localhost:5001/api/area',
    responseType: 'json'
  })
    .then(function (response) {
      console.log(response.data)
    });
  }
export default function Select(){
    // const url = 'https://localhost:5001/api/area'
 // Consult area
//  axios.get(url)
//  .then((response) =>{
//    for (let i = 0; i < response.data.length; i++) {
//      console.log( response.data[i].cod_area)
//    } 
//  }
//  ).catch((error) =>{
//    console.log(error)
//  });
 // 


    
 

 

    return(
        <select class="js-example-basic-single form-control-border border-width-2  "name="area" >
            <option value="" text="uno">1</option>
            <option value="">2</option>
            <option value="">3</option>
                                    
        </select>
    )
}

