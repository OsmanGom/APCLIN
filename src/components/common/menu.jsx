import React from 'react'
import Cookies from 'universal-cookie';

export default function Menu() {
 
  const cookies = new Cookies();
  var useri = '';
  if(cookies.get('user_type') === '1' ){
        useri = 'Admin';
  }else if (cookies.get('user_type') === '2'){
        useri = 'Doctora';
  }else{
      useri = 'Enfermera';
  }
  return (
     
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a href="index3.html" className="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">{useri}</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel  ml-2 mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <i class="fa fa-user text-white">  </i>
        </div>
        <div className="info">
          <a href className="d-block">  {cookies.get('user')}</a>
        </div>
      </div>
      {/* SidebarSearch Form */}
      
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
              with font-awesome or any other icon font library */}
          
          <li className="nav-item">
            <a href className="nav-link">
              <i className="nav-icon fas fa-table" />
              <p>
                Options
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/Incapacidades" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Incapacidades</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Detalle/Incapacidades" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Detalle Incapacidades</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/tables/jsgrid.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>jsGrid</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-header">EXAMPLES</li>
          <li className="nav-item">
            <a href="pages/calendar.html" className="nav-link">
              <i className="nav-icon far fa-calendar-alt" />
              <p>
                Calendar
                <span className="badge badge-info right">2</span>
              </p>
            </a>
          </li>
        
          <li className="nav-header">MISCELLANEOUS</li>
          
          
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
    </aside>

  );
}

