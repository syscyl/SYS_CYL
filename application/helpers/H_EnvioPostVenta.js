$(document).ready(H_EnvioPostVenta);
/******************************************************************************************************************************************************************************/
//Variables globales
var $datatable_almacen2         =   $('#datatable-almacen2').DataTable({"bSort" : false});
var $txt_rango_fecha_almacen2   =   $('#txt-rango-fecha-almacen2');
/******************************************************************************************************************************************************************************/
//Inicializar Helper H_EnvioPostVenta
function H_EnvioPostVenta() {

    $('#btn-recuperar-almacen2').on('click', getEnvioPostVenta);

    $(document).on('click','.btn-ver-envio-postventa', function(){
        getEnvioPostVentaById($(this).attr('data-id'));
    });

    // Select all checkbox of table epostventa
    $('#checkbox-all-epostventa').on('click', function(){     
        var rows = $datatable_almacen2.rows({ 'search': 'applied' }).nodes();    
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    });

    // insert detalle (servicio técnico)
    $('#btn-insert-servtecnico-epostventad').on('click', function (e) {
        $('#modal-confirmacion').modal({
            backdrop: 'static',
            keyboard: false
        })
        .one('click', '#modal-btn-aceptar2', function(e) {
            var array=[];
            var data={};
            $datatable_almacen2.$('input[type="checkbox"]').each(function(){
                if(this.checked){
                    array.push($(this).val());      
                }
            });
            if(array.length){
                data.all_id_epostventa = array;
                $.ajax({
                    type: "POST",
                    url: "insertSTEnvioPostVentaDetalle",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    beforeSend: function () {},                
                    success: function (resp) 
                    {
                        showSuccess('Se cambió al estado "Servicio Técnico"');
                        getEnvioPostVenta();
                        $('#checkbox-all-epostventa').prop('checked',false);
                        $('#modal-confirmacion').modal('hide');
                    },
                    complete: function () {},
                    error: function(resp) {}
                });
            }
            else{ $('#modal-confirmacion').modal('hide');} 
        });
    });

    $('#click-cliente').on('click',getStatusByIdePostVenta);
    $('#click-servtecnico').on('click',getStatusByIdePostVenta);
    $('#click-entregado2').on('click',getStatusByIdePostVenta);

    $(document).on('click','.btn-agregar-ob2',fnc_cambiar_estado2);
    $(document).on('click','.btn-cambiar-estado-epostventa',fnc_cambiar_estado2);
    $('#btn-aceptar2').on('click', fnc_aceptar_estado2);

    $('.btn-sct-volver').on('click', function() {
        $('#btn-recuperar-almacen2').trigger('click');
    });

    $(document).on('click', '#link-img-epostventa', function() {
        $('#modal-foto-guia').modal('show');
    });

    $(document).on('click', '.btn-eliminar-envio-postventa', deleteEPostVenta);

    ///
    ////////////////////////////////
    fnc_consultar_envio_SE2(); //
    ////////////////////////////////
}
/******************************************************************************************************************************************************************************/
function getEnvioPostVenta() {
   
    var data={};    
    var txt_fecha_inicio   = $txt_rango_fecha_almacen2.data('daterangepicker').startDate.format('DD/MM/YYYY'); 
    var txt_fecha_fin      = $txt_rango_fecha_almacen2.data('daterangepicker').endDate.format('DD/MM/YYYY');  

    data.txt_fecha_inicio  = stringToDate(txt_fecha_inicio,'dd/mm/yyyy','/');
    data.txt_fecha_fin     = stringToDate(txt_fecha_fin,'dd/mm/yyyy','/');

    $.ajax({
        type: "POST",
        url: "getEnvioPostVenta",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        { 
            $datatable_almacen2.row().clear().draw( false );
        },
        success: function (resp) 
        {
            var checkbox="";
            for (var i = 0; i<resp.length;i++) 
            {
                if(resp[i].id_estado == 4)
                {
                    checkbox='<input type="checkbox" name="id[]" value="'+resp[i].id_epostventa+'"/>'
                }
                else
                {
                    checkbox="";
                }
                $datatable_almacen2.row.add([
                checkbox,
                i+1,
                resp[i].fechac_epostventa,
                resp[i].codigo_epostventa,
                resp[i].nombre_estado,
                '<button type="button"  data-id="'+resp[i].id_epostventa+'" class="btn btn-primary btn-ver-envio-postventa" rel="tooltip" data-animate="animated bounce" data-toggle="tooltip" data-original-title="Ver" data-placement="top"><i class="glyphicon glyphicon-eye-open"></i></button>'
                // +'<button type="button" data-idlote="'+resp[i].id_epostventa+'" class="btn btn-primary btn-editar-envio" rel="tooltip" data-animate="animated bounce" data-toggle="tooltip" data-original-title="Editar" data-placement="top"><i class="fa fa-edit"></i></button>'
                +'<button type="button" data-id="'+resp[i].id_epostventa+'" class="btn btn-danger btn-eliminar-envio-postventa" rel="tooltip" data-animate="animated bounce" data-toggle="tooltip" data-original-title="Eliminar" data-placement="top">'
                +'<i class="glyphicon glyphicon-remove"></i></button>'
                ]).draw(false);
            } 
        },
        complete: function () 
        {
            fnc_tooltip ();
        },
        error: function(resp)
        {
        }
    });
}
/******************************************************************************************************************************************************************************/
function getEnvioPostVentaById(id_epostventa) {
   var _div_button;
    var data={};
    data.id_epostventa  = id_epostventa;

    $.ajax({
        type: "POST",
        url: "getEnvioPostVentaById",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {           
           $table_envio_estado.children('tbody').empty();       
           $('.div-btnagregar-ob').empty();
        },
        success: function (resp) 
        { 
            var idestado=parseInt(resp[0].id_estado);
            var nombre_estado;

            $('.li-op').children('a').attr('data-idepostventa',resp[0].id_epostventa);                 

            $div_opcion_envio.html(
            '<button type="button" class="btn  btn-tr btn-cambiar-estado-epostventa" data-id="'+resp[0].id_epostventa+'" data-idestado="5" data-toggle="tooltip" data-animate=" animated bounce" title="Servicio Técnico"><i class="fa fa-cogs"></i></button>'
            +'<button type="button" class="btn  btn-en btn-cambiar-estado-epostventa" data-id="'+resp[0].id_epostventa+'" data-idestado="3" data-toggle="tooltip" data-animate=" animated bounce" title="Entregado"><i class="fa fa-archive"></i></button>');
              
            $('.btn-cambiar-estado-epostventa').addClass('btn-primary');
            switch(idestado)
            {
                case 4: 
                    nombre_estado="Cliente"; 
                    $('#click-cliente').trigger('click');
                    _div_button=$op_almacen;
                    $('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;

                case 5:
                    nombre_estado="Servicio Técnico";
                    $('#click-servtecnico').trigger('click');
                    _div_button=$op_trayecto;
                    $('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled', true);
                    $('.btn-tr').addClass('btn-secondary').removeClass('btn-primary').attr('disabled', true);
                break;

                case 3:
                    nombre_estado="Entregado";
                    $('#click-entregado2').trigger('click');
                    _div_button=$op_entregado;
                     $('.btn-cambiar-estado-epostventa').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;
            }
            _div_button.children('.div-btnagregar-ob').html('<button class="btn btn-primary btn-corner btn-agregar-ob2" data-agregar="true" data-idestado="'+idestado+'"  data-id="'+resp[0].id_epostventa+'" type="button">'
            +'<i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar'
            +'</button>');   
            
            $table_envio_estado.children('tbody').append(
            '<tr><td>'+resp[0].codigo_epostventa+'</td>'
            +'<td>'+nombre_estado+'</td>'
            +'<td><a href="javascript:void(0);" id="link-img-epostventa">VER GUIA DE REMISIÓN</a></td>'
            +'</tr>'
            );  
            $img_foto_guia .html('<img class="img-rounded img-responsive img-size" src="'+resp[0].pathfile_epostventa+'">');                
        },
        complete: function () 
        { 
            $sct_ver_envio.show();
            $sct_tabla_almacen.hide();
            fnc_tooltip ();
        },
        error: function(resp)
        {
        }
    });
}
/******************************************************************************************************************************************************************************/
function getStatusByIdePostVenta() {
    var _table;
    var data={};
    data.id_epostventa = parseInt($(this).attr('data-idepostventa')); 
    data.id_estado     = parseInt($(this).attr('data-idestado')); 
    $.ajax({
        type: "POST",
        url: "getStatusByIdePostVenta",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            $('.table-info').children('tbody').empty();
        },
        success: function (resp) 
        {
            switch(data.id_estado)
            {
                case 4:                    
                    _table  =   $('#table-op-cliente');
                break;

                case 5:
                    _table  =   $('#table-op-servtecnico');
                break;

                case 3:
                  _table    =   $('#table-op-entregado2');
                break;
            }
            var color_tr=""; 
            for (var i = 0; i<resp.length;i++) 
            { 
                switch(resp[i].estadodesc_epdetalle)
                {
                     case '0':                    
                       color_tr='style="color:red;"';
                    break;

                    case '1':
                        color_tr=""
                    break;
                }          
                _table.children('tbody').append(
                '<tr '+color_tr+'><td>'+(i+1)+'</td><td>'+resp[i].fecha+'</td>'
                +'<td>'+resp[i].hora+'</td>'                
                +'<td>'+resp[i].descripccion_epdetalle+'</td></tr>'   
                );
            }            
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
        }
    });
}
/******************************************************************************************************************************************************************************/
function fnc_cambiar_estado2() {
              
  $('#modal-aceptar').modal('show');
 
  $('#chck-estado-detalle').bootstrapSwitch('state', true);
  $visible.hide();
  $visible_in.hide();
  $visible_in2.hide();
  $visible_in3.hide();
  $visible_foto.hide();
  
  $txt_observacion_estado.val('');
  var id_epostventa = parseInt($(this).attr('data-id'));
  var id_estado = parseInt($(this).attr('data-idestado'));
  var btn_agregar = $(this).attr('data-agregar');
  $('#btn-aceptar2').attr({'data-id':id_epostventa,'data-idestado':id_estado});
   switch(id_estado)
    {

        case 5:
            $divestado.html('SERVICIO TÉCNICO');
            // $txt_observacion_estado.val('Material en trayecto al cliente.');
            $visible_in.show();
            $visible_in3.show();
        break;

        case 3:
            $divestado.html('ENTREGADO');
            $visible_foto.show();
            $visible_in2.show();
            $('#file-fotoguia-epostventa').fileinput('clear');
        break;
    }
    // if(btn_agregar.length)
    // {
    //     if ($txt_observacion_estado.val('Material en trayecto al cliente.') || $txt_observacion_estado.val('Material entregado al cliente.'))
    //     {
    //         $txt_observacion_estado.val('');
    //     } 
    // }
}
/******************************************************************************************************************************************************************************/
function fnc_aceptar_estado2() {
    var data                    =   {};
    data.id_epostventa          =   parseInt($(this).attr('data-id'));
    data.id_estado              =   parseInt($(this).attr('data-idestado'));

    var inputFileImage          =   $('#file-fotoguia-epostventa')[0];
    var file                    =   inputFileImage.files[0];

    if(data.id_estado == 3) {
        data.descripccion_epdetalle = "Producto entregado al cliente";
    }
    else if(data.id_estado == 5) {
         data.descripccion_epdetalle = $txt_observacion_estado.val();
    }

    if(file) {
        var data_image      = new FormData();
        data_image.append('guia_epostventa',file);        
        data.estadodesc_epdetalle   = true;

        $.ajax({
            url: "uploadImageEPostVenta",
            type:'POST',
            contentType:false,
            data: data_image,
            processData:false,
            cache:false,
            beforeSend: function() {},
            success: function(resp) {
                data.pathfile_epostventa = resp;
                $.ajax({
                    type: "POST",
                    url: "insertEnvioPostVentaDetalle",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    beforeSend: function() {},
                    success: function(resp) {
                        showSuccess('Se cambió al estado "'+$divestado.text()+'"');
                        $('#modal-aceptar').modal('hide');
                        switch(data.id_estado)
                        {
                            case 5:
                            $('#click-servtecnico').trigger('click');
                            break;

                            case 3:
                            $('#click-entregado2').trigger('click');
                            break;
                        }             
                        getEnvioPostVentaById(data.id_epostventa);
                    }
                });
            }
        });
    }
    else {
        var estado = $chck_estado_detalle.is(':checked') == true ? 1 : 0;       
        data.estadodesc_epdetalle   = estado;
        data.pathfile_epostventa    = '';
        $.ajax({
            type: "POST",
            url: "insertEnvioPostVentaDetalle",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function() {},
            success: function(resp) {
                showSuccess('Se cambió al estado "'+$divestado.text()+'"');
                $('#modal-aceptar').modal('hide');
                switch(data.id_estado)
                {
                    case 5:
                    $('#click-servtecnico').trigger('click');
                    break;

                    case 3:
                    $('#click-entregado2').trigger('click');
                    break;
                }             
                getEnvioPostVentaById(data.id_epostventa);
            }
        });
    }    
}
/******************************************************************************************************************************************************************************/
function deleteEPostVenta() {
    var data = {};
    data.id_epostventa = parseInt($(this).attr('data-id'));
    $('#myModalLabel').text('¿Desea eliminar este registro?');

    $('#modal-confirmacion').modal({
        backdrop: 'static',
        keyboard: false
    })
    .one('click', '#modal-btn-aceptar2', function(e) {        
        $.ajax({
            type: "POST",
            url: "deleteEPostVenta",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function() {},
            success: function(resp) {
                showSuccess('Se eliminó exitosamente');
                $('#modal-confirmacion').modal('hide');
                $('#btn-recuperar-almacen2').trigger('click');
            }
        });
    });
}
/******************************************************************************************************************************************************************************/
function fnc_consultar_envio_SE2()
{
    var _div_button;
    var data={};
    // data.id_epostventa  = 56;
    data.txt_codenvio   = $('#txt-codenvio2').val();
    
    // if($('#txt-codenvio2').val() != '') {
      $.ajax({
        type: "POST",
        url: "getEnvioPostVentaByCodigo",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {           
           $table_envio_estado.children('tbody').empty();       
           $('.div-btnagregar-ob').empty();
        },
        success: function (resp) 
        { 
            var idestado=parseInt(resp[0].id_estado);
            var nombre_estado;

            $('.li-op').children('a').attr('data-idepostventa',resp[0].id_epostventa);                 

            // $div_opcion_envio.html(
            // '<button type="button" class="btn  btn-tr btn-cambiar-estado-epostventa" data-id="'+resp[0].id_epostventa+'" data-idestado="5" data-toggle="tooltip" data-animate=" animated bounce" title="Servicio Técnico"><i class="fa fa-cogs"></i></button>'
            // +'<button type="button" class="btn  btn-en btn-cambiar-estado-epostventa" data-id="'+resp[0].id_epostventa+'" data-idestado="3" data-toggle="tooltip" data-animate=" animated bounce" title="Entregado"><i class="fa fa-archive"></i></button>');
              
            $('.btn-cambiar-estado-epostventa').addClass('btn-primary');
            switch(idestado)
            {
                case 4: 
                    nombre_estado="Cliente"; 
                    $('#click-cliente').trigger('click');
                    _div_button=$op_almacen;
                    $('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                    img=' <img src="assets/images/Seguimiento/En_almacen.png" alt="" style="width: 40%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                break;

                case 5:
                    nombre_estado="Servicio Técnico";
                    $('#click-servtecnico').trigger('click');
                    _div_button=$op_trayecto;
                    $('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled', true);
                    $('.btn-tr').addClass('btn-secondary').removeClass('btn-primary').attr('disabled', true);
                    img=' <img src="assets/images/Seguimiento/En_trayecto.png" alt="" style="width: 40%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                break;

                case 3:
                    nombre_estado="Entregado";
                    $('#click-entregado2').trigger('click');
                    _div_button=$op_entregado;
                     $('.btn-cambiar-estado-epostventa').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                     img=' <img src="assets/images/Seguimiento/Entregado.png" alt="" style="width: 40%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                break;
            }
            _div_button.children('.div-btnagregar-ob').html('<button class="btn btn-primary btn-corner btn-agregar-ob2" data-agregar="true" data-idestado="'+idestado+'"  data-id="'+resp[0].id_epostventa+'" type="button">'
            +'<i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar'
            +'</button>');   
            
            $table_envio_estado.children('tbody').append(
            '<tr><td>'+resp[0].codigo_epostventa+'</td>'
            +'<td>'+nombre_estado+'</td>'
            +'<td><a href="javascript:void(0);" id="link-img-epostventa">VER GUIA DE REMISIÓN</a></td>'
            +'</tr>'
            );  
            $img_foto_guia .html('<img class="img-rounded img-responsive img-size" src="'+resp[0].pathfile_epostventa+'">');                
            $img_porcent.html(img);
            $img_foto_crono .html('<img class="img-crono" src="assets/images/Seguimiento/crono.jpg">');
        },
        complete: function () 
        { 
            $sct_ver_envio.show();
            $sct_tabla_almacen.hide();
            fnc_tooltip ();
        },
        error: function(resp)
        {
        }
    });     
    // }
}
/******************************************************************************************************************************************************************************/