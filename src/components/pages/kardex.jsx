import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import toast, { Toaster } from "react-hot-toast"

const cookies = new Cookies();


$(document).ready(function () {
  if(document.getElementById('root').value){

  var t = $('#example2').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
  },order: [[14,'desc']],
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  }); 
  // 
  $.ajax({
    type: "GET",
    url: `${cookies.get('server')}/api/kardex/${cookies.get('enterprise')}`,
   
    success: function(json_data) {
      
      if (json_data !== 'Not Data'){
          
        for (let i = 0; i < json_data.length; i++) {
          let bool, emp

          if (json_data[i]['origin_product'] === true){
            bool = 'Empresa'
          }else{bool = 'Seguro Social'}

          if (json_data[i]['cod_employed'] === '' || json_data[i]['cod_employed'] === null){
            emp = 'Vacio'
          }else{emp = json_data[i]['cod_employed']}
          
          t.row.add([
            json_data[i]['detail'],
            json_data[i]['n_trazability'],
            bool,
            json_data[i]['cod_prod'],
            json_data[i]['name_product'],  
            json_data[i]['cod_lot'], 
            json_data[i]['detail_store'], 
            json_data[i]['quantity'], 
            json_data[i]['cia_descripcion'],  
            json_data[i]['reference'], 
            json_data[i]['date_exp'], 
            json_data[i]['user_register'], 
            emp, 
            json_data[i]['date_tranzaction'],
            json_data[i]['date_create'] 
          ]).draw(false);
            
        }
      }
    }
  })
  }
});

export default function Kardex(props) {
    document.querySelector('title').textContent = 'Clinica |  Kardex';
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Kardex');
      }else{
        props.history.push('/');
      }
    },[props.history]); 

    // Reporte Kardex Entradas
    const Report_Entradas=()=>{
      
      let data = document.getElementById('formRE')
      if(data.f_i.value === '' || data.f_s.value === ''){
        toast.error('Campos Vacios',{duration: 6000, position:"top-right"})
      }else{
        console.log('Entradas')
        // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&fechae=${data.f_i.value}&fechas=${data.f_s.value}&id_enterprise=${cookies.get('enterprise')}`,'_blank');
        data.f_i.value = ''
        data.f_s.value = ''
      }
    }
    
    // Reporte Kardex Salidas
    const Report_Salidas=()=>{
      
      let data2 = document.getElementById('formRS')
      if(data2.f_i2.value === '' || data2.f_s2.value === ''){
        toast.error('Campos Vacios',{duration: 6000, position:"top-right"})
      }else{
        console.log('Salidas')
        // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&fechae=${data2.f_i2.value}&fechas=${data2.f_s2.value}&id_enterprise=${cookies.get('enterprise')}`,'_blank');
        data2.f_i2.value = ''
        data2.f_s2.value = ''
      }
    }
    return (
      
      <><div className="content-wrapper">
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
                <h1 className="m-0">Control de Inventario</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                {cookies.get('MenuPrincipal') === 'MenuPrincipal' &&
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Inicio</a>
                  </li>
                }
                  <li className="breadcrumb-item active">Detalle KARDEX</li>
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
                  <h1 className="card-title">Trazabilidad Movimientos</h1>
                  <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' data-toggle="modal" data-target="#Report_salidas">
                    <i class="fa fa-file"></i> Salidas
                  </button>
                  <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' data-toggle="modal" data-target="#Report_entradas">
                    <i class="fa fa-file"></i> Entradas
                  </button>
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="example2" className="table order-column table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Tipo Movimiento</th>
                          <th>Nº Correlativo</th>
                          <th>Origen</th>
                          <th>Cod Producto</th>
                          <th>Producto</th>
                          <th>Lote</th>
                          <th>Almacén</th>
                          <th>Cantidad</th>
                          <th>Empresa</th>
                          <th>Referencia</th>
                          <th>Fecha de expiración</th>
                          <th>Usuario Registro</th>
                          <th>Codigo Empleado</th>
                          <th>Fecha Transacción</th>
                          <th>Fecha Creación</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Tipo Movimiento</th>
                          <th>Nº Correlativo</th>
                          <th>Origen</th>
                          <th>Cod Producto</th>
                          <th>Producto</th>
                          <th>Lote</th>
                          <th>Almacén</th>
                          <th>Cantidad</th>
                          <th>Empresa</th>
                          <th>Referencia</th>
                          <th>Fecha de expiración</th>
                          <th>Usuario Registro</th>
                          <th>Codigo Empleado</th>
                          <th>Fecha Transacción</th>
                          <th>Fecha Creación</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>{/* /.col */}
                </div>
              </div>
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </section>
      {/* Modal reportes entradas */}
      <div class="modal fade rounded shadow-lg" id="Report_entradas" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header bg-warning">
                    <h5 class="modal-title">Reporte Entradas Kardex</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form id='formRE'>
                      {/*  */}
                      <div className="row">
                        <div class="form-group col-md-5 ">
                          <label>Fecha Inicio</label>
                          <div class="input-group date" data-target-input="nearest">
                            <input type="date" class="form-control form-control-border" name="f_i" />
                            <div class="invalid-feedback">
                              Campo vacio.
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-5 ">
                          <label>Fecha Final</label>
                          <div class="input-group date" data-target-input="nearest">
                            <input type="date" class="form-control form-control-border" name="f_s" />
                            <div class="invalid-feedback">
                              Campo vacio.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*  */}
                      <div class="modal-footer  justify-content-between">
                        <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary btn-sm" onClick={Report_Entradas}>Registrar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
      </div>
      {/*  */}
      {/* Modal reportes entradas */}
      <div class="modal fade rounded shadow-lg" id="Report_salidas" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header bg-warning">
                    <h5 class="modal-title">Reporte Salidas Kardex</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form id='formRS'>
                      {/*  */}
                      <div className="row">
                        <div class="form-group col-md-5 ">
                          <label>Fecha Inicio</label>
                          <div class="input-group date" data-target-input="nearest">
                            <input type="date" class="form-control form-control-border" name="f_i2" />
                            <div class="invalid-feedback">
                              Campo vacio.
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-5 ">
                          <label>Fecha Final</label>
                          <div class="input-group date" data-target-input="nearest">
                            <input type="date" class="form-control form-control-border" name="f_s2" />
                            <div class="invalid-feedback">
                              Campo vacio.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*  */}
                      <div class="modal-footer  justify-content-between">
                        <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary btn-sm" onClick={Report_Salidas}>Registrar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
      </div>
      {/*  */}
      </div>
      {/* Modal register product */}
      
      {/*  */}
      </>

    )
  
  }