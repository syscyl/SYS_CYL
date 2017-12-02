<!DOCTYPE html>
<html class="">
<head>
    <title>C&L TRANSPORTES Y SERVICIOS</title>
    <link rel="shortcut icon" href="assets/images/icon.png" type="image/x-icon" />
</head>
<body>
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="row">
                <div class="col-xs-1" style="color: rgba(19, 152, 67, 1.0);">
                   
                </div>
                <div class="col-xs-3">
                    <img style="max-width: 100%;overflow: hidden;margin: 0 auto;padding: 0;position: relative; text-align: center;" src="assets/images/logo_cyl.png" alt="logo">
                </div>
                <div class="col-xs-4">
                    <h2  style="text-align: center;"><label class="center">Estado de la entrega</label></h2>
                </div>
                <div class="col-xs-3">
                     <img style="max-width: 100%;overflow: hidden;margin: 0 auto;padding: 0;position: relative; text-align: center;" src="assets/images/logo_se.jpg" alt="logo">
                </div>
                <div class="col-xs-1">
                   
                </div>
            </div>
            <div class="row">              
                
                <div class="col-xs-3" hidden>
                    <form action="return false" onsubmit="return false" id="form-codenvio">
                       <blockquote><label>CÓDIGO DE ENVIO:&nbsp;&nbsp;</label><input type="text" id="txt-codenvio2" value="<?=$cpostventa;?>" />
                       <div style="text-align: center;"><button class="btn btn-success btn-sm" type="submit">Buscar</button></div>
                       </blockquote>
                    </form>
                </div>
                <div class="col-xs-1"></div>
                <div class="col-xs-3">
                    <div class="info-envio" style="margin-top: 50px;">                        
                        <button type="button" id="link-foto-guia" class="btn btn-primary btn-block">Ver guía</button>
                    </div>
                </div>
                <div class="col-xs-4">
                    
                </div>
                <!-- <div class="col-xs-3">
                    <div class="info-envio" style="margin-top: 50px;">                        
                        <button type="button" id="link-foto-crono" class="btn btn-primary btn-block">Ver Cronograma</button>
                    </div>
                </div> -->
                <div class="col-xs-1"></div>
            </div>
            <div class="row">
                <div class="col-xs-2"></div>
                <div class="col-xs-8">
                    <div id="img-porcent" align="center">
                    </div>
   <section class="wrapper" id="sct-ver-envio" style='margin-top:60px;display:inline-block;width:100%;padding:15px 0 0 15px;'>       
        <div class="clearfix"></div>
        <div class="col-lg-12">
                <form id="form-lote" onsubmit="return false">                    
                    <div>  
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <table id="table-envio-estado" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>CÓDIGO POST-VENTA</th>                                        
                                        <th>ESTADO ACTUAL</th>
                                        <th>IMAGEN</th>
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
                                    <a id="click-entregado2" data-idestado="3" href="#op-entregado" data-toggle="tab">
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
        </div>
    </section>
                   
                </div>
                <div class="col-xs-2"></div>
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
</body>