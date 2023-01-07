import React from 'react'
import Cookies from 'universal-cookie';
import logod from '../img/user.svg'
import logoa from '../img/admin.svg'
import logoe from '../img/nurse.svg'

export default function Header(props) {
  const cookies = new Cookies();

  var useri = '';
  var logo
  if(cookies.get('user_type') === '1' ){
        useri = 'Admin';
        logo = logoa
  }else if (cookies.get('user_type') === '2'){
        useri = 'Doctora';
        logo = logod
  }else{
      useri = 'Enfermera';
      logo = logoe
  }
 
  const remove_cookies=()=>{
    cookies.remove('ID', {path: '/'});
    cookies.remove('user', {path: '/'});
    cookies.remove('password', {path: '/'});
    cookies.remove('user_type', {path: '/'});
    cookies.remove('enterprise', {path: '/'});
    document.getElementById('root').value = ''
    document.getElementById('root').placeholder = ''
  }

  const cerrarSesion=()=>{
    remove_cookies()
    window.location.href = ('/');
  }
  
  
// Function Inactivity
  var inactivityTime=function(){
    var time;

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
   
    function logout() {
 
      var modal = document.getElementById('modal-default');
        modal.className = 'modal fade show';
        modal.style = 'display: block; padding-right: 15px;'
        remove_cookies()
    }
    var m, s;
    m = 10;
    s = 1000*60;
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, m*s)
    }
};
inactivityTime()


  return (
      <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href role="button"><i className="fas fa-bars" /></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/dashboard" className="nav-link">Home</a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          {/* <a href className="nav-link">Soporte</a> */}
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        
        {/* Notifications Dropdown Menu */}
        {/* <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href>
            <i className="far fa-bell" />
            <span className="badge badge-warning navbar-badge">15</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">15 Notifications</span>
            <div className="dropdown-divider" />
            <a href className="dropdown-item">
              <i className="fas fa-envelope mr-2" /> 4 new messages
              <span className="float-right text-muted text-sm">3 mins</span>
            </a>
            <div className="dropdown-divider" />
            <a href className="dropdown-item">
              <i className="fas fa-users mr-2" /> 8 friend requests
              <span className="float-right text-muted text-sm">12 hours</span>
            </a>
            <div className="dropdown-divider" />
            <a href className="dropdown-item">
              <i className="fas fa-file mr-2" /> 3 new reports
              <span className="float-right text-muted text-sm">2 days</span>
            </a>
            <div className="dropdown-divider" />
            <a href className="dropdown-item dropdown-footer">See All Notifications</a>
          </div>
        </li> */}
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
            <button className='btn btn-secondary btn-flat rounded'>Profile</button>
            <button className='btn  btn-flat float-right btn-danger rounded' onClick={cerrarSesion}>Cerrar sesion</button>
          </li>
        </ul>
      </li>
      </ul>
    </nav>
    {/* <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default" id="xd">
        Launch Default Modal
      </button> */}
      {/*  */}
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
}
