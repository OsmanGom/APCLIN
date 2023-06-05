import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import toast, { Toaster } from "react-hot-toast"

const cookies = new Cookies();

$(document).ready(function () {
  // cargar data de los almacen
  var tA = $('#exampleA').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    
  },
  order: [[0,'desc']],
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  });
 
  $.ajax({
    type: "GET",
    url: `${cookies.get('server')}/api/Almacen/${cookies.get('enterprise')}`,
   
    success: function(json_data) {
      if (json_data !== 'Not Data'){
        //se ordenaron 
        for (let i = 0; i < json_data.length; i++) {
          tA.row.add([
            json_data[i]['cod_store'],
            json_data[i]['detail_store'], 
            json_data[i]['cia_descripcion'],
          
          ]).draw(false);
            
        }
      }
    }
  })

});

export default function AlmacenD(props) {
  document.querySelector('title').textContent = 'Clinica | Detalle Almacen';
    
  useEffect(()=>{
    if(cookies.get('ID')){
      props.history.push('/Detalle/Almacen');
    }else{
      props.history.push('/');
    }
  },[props.history]); 

  const reloadD = () =>{
    window.location.href = '#/dashboard'
    window.location.reload();
   }
   

  // Inicio de cargar datos a los Selects
  
   
 

  

 
  return (
    
    <>
      <div className="content-wrapper mb-3">
        {/* alertas */}
        <div> 
          <Toaster
            toastOptions={{
                      success: {
                      style: {
                          border: '1px solid #738877',
                          padding: '18px',
                          width:'300px',
                          color: '#f9f5f2',
                          background: '#08a225b8',
                      },
                      },
                      error: {
                      style: {
                          border: '1px solid #713200',
                          padding: '16px',
                          color: '#713200',
                          width:'250px',
                      },
                      },
            }}
          />
        </div>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Detalle Almacen</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {cookies.get('MenuPrincipal') === 'MenuPrincipal' &&
                    <li className="breadcrumb-item">
                      <a href='#' onClick={reloadD}>Inicio</a>
                    </li>
                  }
                  <li className="breadcrumb-item active">Detalle Almacen</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>

        {/*Sections of tables  */}
        <section className="content">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-12">
                <div className="card shadow rounded">
                  <div className="card-header ">
                    <h1 className="card-title float-left">Tabla Almacen</h1>     
                  </div>
                  <div className="card-body table-responsive" id='data2'>
                    <table id="exampleA" className="table order-column table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Codigo&nbsp;Almacen</th>
                          <th>Nombre&nbsp;Almacen</th>
                          <th>Nombre&nbsp;Empresa</th>
                          
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Codigo&nbsp;Almacen</th>
                          <th>Nombre&nbsp;Almacen</th>
                          <th>Nombre&nbsp;Empresa</th>                  
                        </tr>
                      </tfoot>
                    </table>
                  </div>{/* /.col */}
                </div>
              </div>
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </section>

      </div>

    </>
    
  )
  
}