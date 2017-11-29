$(document).ready(H_EnvioPostVenta);
/******************************************************************************************************************************************************************************/
//Variables globales
var $datatable_almacen2         =   $('#datatable-almacen2').DataTable({"bSort" : false});
var $txt_rango_fecha_almacen2   =   $('#txt-rango-fecha-almacen2');
/******************************************************************************************************************************************************************************/
//Inicializar Helper H_EnvioPostVenta
function H_EnvioPostVenta()
{ 

    $('#btn-recuperar-almacen2').on('click', getEnvioPostVenta);
    $(document).on('click','.btn-ver-envio-postventa', getEnvioPostVentaById);

    // Select all checkbox of table epostventa
    $('#checkbox-all-epostventa').on('click', function(){     
        var rows = $datatable_almacen2.rows({ 'search': 'applied' }).nodes();    
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    });

    // insert detalle (servicio técnico)
    $('#btn-insert-servtecnico-epostventad').on('click', function (e) {
        //TODO: Mostrar modal de confirmación    
         $('#modal-confirmacion').modal({
                backdrop: 'static',
                keyboard: false
            })
            .one('click', '#modal-btn-aceptar2', function(e) {   
        e.preventDefault();
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
function getEnvioPostVentaById() {
   var _div_button;
    var data={};
    data.id_epostventa  = parseInt($(this).attr('data-id'));

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
                // case 1:                                        
                //     nombre_estado="Por recoger";
                //     $click_recoger.trigger('click');
                //     _div_button=$op_recoger;                   
                // break;

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
                    $('#click-entregado').trigger('click');
                    _div_button=$op_entregado;
                    $('.btn-cambiar-estado').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;
            }
            _div_button.children('.div-btnagregar-ob').html('<button class="btn btn-primary btn-corner btn-agregar-ob2" data-agregar="true" data-idestado="'+idestado+'"  data-id="'+resp[0].id_epostventa+'" type="button">'
            +'<i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar'
            +'</button>');   
            
            $table_envio_estado.children('tbody').append(
            '<tr><td>'+resp[0].codigo_epostventa+'</td>'
            +'<td>'+nombre_estado+'</td></tr>'
            // +'<td>'+resp[0].numguiac_lote+'</td>'
            );  
            //$img_foto_guia .html('<img class="img-rounded img-responsive img-size" src="'+resp[0].fotoguiac_lote+'">');                
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
function getEnvioPostVentaById2(id_epostventa) {
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
                // case 1:                                        
                //     nombre_estado="Por recoger";
                //     $click_recoger.trigger('click');
                //     _div_button=$op_recoger;                   
                // break;

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
                    $('#click-entregado').trigger('click');
                    _div_button=$op_entregado;
                     $('.btn-cambiar-estado-epostventa').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;
            }
            _div_button.children('.div-btnagregar-ob').html('<button class="btn btn-primary btn-corner btn-agregar-ob2" data-agregar="true" data-idestado="'+idestado+'"  data-id="'+resp[0].id_epostventa+'" type="button">'
            +'<i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar'
            +'</button>');   
            
            $table_envio_estado.children('tbody').append(
            '<tr><td>'+resp[0].codigo_epostventa+'</td>'
            +'<td>'+nombre_estado+'</td></tr>'
            // +'<td>'+resp[0].numguiac_lote+'</td>'
            );  
            //$img_foto_guia .html('<img class="img-rounded img-responsive img-size" src="'+resp[0].fotoguiac_lote+'">');                
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
function getStatusByIdePostVenta()
{
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
                // case 1:
                //     _table=$table_op_recoger;                    
                // break;

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
                console.log(resp[i].fecha);
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
function fnc_cambiar_estado2 () 
{
              
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
function fnc_aceptar_estado2()
{
    // var obser;
    // if($(".visible-in2").attr("sele") == 1){
    //     obser = $('input:radio[name=entregado]:checked').val();
    // }else{
    //     obser = $txt_observacion_estado.val();
    // }
    
    var estado;
    if($chck_estado_detalle.is(':checked'))
    {estado=1}
    else
    {estado=0}
    var data={};    

    data.id_epostventa  = parseInt($(this).attr('data-id'));
    data.id_estado      = parseInt($(this).attr('data-idestado'));
    data.descripccion_epdetalle    = $txt_observacion_estado.val();;      
    data.estadodesc_epdetalle = estado;

    $.ajax({
        type: "POST",
        url: "insertEnvioPostVentaDetalle",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {             
        },
        success: function (resp) 
        {
             showSuccess('Se cambió al estado "'+$divestado.text()+'"');
             $('#modal-aceptar').modal('hide');
            switch(data.id_estado)
            {
                // case 1:
                //     _table=$table_op_recoger;                    
                // break;
                case 5:
                    $('#click-servtecnico').trigger('click');
                break;

                case 3:
                  $('#click-entregado2').trigger('click');
                break;
            }             
            getEnvioPostVentaById2(data.id_epostventa);
        }
    });
    
    // var inputFileImage  =   $file_fotoguia_lote[0];
    // var file            =   inputFileImage.files[0];
    // var data_image      = new FormData();
    // data_image.append('imagen',file)

    // $.ajax({
    //     url: "subir_imagen",
    //     type:'POST',
    //     contentType:false,
    //     data: data_image,
    //     processData:false,
    //     cache:false,
    //     beforeSend: function()
    //     {
    //     },
    //     success: function(resp)
    //     {

    //         data.file_fotoguia_lote     = resp;

    //         $.ajax({
    //             type: "POST",
    //             url: "cambiar_estado_envio",
    //             data: JSON.stringify(data),
    //             contentType: "application/json; charset=utf-8",
    //             dataType: "json",
    //             async: false,
    //             beforeSend: function () 
    //             {
    //             },
    //             success: function (resp) 
    //             {
    //                 $('#modal-aceptar').modal('hide');
    //                 fnc_ver_envio_refresh(id_lote);
    //             },
    //             complete: function () 
    //             {
    //                 $(".visible-in2").attr("sele",0);
    //                 $('input:radio[name=entregado]').attr('checked',false);
    //             },
    //             error: function(resp)
    //             {
    //             }
    //         });
    //     }
    // });
}
/******************************************************************************************************************************************************************************/