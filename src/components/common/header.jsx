import React from 'react'
import Cookies from 'universal-cookie';
import logod from '../img/user.svg'

export default function Header(props) {
  const cookies = new Cookies();

  var useri = '';
  var logo
  if(cookies.get('ID')){
    useri = 'Usuario';
    logo = logod
  }
 
  const remove_cookies=()=>{
    cookies.remove('ID', {path: '/'});
    cookies.remove('user', {path: '/'});
    cookies.remove('password', {path: '/'});
    // cookies.remove('user_type', {path: '/'});
    cookies.remove('enterprise', {path: '/'});
    cookies.remove('local', {path: '/'});
    cookies.remove('server', {path: '/'});
    document.getElementById('root').value = ''
    document.getElementById('root').placeholder = ''
    // 
    cookies.remove('MenuPrincipal', {path: '/'});
    cookies.remove('Incapacidades', {path: '/'});
    cookies.remove('DetalleIncapacidades', {path: '/'});
    cookies.remove('DetalleProducto', {path: '/'});
    cookies.remove('Kardex', {path: '/'});
    cookies.remove('TrazabilidadKardex', {path: '/'});
    cookies.remove('RegistrosBase', {path: '/'});
    cookies.remove('CodigoBarras', {path: '/'});
  }

  const cerrarSesion=()=>{
    remove_cookies()
    window.location.href = ('/');
  }
  
  
// Function Inactivity
//   var inactivityTime=function(){
//     var time;

//     window.onload = resetTimer;
//     document.onmousemove = resetTimer;
//     document.onkeypress = resetTimer;
   
//     function logout() {
 
//       var modal = document.getElementById('modal-default');
//         modal.className = 'modal fade show';
//         modal.style = 'display: block; padding-right: 15px;'
//         remove_cookies()
//     }
//     var m, s;
//     m = 10;
//     s = 1000*60;
//     function resetTimer() {
//         clearTimeout(time);
//         time = setTimeout(logout, m*s)
//     }
// };
// inactivityTime()

if(cookies.get('user')){
  return (
      <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href role="button"><i className="fas fa-bars" /></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          {cookies.get('MenuPrincipal') === 'MenuPrincipal' &&
          <a href="/dashboard" className="nav-link">Inicio</a>
          }
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          {/* <a href className="nav-link">Soporte</a> */}
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        
        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href role="button">
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
        {/* User  Dropdown panel */}
        
{/*  */}
        <li class="nav-item dropdown user-menu">
        <a href class="nav-link dropdown-toggle" data-toggle="dropdown">
        <i class="fa fa-user"></i>
      
        </a>
        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right card-dark card-outline shadow rounded">
          
          <li class="user-header bg-info">
            <img src={logo} className="img-circle elevation-2 " alt=""/>

            <p>
            {cookies.get('user')}
              <small>{useri}</small>
            </p>
          </li>
         
          <li class="user-body">

           
          </li>
          
          <li class="user-footer">
            {/* <button className='btn btn-secondary btn-flat rounded'>Profile</button> */}
            <button className='btn  btn-flat float-right btn-danger rounded' onClick={cerrarSesion}>Cerrar sesion</button>
          </li>
        </ul>
      </li>
      </ul>
    </nav>
      <div class="modal fade "  id="modal-default" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog"  role="document">
        <div class="modal-content">
          <div class="modal-header  bg-warning">
            <h4 class="modal-title "><i class="fa fa-triangle-exclamation bg-white"></i> Sesion Expirada</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={remove_cookies}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Su sesion ha expirdado.&hellip;
            </p>
            <p>Inicie sesion nuevamente!!</p>
          </div>
          <div class="modal-footer justify-content-between">
            
            <button type="button" class="btn btn-primary" onClick={cerrarSesion}>Iniciar session</button>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
        </div>
        {/* <!-- /.modal-dialog --> */}
      </div>
      
      
      </>
    
  )
  
}else{
  return (
    <center><h1>&nbsp; <span className='text-danger'> 404</span></h1></center>
  )
}
}
