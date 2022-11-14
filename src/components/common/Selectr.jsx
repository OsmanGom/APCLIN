import React from 'react'

import axios from 'axios';
import $ from 'jquery';

// if ( window.location.href === "http://localhost:3000/Incapacidades"){

  // s.addEventListener("Charger", opcionChange)

  // const add = () => {
  //   const option = document.createElement('option')
  //   const value = new Date().getTime()
  //   option.value = value;
  //   option.text = value;
  //   s.appendChild(option)
  // }

  // axios({
  //     method: 'get',
  //     url: 'https://localhost:5001/api/tipo_producto',
  //     responseType: 'json'
  //   })
  //     .then(function (response) {
  //       console.log(response.data.length)
  //       for (let i = 0; i < response.data.length; i++) {
  //          s.select.add([
  //           response.data[i]['id_type_p']
  //          ]).draw(false)
  //           // console.log(response.data[i]['id_type_p'])
  //           // console.log(response.data[i]['description_typeP'])
  //           // console.log(response.data[i]['unid_med'])
  //       }
  //     });
  // }
export default function Selectr(){
  const s = document.querySelector('#idselect')
  console.log("element of select ",s)

  const opcionChange = () => {
    console.log('Change')
  }
    return(
      <select className='form-control select2' id='idselect' >
      <option selected='selected'>Alabama</option>
      
    </select>
    
    )
}

