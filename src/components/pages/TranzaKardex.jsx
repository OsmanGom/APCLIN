import React , {useEffect}from "react";
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast"
const cookies = new Cookies();

const Correlative_Header_Kardex = () =>{
    $.ajax({
      type: "get", 
      url:`${cookies.get('server')}/api/HeaderKardex/${cookies.get('enterprise')}`,
      success:function(json_data) {  
        const cod = document.getElementById('n_tranzability')
        if (json_data !== 'Not Data'){
          cod.innerText = json_data[0]['correlative']
          cod.value = json_data[0]['correlative']
        }else{
            
          cod.innerText = 'No existen registros'
          cod.value = ''
        }
      }
    })
  }
  


export default function TrazaKardez(props){
  
//   variables globals
    var position_head = document.getElementById('custom-tabs-one-home-tab')
    var position_detail = document.getElementById('custom-tabs-one-profile-tab')
    var head = document.getElementById('custom-tabs-one-home')
    var detail = document.getElementById('custom-tabs-one-profile')
    var classSuccess = 'form-control is-valid form-control-border';
    var classWarning = 'form-control form-control-border is-invalid';
    
    document.querySelector('title').textContent = 'Clinica | Trazabilidad Kardex';
    
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Kardex/Trazabilidad');
      }else{
        props.history.push('/');
      }
        },[props.history]); 
    
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
        
        document.getElementById('opv').value = a.target.options[a.target.selectedIndex].title
        let emplo = document.getElementById('employed')
        let tablae = document.getElementById('tablita')
        let tablas = document.getElementById('tablitas')
        let proe = document.getElementById('pro_en')
        let pros = document.getElementById('pro_salidas')
        let mensaje = ''
        let titulo = document.getElementById('titulo')
        let btne = document.getElementById('btne')
        let btns = document.getElementById('btns')
        let bode = document.getElementById('id_bodega')
        
        mensaje = a.target.options[a.target.selectedIndex].text
        if(a.target.options[a.target.selectedIndex].title === '1'){
            emplo.style.display = 'none';
            tablae.style.display = 'block'
            tablas.style.display = 'none'
            btne.style.display = 'block'
            btns.style.display = 'none'
            proe.style.display = 'block'
            pros.style.display = 'none'
            bode.style.display = 'block'
        }else if(a.target.options[a.target.selectedIndex].title === '0'){
            emplo.style.display = 'block';
            tablae.style.display = 'none'
            tablas.style.display = 'block'
            btne.style.display = 'none'
            btns.style.display = 'block'
            proe.style.display = 'none'
            pros.style.display = 'block'
            bode.style.display = 'none'
        }

        titulo.innerHTML = mensaje

    }

    const clearData = ()=>{
        let form1 = document.getElementById('formk')
        form1.type_move.value = ''
        form1.n_tranzability.value = ''
        form1.origin_product.value = ''
        form1.date_tranzaction.value = ''
        form1.reference.value = ''
        document.getElementById('titulo').innerHTML = ''
        selectstock()
        selectProd()
        selectEmployed()
        $("#id_creacion > tr").remove();
        $("#id_creacions > tr").remove();
    }
    
    // ******************* SELECTS *********************

    const selectEmployed=()=>{
        var em = document.getElementById('id_select_em')
        if (em != null){
            let options = document.querySelectorAll('#id_select_em option');
            options.forEach(o => o.remove());
          $.ajax({
            type: "GET", 
            url:`${cookies.get('server')}/api/empleados/${cookies.get('enterprise')}`,
            success:function(json_data) {  
              const po = document.createElement('option')
              
              if(json_data === 'Not Data'){
                
                po.value = ''
                po.text = 'No data'
                // op.disabled = true
                em.appendChild(po)
              }else{ 
                po.value = ''
                po.text = '------ Seleccione -------'
                em.appendChild(po)
                for (let i = 0; i < json_data.length; i++) {
                  const option = document.createElement('option')
                  option.value = json_data[i]['exp_codigo_alternativo']
                  option.text = json_data[i]['exp_codigo_alternativo']+' '+json_data[i]['exp_nombres_apellidos']+' | '+json_data[i]['departamento']
                  em.appendChild(option);
                }
              }
            }
          })
        }
      }
    



    //Select Lote
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
            url:`${cookies.get('server')}/api/DetalleLot/${cookies.get('enterprise')}`,
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
        let st = document.getElementById('select_al')
        if (st != null){
            let options = document.querySelectorAll('#select_al option');
            options.forEach(o => o.remove());
          $.ajax({
            type: "GET", 
            url:`${cookies.get('server')}/api/almacen/${cookies.get('enterprise')}`,
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

    const selectstock=()=>{
        let ls = document.getElementById('id_select_prost')
        if (ls != null){
            let options = document.querySelectorAll('#id_select_prost option');
            options.forEach(o => o.remove());
          $.ajax({
            type: "GET", 
            url:`${cookies.get('server')}/api/stock/${cookies.get('enterprise')}`,
            success:function(json_data) {  
              
                const po = document.createElement('option') 
                if (json_data !== 'Not Data'){
                    po.value = ''
                    po.text = '------ Seleccione -------'
                    ls.appendChild(po)

                    for (let i = 0; i < json_data.length; i++) {
                        const option = document.createElement('option')
                        option.value = json_data[i]['id']
                        option.text = json_data[i]['detail_store']+' || Lote-'+json_data[i]['cod_lot']+' | '+ json_data[i]['cod_prod']+' | '+json_data[i]['name_product']+' | Existencia '+json_data[i]['total_quantity']
                        option.title = json_data[i]['cod_lot']
                        option.name = json_data[i]['cod_prod']
                        option.placeholder = json_data[i]['detail_store']
                        option.role = json_data[i]['total_quantity']
                        ls.appendChild(option);
                    }

                }else{
                    po.value = ''
                    po.text = 'No existen registros'
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
                url: `${cookies.get('server')}/api/lot`,
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

    // Registro Kardex
    const prueba=()=>{
        let form1 = document.getElementById('formk')
        let value, id_header, tbs
        if (document.getElementById('opv').value === '1'){
            tbs = $("#tablita tbody tr").length;
            value = 1
            if (tbs > 0){
                $.ajax({
                    type: 'post', 
                    url: `${cookies.get('server')}/api/HeaderKardex`,
                    headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                    },
                    data: JSON.stringify({
                        type_move:parseInt(form1.type_move.value),
                        n_trazability:form1.n_tranzability.value,
                        origin_product:parseInt(form1.origin_product.value),
                        date_tranzaction:form1.date_tranzaction.value,
                        reference:form1.reference.value,
                        user_register:cookies.get('user'),
                        id_enterprise:cookies.get('enterprise')
                    }),
                    success: function (json_data){
                        id_header = json_data[0]['header_id']
                        AddDetailKardex(id_header, value)
                    }, error: function(error){
                        console.log(error)
                    }
                })
           }else{
            toast.error('Deben existir registros en la tabla',{duration: 6000, position:"top-right"})
           }

        } else{
            tbs = $("#tablitas tbody tr").length;
            value = 0
            if (tbs > 0){
                $.ajax({
                    type: 'post', 
                    url: `${cookies.get('server')}/api/HeaderKardex`,
                    headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                    },
                    data: JSON.stringify({
                        type_move:parseInt(form1.type_move.value),
                        n_trazability:form1.n_tranzability.value,
                        origin_product:parseInt(form1.origin_product.value),
                        date_tranzaction:form1.date_tranzaction.value,
                        reference:form1.reference.value,
                        user_register:cookies.get('user')
                    }),
                    success: function (json_data){
                        id_header = json_data[0]['header_id']
                        AddDetailKardex(id_header, value)
                    }, error: function(error){
                        console.log(error)
                    }
                })
           }else{
            toast.error('Deben existir registros en la tabla',{duration: 6000, position:"top-right"})
           }

           
        }       
    }
    // id_header, valor
    const AddDetailKardex=(id_header, valor)=>{
        let formuk2 = document.getElementById('formk2');
        let employed
        
        if (valor === 1){
            if(formuk2.cod_employed.value === ''){
            employed = null
            }else{employed = formuk2.cod_employed.value}

            for (let i = 1, row; row = document.getElementById('tablita').rows[i]; i++) {
                let quantity 
                quantity = parseInt(parseInt(row.cells[4].innerHTML))

                $.ajax({
                    type: 'post', 
                    url: `${cookies.get('server')}/api/DetailKardex/${cookies.get('enterprise')}`,
                    headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                    },
                    data: JSON.stringify({
                        header_id:parseInt(id_header),
                        cod_store:row.cells[2].innerHTML,
                        id_detail_lot:parseInt(row.cells[0].innerHTML),
                        quantity:quantity,
                        cod_employed:employed,
                        user_register:cookies.get('user')
                    }),
                    success: function (res){
                        console.log(res)
                        
                    }, error: function(error){
                        console.log(error.responseJSON)
                    }
                })
            }
            toast.success('Added Successfully!!',{duration: 6000, position:"top-right"})
            $("#id_creacion > tr").remove();
            

        }else{
            for (let i = 1, row; row = document.getElementById('tablitas').rows[i]; i++) {
                let quantity 
                quantity = -parseInt(parseInt(row.cells[5].innerHTML))

                if(row.cells[1].innerHTML === ''){
                    employed = null
                }else{
                    employed = row.cells[1].innerHTML
                }

                $.ajax({
                    type: 'post', 
                    url: `${cookies.get('server')}/api/DetailKardex/${cookies.get('enterprise')}`,
                    headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                    },
                    data: JSON.stringify({
                        header_id:parseInt(id_header),
                        cod_store:row.cells[3].innerHTML,
                        id_detail_lot:parseInt(row.cells[0].innerHTML),
                        quantity:quantity,
                        cod_employed:employed,
                        user_register:cookies.get('user')
                    }),
                    success: function (res){
                        console.log(res)
                        
                        
                    }, error: function(error){
                        console.log(error.responseJSON.errors)
                    }
                })
        }
        toast.success('Added Successfully!!',{duration: 6000, position:"top-right"})
        $("#id_creacions > tr").remove();
        }

    }

    // ************************ Funciones **************************
    // Funcion tabla Entradas
    const add_tablaE=()=>{
        let formuk2 = document.getElementById('formk2');
        if (formuk2.cod_prod.value !== '' && formuk2.cod_store.value !== '' && formuk2.quantity.value !== '' ){
            
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
        
        if(parseInt(formuk2.quantity.value) > parseInt(formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].role)){
            toast.error('Cantidad exede a la existente',{duration: 6000, position:"top-right"})
        }else if(typeof parseInt(formuk2.quantity.value) !== 'number'){
            toast.error('Cantidad debe ser un numero!!',{duration: 6000, position:"top-right"})
        }else{
            if (formuk2.cod_prods.value !== ''  && formuk2.quantity.value !== '' ){
               
            
                var fila = "<tr><td>"+formuk2.cod_prods.value+"</td><td>"+formuk2.cod_employed.value+"</td><td>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].name+"</td><td className='celdas'>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].placeholder+"</td><td>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].title+"</td><td>"+formuk2.quantity.value+"</td><td><button class='btn btn-danger  btn-sm' value='eliminar' title='Eliminar dato' onClick={this.closest('tr').remove()} type='button'><i class='fas fa-trash'></i></button></td></tr>"
                var btn = document.createElement("TR");
                btn.innerHTML=fila;
                document.getElementById("id_creacions").appendChild(btn);
                
                selectProds()
                selectStor()
                selectstock()
                formuk2.quantity.value = ''
                formuk2.cod_employed.value = ''
                selectEmployed()

            }else{
                toast.error('Campos vacios',{duration: 6000, position:"top-right"})
            }
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
                        <h1>Trazabilidad Kardex</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            {cookies.get('MenuPrincipal') === 'MenuPrincipal' &&
                                <li className="breadcrumb-item "><a href="/dashboard">Inicio</a></li>
                             }
                            <li className="breadcrumb-item active"><a href="/kardex">Kardex</a></li>
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
                                                                <select class="custom-select form-control-sm form-control-border" name="type_move" id="select_tm" onChange={selectitemData}>
                                                                </select>
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            <div class="form-group col-md-3 ml-1">
                                                                <label>&nbsp;</label>
                                                                <button type="button" class="btn btn-secondary float-right  btn-sm" title="Generar Correlativo" onClick={Correlative_Header_Kardex}>
                                                                    <i class="fa fa-spinner"></i>
                                                                </button>
                                                                
                                                                <input type="text" name="n_tranzability" class="form-control form-control-border "  placeholder="N de tranzaccion" id="n_tranzability" />
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
                                                                <label><span className="fas fa-calendar mr-2" />Fecha de Transacción:</label>
                                                                <div class="input-group date"  data-target-input="nearest">
                                                                    <input type="date" class="form-control form-control-border" name="date_tranzaction"/>
                                                                </div>
                                                            </div>
                                                            <div class="form-group col-md-8 mr-2">
                                                                <label><span className="fas fa-file mr-2" />Referencias</label>
                                                                <textarea class="form-control form-control-border" rows="4" placeholder="Enter ..." name="reference"></textarea>
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
                                                            
                                                            <div class="form-group col-md-7" id='pro_en'>
                                                                <label>Producto</label>
                                                                <button type="button" class="btn btn-success float-right  btn-sm" data-toggle="modal" data-target="#modalDetalle" title="Agregar Producto a Lote">
                                                                    <i class="fas fa-plus"></i>
                                                                </button>
                                                                <select class="js-data-example" name="cod_prod" id="id_select_pros">
                                                                </select>
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-10" id='pro_salidas'>
                                                                <label>Producto</label>
                                                                
                                                                <select class="js-data-example" name="cod_prods" id="id_select_prost">
                                                                </select>
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                         
                                                            {/* SALIDA */}
                                                            
                                                            <div class="form-group col-md-5" id="id_bodega">
                                                                <label ><span className="fas fa-store mr-2" />Codigo Bodega</label>
                                                                <select class="js-data-example" name="cod_store" id="select_al" >
                                                                </select>
                                                            </div> 
                                                            
                                                            <div class="form-group col-md-2">
                                                                <label>&nbsp;</label>
                                                                <input type="number" name="quantity" class="form-control form-control-border "  placeholder="Cantidad" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            
                                                            {/* <div class="form-group col-md-3" id="employed">
                                                                <label>&nbsp;</label>
                                                                <input type="text" name="cod_employed" class="form-control form-control-border "  placeholder="Codigo Empleado" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div> */}
                                                            {/*  */}
                                                            <div class="form-group col-md-7" id="employed">
                                                                
                                                                    <label>Codigo Empleado</label>
                                                                    <select class=" js-data-example " name="cod_employed"  id='id_select_em'>
                                                                    </select> 
                                                                
                                                            </div> 
                                                            {/*  */}
                                                            
                                                            
                                                        </div>  
                                                        {/* <!-- Inicio tabla   --> */}
                                                        <div class="col-md-12">
                                                                <button type="button" className="btn btn-info float-right   mb-2" id="btne" onClick={add_tablaE}>
                                                                    <i class="fas fa-plus-circle" >&nbsp; Agregar</i> 
                                                                </button>   
                                                                <button type="button" className="btn btn-info float-right   mb-2"  id="btns" onClick={add_tablaS}>
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
                                                                        <th>Detalle</th>
                                                                        <th>Cod Empleado</th>
                                                                        <th>Producto </th>
                                                                        <th>Bodega</th>
                                                                        <th >Lote</th>
                                                                        <th >Cantidad</th>
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
                                                    <button type="button" class="btn btn-secondary" onClick={ReturnData}><span className="fas fa-arrow-left mr-2" />Atras</button>
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