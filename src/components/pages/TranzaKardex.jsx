import React , {useEffect}from "react";
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";

export default function TrazaKardez(props){
  // const url = 'https://localhost:5001/api/area'
    document.querySelector('title').textContent = 'Clinica | Trazabilidad Kardex';
    const cookies = new Cookies();
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Kardez/Trazabilidad');
      }else{
        props.history.push('/');
      }
        },[]); 
    // Validations
    var classSuccess = 'form-control is-valid form-control-border';
    var classWarning = 'form-control form-control-border is-invalid';
    const form = ()=>{
        var formu = document.getElementById('formk');
        
        if(formu.cod_store.value === ''){
            formu.cod_store.className = 'js-data-example-ajax-almacen is-invalid'
        }else{
            formu.cod_store.className = 'js-data-example-ajax-almacen  is-valid'
        }if(formu.cod_prod.value === ''){
            formu.cod_prod.className = 'js-data-example-ajax-cod-producto  is-invalid';
        }else{
            formu.cod_prod.className = 'js-data-example-ajax-cod-producto is-valid';
        }if(formu.type_move.value === ''){
            formu.type_move.className = 'js-data-example-ajax-tipo-movimiento  is-invalid'
        }else{
            formu.type_move.className = 'js-data-example-ajax-tipo-movimiento  is-valid'
        }if(formu.quantity.value === ''){
            formu.quantity.className = classWarning;
        }else{
            formu.quantity.className = classSuccess;
        }if(formu.lot_number.value === ''){
            formu.lot_number.className = classWarning;
        }else{
            formu.lot_number.className = classSuccess;
        }if(formu.date_exp.value === ''){
            formu.date_exp.className = classWarning;
        }else{
            formu.date_exp.className = classSuccess;
        }
        
    }
    const selectitem=(a)=>{
      console.log(a.target.value.toUpperCase());
    }

    

    return (
        // 
        <div className="content-wrapper mb-5">
            {/* Content Header (Page header) */}
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
                    <div className="row">
                        <div className="col-md-11 ml-3">
                            <div className="card card-info shadow-lg">
                                <div class="card-header">
                                    <h3 class="card-title">Trazabilidad <small>Kardex</small></h3>
                                </div>
                            
                                <form id="formk">
                                    <div class="card-body mt-5">
                                        <div className="row">
                                            <div class="form-group col-md-4">
                                                <label>Codigo Producto</label>
                                                <select class="js-data-example-ajax-cod-producto " name="cod_prod" onChange={selectitem}>
                                                    <option value="" selected>--- Seleccione ---</option>
                                                </select>
                                                {/* <div class="invalid-feedback">
                                                    Campo vacio.
                                                </div> */}
                                            </div> 
                                            <div class="form-group col-md-4">
                                                <label>Tipo Movimiento</label>
                                                <select class="js-data-example-ajax-tipo-movimiento is-valid" name="type_move" onChange={selectitem}>
                                                <option value="" selected>--- Seleccione ---</option>
                                                
                                                </select>
                                                <div class="invalid-feedback">
                                                    Campo vacio.
                                                </div>
                                            </div> 
                                            
                                            {/*  */}
                                            <div class="col-sm-3  ml-1 mt-3">
                                                <div class="form-group">
                                                    <div class="custom-control custom-radio">
                                                        <input class="custom-control-input" type="radio" id="customRadio1" name="origin_product1"/>
                                                        <label for="customRadio1" class="custom-control-label">Empresa</label>
                                                    </div>
                                                    <div class="custom-control custom-radio">
                                                        <input class="custom-control-input" type="radio" id="customRadio2" name="origin_product2" />
                                                        <label for="customRadio2" class="custom-control-label">Seguro Social</label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        {/*  */}
                                        <div className="row">
                                            <div class="form-group col-md-2">
                                                <input type="text" name="quantity" class="form-control form-control-border "  placeholder="Cantidad" />
                                                <div class="invalid-feedback">
                                                    Campo vacio.
                                                </div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                
                                                <input type="text" name="lot_number" class="form-control form-control-border" placeholder="Numero Lote"/>
                                                <div class="invalid-feedback">
                                                    Campo vacio.
                                                </div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label>Codigo Almacen</label>
                                                <select class="js-data-example-ajax-almacen" name="cod_store" onChange={selectitem}>
                                                    <option value="" selected>--- Seleccione ---</option>
                                                </select>
                                                <div class="invalid-feedback">
                                                    Campo vacio.
                                                </div>
                                            </div> 
                                        
                                        </div>
                                        <div className="row">
                                            <div class="form-group">
                                                <input type="text" name="cod_employed" class="form-control form-control-border "  placeholder="Codigo Empleado" />
                                                <div class="invalid-feedback">
                                                    Campo vacio.
                                                </div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                    <label>Fecha de expiracion:</label>
                                                    <div class="input-group date"  data-target-input="nearest">
                                                        <input type="date" class="form-control form-control-border" name="date_exp"/>
                                                    </div>
                                                </div>
                                                <div class="form-group col-md-7">
                                                <label>Referencias</label>
                                                <textarea class="form-control" rows="4" placeholder="Enter ..." name="reference"></textarea>
                                            </div>
                                        </div>
                                            
                                    </div>
                                    <div class="card-footer">
                                    <button type="button" class="btn btn-primary" onClick={form}>Registrar</button>
                                    </div>
                                </form>
                                <p className="mb-1">
                                </p>
                            </div>
                        </div>
                    </div>
                
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
      </div>
        // 
    )


}