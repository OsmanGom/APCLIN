import React from 'react'
import Cookies from 'universal-cookie';

export default function Header(props) {
  const cookies = new Cookies();
 
  const remove_cookies=()=>{
    cookies.remove('ID', {path: '/'});
    cookies.remove('user', {path: '/'});
    cookies.remove('password', {path: '/'});
    cookies.remove('user_type', {path: '/'});
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
          <a href className="nav-link">Soporte</a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        
        {/* Messages Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href>
            <i className="far fa-comments" />
            <span className="badge badge-danger navbar-badge">3</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">

            <div className="dropdown-divider" />
            <a href className="dropdown-item">
              {/* Message Start */}
              <div className="media">
                <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    John Pierce
                    <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                  </h3>
                  <p className="text-sm">I got your message bro</p>
                  <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                </div>
              </div>
              {/* Message End */}
            </a>
            <div className="dropdown-divider" />
            <a href className="dropdown-item">
              {/* Message Start */}
              <div className="media">
                <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Nora Silvester
                    <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                  </h3>
                  <p className="text-sm">The subject goes here</p>
                  <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                </div>
              </div>
              {/* Message End */}
            </a>
            <div className="dropdown-divider" />
            <a href className="dropdown-item dropdown-footer">See All Messages</a>
          </div>
        </li>
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
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
        </li>
        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href role="button">
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
        {/* User  Dropdown panel */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href>
            <i class="fa fa-user"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">Panel</span>
            <div className="dropdown-divider" />
            <a href className="dropdown-item">
              {cookies.get('user')}
              <span className="float-right text-sm text-dark"><i class="fa fa-user"></i></span>
            </a>
            <div className="dropdown-divider" />
            <a href className="dropdown-item" onClick={cerrarSesion}>
              Cerrar session
              <span className="float-right text-sm text-dark"><i class="fa fa-arrow-right"></i></span>
            </a>

            <div className="dropdown-divider" />

            <div className="dropdown-divider" />

          </div>
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
