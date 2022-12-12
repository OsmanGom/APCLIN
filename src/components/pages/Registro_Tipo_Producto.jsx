import React , {useEffect}from "react";
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast"

$(document).ready(function () {
    var p = document.getElementById('idempresa')

    if (p != null){
        $.ajax({
            type: "GET", 
            url: "https://localhost:5001/api/empresa",
        
            success: function(json_data) {  
            const op = document.createElement('option') 
            op.value = ''
            op.text = '------ Seleccione -------'
            p.appendChild(op)
            if (json_data !== 'Not Data'){
                for (let i = 0; i < json_data.length; i++) {
                    const option = document.createElement('option')
                    option.value = json_data[i]['cia_codigo']
                    option.text = json_data[i]['cia_descripcion']+'-'+json_data[i]['cia_abreviatura']
                    p.appendChild(option);
                }
            }
            }
        })
    }
})
export default function R_Tipo_Producto(props){
  // const url = 'https://localhost:5001/api/area'
    document.querySelector('title').textContent = 'Clinica | Tipo Producto';
    const cookies = new Cookies();
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Registros/Base');
      }else{
        props.history.push('/');
      }
        },[]); 


    // Validations
    // formulario tipo producto
    var classSuccess = 'form-control is-valid form-control-border';
    var classWarning = 'form-control form-control-border is-invalid';
    const formTP = ()=>{
        var formutp = document.getElementById('formtp');
        var a,b,c = false;
        
         if(formutp.description_typeP.value === ''){
            formutp.description_typeP.className = classWarning;
        }else{
            b=true
            formutp.description_typeP.className = classSuccess;
        }if(formutp.unid_med.value === ''){
            formutp.unid_med.className = classWarning
        }else{
            c=true
            formutp.unid_med.className = classSuccess;
        }
        if (b===true && c===true){
            a = true;
        }
        SaveDatatp(a,formutp)
        
    }
// formulario almacen
    const formAL = ()=>{
        var formual = document.getElementById('formal');
        var d,e,f = false
        
         if(formual.detail_store.value === ''){
            formual.detail_store.className = classWarning;
        }else{
            e = true
            formual.detail_store.className = classSuccess;
        }if(formual.cod_enterprise.value === ''){
            formual.cod_enterprise.className = 'form-control select2  is-invalid'
        }else{
            f = true
            formual.cod_enterprise.className = 'form-control select2 is-valid'
        }
        if (e === true && f === true){
            d = true
        }
        SaveDataA(d,formual)
    }

    // Formulario
    // tipo producto
    const SaveDatatp=(a,formutp)=>{
        if (a === true){
            
            $.ajax({
                type: 'post', 
                url: 'https://localhost:5001/api/tipo_producto',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                data: JSON.stringify({
                    description_typeP:formutp.description_typeP.value,
                    unid_med:formutp.unid_med.value,
                }),
                success: function (res){
                    console.log(res)
                    toast.success(res,{duration: 6000, position:"top-right"})
                    formutp.description_typeP.value = ''
                    formutp.unid_med.value = ''
                    formutp.description_typeP.className = 'form-control form-control-border'
                    formutp.unid_med.className = 'form-control form-control-border'
                    //   window.location.href=('/Registro/Tipo/Producto')
                } 
            })
        }
    }

     // Almacen
     const SaveDataA=(d,formual)=>{
        if (d === true){
            $.ajax({
                type: 'post', 
                url: 'https://localhost:5001/api/almacen',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                data: JSON.stringify({
                    detail_store:formual.detail_store.value,
                    cod_enterprise:parseInt(formual.cod_enterprise.value),
                }),
                success: function (res){
                    console.log(res)
                    toast.success(res,{duration: 6000, position:"top-right"})
                    formual.detail_store.value = ''
                    formual.cod_enterprise.value = ''
                    formual.detail_store.className = 'form-control form-control-border'
                    formual.cod_enterprise.className = 'form-control select2 '
                    //   window.location.href=('/Registro/Tipo/Producto')
                } 
            })
        }
    }
    
    return (

        // 
        <>
            
            <div className="content-wrapper">
            <div><Toaster/></div>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                {/* <h1 className="m-0">{cookies.get('user')}</h1> */}
                                <h1>Registros</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Registros</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                {/*  */}
               

                <section class="content">
                    <div className="row">

                        <div class="container-fluid col-6">
                            
                                <div class="card card-info card collapsed-card shadow">
                                    <div class="card-header ">
                                        <h3 class="card-title "><i class="fas fa-plus mr-4"></i>  Registro Tipo Producto</h3>
                                        <div class="card-tools">
                                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <div class="row">
                                            {/*  */}

                                            <div className="col-mg-10 ">
                                               
                                                <form id="formtp">
                                                    <div class="card-body mt-2">
                                                        <div className="row">
                                                            <div class="form-group col-md-6">
                                                                <label>Tipo Producto</label>
                                                                <input type="text" name="description_typeP" class="form-control form-control-border"  placeholder="Nombre tipo Producto" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            <div class="form-group col-md-6">
                                                                <label>Unidad Medida</label>        
                                                                <input type="text" name="unid_med" class="form-control form-control-border"  placeholder="Ejem. ml,unidad,onz" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            
                                                        </div>

                                                    </div>
                                                    <div class="card-footer">
                                                        <button type="button" class="btn btn-primary" onClick={formTP}>Registrar</button>
                                                    </div>
                                                </form>
                                        
                                            </div>
                                            {/*  */}
                                            
                                            {/*  */}
                                        </div>
                                    </div>
                                </div>
                                
                        </div>
                        <div class="container-fluid col-6">
                                <div class="card card-danger card-outline collapsed-card shadow ">
                                    <div class="card-header bg-gradient-gray-dark">
                                        
                                        <h3 class="card-title"><i class="fa fa-store mr-5"></i>Registro Almacen</h3>
                                        
                                        <div class="card-tools">
                                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="card-body mt-2">
                                        <div class="row">
                                            {/*  */}

                                            <div className="col-mg-10 ">
                                                <form id="formal">
                                                    <div class="card-body">
                                                        <div className="row">
                                                            <div class="form-group col-md-6">
                                                                <label>Almacen</label>
                                                                <input type="text" name="detail_store" class="form-control form-control-border"  placeholder="Almacen" />
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            <div class="form-group col-md-6 ">
                                                                <label>Empresa</label>
                                                                
                                                                    <select className='form-control select2' id='idempresa' name='cod_enterprise' >
                                                                    </select>
                                                                
                                                                <div class="invalid-feedback">
                                                                    Campo vacio.
                                                                </div>
                                                            </div>
                                                            
                                                        </div>

                                                    </div>
                                                    <div class="card-footer">
                                                        <button type="button" class="btn btn-primary" onClick={formAL}>Registrar</button>
                                                    </div>
                                                </form>
                                        
                                            </div>
                                            {/*  */}
                                            
                                            {/*  */}
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>
                
                

                
            </div></>
        // 
    )


}