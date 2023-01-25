import React,{useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import toast, { Toaster } from "react-hot-toast"

const cookies = new Cookies();

$(function (){
  if(document.getElementById('root').value){
    // Inicializacion de Datatable  de Incapacidades
    var t2 = $("#example").DataTable({
      "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    },
      order: [[0,'desc']],
      "responsive": true, "lengthChange": true, "autoWidth": true,
    })
    
    $.ajax({
        type: "GET",
        url: `${cookies.get('server')}/api/incapacidades/${cookies.get('enterprise')}`,
      
        success: function(json_data) {
          if (json_data !== 'Not Data'){
            let condition,status
            for (let i = 0; i < json_data.length; i++) {
              
              if(json_data[i]['condition'] === ''){
                condition = 'Vacio'
              }else{condition = json_data[i]['condition']}

              if(json_data[i]['status_p'] === true){
                status = 'Permanente'
              }else{status = 'Temporal'}
              
              t2.row.add([
                json_data[i]['n_tranzability'], 
                json_data[i]['exp_codigo_alternativo'], 
                json_data[i]['exp_nombres_apellidos'], 
                json_data[i]['departamento'],
                json_data[i]['puesto'], 
                json_data[i]['days'], 
                condition, 
                status, 
                json_data[i]['date_from'],
                json_data[i]['date_to'],
                json_data[i]['date_p'], 
                json_data[i]['days_p'],
                json_data[i]['user_register'],
                json_data[i]['creation_date'], 
                json_data[i]['diagnostic'], //onclick=`+"{Reporte_Incapacidades(this.value)}"+`
                `<button class='btn btn-secondary  btn-md' value=`+json_data[i]['id']+` title='Reporte Firma'onclick=`+"{Reporte_Firma_persona(this.value,document.getElementById('root').value)}"+` ><i class="fa fa-file-export"></i></button>`,
                `<button class='btn btn-warning  btn-md' value=`+json_data[i]['id']+` title='Reporte Incapacidad' onclick=`+"{Reporte_Incapacidades_persona(this.value,document.getElementById('root').value)}"+`><i class="fa fa-file-export"></i></button>`,
                `<button class='btn btn-success  btn-md' value=`+json_data[i]['id']+` title='Modificar' data-toggle="modal" data-target="#edit" onclick=`+"{Mod(this.value,document.getElementById('root').value)}"+`><i class="nav-icon fas fa-edit"></i></button>`
              ]).draw(false);
                
            }
            
          }
        }
    })

  }
});

export default function Incapacidades(props) {

  document.querySelector('title').textContent = 'Clinica | Detalle Incapacidad';
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Detalle/Incapacidades');
      }else{
        props.history.push('/');
      }
      
    },[props.history]); 

    // Reportes de incapacidades mensuales
    const Report_Incapacidades_Mensual=()=>{
      let data = document.getElementById('formRM')
      if(data.f_i.value === '' || data.f_s.value === ''){
        toast.error('Campos Vacios',{duration: 6000, position:"top-right"})
      }else{
        // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&fechaer=${data.f_i.value}&fechasr=${data.f_s.value}&id_enterprise=${cookies.get('enterprise')}`,'_blank');
        data.f_i.value = ''
        data.f_s.value = ''
      }
    }
    // Reportes de Incapacidades diarias
    const Report_Incapacidades_Diario=()=>{
      let data2 = document.getElementById('formRD')
      if(data2.f_i2.value === '' || data2.f_s2.value === ''){
        toast.error('Campos Vacios',{duration: 6000, position:"top-right"})
      }else{
        // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&fechaer=${data2.f_i2.value}&fechasr=${data2.f_s2.value}&id_enterprise=${cookies.get('enterprise')}`,'_blank');
        data2.f_i2.value = ''
        data2.f_s2.value = ''
      }
    }
    const EditI=()=>{
      let formED = document.getElementById('formED')
      let status

        if(formED.status_p.value === ''){
          
          if(formED.status_p.id ){
            status = 1
          }else{
            status = 0
          }
          
        }else{
          console.log('algo')
          status = formED.status_p.value
        }
        
        // 
        $.ajax({
          type: 'Patch', 
          url: `${cookies.get('server')}/api/incapacidades`,
          headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
          },
          data: JSON.stringify({
            id:parseInt(formED.cod.id),
            days:parseInt(formED.days.value),
            condition:formED.condition.value,
            diagnostic:formED.diagnostic.value,
            status_p:parseInt(status),
            date_p:formED.date_p.value,
            days_p:formED.days_p.value,
            type_date:formED.type_date.value,
            date_from:formED.date_from.value,
            date_to:formED.date_to.value
          }),
          success: function (res){
            toast.success(res,{duration: 6000, position:"top-right"})
            
          }, error: function(error){
            console.log(error.responseText)
          } 
        })
    }
    
    return (
      <>
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
      <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Detalle Incapacidades</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                  {cookies.get('MenuPrincipal') === 'MenuPrincipal' &&
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Inicio</a>
                    </li>
                  }
                    <li className="breadcrumb-item active">Detalle Incapacidades</li>
                  </ol>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>

          {/*Sections of tables  */}
          <section className="content">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-12">
                  <div className="card shadow rounded">
                    <div className="card-header ">
                      <h1 className="card-title">Tabla Incapacitados</h1>
                      <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' data-toggle="modal" data-target="#Report_mensual">
                        <i class="fa fa-file"></i> Reporte Mensual
                      </button>
                      <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' data-toggle="modal" data-target="#Report_diarios">
                        <i class="fa fa-file"></i> Reporte Diario
                      </button>

                    </div>
                    <div className="card-body table-responsive" id='data1'>

                      <table id="example" className="table  table-striped row-border hover order-column ">
                        <thead>
                          <tr>
                            <th>Correlative</th>
                            <th>Codigo Empleado</th>
                            <th>Nombre Empleado</th>
                            <th>Departamento</th>
                            <th>Cargo</th>
                            <th>Dias de incapacidad</th>
                            <th>Condicion</th>
                            <th>Estado</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Fecha&nbsp;Permiso</th>
                            <th>Dias&nbsp;Permiso</th>
                            <th>Usuario Registro</th>
                            <th>Fecha de creacion</th>
                            <th>Diagnostico</th>
                            <th>Reporte Firma</th>
                            <th>Reporte Incapacidad</th>
                            <th>Modificar</th>
                          </tr>
                        </thead>
                        <tbody>

                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Correlative</th>
                            <th>Codigo de Empleado</th>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th>Cargo</th>
                            <th>Dias de incapacidad</th>
                            <th>Condicion</th>
                            <th>Estado</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Fecha&nbsp;Permiso</th>
                            <th>Dias&nbsp;Permiso</th>
                            <th>Usuario Registro</th>
                            <th>Fecha de creacion</th>
                            <th>Diagnostico</th>
                            <th>Reporte Firma</th>
                            <th>Reporte Incapacidad</th>
                            <th>Modificar</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>{/* /.col */}
                  </div>
                </div>
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
            {/* Modal reportes mensuales */}
            <div class="modal fade rounded shadow-lg" id="Report_mensual" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header bg-warning">
                    <h5 class="modal-title">Generar reporte Mensuales</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form id='formRM'>
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
                        <button type="button" className="btn btn-primary btn-sm" onClick={Report_Incapacidades_Mensual}>Registrar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            {/* Modal reportes Diarios */}
            <div class="modal fade rounded shadow-lg" id="Report_diarios" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header bg-warning">
                    <h5 class="modal-title">Generar reporte Diarios</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form id='formRD'>
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
                        <button type="button" className="btn btn-primary btn-sm" onClick={Report_Incapacidades_Diario}>Registrar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            {/* Modal EDIT */} 
            {/*  */}
            <div class="modal fade rounded shadow-lg " id="edit" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg " role="document">
                <div class="modal-content">
                  <div class="modal-header bg-success">
                    <h5 class="modal-title">Modificar Incapacidad de <span id='usern'></span></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form id='formED'>
                  <input type="text" class="form-control form-control-border" disabled name="cod" id=''/>
                    <div class="card-body mt-3">
                  <div className="row">
                      <div class="form-group col-6" id="fechae">
                          <label> <span className="fas fa-calendar mr-2" /> Fecha de Inicio:</label>
                          <div class="input-group date"  data-target-input="nearest">
                              <input type="date" class="form-control form-control-border" name="date_from"/>
                          </div>
                      </div>
                      <div class="form-group col-6" id="fechae">
                          <label> <span className="fas fa-calendar mr-2" />Fecha de Finalizacion:</label>
                          <div class="input-group date"  data-target-input="nearest">
                              <input type="date" class="form-control form-control-border"  name="date_to"/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                    <div class="form-group col-md-2">
                        <input type="text" name="days" class="form-control form-control-border" id="exampleInputPassword1" placeholder="Dias"/>
                        <div class="invalid-feedback">
                          Campo vacio.
                        </div>
                    </div>
                    <div class="form-group col-md-5">
                      <input type="text" name="condition" class="form-control form-control-border" id="exampleInputPassword1" placeholder="Condicion"/>
                        <div class="invalid-feedback">
                          Campo vacio.
                        </div>
                    </div>
                    <div class="col-sm-3  ml-3 mt-0">
                      <div class="form-group">
                          <div class="custom-control custom-radio ">
                              <input class="custom-control-input " value="1" type="radio" id="customRadio10" name="status_p"/>
                              <label for="customRadio10"  class="custom-control-label">Permanente</label>
                          </div>
                          <div class="custom-control custom-radio ">
                              <input class="custom-control-input" value="0" type="radio" id="customRadio20" name="status_p" />
                              <label for="customRadio20" class="custom-control-label">Temporal</label>
                          </div>
                          <div class="invalid-feedback">
                            Campo vacio.
                          </div>
                      </div>
                    </div>
                  </div>
                  
                  <div id="accordion">
                    
                    <div class="card card-muted  border-light rounded-lg">
                    <div class="card-header">
                      <h4 class="card-title w-100">
                        <a class="d-block w-100" data-toggle="collapse" href="#collapseTwo">
                          Permisos
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" class="collapse" data-parent="#accordion">
                      <div class="card-body">
                      <div className="row">
                          <div class="form-group col-md-4">
                            <label><span className="fas fa-calendar mr-2" />Fecha permiso</label>
                            <div class="input-group date" >
                              <input type="date" class="form-control form-control-border" name="date_p"/>
                            </div>
                          </div>
                          <div class="form-group col-md-1">
                            <label>&nbsp;</label>
                              <input type="text" name="days_p" class="form-control form-control-border"  placeholder="Dias"/>
                              <div class="invalid-feedback">
                                Campo vacio.
                              </div>
                          </div>
                          <div class="col-sm-3  ml-3 mt-3">
                            <div class="form-group">
                                <div class="custom-control custom-radio ">
                                    <input class="custom-control-input " value="1" type="radio" id="customRadio12" name="type_date"/>
                                    <label for="customRadio12"  class="custom-control-label">AM</label>
                                </div>
                                <div class="custom-control custom-radio ">
                                    <input class="custom-control-input" value="0" type="radio" id="customRadio22" name="type_date" />
                                    <label for="customRadio22" class="custom-control-label">PM</label>
                                </div>
                                <div class="invalid-feedback">
                                  Campo vacio.
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  

                    <div class="form-group col-md-10">
                        <label><span className="fas fa-stethoscope mr-2" />Diagnostico</label>
                      <textarea class="form-control form-control-border" name="diagnostic" rows="4" placeholder="Enter ..."></textarea>
                    </div>
                  
                </div>
                <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" >Cancelar</button>
                  <button type="submit" class="btn btn-primary btn-sm"  onClick={EditI}>Modificar</button>
                </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div></>


  )
  
  }