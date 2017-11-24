$(document).ready(H_EnvioPostVenta);
/******************************************************************************************************************************************************************************/
//Variables globales
var $datatable_almacen2      =   $('#datatable-almacen2').DataTable({"bSort" : false});
var $txt_rango_fecha_almacen2=   $('#txt-rango-fecha-almacen2');
/******************************************************************************************************************************************************************************/
//Inicializar Helper H_EnvioPostVenta
function H_EnvioPostVenta()
{ 

    $('#btn-recuperar-almacen2').on('click', getEnvioPostVenta);
    $(document).on('click','.btn-ver-envio-postventa', getEnvioPostVentaById);
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
            // var checkbox="";
            for (var i = 0; i<resp.length;i++) 
            {
                // if(resp[i].estado_envio==1)
                // {
                //     checkbox='<input type="checkbox" name="id[]" value="'+resp[i].id_envio+'"/>'
                // }
                // else
                // {
                //     checkbox="";
                // }
                $datatable_almacen2.row.add([
                i+1,
                resp[i].fechac_epostventa,
                resp[i].codigo_epostventa,
                // resp[i].nombre_usuario,
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

            $('.li-op').children('a').attr('data-id',resp[0].id_epostventa);                 

            $div_opcion_envio.html(
            '<button type="button" class="btn  btn-tr btn-cambiar-estado-epostventa" data-id="'+resp[0].id_epostventa+'" data-idestado="5" data-toggle="tooltip" data-animate=" animated bounce" title="Servicio Técnico"><i class="fa fa-truck"></i></button>'
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
                    $click_almacen.trigger('click');
                    _div_button=$op_almacen;
                    //$('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;

                case 5:
                    nombre_estado="Servicio Técnico";
                    $click_trayecto.trigger('click');               
                    _div_button=$op_trayecto;
                    //$('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                    $('.btn-tr').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;

                case 3:
                    nombre_estado="Entregado";
                    $click_entregado.trigger('click');
                    _div_button=$op_entregado;
                    $('.btn-cambiar-estado').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;
            }
            _div_button.children('.div-btnagregar-ob').html('<button class="btn btn-primary btn-corner btn-agregar-ob" data-agregar="true" data-idestado="'+idestado+'"  data-id="'+resp[0].id_epostventa+'" type="button">'
            +'<i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar'
            +'</button>');   
            
            $table_envio_estado.children('tbody').append(
            '<tr><td>'+resp[0].codigo_epostventa+'</td>'
            // +'<td>'+resp[0].numguiac_lote+'</td>'
            +'<td>'+nombre_estado+'</td></tr>'
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
