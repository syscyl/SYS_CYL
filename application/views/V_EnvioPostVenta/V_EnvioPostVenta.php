<style>
.btn-cambiar-estado-epostventa {
    margin-top: 30px !important;
    margin: 5px;
    margin-top: 5px;
    width: 80px;
    height: 60px;
    border-radius: 10px;
}
.btn-cambiar-estado-epostventa  i {font-size: 30px;}
</style>
<section id="main-content" class="">
    <section class="wrapper" id="sct-tabla-almacen" style='margin-top:60px;display:inline-block;width:100%;padding:15px 0 0 15px;'>
        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div class="page-title">
                <div class="pull-left">
                    <h1 class="title">DETALLE DE ENTREGAS - POST VENTAS</h1></div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="col-lg-12">
                <section class="box">
                    <header class="panel_header">
                        <div class="pull-left margin-button">                             
                            <!-- <div class="col-xs-3"> 
                                <button class="btn btn-primary btn-corner margin-top-button" type="button" id="btn-sct-lote">
                                    <i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar
                                </button>
                            </div> -->
                            <div class="col-xs-6">
                                <label class="form-label" for="txt-rango-fecha-almacen2">Rango de fecha</label>
                                <input style="width:100%;height: 35px;" id="txt-rango-fecha-almacen2" type="text" class="daterange daterange-text add-date-ranges">
                            </div>
                            <div class="col-xs-3">
                                 <button style="margin-left: -30px;" class="btn btn-primary margin-top-button" type="button" id="btn-recuperar-almacen2">
                                    <i class="box_setting fa fa-search"></i>&nbsp;&nbsp;Recuperar
                                </button>
                            </div>                            
                        </div>
                        <div class="pull-right margin-button">
                            <div class="col-xs-3">
                                 <button style="margin-left: -30px;" class="btn btn-primary margin-top-button" type="button" id="btn-insert-servtecnico-epostventad">
                                    <i class="box_setting fa fa-cogs"></i>&nbsp;&nbsp;Servicio Técnico
                                </button>
                            </div>                        
                        </div>
                    </header>
                    <div class="content-body">    
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                               <table id="datatable-almacen2" class="table table-striped dt-responsive display" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width="10px"><input type="checkbox" name="select_all" value="1" id="checkbox-all-epostventa"></th>
                                            <th style="text-align: center" width="50px">Nº</th>
                                            <th style="text-align: center" width="200px">FECHA</th>    
                                            <th style="text-align: center"width="200px">CÓDIGO POST-VENTA</th>
                                            <th style="text-align: center"width="100px">ESTADO</th>
                                            <th style="text-align: center" width="100px">OPCIÓN</th> 
                                        </tr>
                                    </thead>                                          
                                    <tbody align="center" id="tbody-almacen">
                                    </tbody>
                                </table> 
                            </table> 
                            </div>                      
                        </div>
                    </div>
                </section>
            </div>
    </section>

    
    <section class="wrapper" id="sct-ver-envio" style='margin-top:60px;display:inline-block;width:100%;padding:15px 0 0 15px;'>
        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div class="page-title">
                <div class="pull-left">
                    <h1 class="title">ENVIO</h1>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="col-lg-12">
            <section class="box">
                <form id="form-lote" onsubmit="return false">
                    <header class="panel_header">
                        <div class="title pull-left">                          
                            <button class="btn btn-default btn-corner btn-sct-volver" type="button" >
                                <i class="box_setting fa fa-undo"></i>&nbsp;&nbsp;
                                Volver
                            </button> 
                        </div>
                        <div class="actions panel_actions pull-right">
                            <i class="box_toggle fa fa-chevron-down"></i>                           
                        </div>
                    </header>
                    <div class="content-body">  
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <table id="table-envio-estado" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>CÓDIGO POST-VENTA</th>
                                <!--         <th><a href="javascript:void(0);" id="link-foto-guia">Nº DE ENTREGA</a></th> -->                      
                                        <th>ESTADO ACTUAL</th>   
                                    </tr>
                                </thead> 
                                <tbody>              
                                </tbody>
                            </table>
                        </div>                
                        <div class="col-md-12 col-sm-12 col-xs-12 margin-top-button">
                            <ul class="nav nav-tabs nav-justified primary">
                                <li class="li-op op-almacen">
                                    <a id="click-cliente" data-idestado="4" href="#op-almacen" data-toggle="tab">
                                        <i class="fa fa-user"></i> CLIENTE
                                    </a>
                                </li>
                                <li class="li-op op-trayecto">
                                    <a id="click-servtecnico" data-idestado="5" href="#op-trayecto" data-toggle="tab">
                                        <i class="fa fa-cogs"></i> SERVICIO TÉCNICO
                                    </a>
                                </li>
                                <li class="li-op op-entregado">
                                    <a id="click-entregado" data-idestado="3" href="#op-entregado" data-toggle="tab">
                                        <i class="fa fa-archive"></i> ENTREGADO
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content primary">
                                <div class="tab-pane fade li-op" id="op-almacen">  
                                    <table id="table-op-cliente" class="table table-bordered table-info">
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>FECHA</th>
                                                <th>HORA</th>   
                                                <th>OBSERVACIÓN</th>   
                                            </tr>
                                        </thead> 
                                        <tbody>              
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div class="tab-pane fade li-op" id="op-trayecto">
                                    <div class="div-btnagregar-ob">
                                    </div>
                                    <table id="table-op-servtecnico" class="table table-bordered table-info">
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>FECHA</th>
                                                <th>HORA</th>   
                                                <th>OBSERVACIÓN</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="tab-pane fade li-op" id="op-entregado">
                                    <!-- <div class="div-btnagregar-ob">
                                    </div> -->
                                    <table id="table-op-entregado2" class="table table-bordered table-info">
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>FECHA</th>
                                                <th>HORA</th>   
                                                <th>OBSERVACIÓN</th>   
                                            </tr>
                                        </thead> 
                                        <tbody>              
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div id="div-opcion-envio">
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </section>
</section>
<div class="modal fade" id="modal-aceptar">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <div class="visible-ob"><h4 align="center" class="modal-title"><b>¿Esta seguro de cambiar estado?</b></h4></div>
                <div id="divestado" style="text-align: center;margin-top: 10px;"></div>
            </div>
            <div class="modal-body">
                <form id=""  onsubmit="return false">                    
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group visible-in">
                                <label class="form-label">Observaciones</label>
                                <div class="controls">                                    
                                    <textarea id="txt-observacion-estado" class="col-xs-12"></textarea>
                                </div>
                            </div>
                            <div sele="" class="form-group visible-in2">
                                      <input type="radio" name="entregado" id="r1" value="Al Detalle"> Al Detalle<br>
                                      <input type="radio" name="entregado" id="r2" value="Por Bulto"> Por Bulto<br>
                                      <input type="radio" name="entregado" id="r3" value="Por Etiqueta"> Por Etiqueta
                            </div>
                            <div class="form-group visible-foto col-xs-6">
                                <label class="form-label" >Foto de Guia </label>
                                <div class="controls">
                                   <input accept="image/*" id="file-fotoguia-lote" class="file" type="file" data-show-upload="false" data-show-caption="true" capture="camera"> 
                                </div>
                            </div>
                            <div style="margin-left:600px;" class="form-group visible-in3">
                                <label class="form-label">Incidencia</label>   
                                <div class="controls">
                                   <input id="chck-estado-detalle" type="checkbox" checked data-on-text="Yes">
                                </div>
                            </div> 
                        </div>
                    </div> 
                    <div class="modal-footer" >
                        <button type="button" id="btn-aceptar2" class="btn btn-success">Aceptar</button>
                        <button type="button" style="margin-right: 250px" data-dismiss="modal" class="btn btn-default">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-destinatario">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 align="center" class="modal-title"><b>REGISTRAR DESTINATARIO</b></h4>
            </div>
            <div class="modal-body">
                <form id="form-destinatario"  onsubmit="return false">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label class="form-label">Nombre</label>
                                <div class="controls">                                    
                                    <input type="text" class="form-control" id="txt-nombre-destinatario">
                                </div>
                            </div>
                        </div>                    
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <div class="form-group">
                                <label class="form-label">Departamento</label>
                                <div class="controls">                                    
                                    <div class="form-group">                                           
                                        <select class="cbo-departamento">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <div class="form-group">
                                <label class="form-label">Provincia</label>
                                <div class="controls">                                    
                                    <select class="cbo-provincia">
                                    <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <div class="form-group">
                                <label class="form-label">Distrito</label>
                                <div class="controls">                                    
                                    <select class="cbo-distrito">
                                    <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label class="form-label">Dirección</label>
                                <div class="controls">                                    
                                    <input type="text" class="form-control" id="txt-direccion-destinatario">
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="modal-footer" >
                        <button type="submit" class="btn btn-success">Aceptar</button>
                        <button data-dismiss="modal" class="btn btn-default" type="button">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modal-foto-guia">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 align="center" class="modal-title"><b>FOTO DE GUIA DE REMISIÓN</b></h4>
                <div style="text-align: center;margin-top: 10px;"></div>
            </div>
            <div class="modal-body" id="img-foto-guia">                    
            </div>
        </div>
    </div>
</div>

<!-- Modal confirmacion -->
<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="modal-confirmacion">
  <div class="modal-dialog modal-sm">
    <div class="modal-content" style="width: 400px">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Confirmar</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" id="modal-btn-cancelar" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="modal-btn-aceptar2">Aceptar</button>
      </div>
    </div>
  </div>
</div>