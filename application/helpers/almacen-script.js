$(document).ready(init_almacen);
/******************************************************************************************************************************************************************************/
var $datatable_almacen      =   $('#datatable-almacen').DataTable({"bSort" : false});
var $datatable_envio        =   $('#datatable-envio').DataTable({"bSort" : false} );

var $form_lote              =   $('#form-lote');
var $form_editar_lote       =   $('#form-editar-lote');
var $form_destinatario      =   $('#form-destinatario');

var $cbo_cliente            =   $('#cbo-cliente');
var $cbo_departamento       =   $('.cbo-departamento');
var $cbo_provincia          =   $('.cbo-provincia');
var $cbo_distrito           =   $('.cbo-distrito');

var $txt_nombre_destino     =   $('#txt-nombre-destinatario');
var $txt_direccion_destino  =   $('#txt-direccion-destinatario');
var $txt_direcciond_destino =   $('#txt-direcciond-destinatario');
var $txt_id_destinatario    =   $('#txt-id-destinatario');
var $txt_id_cliente         =   $('#txt-id-remitente');

var $list_destinatarios     =   $('.list-destinatarios');
var $list_clientes          =   $('.list-clientes'); 

var $txt_guiac_lote         =   $('#txt-guiac-lote'); 
var $file_fotoguia_lote     =   $('#file-fotoguia-lote');
var $txt_cantidad_lote      =   $('#txt-cantidad-lote');
var $txt_observacion_lote   =   $('#txt-observacion-lote');

var $txt_fecha_lote         =   $('#txt-fecha-lote');
var $txt_hora_lote          =   $('#txt-hora-lote');

var $btn_sct_lote           =   $('#btn-sct-lote');
var $btn_sct_volver         =   $('.btn-sct-volver');

var $modal_lote             =   $('#modal-lote');
var $btn_modal_destina      =   $('#btn-modal-destinatario');
var $modal_destinatario     =   $('#modal-destinatario');

var $modal_envio            =   $('#modal-envio');
var $table_envio_fechas     =   $('#table-envio-fechas');
var $table_envio_estado     =   $('#table-envio-estado');
var $div_opcion_envio       =   $('#div-opcion-envio');

var $btn_aceptar            =   $('#btn-aceptar');

var $sct_tabla_almacen      =   $('#sct-tabla-almacen');
var $sct_almacen            =   $('#sct-almacen');
var $sct_ver_envio          =   $('#sct-ver-envio');
//var $sct_editar_envio       =   $('#sct-editar-almacen');

var $btn_recuperar_almacen  =   $('#btn-recuperar-almacen');
var $txt_rango_fecha_almacen=   $('#txt-rango-fecha-almacen');

var $table_op_recoger       =   $('#table-op-recoger');
var $table_op_almacen       =   $('#table-op-almacen');
var $table_op_trayecto      =   $('#table-op-trayecto');
var $table_op_entregado     =   $('#table-op-entregado');

var $op_recoger             =   $('#op-recoger');
var $op_almacen             =   $('#op-almacen');
var $op_trayecto            =   $('#op-trayecto');
var $op_entregado           =   $('#op-entregado');

var $li_recoger             =   $('.op-recoger');
var $li_almacen             =   $('.op-almacen');
var $li_trayecto            =   $('.op-trayecto');
var $li_entregado           =   $('.op-entregado');

var $divestado              =   $('#divestado');
var $txt_observacion_estado =   $('#txt-observacion-estado');

var $click_recoger          =   $('#click-recoger');
var $click_almacen          =   $('#click-almacen');
var $click_trayecto         =   $('#click-trayecto');
var $click_entregado        =   $('#click-entregado');

var $link_foto_guia         =   $('#link-foto-guia');
var $modal_foto_guia        =   $('#modal-foto-guia');
var $img_foto_guia          =   $('#img-foto-guia');

var $title_almacen          =   $('.title-almacen');
var $btn_editar_lote        =   $('#btn-editar-lote');
var $btn_registrar_lote     =   $('#btn-registrar-lote');

var $chck_estado_detalle    =   $('#chck-estado-detalle');
var $visible                =   $('.visible-ob');
var $visible_in             =   $('.visible-in');
var $visible_in2            =   $('.visible-in2');
var $visible_in3            =   $('.visible-in3');
var $visible_foto           =   $('.visible-foto');
/******************************************************************************************************************************************************************************/
$("input[name='entregado']").change(function(){
  if($(".visible-in2 input[name='entregado']:radio").is(':checked')){
        $(".visible-in2").attr("sele",1)
    }
}) 
function init_almacen ()
{ 
   $('#example-select-all').on('click', function(){     
      var rows = $datatable_almacen.rows({ 'search': 'applied' }).nodes();    
      $('input[type="checkbox"]', rows).prop('checked', this.checked);
   });

   $('#datatable-almacen tbody').on('change', 'input[type="checkbox"]', function(){
      if(!this.checked){
         var el = $('#example-select-all').get(0);
         if(el && el.checked && ('indeterminate' in el)){
            el.indeterminate = true;
         }
      }
   });

$('#btn-enviar-almacen').on('click', function () {
  
    var array=[];
    var data={};
    $datatable_almacen.$('input[type="checkbox"]').each(function(){
        if(this.checked){
        array.push($(this).val());      
        }
    });
    if(array.length){
     data.all_idenvio=array;
    
        $.ajax({
            type: "POST",
            url: "cambiar_estado_envio2",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () 
            {
            },
            success: function (resp) 
            {
                //fnc_recuperar_lote();
            },
            complete: function () 
            {    
               showSuccess('Se cambió al estado "En Trayecto"');
               fnc_recuperar_lote();
            },
            error: function(resp)
            {
            }
        }); 
    }
    else{alert('Selecciona ...');} 
});

    $sct_almacen.hide();
    $sct_ver_envio.hide();
   
    $btn_sct_lote.on('click',fnc_sct_lote);
    $btn_sct_volver.on('click',fnc_sct_volver);

    $btn_modal_destina.on('click',fnc_modal_destinatario);

    $(document).on('click','.tt-suggestion ',fnc_blur_list);
    $list_destinatarios.on('blur',fnc_blur_destinatario).on('keypress',fnc_keyup_destinatario);
    $list_clientes.on('blur',fnc_blur_cliente).on('keypress',fnc_keyup_cliente);

    $cbo_departamento.on('change',fnc_list_provincia);
    $cbo_provincia.on('change',fnc_list_distrito);
    
    $form_destinatario.on('submit',fnc_registrar_destinatario);    
    $form_lote.on('submit',fnc_registrar_lote);
    $btn_recuperar_almacen.on('click',fnc_recuperar_lote);
    $(document).on('click','.btn-ver-envio',fnc_ver_envio);
    $(document).on('click','.btn-editar-envio',fnc_ver_editar_lote);
    $(document).on('click','.btn-eliminar-envio', fnc_eliminar_lote);
    $(document).on('click','.btn-cambiar-estado',fnc_cambiar_estado);
    $btn_aceptar.on('click',fnc_aceptar_estado);

    $click_recoger.on('click',fnc_click_estado);
    $click_almacen.on('click',fnc_click_estado);
    $click_trayecto.on('click',fnc_click_estado);
    $click_entregado.on('click',fnc_click_estado);
    $(document).on('click','.btn-agregar-ob',fnc_cambiar_estado);
   
    $link_foto_guia.on('click',fnc_modal_imagenguia);

    $btn_editar_lote.on('click',fnc_editar_lote);
    $chck_estado_detalle.bootstrapSwitch({onText:'NO',offText:'SI'});


}
/******************************************************************************************************************************************************************************/
function fnc_blur_list() 
{
    if ($list_destinatarios.is(':focus'))
    {
        $list_destinatarios.blur();
    }
    else if($list_clientes.is(':focus'))
    {
        $list_clientes.blur();
    }   
}
/******************************************************************************************************************************************************************************/
function fnc_sct_lote () 
{
    $sct_tabla_almacen.hide();
    $sct_almacen.show();
    fnc_limpiar_campos();
    fnc_text_fechaActual();
    fnc_text_horaActual();
    $title_almacen.html('REGISTRAR LOTE');
    $btn_editar_lote.hide();
    $btn_registrar_lote.show();
    fnc_text_fechaRangoActual();

    $file_foto_perfil.fileinput('destroy');
    $file_foto_perfil.fileinput({ 
    overwriteInitial: true,
    maxFileSize: 1500,
    showClose: false,
    showCaption: false,
    browseLabel: '',
    removeLabel: '',
    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    elErrorContainer: '#kv-avatar-errors-1',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="assets/images/silueta.png" alt="Your Avatar" style="width:160px">',
    layoutTemplates: {main2: '{preview}  {remove} {browse}'},
    allowedFileExtensions: ["jpg", "png", "gif"]
    });
}
/******************************************************************************************************************************************************************************/
function fnc_sct_volver()
{
    $sct_tabla_almacen.show();
    $sct_almacen.hide();
    $sct_ver_envio.hide();    
}
/******************************************************************************************************************************************************************************/
function fnc_keyup_destinatario ()
{
    var nom_destinatarios=[];    
    var data={};
    data.txt_nombre_destinatario  =$(this).val();

    $.ajax({
        type: "POST",
        url: "listar_destinatarios",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {          
            $txt_direcciond_destino.val('');
            $txt_id_destinatario.val('');
        },
        success: function (resp) 
        {
            if(resp.length)
            {
                for (var i =0;i<resp.length; i++)
                {
                 nom_destinatarios.push(resp[i].nombre_destinatario);                
                }
                 
            }
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
            $txt_direcciond_destino.val('');  
        }
    });
    fcn_typeahead($list_destinatarios,nom_destinatarios);
    $list_destinatarios.focus();
   
}
/******************************************************************************************************************************************************************************/
function fnc_blur_destinatario ()
{
    var data={};
    data.txt_nombre_destinatario  = $(this).val();
    $.ajax({
        type: "POST",
        url: "listar_destinatario_n",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {          
            $txt_direcciond_destino.val('');
            $txt_id_destinatario.val('');
        },
        success: function (resp) 
        {
            /*if(data.txt_nombre_destinatario!='')
            {  
                if(resp.id_destinatario)
                {*/
                   $txt_direcciond_destino.val(resp.direccion_destinatario+', '+resp.ubicacion_destinatario).attr('readonly',true);;
                   $txt_id_destinatario.val(resp.id_destinatario);  
              /*  }    
            }  */       
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
            $txt_direcciond_destino.val('');  
            $txt_id_destinatario.val('');            
        }
    });    
}
/******************************************************************************************************************************************************************************/
function fnc_keyup_cliente()
{
    var nom_clientes=[];    
    var data={};
    data.txt_nombre_remitente  =$(this).val();

    $.ajax({
        type: "POST",
        url: "listar_clientes",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {          
            $txt_id_cliente.val('');
        },
        success: function (resp) 
        {
            if(resp.length)
            {
                for (var i =0;i<resp.length; i++)
                {
                 nom_clientes.push(resp[i].nombre_cliente);                
                } 
            }           
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
            $txt_id_cliente.val('');  
        }
    }); 
    fcn_typeahead($list_clientes,nom_clientes);
    $list_clientes.focus();
}
/******************************************************************************************************************************************************************************/
function fnc_blur_cliente ()
{
    var data={};
    data.txt_nombre_remitente  =$(this).val();

    $.ajax({
        type: "POST",
        url: "listar_cliente_n",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {          
            $txt_id_cliente.val('');
        },
        success: function (resp) 
        {
            if(data.txt_nombre_remitente!='')
            {
                if(resp.id_cliente)
                {
                    $txt_id_cliente.val(resp.id_cliente);
                }
            }           
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
            $txt_id_cliente.val('');  
        }
    });    
}
/******************************************************************************************************************************************************************************/
function fnc_modal_destinatario ()
{
    $modal_destinatario.modal('show');    
    $title_destinatario.text('REGISTRAR DESTINATARIO');
    $btn_editar_destinatario.hide();
    $btn_registrar_destinatario.show();
    fnc_limpiar_campos();
    
    fnc_list_departamento();    
    fnc_select2 ($cbo_departamento,'Seleccione...');
    fnc_select2 ($cbo_provincia,'Seleccione...');
    fnc_select2 ($cbo_distrito,'Seleccione...');
    setTimeout(function(){$txt_nombre_destino.focus();},500);
}
/******************************************************************************************************************************************************************************/
function fnc_registrar_destinatario ()
{
    var data={};    
    data.id_distrito             = parseInt($cbo_distrito.val());
    data.txt_nombre_destino      = $txt_nombre_destino.val();
    data.txt_direccion_destino   = $txt_direccion_destino.val();

    $.ajax({
        type: "POST",
        url: "registrar_destino ",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp) 
        {
            $modal_destinatario.modal('hide');
            showSuccess('Se registró correctamente');
            fnc_listar_destinatario();
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
function fnc_eliminar_lote ()
{
    var r = confirm("¿Desea eliminar la siguiente entrega?");
            if (r == true) {
    var data={}; 
    //data.txt_placa            = $txt_placa.val();
    data.id_lote  = parseInt($(this).attr('data-idlote'));

    $.ajax({
        type: "POST",
        url: "eliminar_lote",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {  
           fnc_recuperar_lote();

        },
        complete: function () 
        {    
            
        },
        error: function(resp)
        {
        }
    });
         showSuccess('Se eliminó correctamente');
         }
}
/******************************************************************************************************************************************************************************/
function fnc_recuperar_lote()
{
    var data={};    
    var txt_fecha_inicio   = $txt_rango_fecha_almacen.data('daterangepicker').startDate.format('DD/MM/YYYY'); 
    var txt_fecha_fin      = $txt_rango_fecha_almacen.data('daterangepicker').endDate.format('DD/MM/YYYY');  

    data.txt_fecha_inicio  = stringToDate(txt_fecha_inicio,'dd/mm/yyyy','/');
    data.txt_fecha_fin     = stringToDate(txt_fecha_fin,'dd/mm/yyyy','/');

    $.ajax({
        type: "POST",
        url: "listar_lote",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        { 
            $datatable_almacen.row().clear().draw( false );
        },
        success: function (resp) 
        {
            var checkbox="";
            for (var i = 0; i<resp.length;i++) 
            {
                if(resp[i].estado_envio==1)
                {
                    checkbox='<input type="checkbox" name="id[]" value="'+resp[i].id_envio+'"/>'
                }
                else
                {
                    checkbox="";
                }
                $datatable_almacen.row.add([
                checkbox,
                i+1,
                resp[i].fechac_lote,
                resp[i].cod_envio,
                resp[i].nombre_cliente,
                resp[i].numguiac_lote,
                resp[i].cantidad_lote,
                resp[i].nombre_destinatario,
                resp[i].ubicacion_destinatario,
                resp[i].observacion_lote,
                '<button type="button"  data-idlote="'+resp[i].id_lote+'" class="btn btn-primary btn-ver-envio" rel="tooltip" data-animate="animated bounce" data-toggle="tooltip" data-original-title="Ver" data-placement="top"><i class="glyphicon glyphicon-eye-open"></i></button>'
                +'<button type="button" data-idlote="'+resp[i].id_lote+'" class="btn btn-primary btn-editar-envio" rel="tooltip" data-animate="animated bounce" data-toggle="tooltip" data-original-title="Editar" data-placement="top"><i class="fa fa-edit"></i></button>'
                +'<button type="button" data-idlote="'+resp[i].id_lote+'" class="btn btn-danger btn-eliminar-envio" rel="tooltip" data-animate="animated bounce" data-toggle="tooltip" data-original-title="Eliminar" data-placement="top">'
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
function fnc_registrar_lote ()
{ 
    var inputFileImage          =   $file_fotoguia_lote[0];
    var file                    =   inputFileImage.files[0];
    var data_image              = new FormData();
    data_image.append('imagen',file)

    $.ajax({
        url: "subir_imagen",
        type:'POST',
        contentType:false,
        data: data_image,
        processData:false,
        cache:false,
        beforeSend: function()
        {
        },
        success: function(resp)
        {
            var data={};
            data.id_cliente            = parseInt($txt_id_cliente.val());
            data.id_destinatario       = parseInt($txt_id_destinatario.val());
            data.txt_fecha_lote        = stringToDate($txt_fecha_lote.val(),'dd/mm/yyyy','/');            
            data.txt_hora_lote         = $txt_hora_lote.val();
            data.txt_guiac_lote        = $txt_guiac_lote.val();
            data.file_fotoguia_lote    = resp;
            data.txt_cantidad_lote     = $txt_cantidad_lote.val();
            data.txt_observacion_lote  = $txt_observacion_lote.val();

            $.ajax({
                type: "POST",
                url: "registrar_lote",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                beforeSend: function () 
                {
                },
                success: function (resp) 
                {  
                    showSuccess('Se registró correctamente'); 
                    fnc_sct_volver();
                    fnc_recuperar_lote();  
                    fnc_text_fechaRangoActual();
                },
                complete: function () 
                {           
                },
                error: function(resp)
                {
                }
            });
        }
    });
}
/******************************************************************************************************************************************************************************//******************************************************************************************************************************************************************************//******************************************************************************************************************************************************************************/
function fnc_modal_imagenguia() 
{
    $modal_foto_guia.modal('show');
}
/******************************************************************************************************************************************************************************//******************************************************************************************************************************************************************************//******************************************************************************************************************************************************************************/
function fnc_ver_envio ()
{
    var _div_button;
    var data={};
    data.id_lote  = parseInt($(this).attr('data-idlote'));

    $.ajax({
        type: "POST",
        url: "obtener_envio_lote",
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

            $('.li-op').children('a').attr('data-idlote',resp[0].id_lote);                 

            $div_opcion_envio.html(
            '<button type="button" class="btn  btn-tr btn-cambiar-estado" data-idenvio="'+resp[0].id_envio+'" data-idlote="'+resp[0].id_lote+'" data-idestado="2" data-toggle="tooltip" data-animate=" animated bounce" title="En trayecto" data-idlote="" ><i class="fa fa-truck"></i></button>'
            +'<button type="button" class="btn  btn-en btn-cambiar-estado" data-idenvio="'+resp[0].id_envio+'" data-idlote="'+resp[0].id_lote+'" data-idestado="3" data-toggle="tooltip" data-animate=" animated bounce" title="Entregado"   data-idlote=""><i class="fa fa-archive"></i></button>');
              
            $('.btn-cambiar-estado').addClass('btn-primary');
            switch(idestado)
            {
                // case 1:                                        
                //     nombre_estado="Por recoger";
                //     $click_recoger.trigger('click');
                //     _div_button=$op_recoger;                   
                // break;

                case 1: 
                    nombre_estado="En almacén"; 
                    $click_almacen.trigger('click');
                    _div_button=$op_almacen;
                    //$('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;

                case 2:
                    nombre_estado="En trayecto";
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
            _div_button.children('.div-btnagregar-ob').html('<button class="btn btn-primary btn-corner btn-agregar-ob" data-agregar="true" data-idestado="'+idestado+'"  data-idlote="'+resp[0].id_lote+'"  data-idenvio="'+resp[0].id_envio+'"type="button" id="">'
            +'<i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar'
            +'</button>');   
            
            $table_envio_estado.children('tbody').append(
            '<tr><td>'+resp[0].cod_envio+'</td>'
            +'<td>'+resp[0].numguiac_lote+'</td>'
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
function fnc_ver_editar_lote()
{
    $sct_tabla_almacen.hide();
    $sct_almacen.show();
    $title_almacen.html('EDITAR LOTE');   
    $btn_registrar_lote.hide();
    var data={};
    data.id_lote  = parseInt($(this).attr('data-idlote'));

    $.ajax({
        type: "POST",
        url: "obtener_envio_lote",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
           $btn_editar_lote.show().attr('data-idlote',resp[0].id_lote); 
           $txt_fecha_lote.val(resp[0].fechac_lote);
           $txt_id_cliente.val(resp[0].id_cliente);
           $txt_id_destinatario.val(resp[0].id_destinatario); 
           $list_clientes.val(resp[0].nombre_cliente);
           $list_destinatarios.val(resp[0].nombre_destinatario);     
           //$txt_hora_lote.val(resp[0].fechac_lote);
           $txt_guiac_lote.val(resp[0].numguiac_lote);           
           $txt_cantidad_lote.val(resp[0].cantidad_lote);
           $txt_observacion_lote.val(resp[0].observacion_lote);
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
function fnc_editar_lote ()
{       
    var data={};
    data.id_lote               = parseInt($(this).attr('data-idlote'));
    data.id_cliente            = parseInt($txt_id_cliente.val());
    data.id_destinatario       = parseInt($txt_id_destinatario.val());
    data.txt_fecha_lote        = stringToDate($txt_fecha_lote.val(),'dd/mm/yyyy','/');        
    data.txt_guiac_lote        = $txt_guiac_lote.val();       
    data.txt_cantidad_lote     = $txt_cantidad_lote.val();
    data.txt_observacion_lote  = $txt_observacion_lote.val();

    var inputFileImage          =   $file_fotoguia_lote[0];
    var file                    =   inputFileImage.files[0];
    var data_image              = new FormData();
    data_image.append('imagen',file);

    $.ajax({
        url: "subir_imagen",
        type:'POST',
        contentType:false,
        data: data_image,
        processData:false,
        cache:false,
        beforeSend: function()
        {
        },
        success: function(resp)
        {
            data.file_fotoguia_lote   = resp;
            $.ajax({
                type: "POST",
                url: "editar_lote",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                beforeSend: function () 
                {
                },
                success: function (resp) 
                {  
                    showSuccess('Se editó correctamente'); 
                    fnc_sct_volver();
                    fnc_recuperar_lote();
                },
                complete: function () 
                {           
                },
                error: function(resp)
                {
                }
            });
        }
        });
}
/******************************************************************************************************************************************************************************/
function fnc_ver_envio_refresh (idlote)
{
    var data={};
    data.id_lote  = parseInt(idlote);
    $.ajax({
        type: "POST",
        url: "obtener_envio_lote",
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

            $('.li-op').children('a').attr('data-idlote',resp[0].id_lote);                 

            $div_opcion_envio.html(
                '<button type="button" class="btn  btn-tr btn-cambiar-estado" data-idenvio="'+resp[0].id_envio+'" data-idlote="'+resp[0].id_lote+'" data-idestado="2" data-toggle="tooltip" data-animate=" animated bounce" title="En trayecto" data-idlote="" ><i class="fa fa-truck"></i></button>'
                +'<button type="button" class="btn  btn-en btn-cambiar-estado" data-idenvio="'+resp[0].id_envio+'" data-idlote="'+resp[0].id_lote+'" data-idestado="3" data-toggle="tooltip" data-animate=" animated bounce" title="Entregado"   data-idlote=""><i class="fa fa-archive"></i></button>');

            $('.btn-cambiar-estado').addClass('btn-primary');
            switch(idestado)
            {
                // case 1:                                        
                // nombre_estado="Por recoger";
                // $click_recoger.trigger('click');
                // _div_button=$op_recoger;                   
                // break;

                case 1: 
                nombre_estado="En almacén"; 
                $click_almacen.trigger('click');
                _div_button=$op_almacen;
                //$('.btn-al').addClass('btn-secondary').removeClass('btn-primary').attr('disabled',true);
                break;

                case 2:
                nombre_estado="En trayecto";
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
             _div_button.children('.div-btnagregar-ob').html('<button class="btn btn-primary btn-corner btn-agregar-ob" data-agregar="true" data-idestado="'+idestado+'"  data-idlote="'+resp[0].id_lote+'"  data-idenvio="'+resp[0].id_envio+'"type="button" id="">'
            +'<i class="box_setting fa fa-plus"></i>&nbsp;&nbsp;Agregar'
            +'</button>');  
            $table_envio_estado.children('tbody').append(
                '<tr><td>'+resp[0].cod_envio+'</td>'
                +'<td>'+resp[0].numguiac_lote+'</td>'
                +'<td>'+nombre_estado+'</td></tr>'
                );                  
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
function fnc_click_estado()
{
    var _table;
    var data={};
    data.id_estado  = parseInt($(this).attr('data-idestado')); 
    data.id_lote    = parseInt($(this).attr('data-idlote')); 
    $.ajax({
        type: "POST",
        url: "listar_envio_estado",
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

                case 1:                    
                    _table=$table_op_almacen;
                break;

                case 2:
                    _table=$table_op_trayecto;
                break;

                case 3:
                  _table=$table_op_entregado;
                break;
            }
            var color_tr="";
            for (var i = 0; i<resp.length;i++) 
            {   
                switch(resp[i].estado_detalle)
                {
                     case '0':                    
                       color_tr='style="color:red;"';
                    break;

                    case '1':
                        color_tr=""
                    break;
                }          
                _table.children('tbody').append(
                '<tr '+color_tr+'><td>'+(i+1)+'</td><td>'+resp[i].fecha_detalle_estado+'</td>'
                +'<td>'+resp[i].hora_detalle_estado+'</td>'                
                +'<td>'+resp[i].observacion_detalle_estado+'</td></tr>'   
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
function fnc_cambiar_estado () 
{

  // if( $(".visible-in2 input[name='entregado']:radio").is(':checked')) {  
  //   alert("Bien!!!, la edad seleccionada es: " + $('input:radio[name=edad]:checked').val());
  //   $(".visible-in2").submit();  
  //   } else{  
  //       alert("Selecciona la edad por favor!!!");  
  //       } 
                      
  $('#modal-aceptar').modal('show');
  $visible.hide();
  $visible_in.hide();
  $visible_in2.hide();
  $visible_in3.hide();
  $visible_foto.hide();
  
  $txt_observacion_estado.val('');
  var id_envio = parseInt($(this).attr('data-idenvio'));
  var id_lote = parseInt($(this).attr('data-idlote'));
  var id_estado = parseInt($(this).attr('data-idestado'));
  var btn_agregar = $(this).attr('data-agregar');
  $('#btn-aceptar').attr({'data-idenvio':id_envio,'data-idestado':id_estado,'data-idlote':id_lote});
   switch(id_estado)
    {
        case 1:
            $divestado.html('EN ALMACÉN');
            $txt_observacion_estado.val('El camión ya está en almacén.');
            $visible_in.show();
        break;

        case 2:
            $divestado.html('EN TRAYECTO');
            $txt_observacion_estado.val('Material en trayecto al cliente.');
            $visible_in.show();
            $visible_in3.show();
        break;

        case 3:
            $divestado.html('ENTREGADO');
            $visible_foto.show();
            $visible_in2.show();
        break;
    }
    if(btn_agregar.length)
    {
        if ($txt_observacion_estado.val('Material en trayecto al cliente.') || $txt_observacion_estado.val('Material entregado al cliente.'))
        {
            $txt_observacion_estado.val('');
        } 
    }
}

/******************************************************************************************************************************************************************************/
function fnc_aceptar_estado()
{
    var obser;
    if($(".visible-in2").attr("sele") == 1){
        obser = $('input:radio[name=entregado]:checked').val();
    }else{
        obser = $txt_observacion_estado.val();
    }
    
    var estado;
    if($chck_estado_detalle.is(':checked'))
    {estado=1}
    else
    {estado=0}
    var data={};

    var id_lote                 = parseInt($(this).attr('data-idlote'));

    data.id_envio               = parseInt($(this).attr('data-idenvio'));
    data.id_estado              = parseInt($(this).attr('data-idestado'));
    data.observacion            = obser;      
    data.estado_detalle         = estado;

    var inputFileImage          =   $file_fotoguia_lote[0];
    var file                    =   inputFileImage.files[0];
    var data_image              = new FormData();
    data_image.append('imagen',file)

    $.ajax({
        url: "subir_imagen",
        type:'POST',
        contentType:false,
        data: data_image,
        processData:false,
        cache:false,
        beforeSend: function()
        {
        },
        success: function(resp)
        {

            data.file_fotoguia_lote     = resp;

            $.ajax({
                type: "POST",
                url: "cambiar_estado_envio",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                beforeSend: function () 
                {
                },
                success: function (resp) 
                {
                    $('#modal-aceptar').modal('hide');
                    fnc_ver_envio_refresh(id_lote);
                },
                complete: function () 
                {
                    $(".visible-in2").attr("sele",0);
                    $('input:radio[name=entregado]').attr('checked',false);
                },
                error: function(resp)
                {
                }
            });
        }
    });
}
/******************************************************************************************************************************************************************************/
/******************************************************************************************************************************************************************************/
/******************************************************************************************************************************************************************************/
/******************************************************************************************************************************************************************************/
/******************************************************************************************************************************************************************************/
/******************************************************************************************************************************************************************************/
function fnc_list_envio()
{
    $.getJSON("listar_envio", function (data){ 
    $datatable_envio.row().clear().draw( false );    
    for (var i = 0; i<data.length;i++) 
    {
        var idestado =   parseInt(data[i].id_estado);
        var button;
        switch(idestado)
        {
        case 1:
        button='<button type="button" data-toggle="tooltip" data-animate=" animated bounce" title="En trayecto" data-idlote="'+data[i].id_lote+'" data-idestado="2"class="btn btn-primary btn-trayecto btn-cambiar-estado"><i class="glyphicon glyphicon-share-alt"></i></button>'
        +'<button type="button" disabled="true" class="btn btn-entregado btn-cambiar-estado" data-animate=" animated bounce" data-toggle="tooltip" data-idlote="'+data[i].id_lote+'"  data-idestado="3" title="Entregado"><i class="fa fa-archive"></i></button></td></tr>'
        break;

        case 2:
         button='<button type="button"  disabled="true" data-toggle="tooltip" data-animate=" animated bounce" title="En trayecto" data-idlote="'+data[i].id_lote+'" data-idestado="2"class="btn btn-default btn-trayecto btn-cambiar-estado"><i class="glyphicon glyphicon-share-alt"></i></button>'
        +'<button type="button" class="btn btn-primary btn-entregado btn-cambiar-estado" data-animate=" animated bounce" data-toggle="tooltip" data-idlote="'+data[i].id_lote+'"  data-idestado="3" title="Entregado"><i class="fa fa-archive"></i></button></td></tr>'
        break;

        case 3:
         button='<button type="button" disabled="true" data-toggle="tooltip" data-animate=" animated bounce" title="En trayecto" data-idlote="'+data[i].id_lote+'" data-idestado="2"class="btn btn-default btn-trayecto btn-cambiar-estado"><i class="glyphicon glyphicon-share-alt"></i></button>'
        +'<button type="button" disabled="true"class="btn btn-default btn-entregado btn-cambiar-estado" data-animate=" animated bounce" data-toggle="tooltip" data-idlote="'+data[i].id_lote+'"  data-idestado="3" title="Entregado"><i class="fa fa-archive"></i></button></td></tr>'
        break;
        } 

        $datatable_envio.row.add([i+1,
        data[i].cod_envio,
        data[i].numguia_envio,
        data[i].estado,
        button
        ]).draw(false);

        
    }     
    });
}
/******************************************************************************************************************************************************************************/
function fnc_consultar_envio ()
{
    var data={};
    data.txt_codenvio   = $txt_codenvio.val();
  
    $.ajax({
        type: "POST",
        url: "consultar_envio",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            $table_seg_envio.children('tbody').empty();
            $img_porcent.empty();
        },
        success: function (resp) 
        { 
           var idestado =   parseInt(resp[0].id_estado);
            var img;
           switch(idestado)
            {
            case 1:
            img=' <img src="assets/images/en_almacen.png" alt="" style="max-width: 100%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
            break;

            case 2:
             img=' <img src="assets/images/trayecto.png" alt="" style="max-width: 100%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
            break;

            case 3:
            img=' <img src="assets/images/entregado.png" alt="" style="max-width: 100%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
            break;
            } 
            $table_seg_envio.children('tbody').append('<tr><td align="left"><strong>CÓDIGO DE ENVIO: </strong></td><td align="center">'+resp[0].cod_envio+'</td>'
            +'<tr><td align="left"><strong>Nº GUIA: </strong></td><td align="center">'+resp[0].numguia_envio+'</td>'
            +'<tr><td align="left"><strong>FECHA DE ALMACÉN: </strong></td><td align="center">'+resp[0].fechain_lote+'</td>'
            +'<tr><td align="left"><strong>FECHA DE SALIDA DEL ALMACÉN: </strong></td><td align="center">'+resp[0].fechasa_lote+'</td>'
            +'<tr><td align="left"><strong>FECHA DE ENTREGA: </strong></td><td align="center">'+resp[0].fechaen_lote+'</td>'
            +'<tr><td align="left"><strong>ESTADO: </strong></td><td align="center">'+resp[0].estado+'</td>');
            $img_porcent.html(img);
            $table_seg_envio.show();
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