import React from 'react'
import Cookies from 'universal-cookie';
import logo from "../img/sea1.png"
import 'react-bootstrap';



export default function Menu() {
  const cookies = new Cookies();
 
  if(cookies.get('user')){
    return (
       
      <aside className="main-sidebar sidebar-dark-danger elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link mb-4 ">
        <img src={logo} alt="" className="border brand-image rounded  border-dark  ml-4"/>
        <span className="   text-danger">&nbsp;</span>
      </a>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel ml-2 mt-1 d-flex">
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
  

            <div class="btn-group ">
              <button type="button" class="btn btn-danger dropdown-toggle col-12" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample2">
              <span className="fas fa-layer-group mr-2" /> <span className='nav-header text-white'>Opciónes Principales</span> 
              </button>
            </div>
              <div class="collapse multi-collapse bg-dark col-12" id="multiCollapseExample1">
                <div class="card card-body  bg-dark ">
                  {cookies.get('Incapacidades') === 'Incapacidades' &&
                  <div class="nav-item" type="button"> 
                    <a href="/Incapacidades" className="nav-link">
                      <i className="far fa-circle nav-icon mr-2" />
                      <span className='nav-header'>Incapacidades</span>
                      
                    </a>
                  </div>
                  }
                  {cookies.get('DetalleIncapacidades') === 'DetalleIncapacidades' &&
                  <div class="nav-item" type="button"> 
                    <a href="/Detalle/Incapacidades" className="nav-link">
                      <i className="far fa-circle nav-icon mr-2" />
                      <span className='nav-header'>Detalle Incapacidades</span>
                      
                    </a>
                  </div>
                  }
                  
                  {cookies.get('DetalleProducto') === 'DetalleProducto'  &&
                  <div class="nav-item" type="button"> 
                    <a href="/Detalle/Productos" className="nav-link">
                      <i className="far fa-circle nav-icon mr-2" />
                      <span className='nav-header'>Detalle Productos</span>
                      
                    </a>
                  </div>
                  }
                </div>
              </div>
            {cookies.get('Kardex') === 'Kardex' &&
            <li className="nav-header">Inventario</li>
            }
            {cookies.get('Kardex') === 'Kardex' &&
            <li className="nav-item">
              <a href="/kardex" className="nav-link">
              <span className="fa fa-object-ungroup mr-2" />
                <p>
                  Kardex
                  <i className="nav-icon far fa-circle text-info right"></i>
                </p>
              </a>
            </li>
            }
            {cookies.get('TrazabilidadKardex') === 'TrazabilidadKardex' &&
            <li className="nav-item">
              <a href="/Kardex/Trazabilidad" className="nav-link">
              <span className="fa fa-object-ungroup mr-2" />
                <p>
                  Trazabilidad Kardex
                  <i className="nav-icon far fa-circle text-danger right"></i>
                </p>
              </a>
            </li>
            }
            
            <li className="nav-header">Registros</li>
           
            <div class="btn-group ">
              <button type="button" class="btn btn-danger dropdown-toggle col-12" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
              <span className="fas fa-layer-group mr-2" /> <span className='nav-header text-white'> Opciónes Secundarias</span> 
              </button>
            </div>
              <div class="collapse multi-collapse bg-dark col-12" id="multiCollapseExample2">
                <li class="card card-body  bg-dark ">
                  {cookies.get('RegistrosBase') === 'RegistrosBase' &&
                  <div class="nav-item" type="button"> 
                    <a href="/Registros/Base" className="nav-link">
                      <i className="far fa-circle nav-icon mr-2" />
                      <span className='nav-header'>Registros Base</span>
                      
                    </a>
                  </div>
                  }
                  {cookies.get('CodigoBarras') === 'CodigoBarras' &&
                  <div class="nav-item" type="button"> 
                    <a href="/barcode" className="nav-link">
                      <i className="far fa-circle nav-icon mr-2" />
                      <span className='nav-header'>Generar Codigo Barras</span>
                      
                    </a>
                  </div>
                  }
                </li>
                
              </div>
            
            
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
      </aside>
  
    );
  }else{
    return (
      <center><h1>&nbsp; Not Found</h1></center>
    );
  }
}

