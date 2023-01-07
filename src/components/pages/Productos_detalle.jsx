import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import toast, { Toaster } from "react-hot-toast"

const cookies = new Cookies();

$(document).ready(function () {
  var t = $('#example1').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    
  },
  order: [[5,'desc']],
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  });
  $.ajax({
    type: "GET",
    url: `${cookies.get('server')}/api/productos`,
   
    success: function(json_data) {
      if (json_data !== 'Not Data'){
        
        for (let i = 0; i < json_data.length; i++) {
          t.row.add([
            json_data[i]['cod_prod'],
            json_data[i]['description_typeP'], 
            json_data[i]['name_product'], 
            json_data[i]['full_name'], 
            json_data[i]['unid_med'], 
            json_data[i]['user_register'], 
            json_data[i]['creation_date']
          ]).draw(false);
            
        }
      }
    }
  })

});

export default function Produtos_D(props) {
    document.querySelector('title').textContent = 'Clinica | Detalle Productos';
    
    
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Detalle/Productos');
      }else{
        props.history.push('/');
      }
    },[]); 


    // 
   const Report_Product=()=>{
      console.log('entro')
      // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&busqueda=${parametro}&pais=${parametro1}`);
    }

    // Selects
    const selectData=()=>{
      let p = document.getElementById('idselect')
      
    if (p != null){
      $.ajax({
        type: "GET", 
        url: `${cookies.get('server')}/api/tipo_producto`,
      
        success: function(json_data) {  
          const op = document.createElement('option') 
          if(json_data === 'Not Data'){
                    
            op.value = ''
            op.text = 'No existen datos creados'
            p.appendChild(op)
          }else{

            op.value = ''
            op.text = '------ Seleccione -------'
            p.appendChild(op)
            for (let i = 0; i < json_data.length; i++) {
              const option = document.createElement('option')
              option.value = json_data[i]['id_type_p']
              option.text = json_data[i]['description_typeP']+' '+json_data[i]['unid_med']
              p.appendChild(option);
            }
          }
        }
      })
    }
    }
    
    const cargarlot=()=>{
      let s = document.getElementById('id_select_lote')
      if (s != null){
          let options = document.querySelectorAll('#id_select_lote option');
          options.forEach(o => o.remove());
          $.ajax({
              type: "GET", 
              url:`${cookies.get('server')}/api/lot/${cookies.get('enterprise')}`,
              success:function(json_data) {  
                  const op = document.createElement('option') 
                  if(json_data === 'Not Data'){
                    
                    op.value = ''
                    op.text = 'No existen lotes creados'
                    s.appendChild(op)
                  }else{
                    op.value = ''
                    op.text = '------ Seleccione -------'
                    s.appendChild(op)
                    for (let i = 0; i < json_data.length; i++) {
                        const option = document.createElement('option')
                        option.value = json_data[i]['cod_lot']
                        option.text = json_data[i]['cod_lot']
                        s.appendChild(option);
                    }
                  }
              }
          })
      }
  }

   // select detalle lotes 
  const selectProds=()=>{
    let ps = document.getElementById('id_select_pros')
    if (ps != null){
        let options = document.querySelectorAll('#id_select_pros option');
        options.forEach(o => o.remove());
      $.ajax({
        type: "GET", 
        url:`${cookies.get('server')}/api/DetalleLot${cookies.get('enterprise')}`,
        success:function(json_data) {  
          const po = document.createElement('option') 
          if(json_data === 'Not Data'){
                    
            po.value = ''
            po.text = 'No se han agregado productos a lotes '
            ps.appendChild(po)
          }else{
            po.value = ''
            po.text = '------ Seleccione -------'
            ps.appendChild(po)
            for (let i = 0; i < json_data.length; i++) {
              const option = document.createElement('option')
              option.value = json_data[i]['id']
              option.text = json_data[i]['cod_prod']+' | '+json_data[i]['product']+'  Lote-'+json_data[i]['cod_lot']
              option.title = json_data[i]['cod_lot']
              option.name = json_data[i]['cod_prod']
              ps.appendChild(option);
            }
          }
        }
      })
    }
  }

  // Selects Productos
  const selectProd=()=>{
    let p = document.getElementById('id_select_pro')
    if (p != null){
        let options = document.querySelectorAll('#id_select_pro option');
        options.forEach(o => o.remove());
      $.ajax({
        type: "GET", 
        url:`${cookies.get('server')}/api/productos`,
        success:function(json_data) {  
          const po = document.createElement('option') 
          po.value = ''
          po.text = '------ Seleccione -------'
          p.appendChild(po)
          for (let i = 0; i < json_data.length; i++) {
            const option = document.createElement('option')
            option.value = json_data[i]['cod_prod']
            option.text = json_data[i]['cod_prod']+' | '+json_data[i]['name_product']+'-'+json_data[i]['unid_med']
            p.appendChild(option);
          }
        }
      })
    }
  }

  const remove_data=()=>{
    const  s = document.querySelectorAll('#idselect option')
    s.forEach(o => o.remove());
    var formu = document.getElementById('formdata');
    formu.name_product.className = 'form-control form-control-border';
    formu.full_name.className = 'form-control form-control-border';
    formu.unit_price.className = 'form-control form-control-border';
    formu.cod_prod.className = 'form-control form-control-border';
  }

    document.body.addEventListener("keydown", function(event) {
     
      if (event.code === 'Escape' || event.keyCode === 27) {
        // Aqui la lógica para el caso de Escape ...
        remove_data()
      }
    });
    
    

  // Registro Lote
  const addLote=()=>{
    const idlot = document.getElementById('formlote')
    let a, b = false
    
    if (idlot.lotea.value === ''){

        idlot.lotea.className = classWarning
    }else{
        a = true
         idlot.lotea.className = classSuccess 
    } 
    
    if(idlot.date_exp.value === ''){
        idlot.date_exp.className = classWarning
    }else{
        b=true
        idlot.date_exp.className = classSuccess
    } 
    
    if(a && b){
        $.ajax({
            type: 'post', 
            url: `${cookies.get('server')}/api/lot/${cookies.get('enterprise')}`,
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            data: JSON.stringify({
                cod_lot:idlot.lotea.value,
                date_exp:idlot.date_exp.value,
                user_register:cookies.get('user'),
                cod_enterprise:cookies.get('enterprise')
            }),
            success: function (res){
                idlot.lotea.className = classSuccess
                toast.success(res,{duration: 6000, position:"top-right"})
                idlot.lotea.value = ''
                idlot.date_exp.value =''
                idlot.lotea.className = 'form-control form-control-border'
                idlot.date_exp.className = 'form-control form-control-border'
                cargarlot()
               
            } , error(error){
              console.log(error)
            }
        })
    }
}

  // Registro Detalle
  const Rformdetalle=()=>{
    let rd = document.getElementById('formdetalle')
    let a = false
    
    if(rd.cod_prod.value === '' || rd.cod_lot.value === ''){
        toast.error('Campos vacios',{duration: 6000, position:"top-right"})
    }else{a=true}

    if (a === true){
        $.ajax({
            type: 'post', 
            url: `${cookies.get('server')}/api/DetalleLot`,
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            data: JSON.stringify({
                cod_prod:rd.cod_prod.value,
                cod_lot:rd.cod_lot.value
            }),
            success: function (res){
                
                toast.success(res,{duration: 6000, position:"top-right"})
                cargarlot()
                selectProd()
                selectProds()
            }, error: function(error){
                console.log(error)
            }
        })
        
    }
}

    // Save data for method post =>>> ajax
    const SaveData=(a,formu)=>{
      if (a === true){
        
        $.ajax({
          type: 'post', 
          url: `${cookies.get('server')}/api/productos`,
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          data: JSON.stringify({
            cod_prod: formu.cod_prod.value,
            id_type_p:parseInt(formu.id_type_p.value),
            name_product:formu.name_product.value,
            full_name:formu.full_name.value,
            unit_price:parseFloat(formu.unit_price.value),
            user_register:formu.user_register.value,
          }),
          success: function (res){
            toast.success(res,{duration: 6000, position:"top-right"})
            selectProd()
            // window.open=('/Detalle/Productos', '_blank')
            setTimeout("location.href='/Detalle/Productos'", 1000);
            
          } 
        })

      }
    }
    // 
          
    // Validations
    var classSuccess = 'form-control is-valid form-control-border';
    var classWarning = 'form-control form-control-border is-invalid';
    const form = ()=>{
        var formu = document.getElementById('formdata');
        var a,b,c,d,e,f = false;

        if(formu.id_type_p.value === ''){
          b = false
        }else{
          b = true
        }
        if(formu.cod_prod.value === ''){
          formu.cod_prod.className = classWarning;
        }else{
          f = true
          formu.cod_prod.className = classSuccess;
        }
        if(formu.name_product.value === ''){
          formu.name_product.className = classWarning;
        }else{
          c = true
          formu.name_product.className = classSuccess;
        }if(formu.full_name.value === ''){
          formu.full_name.className = classWarning
        }else{
          d = true
          formu.full_name.className = classSuccess;
        }if(formu.unit_price.value === ''){
          formu.unit_price.className = classWarning;
        }else{
          e = true
          formu.unit_price.className = classSuccess;
        }
        if (b && c && d && e && f){
          a = true;
        }
        SaveData(a,formu)
    }

    return (
      
      <><div className="content-wrapper mb-3">
      <div> <Toaster
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
                /></div>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Detalle Productos</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                  <li className="breadcrumb-item active">Detalle Productos</li>
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
                    <h1 className="card-title float-left">Tabla Productos</h1>
                    <button type="button" class="btn btn-warning btn-sm ml-1  float-right text-white" title='Generar Reporte' onClick={Report_Product}>
                    <i class="fa fa-file"></i> Reporte Productos
                    </button>
                    <button type="button" class="btn btn-success btn-sm ml-1  float-right" title='Agregar Producto al Lote' data-toggle="modal" data-target="#modalDetalle" >
                    <i class="fa fa-plus mr-1"></i> Producto Lote
                    </button>
                    <button type="button" class="btn btn-primary btn-sm ml-1 float-right" title='Agregar Producto' data-toggle="modal" data-target="#modal-product"  onClick={selectData}>
                    <i class="fa fa-plus mr-1"></i>Producto
                    </button>
                    
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="example1" className="table order-column table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Codigo&nbsp;Producto</th>
                          <th>Tipo&nbsp;producto</th>
                          <th>Nombre&nbsp;Producto</th>
                          <th>Nombre&nbsp;Completo</th>
                          <th>U&nbsp;Medida</th>
                          <th>Usuario&nbsp;transacción</th>
                          <th>Fecha&nbsp;de&nbsp;Creacion</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Codigo Producto</th>
                          <th>Tipo de producto</th>
                          <th>Nombre de producto</th>
                          <th>Nombre Completo</th>
                          <th>Precio de unidad</th>
                          <th>Usuario de transacción</th>
                          <th>Fecha de creacion</th>
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
      {/* Modal register product */}
      <div class="modal fade rounded shadow-lg" id="modal-product" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header bg-info">
              <h5 class="modal-title" >Registro Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={remove_data}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id='formdata'>
                {/*  */}
                <div className="row">
                  <div class="form-group col-md-7">
                      <label>Tipo Producto</label>
                      <div className="select2-purple">
                          <select className='js-data-example' id='idselect' name='id_type_p' >
                          </select>
                      </div>
                      <div class="invalid-feedback">
                          Campo vacio.
                      </div>
                  </div> 
                  <div class="form-group col-md-4 mt-4 ">
                    <label></label>
                      <input type="text" name="cod_prod"  className="form-control form-control-border" placeholder="Cod Producto"/>
                      <div class="invalid-feedback">
                            Campo vacio.
                      </div>
                  </div>
                  <div class="form-group col-md-3 mt-2 ">
                    <label></label>
                      <input type="text" name="name_product"  className="form-control form-control-border" placeholder="Nombre Producto"/>
                      <div class="invalid-feedback">
                            Campo vacio.
                      </div>
                  </div>
                  <div class="form-group col-md-6 mt-2">
                  <label></label>
                    <input type="text" name="full_name" className="form-control form-control-border " placeholder="Nombre Completo"/>
                    <div class="invalid-feedback">
                        Campo vacio.
                    </div>
                  </div>
                  <div class="form-group col-md-3 mt-2">
                  <label></label>
                    <input type="text" name="unit_price" className="form-control form-control-border ml-2"  placeholder="Precio Uni"/>
                    <div class="invalid-feedback">
                        Campo vacio.
                    </div>
                  </div>
                </div>
                    
                {/*  */}
                <div class="modal-footer  justify-content-between">
                  <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" onClick={remove_data}>Cancelar</button>
                  <button type="button" name="user_register" value={cookies.get('user')} className="btn btn-primary btn-sm" onClick={form}>Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div class="modal fade rounded shadow-lg" data-backdrop="static"  id="modalDetalle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header  bg-success">
                    <h5 class="modal-title" id="exampleModalLabel">Registro Producto Lote</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {/*  */}
                    <form id='formdetalle'>
                        <div className="row">
                            {/*  */}
                            <div class="card collapsed-card  col-md-12">
                                <div class="card-header ">
                                <h3 class="card-title "> Agregar Lote</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool " data-card-widget="collapse">
                                            <i class="fas fa-plus "></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="card-body">
                                        {/*  */}
                                        <div className="col-mg-8 ">
                                        
                                            <form id="formlote">
                                                <div class="card-body ">
                                                  <div className="row">

                                                    <div class="form-group  col-md-6 ">
                                                        <label>&nbsp;</label>
                                                        <input type="text" name="lotea"  className="form-control form-control-border" placeholder="Nombre de lote"/>
                                                        <div class="invalid-feedback">
                                                                Campo vacio.
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-md-5 " id="fechae">
                                                        <label>Fecha de expiracion</label>
                                                        <div class="input-group date"  data-target-input="nearest" name="date_exp">
                                                            <input type="date" class="form-control form-control-border" name="date_exp"/>
                                                            <div class="invalid-feedback">
                                                                Campo vacio.
                                                            </div>
                                                        </div>
                                                    </div>

                                                  </div>

                                                </div>
                                                
                                                    <button type="button" class="btn btn-primary btn-sm"  onClick={addLote}>Registrar</button>
                                              
                                            </form>
                                        </div>
                                </div>
                            </div>
                        </div>
                            {/*  */}
                        <div class="row">
                            <div class="form-group col-md-9" id='pro_entrada'>
                                <label>Producto</label>
                                <select class="js-data-example" type="search"  name="cod_prod" id="id_select_pro">
                                </select>
                            </div>
                            
                            <div class="form-group col-md-9" id="lot_entrada">
                                        <label>Numero de lote</label>
                                        <select class="js-data-example" name="cod_lot" id="id_select_lote" >
                                        </select>
                                        <div class="invalid-feedback">
                                            Campo vacio.
                                        </div>
                                    </div> 
                        </div>

                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" id='botoncito'>Cerrar</button>
                            <button type="button" class="btn btn-primary  btn-sm"  onClick={Rformdetalle}>Guardar</button>
                        </div>
                    </form>
                    {/*  */}
                </div>
            
            </div>
        </div>
      </div>
      {/*  */}
      </>
      
    )
  
  }