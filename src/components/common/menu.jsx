import React from 'react'
import Cookies from 'universal-cookie';
import logo from "../img/sea1.png"



export default function Menu() {
 
  const cookies = new Cookies();
  
  return (
     
    <aside className="main-sidebar sidebar-dark-danger elevation-4">
    {/* Brand Logo */}
    <a href="/dashboard" className="brand-link mb-4 ">
      <img src={logo} alt="" className="border brand-image rounded  border-dark  ml-4"/>
      <span className="   text-danger">&nbsp;</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel  ml-2 mt-1  d-flex">
        <div className="image mt-2">
          <i className="fa fa-user text-primary">  </i>
        </div>
        <div className="info">
          <a href className="d-block text-white ">  {cookies.get('user')}</a>
        </div>
      </div>
      {/* SidebarSearch Form */}
      
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
              with font-awesome or any other icon font library */}
          
          <li className="nav-item">
            <a href className="nav-link active">
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
                <a href="/Detalle/Productos" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Detalle Productos</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-header">Inventario</li>
          <li className="nav-item">
            <a href="/kardex" className="nav-link">
            <i class="nav-icon fas fa-table"></i>
              <p>
                Kardex
                <i class="nav-icon far fa-circle text-info right"></i>
              </p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/Kardez/Trazabilidad" className="nav-link">
            <i class="nav-icon fas fa-table"></i>
              <p>
                Trazabilidad Kardex
                <i class="nav-icon far fa-circle text-danger right"></i>
              </p>
            </a>
          </li>
        
          <li className="nav-header">Registros</li>
          <li className="nav-item">
            <a href className="nav-link active">
            <i class="nav-icon fas fa-edit"/>
              <p>
                Options
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/Registros/Base" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Registros Base</p>
                </a>
              </li>
            </ul>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/barcode" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Generar Codigo Barras</p>
                </a>
              </li>
            </ul>
          </li>
          
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
    </aside>

  );
}

