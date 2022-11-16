import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import logo from "../img/sea1.png"


export default function Login(props) {
  document.querySelector('title').textContent = 'Clinica | Login';
  

  const url = 'https://localhost:5001/api/users'
  const cookies = new Cookies();
  
  
  const [form, setForm]=useState({
    username : '',
    password : ''
  });

  const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
      
    });
    // console.log(form);
  }

  const login = async()=>{
    var pass = document.getElementById('password');
    var usern = document.getElementById('username');
    
    if (pass.value === '' || usern.value === ''){
      pass.className = 'form-control is-invalid';
      usern.className = 'form-control is-invalid';
    }else{
        // 
        
        await axios.get(url+`/${form.username}/${form.password}`)
        .then(Response=>{
          return Response.data;
        }).then(Response=>{
          if(Response.length > 0){
            var respuesta = Response[0];
            
            cookies.set('ID', respuesta.id, { path: '/' });
            cookies.set('user', respuesta.username, { path: '/' });
            cookies.set('user_type', respuesta.user_type, { path: '/' });
            
            // props.history.push('/dashboard')
            window.location.href=('/dashboard')
          }else{
            document.getElementById('validationL').innerText = 'Usuario o contraseña incorrecta!!';
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
          <input type="email" className="form-control" placeholder="Nombre de usuario" name='username' id="username" onChange={handleChange} required/>
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
          <input type="password" className="form-control" placeholder="Contraseña" name='password' id="password" onChange={handleChange} required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
          <div class="invalid-feedback">
            Campo vacio.
          </div>
        </div>
        <div className="row">
          
          <div className="col-4">
            <button type="button" className="btn btn-primary btn-block bt-5 " onClick={()=>login()}>Login
            </button>
          </div>
          {/* /.col */}
        </div>
      </form>
      
      {/* /.social-auth-links */}
      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      
    </div>
    {/* /.login-card-body */}
  </div>
</div>
</div>
    )
}
