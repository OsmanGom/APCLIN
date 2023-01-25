import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import logo from "../img/sea1.png"
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import {OpcionesMenu} from '../security/PermisosMenu'

$(document).ready(function () {
  var p = document.getElementById('idempres')
  // select de empresa
  if (p != null){
      let options = document.querySelectorAll('#idempres option');
          options.forEach(o => o.remove());
      $.ajax({
          type: "GET", 
          url: `https://localhost:5001/api/empresa`,
      
          success: function(json_data) {  
          const op = document.createElement('option') 
          op.value = ''
          op.text = '------ Seleccione -------'
          p.appendChild(op)
          if (json_data !== 'Not Data'){
              for (let i = 0; i < json_data.length; i++) {
                  const option = document.createElement('option')
                  option.value = json_data[i]['cia_codigo']
                  option.text = json_data[i]['cia_descripcion']+'-'+json_data[i]['cia_abreviatura']
                  p.appendChild(option);
              }
          }
          }
      })
  }
})


export default function Login(props) {
  document.querySelector('title').textContent = 'Clinica | Login';
  const datamenu = OpcionesMenu
  const url = 'https://localhost:5001'//url del servidor de las apis
  const cookies = new Cookies();
  
  const peticionPost=async(data)=>{
    // console.log(data)
    await axios.post(`${url}/api/permisos`,data)
    .then(Response=>{
      return Response.data;
    }).catch(error=>{
        console.log(error)
    })
}

  const generarMenu = () => {
    for (let ii = 0; ii < datamenu.length; ii++) 
    {
        const datos = {"NombreMenu": datamenu[ii].NombreMenu,"NombreLogico": datamenu[ii].NombreLogico,"Nivel": 1, "NombreMenuPadre": "0","CodSistema":"013"};
        peticionPost(datos)
    }
  }
  
  
  const [form, setForm]=useState({
    Usuario : '',
    Contrasena : '',
    CodSistema : '013'
  });

  const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
      
    });
    
    // console.log(form);
  }
  const handleKeyPress = (event) =>{
    if(event.key === 'Enter'){
      login()
    }
}

  const login = async()=>{
    let pass = document.getElementById('password');
    let usern = document.getElementById('username');
    let enterprise = document.getElementById('idempres')
    
    if (pass.value === '' || usern.value === '' || enterprise.value === ''){
      pass.className = 'form-control is-invalid';
      usern.className = 'form-control is-invalid';
      enterprise.className = 'custom-select form-control-border is-invalid'
    }else{
        // 
        // Logeo
        await axios.post(`${url}/api/login`,form)
        .then(Response=>{
          return Response.data;
        }).then(Response=>{
          if(Response[0].IdUsuario > 0){
            let respuesta = Response[0];
            // console.log(respuesta)
            cookies.set('ID', respuesta.IdUsuario, { path: '/' });//ID de retorno de login validacion
            cookies.set('user', usern.value, { path: '/' });// Nombre usuario
            cookies.set('enterprise', enterprise.value, { path: '/' });//Empresa Login
            cookies.set('local', window.location.href , {path: '/'});// url server del sistema
            cookies.set('server', url , {path: '/'});// variable url, url del servidor apis
            generarMenu()

            $.ajax({
              type: 'get', 
              url: `${url}/api/permisos/${respuesta.IdUsuario}/${form.CodSistema}`,
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              },
              success: function (res){
               let path
               if (res !== 'Not Data'){
                    //
                    // console.log(res)
                    for(let o = 0; o < datamenu.length; o++) {
                      if(datamenu[o].NombreLogico === res[0].NombreLogico){
                        path = datamenu[o].path
                      }
                    }
                  for(let i = 0 ; i < res.length; i++){
                    if(res[i].IdMenu === 203){
                      cookies.set('TrazabilidadKardex', res[i].NombreLogico , {path: '/'});
                    }
                    if(res[i].IdMenu === 204){
                      cookies.set('DetalleProducto', res[i].NombreLogico , {path: '/'});
                    }
                    if(res[i].IdMenu === 205){
                      cookies.set('DetalleIncapacidades', res[i].NombreLogico , {path: '/'});
                    }
                    if(res[i].IdMenu === 206){
                      cookies.set('Kardex', res[i].NombreLogico , {path: '/'});
                    }
                    if(res[i].IdMenu === 207){
                      cookies.set('RegistrosBase', res[i].NombreLogico , {path: '/'});
                    }

                    if(res[i].IdMenu === 208){
                      cookies.set('MenuPrincipal', res[i].NombreLogico , {path: '/'});
                       path = datamenu[0].path
                    }
                    if(res[i].IdMenu === 209){
                      cookies.set('CodigoBarras', res[i].NombreLogico , {path: '/'});
                    }
                    if(res[i].IdMenu === 210){
                      cookies.set('Incapacidades', res[i].NombreLogico , {path: '/'});
                    }
                 }
                  console.log(path)
                  
                  window.location.href=(`${path}`)
                }
              } 
            })
          }else if(Response[0].IdUsuario === 0){
              document.getElementById('validationL').innerText = 'Usuario o contraseña incorrecta!!';
          }else if(Response[0].IdUsuario === -1){
              document.getElementById('validationL').innerText = 'Usuario sin acceso al sistema!!';
          }  
          
        })
        
        .catch(error=>{
          console.log(error);
        })
        // 
    }
  }
  
  useEffect(()=>{
    if(cookies.get('ID')){
      props.history.push('/dashboard');
    }else{
      props.history.push('/');
    }
      },[]);

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/"><img src={logo} alt="" width={'200px'}/></a>
        </div>
        {/* /.login-logo */}
        <div className="card mt-4 card-danger card-outline ">
          <div className="card-body login-card-body shadow rounded">
            <p className="login-box-msg">Inicio de session</p>
            <p class="text-danger" id="validationL"></p>
            <form >
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Nombre de usuario" name='Usuario' id="username" onChange={handleChange} onKeyPress={handleKeyPress} required/>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
                <div class="invalid-feedback">
                  Campo vacio.
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Contraseña" name='Contrasena' id="password" onChange={handleChange}  onKeyPress={handleKeyPress} required/>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
                <div class="invalid-feedback">
                  Campo vacio.
                </div>
              </div>
              
              <div class="form-group col-12 ">
                <label><span className="fas fa-warehouse mr-2 ml-2" />Empresa</label>
                <select className='custom-select form-control-border' id='idempres' name='cod_enterprise'  onKeyPress={handleKeyPress} required >
                </select>
              </div>
              <div className="row">
                
                <div className="col-4">
                  <button type="button" className="btn btn-primary btn-block bt-5 " onClick={()=>login()}>Login
                  </button>
                </div>
                
                {/* /.col */}
              </div>
            </form>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  )
}
