import React , {useEffect}from "react";
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast"




export default function TrazaKardez(props){
  // const url = 'https://localhost:5001/api/area'
//   variables globals
    var position_head = document.getElementById('custom-tabs-one-home-tab')
    var position_detail = document.getElementById('custom-tabs-one-profile-tab')
    var head = document.getElementById('custom-tabs-one-home')
    var detail = document.getElementById('custom-tabs-one-profile')
    var classSuccess = 'form-control is-valid form-control-border';
    var classWarning = 'form-control form-control-border is-invalid';
    
    document.querySelector('title').textContent = 'Clinica | Trazabilidad Kardex';
    
    const cookies = new Cookies();
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Kardez/Trazabilidad');
      }else{
        props.history.push('/');
      }
        },[]); 
    
    //*********************** Validations *******************
    
    const valuenextdata=()=>{
        position_head.ariaSelected = false
        position_detail.ariaSelected = true
        position_detail.className = 'nav-link active disabled'
        position_head.className = 'nav-link disabled'
        head.className = 'tab-pane fade' 
        detail.className = 'tab-pane fade active show'
    }

    var formuk = document.getElementById('formk');
    const NextData=()=>{
        var a, b ,c = false
        if (formuk.type_move.value !== ''){
           a = true
        }
        if (formuk.date_tranzaction.value !== ''){
            b = true
        }if (formuk.date_tranzaction.value !== ''){
            c = true
        }

        if (a && b && c){
            valuenextdata()
        }else{
            toast.error('Campos vacios',{duration: 6000, position:"top-right"})
        }
    }
    const ReturnData=()=>{
        position_head.ariaSelected = true
        position_detail.ariaSelected = false
        position_detail.className = 'nav-link  disabled'
        position_head.className = 'nav-link active disabled'
        head.className = 'tab-pane fade active show' 
        detail.className = 'tab-pane fade'
        clearData()
    }

    const selectitemData=(a)=>{
        console.log(a.target.options[a.target.selectedIndex].title);
        console.log(a.target.value)
        document.getElementById('opv').value = a.target.options[a.target.selectedIndex].title
        var emplo = document.getElementById('employed')
        var tablae = document.getElementById('tablita')
        var tablas = document.getElementById('tablitas')
        var mensaje = ''
        var titulo = document.getElementById('titulo')
        var btne = document.getElementById('btne')
        var btns = document.getElementById('btns')
        mensaje = a.target.options[a.target.selectedIndex].text
        if(a.target.options[a.target.selectedIndex].title === '1'){
            emplo.style.display = 'none';
            tablae.style.display = 'block'
            tablas.style.display = 'none'
            btne.style.display = 'block'
            btns.style.display = 'none'

        }else if(a.target.options[a.target.selectedIndex].title === '0'){
            emplo.style.display = 'block';
            tablae.style.display = 'none'
            tablas.style.display = 'block'
            btne.style.display = 'none'
            btns.style.display = 'block'
        }

        titulo.innerHTML = mensaje

    }

    const clearData = ()=>{
        var form1 = document.getElementById('formk')
        form1.type_move.value = ''
        form1.n_tranzability.value = ''
        form1.origin_product.value = ''
        form1.date_tranzaction.value = ''
        form1.reference.value = ''
        document.getElementById('titulo').innerHTML = ''
    }
    
    // ******************* SELECTS *********************
    const cargarlot=()=>{
        var s = document.getElementById('id_select_lote')
        if (s != null){
            var options = document.querySelectorAll('#id_select_lote option');
            options.forEach(o => o.remove());
            $.ajax({
                type: "GET", 
                url:"https://localhost:5001/api/lot",
                success:function(json_data) {  
                    const op = document.createElement('option') 
                    op.value = ''
                    op.text = '------ Seleccione -------'
                    s.appendChild(op)
                    for (let i = 0; i < json_data.length; i++) {
                        const option = document.createElement('option')
                        option.value = json_data[i]['correlative']
                        option.text = json_data[i]['cod_lot']
                        s.appendChild(option);
                    }
                }
            })
        }
      
    }
    
    // select detalle lotes 
    const selectProds=()=>{
        var ps = document.getElementById('id_select_pros')
        if (ps != null){
            var options = document.querySelectorAll('#id_select_pros option');
            options.forEach(o => o.remove());
          $.ajax({
            type: "GET", 
            url:"https://localhost:5001/api/DetalleLot",
            success:function(json_data) {  
              const po = document.createElement('option') 
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
          })
        }
    }
    // Select Almacen
    const selectStor=()=>{
        var st = document.getElementById('select_al')
        if (st != null){
            var options = document.querySelectorAll('#select_al option');
            options.forEach(o => o.remove());
          $.ajax({
            type: "GET", 
            url:"https://localhost:5001/api/almacen",
            success:function(json_data) {  
              const po = document.createElement('option') 
              po.value = ''
              po.text = '------ Seleccione -------'
              st.appendChild(po)
              for (let i = 0; i < json_data.length; i++) {
                const option = document.createElement('option')
                option.value = json_data[i]['detail_store']
                option.text = json_data[i]['detail_store']+' '+json_data[i]['cia_abreviatura']+'-'+json_data[i]['cia_descripcion']
                st.appendChild(option);
              }
            }
          })
        }
    }
    

    // Selects Productos
    const selectProd=()=>{
        var p = document.getElementById('id_select_pro')
        if (p != null){
            var options = document.querySelectorAll('#id_select_pro option');
            options.forEach(o => o.remove());
          $.ajax({
            type: "GET", 
            url:"https://localhost:5001/api/productos",
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
      
    //   FIN SELECTS

    //*********************** REGISTROS ****************************
      
    // Registro Lote
    const addLote=()=>{
        const idlot = document.getElementById('formlote')
        var a, b = false
        console.log(idlot)
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
                url: 'https://localhost:5001/api/lot',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                data: JSON.stringify({
                    cod_lot:idlot.lotea.value,
                    date_exp:idlot.date_exp.value
                }),
                success: function (res){
                    idlot.lotea.className = classSuccess
                    toast.success(res,{duration: 6000, position:"top-right"})
                    idlot.lotea.value = ''
                    idlot.date_exp.value =''
                    idlot.lotea.className = 'form-control form-control-border'
                    idlot.date_exp.className = 'form-control form-control-border'
                    cargarlot()
                   
                } 
            })
        }
    }



    // Registro Detalle
    const Rformdetalle=()=>{
        var rd = document.getElementById('formdetalle')
        var a = false
        
        if(rd.cod_prod.value === '' || rd.cod_lot.value === ''){
            toast.error('Campos vacios',{duration: 6000, position:"top-right"})
        }else{a=true}

        if (a === true){
            $.ajax({
                type: 'post', 
                url: 'https://localhost:5001/api/DetalleLot',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                data: JSON.stringify({
                    cod_prod:rd.cod_prod.value,
                    cod_lot:rd.cod_lot.value
                }),
                success: function (res){
                    console.log(res)
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

    // Registro Kardex
    const prueba=()=>{
        var form1 = document.getElementById('formk')

        if (document.getElementById('opv').value === '1'){
            var tbs = $("#tablita tbody tr").length;
    
            console.log('Numero de filas ',tbs)
            if (tbs > 0){
                var id_header
                console.log(form1.type_move.value, form1.n_tranzability.value, form1.origin_product.value,  form1.date_tranzaction.value, typeof form1.reference.value)
                    // $.ajax({
                    //     type: 'post', 
                    //     url: 'https://localhost:5001/api/HeaderKardex',
                    //     headers:{
                    //     'Accept':'application/json',
                    //     'Content-Type':'application/json'
                    //     },
                    //     data: JSON.stringify({
                    //         type_move:parseInt(form1.type_move.value),
                    //         n_tranzability:form1.n_tranzability.value,
                    //         origin_product:parseInt(form1.origin_product.value),
                    //         date_tranzaction:form1.date_tranzaction.value,
                    //         reference:form1.reference.value,
                    //         user_register:cookies.get('user')
                    //     }),
                    //     success: function (json_data){
                    //         console.log(json_data)
                    //         id_header = json_data[0]['id']
                    //     }, error: function(error){
                    //         console.log(error)
                    //     }
                    // })

                for (var i = 1, row; row = document.getElementById('tablita').rows[i]; i++) {
                
                    console.log( parseInt(row.cells[0].innerHTML))//Detalle
                    console.log(row.cells[2].innerHTML)// Bodega
                    console.log(parseInt(row.cells[4].innerHTML))// Cantidad
                    console.log(cookies.get('user'))
                    var formuk2 = document.getElementById('formk2');
                    var employed
                    if(formuk2.cod_employed.value === ''){
                    employed = null
                    }else{employed = formuk2.cod_employed.value}

                    console.log('este es e empleado', employed)
                    console.log(formuk2.cod_employed.value)
                    

                    // $.ajax({
                    //     type: 'post', 
                    //     url: 'https://localhost:5001/api/DetailKardex',
                    //     headers:{
                    //     'Accept':'application/json',
                    //     'Content-Type':'application/json'
                    //     },
                    //     data: JSON.stringify({
                    //         header_id:parseInt(id_header),
                    //         cod_store:row.cells[2].innerHTML,
                    //         id_detail_lot:parseInt(row.cells[0].innerHTML),
                    //         quantity:parseInt(parseInt(row.cells[4].innerHTML)),
                    //         cod_employed:form1.date_tranzaction.value,
                    //         user_register:cookies.get('user')
                    //     }),
                    //     success: function (res){
                    //         console.log(res)
                    //         toast.success(res,{duration: 6000, position:"top-right"})
                    //     }, error: function(error){
                    //         console.log(error.responseJSON.errors.cod_store[0])
                    //     }
                    // })

               }$("#id_creacion > tr").remove();
           }else{
            toast.error('Deben existir registros en la tabla',{duration: 6000, position:"top-right"})
           }

        }
        // else if(document.getElementById('opv').value === '0'){

        //     var tbs = $("#tablitas tbody tr").length;
    
        //      console.log('Numero de filas ',tbs)
        //      if (tbs > 0){
        //         for (var i = 1, row; row = document.getElementById('tablitas').rows[i]; i++) {
        //             console.log(form1.type_move.value, form1.origin_product.value, form1.cod_store.value, form2.n_tranzability.value)
        //             let elements = document.querySelectorAll('table');
        //             console.log(row.cells[0].innerHTML)
        //             console.log(row.cells[1].innerHTML)
        //             console.log(row.cells[2].innerHTML)
        //             console.log(row.cells[3].innerHTML)
        //             console.log(row.cells[4].innerHTML)
        //             console.log(row.cells[5].innerHTML)
        //             console.log(row.cells[6])
        //             console.log(elements)
        //             console.log(cookies.get('user'))
        //             // $.ajax({
        //             //     type: 'post', 
        //             //     url: 'https://localhost:5001/api/kardex',
        //             //     headers:{
        //             //     'Accept':'application/json',
        //             //     'Content-Type':'application/json'
        //             //     },
        //             //     data: JSON.stringify({
        //             //         type_move:parseInt(form1.type_move.value),
        //             //         origin_product:parseInt(form1.origin_product.value),
        //             //         cod_store:parseInt(form1.cod_store.value),
        //             //         n_tranzability:form2.n_tranzability.value,
        //             //         cod_prod:row.cells[0].innerHTML,



        //             //     }),
        //             //     success: function (res){
        //             //         console.log(res)
        //             //         toast.success(res,{duration: 6000, position:"top-right"})
        //             //     } 
        //             // })
        //         }
        //     }
        // }
                    
    }

    // ************************ Funciones **************************
    // Funcion tabla Entradas
    const add_tablaE=()=>{
        var formuk2 = document.getElementById('formk2');
        if (formuk2.cod_prod.value !== '' && formuk2.cod_store.value !== '' && formuk2.quantity.value !== '' ){
            console.log(formuk2.cod_prod.value, formuk2.cod_prod.options[formuk2.cod_prod.selectedIndex].name, formuk2.cod_store.value, formuk2.cod_prod.options[formuk2.cod_prod.selectedIndex].title, formuk2.quantity.value)
           
            var fila = "<tr><td>"+formuk2.cod_prod.value+"</td><td>"+formuk2.cod_prod.options[formuk2.cod_prod.selectedIndex].name+"</td><td className='celdas'>"+formuk2.cod_store.value+"</td><td>"+formuk2.cod_prod.options[formuk2.cod_prod.selectedIndex].title+"</td><td>"+formuk2.quantity.value+"</td><td><button class='btn btn-danger  btn-sm' value='eliminar' title='Eliminar dato' onClick={this.closest('tr').remove()} type='button'><i class='fas fa-trash'></i></button></td></tr>"
             var btn = document.createElement("TR");
             btn.innerHTML=fila;
            document.getElementById("id_creacion").appendChild(btn);
            
            selectProds()
            selectStor()
            formuk2.quantity.value = ''

        }else{
            toast.error('Campos vacios',{duration: 6000, position:"top-right"})
        }
    }

    // Funcion Tabla salidas
    const add_tablaS=()=>{
        var formuk2 = document.getElementById('formk2');
        if (formuk2.cod_prods.value !== ''  && formuk2.quantity.value !== '' ){
           
            var fila = "<tr><td>"+formuk2.cod_prods.value+"</td><td>"+formuk2.n_tranzability.value+"</td><td className='celdas'>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].title+"</td><td>"+formuk2.quantity.value+"</td><td>"+formuk2.cod_employed.value.toUpperCase()+"</td><td>"+formuk2.reference.value+"</td><td><button class='btn btn-danger  btn-sm' value='"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].name+"'  title='Eliminar dato' onClick={this.closest('tr').remove()} type='button' name='b"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].name+"'><i class='fas fa-trash'></i></button></td></tr>"
            var btn = document.createElement("TR");
            btn.innerHTML=fila;
            document.getElementById("id_creacions").appendChild(btn);
            
            formuk2.cod_prods.value = ''
            formuk2.quantity.value = ''
            formuk2.n_tranzability.value = ''
            formuk2.cod_employed.value = ''
            formuk2.reference.value = ''

        }else{
            toast.error('Campos vacios',{duration: 6000, position:"top-right"})
        }
    }

  
    
    return (
        // 
        <div className="content-wrapper ">
            {/* Content Header (Page header) */}
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
                        {/* <h1 className="m-0">{cookies.get('user')}</h1> */}
                        <h1>Trazabilidad Kardez</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active"><a href="/kardex">Kardez</a></li>
                        <li className="breadcrumb-item active">Trazabilidad</li>
                        </ol>
                    </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    {/* Small boxes (Stat box) */}
                   
                        
                        {/*  */}
                        <div class=" col-md-11 ml-3  ">
                        <div class="card  card-danger card-outline rounded shadow-lg">
                            <div class="card card-Navy card-tabs ">
                                <div class="card-header p-0 pt-1 ">
                                    <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active disabled" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Header</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Detail</a>
                                    </li>
                                    
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content" id="custom-tabs-one-tabContent">
                                        <div class="card-header">
                                            <h3 class="card-title">Trazabilidad <small id="titulo"> </small></h3>
                                        </div>
                                        
                                            <div class="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                                <form id="formk">
                                                    <div class="card-body mt-5">
                                                        <div className="row">
                                                            <div class="form-group col-md-4">
                                                                <label>Tipo Movimiento</label>
                                                                <select class="form-control form-control-sm" name="type_move" id="select_tm" onChange={selectitemData}>
                                                                </select>
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            <div class="form-group col-md-3 ml-1">
                                                                <label>&nbsp;</label>
                                                                <input type="text" name="n_tranzability" class="form-control form-control-border "  placeholder="N de tranzaccion" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-3  ml-3 mt-3">
                                                                <div class="form-group">
                                                                    <div class="custom-control custom-radio">
                                                                        <input class="custom-control-input" value="1" type="radio" id="customRadio1" name="origin_product"/>
                                                                        <label for="customRadio1"  class="custom-control-label">Empresa</label>
                                                                    </div>
                                                                    <div class="custom-control custom-radio">
                                                                        <input class="custom-control-input" value="0" type="radio" id="customRadio2" name="origin_product" />
                                                                        <label for="customRadio2" class="custom-control-label">Seguro Social</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                           
                                                        </div>
                                                        {/*  */}
                                                        <div className="row">
                                                            <div class="form-group col-md-4" id="fechae">
                                                                <label>Fecha de Transacción:</label>
                                                                <div class="input-group date"  data-target-input="nearest">
                                                                    <input type="date" class="form-control form-control-border" name="date_tranzaction"/>
                                                                </div>
                                                            </div>
                                                            <div class="form-group col-md-8 mr-2">
                                                                <label>Referencias</label>
                                                                <textarea class="form-control" rows="4" placeholder="Enter ..." name="reference"></textarea>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    <div class="card-footer">
                                                    <button type="button" class="btn btn-primary" id="opv" onClick={NextData}>Siguiente</button>
                                                    </div>
                                                    <p className="mb-1">
                                                    </p>
                                                
                                                </form>
                                            </div>
                                            {/* SEGUNDO FORMULARIO */}
                                            <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                                <form id="formk2">
                                                    
                                                    <div class="card-body ">
                                                        <div className="row">
                                                            
                                                            <div class="form-group col-md-7" id='pro_salida'>
                                                                <label>Producto</label>
                                                                <button type="button" class="btn btn-success float-right  btn-sm" data-toggle="modal" data-target="#modalDetalle" >
                                                                    <i class="fas fa-plus"></i>
                                                                </button>
                                                                <select class="js-data-example" name="cod_prod" id="id_select_pros">
                                                                </select>
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                         
                                                            {/* SALIDA */}
                                                            
                                                            <div class="form-group col-md-5">
                                                                <label >Codigo Bodega</label>
                                                                <select class="js-data-example" name="cod_store" id="select_al" >
                                                                </select>
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div> 
                                                            
                                                            <div class="form-group col-md-2">
                                                                <label>&nbsp;</label>
                                                                <input type="text" name="quantity" class="form-control form-control-border "  placeholder="Cantidad" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="form-group col-md-3" id="employed">
                                                                <label>&nbsp;</label>
                                                                <input type="text" name="cod_employed" class="form-control form-control-border "  placeholder="Codigo Empleado" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                        </div>  
                                                        {/* <!-- Inicio tabla   --> */}
                                                        <div class="col-md-12">
                                                                <button type="button" className="btn btn-info float-right   mb-2" id="btne" onClick={add_tablaE}>
                                                                    <i class="fas fa-plus-circle" >&nbsp; Agregar</i> 
                                                                </button>   
                                                                <button type="button" className="btn btn-info float-right   mb-2" id="btns" onClick={add_tablaS}>
                                                                    <i class="fas fa-plus-circle" >&nbsp; Agregar</i> 
                                                                </button> 
                                                        </div>
                                                        <div class="table-responsive ">
                                                            <table class="table table-hover" id="tablita">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Detalle</th>
                                                                        <th>Producto </th>
                                                                        <th>Bodega</th>
                                                                        <th >Lote</th>
                                                                        <th >Cantidad</th>
                                                                        <th >Eliminar</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="id_creacion">
                                                                </tbody>
                                                            </table>
                                                            <table class="table table-hover" id="tablitas">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Producto </th>
                                                                        <th>N° Trazabilidad</th>
                                                                        <th >Lote</th>
                                                                        <th >Cantidad</th>
                                                                        <th >Codigo Empleado</th>
                                                                        <th>Referecias</th>
                                                                        <th >Eliminar</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="id_creacions">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    {/* <!-- Fin tabla   --> */}
                                                    </div>
                                                    
                                                </form>
                                                <div class="modal-footer justify-content-between">
                                                    <button type="button" class="btn btn-secondary" onClick={ReturnData}>Atras</button>
                                                    <button type="button" class="btn btn-primary float-end" onClick={prueba}>Guardar</button>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        {/* Modal Detalle */}
                        <div class="modal fade rounded shadow-lg" data-backdrop="static"  id="modalDetalle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog " role="document">
                                    <div class="modal-content">
                                        <div class="modal-header  bg-info">
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
                                                                <div className="col-mg-6 ">
                                                                
                                                                    <form id="formlote">
                                                                        <div class="card-body ">
                                                                            <div class="form-group  ">
                                                                                <label></label>
                                                                                <input type="text" name="lotea"  className="form-control form-control-border" placeholder="Nombre de lote"/>
                                                                                <div class="invalid-feedback">
                                                                                        Campo vacio.
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-group " id="fechae">
                                                                                <label>Fecha de expiracion</label>
                                                                                <div class="input-group date"  data-target-input="nearest" name="date_exp">
                                                                                    <input type="date" class="form-control form-control-border" name="date_exp"/>
                                                                                    <div class="invalid-feedback">
                                                                                        Campo vacio.
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        
                                                                            <button type="button" class="btn btn-primary btn-sm" onClick={addLote} >Registrar</button>
                                                                      
                                                                    </form>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    {/*  */}
                                                <div class="row">
                                                    <div class="form-group col-md-9" id='pro_entrada'>
                                                        <label>Producto</label>
                                                        <select class="js-data-example" name="cod_prod" id="id_select_pro">
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
                                                    <button type="button" class="btn btn-primary  btn-sm" onClick={Rformdetalle}>Guardar</button>
                                                </div>
                                            </form>
                                            {/*  */}
                                        </div>
                                    
                                    </div>
                                </div>
                           </div>
                    
                </div>{/* /.container-fluid */}
            </section>
        </div>
        // 
    )


}