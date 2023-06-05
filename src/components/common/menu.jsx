import React from 'react'
import Cookies from 'universal-cookie';
import logo from "../img/sea1.png"
import 'react-bootstrap';
import '../common/Css/style.css';


export default function Menu() {




  const cookies = new Cookies();
  //console.log(cookies.get('DetalleIncapacidadesRH'));
  const reloadi = (event) => {
    window.location.href = '#/Incapacidades'
    window.location.reload();
  }
  const reloaddi = (event) => {
    window.location.href = '#/Detalle/Incapacidades'
    window.location.reload();
  }
  const reloadd = (event) => {
    window.location.href = '#/Detalle/IncapacidadesRH'
    window.location.reload();

  }
  const reloadp = (event) => {
    window.location.href = '#/Detalle/Productos'
    window.location.reload();
  }
  const reloada = (event) => {
    window.location.href = '#/Detalle/Almacen'
    window.location.reload();
  }
  const reloadk = (event) => {
    window.location.href = '#/kardex'
    window.location.reload();
  }
  const reloadtk = (event) => {
    window.location.href = '#/Kardex/Trazabilidad'
    window.location.reload();
  }
  const reloadrb = (event) => {
    window.location.href = '#/Registros/Base'
    window.location.reload();
  }
  const reloadqr = (event) => {
    window.location.href = '#/barcode'
    window.location.reload();
  }
  const reloadD = () => {
    window.location.href = '#/dashboard'
    window.location.reload();
  }

  const reloadTM = () => {
    window.location.href = '#/Detalle/TipoMov'
    window.location.reload();
  }

  const reloadTP = () => {
    window.location.href = '#/Detalle/TipoProd'
    window.location.reload();
  }

  if (cookies.get('user')) {
    return (

      <aside className="main-sidebar sidebar-dark-danger elevation-4">
        {/* Brand Logo */}
        <a href className="brand-link mb-4 ">
          <img src={logo} alt="" className="border brand-image rounded  border-dark  ml-4" />
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
          {/* <li className="nav-item">
              <a href type="button" class="nav-link" onClick={reloadD}>
                <span className="fa fa-object-ungroup mr-2" />
                <p>
                  Inicio
                  <i className="nav-icon far fa-circle text-info right"></i>
                </p>
              </a>
            </li> */}


          {/* Sidebar Menu */}
          <nav className="mt-2">

            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <div class="btn-group ">
              <button type="button" onClick={reloadD} class="btn col-12 custom-button" data-toggle="collapse" aria-expanded="false" aria-controls="multiCollapseExample2">
                <span className="fas fa-home mr-2" style={{color: "#ffffff",}} /> <span className="nav-header text-white">Inicio</span> 
              </button>


              </div>
              <br></br>
              <div class="btn-group ">
                <button type="button" class="btn btn-danger dropdown-toggle col-12" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample2">
                  <span className="fas fa-layer-group mr-2" /> <span className='nav-header text-white'>Opciónes Principales</span>
                </button>
              </div>
              <div class="collapse multi-collapse bg-dark col-12" id="multiCollapseExample1">
                <div class="card card-body  bg-dark ">
                  {cookies.get('Incapacidades') === 'Incapacidades' &&
                    <div class="nav-item" type="button">
                      <a type='button' href className="nav-link" onClick={reloadi}>
                        <i className="far fa-circle nav-icon mr-2" />
                        <span className='nav-header'>Incapacidades</span>

                      </a>
                    </div>
                  }
                  {cookies.get('DetalleIncapacidades') === 'DetalleIncapacidades' &&
                    <div class="nav-item" type="button">
                      <a href type="button" class="nav-link" onClick={reloaddi}>
                        <i className="far fa-circle nav-icon " />
                        <span className='nav-header' >Detalle Incapacidades</span>
                      </a>

                    </div>
                  }
                  {cookies.get('DetalleIncapacidadesRH') === 'DetalleIncapacidadesRH' &&
                    <div class="nav-item" type="button">
                      <a href type="button" class="nav-link" onClick={reloadd}>
                        <i className="far fa-circle nav-icon " />
                        <span className='nav-header' >Incapacidades Detalle</span>
                      </a>
                    </div>
                  }

                  {cookies.get('DetalleProducto') === 'DetalleProducto' &&
                    <div class="nav-item" type="button">
                      <a href type="button" class="nav-link" onClick={reloadp}>
                        <i className="far fa-circle nav-icon " />
                        <span className='nav-header' >Detalle Productos</span>
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
                  <a href type="button" class="nav-link" onClick={reloadk}>
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
                  <a href type="button" class="nav-link" onClick={reloadtk}>
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
                      <a href type="button" class="nav-link" onClick={reloadrb}>
                        <i className="far fa-circle nav-icon mr-2" />
                        <span className='nav-header'>Registros Base</span>

                      </a>
                    </div>
                  }
                  {cookies.get('CodigoBarras') === 'CodigoBarras' &&
                    <div class="nav-item" type="button">
                      <a href type="button" class="nav-link" onClick={reloadqr}>
                        <i className="far fa-circle nav-icon mr-2" />
                        <span className='nav-header'>Generar Codigo Barras</span>

                      </a>
                    </div>
                  }
                </li>

              </div>

              <li className="nav-header">Visores</li>

                <div class="btn-group ">
                  <button type="button" class="btn btn-danger dropdown-toggle col-12" data-toggle="collapse" data-target="#multiCollapseExample3" aria-expanded="false" aria-controls="multiCollapseExample2">
                    <span className="fas fa-layer-group mr-2" /> <span className='nav-header text-white'> Visores </span>
                  </button>
                </div>
                <div class="collapse multi-collapse bg-dark col-12" id="multiCollapseExample3">
                  <li class="card card-body  bg-dark ">
                    
                    {cookies.get('DetalleAlmacen') === 'DetalleAlmacen' &&
                      <div class="nav-item" type="button">
                        <a href type="button" class="nav-link" onClick={reloada}>
                          <i className="far fa-circle nav-icon mr-2" />
                          <span className='nav-header'>Visor Detalle Almacen</span>

                        </a>
                      </div>
                    }
                    {cookies.get('TipoProducto') === 'TipoProducto' &&
                      <div class="nav-item" type="button">
                        <a href type="button" class="nav-link" onClick={reloadTP}>
                          <i className="far fa-circle nav-icon mr-2" />
                          <span className='nav-header'>Visor Tipo Producto</span>

                        </a>
                      </div>
                    }
                     {cookies.get('TipoMovimiento') === 'TipoMovimiento' &&
                      <div class="nav-item" type="button">
                        <a href type="button" class="nav-link" onClick={reloadTM}>
                          <i className="far fa-circle nav-icon mr-2" />
                          <span className='nav-header'>Visor Tipo Movimiento</span>

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
  }
}

