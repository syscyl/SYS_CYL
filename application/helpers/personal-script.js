$(document).ready(init_personal);
/******************************************************************************************************************************************************************************/
var $datatable_personal      =   $('#datatable-personal').DataTable();

var $modal_personal          =   $('#modal-personal');
var $btn_modal_personal      =   $('#btn-modal-personal');

var $form_personal           =   $('#form-personal');
var $form_cargo              =   $('#form-cargo');

var $btn_sct_personal        =   $('#btn-sct-personal');
var $btn_sct_volver_personal =   $('#btn-sct-volver-personal');

var $modal_personal          =   $('#modal-lote');
var $btn_modal_cargo         =   $('#btn-modal-cargo');
var $modal_cargo             =   $('#modal-cargo');

var $txt_nombres             =   $('#txt-nombres');
var $txt_apellidos           =   $('#txt-apellidos');
var $txt_dni                 =   $('#txt-dni');
var $txt_telefono            =   $('#txt-telefono');
var $list_cargos             =   $('.list-cargos');
var $txt_id_cargo            =   $('#txt-id-cargo');
var $txt_direccion           =   $('#txt-direccion');
var $chck_estado_personal    =   $('#chck-estado-personal');

var $txt_nombre_cargo        =   $('#txt-nombre-cargo');
var $txt_observaciones       =   $('#txt-observaciones');


var $sct_tabla_personal      =   $('#sct-tabla-personal');
var $sct_personal            =   $('#sct-personal');
var $title_personal          =   $('.title-personal');

var $cbo_personal            =   $('.cbo-personal');
var $btn_editar_personal     =   $('#btn-editar-personal');
var $btn_registrar_personal  =   $('#btn-registrar-personal');
/******************************************************************************************************************************************************************************/
function init_personal ()
{
    fnc_listar_personal();
    $sct_personal.hide();
    $btn_sct_personal.on('click',fnc_sct_personal);
    $btn_sct_volver_personal.on('click',fnc_sct_volver_personal);

    $btn_modal_cargo.on('click',fnc_modal_cargo);
    //$(document).on('click','.tt-suggestion ',fnc_blur_list_cargo);
    //$list_cargos.on('blur',fnc_blur_cargo).on('keypress',fnc_keyup_cargo);

    $form_personal.on('submit',fnc_registrar_personal);
    $(document).on('click','.btn-ver-editar-personal',fnc_ver_editar_personal);
    $form_cargo.on('submit',fnc_registrar_cargo);
    $btn_editar_personal.on('click',fnc_editar_personal);

    fnc_list_departamento();
    fnc_select2 ($cbo_departamento,'Seleccione...');
    fnc_select2 ($cbo_provincia,'Seleccione...');
    fnc_select2 ($cbo_distrito,'Seleccione...');

    fnc_list_cargo();
    fnc_select2 ($cbo_cargo,'Seleccionar cargo...');

    $chck_estado_personal.bootstrapSwitch({onText:'Activo',offText:'Inactivo'});
}
/******************************************************************************************************************************************************************************/
function fnc_blur_list_cargo() 
{
    $list_cargos.blur();
}
/******************************************************************************************************************************************************************************/
function fnc_sct_personal () 
{
    $title_personal.text('REGISTRAR PERSONAL');
    $btn_editar_personal.hide();
    $sct_tabla_personal.hide();
    $btn_registrar_personal.show();
    $sct_personal.show();
    
    fnc_limpiar_campos();

    $cbo_departamento.select2("val","");
    $cbo_provincia.select2("val","");
    $cbo_distrito.select2("val","");
         
}
/******************************************************************************************************************************************************************************/
function fnc_sct_volver_personal()
{
    $sct_tabla_personal.show();
    $sct_personal.hide();
}
/******************************************************************************************************************************************************************************/
function fnc_registrar_personal ()
{
    var data={};    
    data.id_distrito         = parseInt($cbo_distrito.val());
    data.txt_nombres         = $txt_nombres.val();
    data.txt_apellidos       = $txt_apellidos.val();
    data.txt_dni             = $txt_dni.val();
    data.txt_telefono        = $txt_telefono.val();
    data.id_cargo            = parseInt($cbo_cargo.val());
    data.txt_direccion       = $txt_direccion.val();
     
    $.ajax({
        type: "POST",
        url: "registrar_personal",
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
            fnc_listar_personal();
            fnc_sct_volver_personal();     
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
function fnc_modal_cargo ()
{
    $modal_cargo.modal('show'); 
    $title_cargo.text('REGISTRAR CARGO');
    $btn_editar_cargo.hide();
    $btn_registrar_cargo.show();
    fnc_limpiar_campos();
    fnc_text_fechaActual();      
}
/******************************************************************************************************************************************************************************/
function fnc_registrar_cargo ()
{
    var data={}; 
    data.txt_nombre_cargo      = $txt_nombre_cargo.val();
    data.txt_observaciones     = $txt_observaciones.val();
    data.cbo_estado_cargo      = parseInt($cbo_estado_cargo.val());    
     
    $.ajax({
        type: "POST",
        url: "registrar_cargo",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp) 
        {  
            $modal_cargo.modal("hide");
            showSuccess('Se registró correctamente'); 
          
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
/*function fnc_keyup_cargo ()
{
    var nom_cargos=[];    
    var data={};
    data.txt_nombre_cargo  =$(this).val();

    $.ajax({
        type: "POST",
        url: "listar_cargo",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {          
            $txt_id_cargo.val('');
        },
        success: function (resp) 
        {
            if(resp.length)
            {
                for (var i =0;i<resp.length; i++)
                {
                 nom_cargos.push(resp[i].nombre_cargo);                
                }
            }
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
         
        }
    });
    fcn_typeahead($list_cargos,nom_cargos);
    $list_cargos.focus();
}*/
/******************************************************************************************************************************************************************************/
/*function fnc_blur_cargo ()
{
    var data={};
    data.txt_nombre_cargo  = $(this).val();
    $.ajax({
        type: "POST",
        url: "listar_cargo_nombre",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {          
            $txt_id_cargo.val('');
        },
        success: function (resp) 
        {
            if(data.txt_nombre_cargo!='')
            {  
                if(resp.id_cargo)
                {
                    $txt_id_cargo.val(resp.id_cargo);  
                }    
            }         
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
            $txt_direcciond_destino.val('');  
            $txt_id_cargo.val('');            
        }
    });    
}*/
/******************************************************************************************************************************************************************************/
function fnc_listar_personal()
{
    $.getJSON("listar_personal", function (data){ 

    $datatable_personal.row().clear().draw( false );    
    for (var i = 0; i<data.length;i++) 
    {
        $datatable_personal.row.add([i+1,
        data[i].nombre_completo,
        data[i].dni_personal,
        data[i].telefono_personal,
        data[i].direccion_personal,
        data[i].fechac_personal,
        data[i].estado_personal,       
       '<button type="button" data-idpersonal="'+data[i].id_personal+'" class="btn btn-primary btn-ver-editar-personal"><i class="fa fa-edit"></i></button>'
        ]).draw(false);
    }     
    });
}
/******************************************************************************************************************************************************************************/
function fnc_ver_editar_personal()
{
    var data={};
    data.id_personal  = parseInt($(this).attr('data-idpersonal'));

    $.ajax({
        type: "POST",
        url: "obtener_personal",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
 
        },
        success: function (resp) 
        {  
            if(resp.estado_personal==1)
           {$chck_estado_personal.bootstrapSwitch('state', true, true)}
           else
           {$chck_estado_personal.bootstrapSwitch('state', false, false)}

            $sct_tabla_personal.hide();
            $sct_personal.show();
            $title_personal.html('EDITAR PERSONAL');   
            $btn_registrar_personal.hide();
            $btn_editar_personal.show();

            
           $btn_editar_personal.attr('data-idpersonal',data.id_personal);

           $txt_nombres.val(resp.nombres_personal);           
           $txt_apellidos.val(resp.apellidos_personal);         
           $txt_dni.val(resp.dni_personal);
           $txt_telefono.val(resp.telefono_personal);
           $list_cargos.val(resp.nombre_cargo);
           $txt_id_cargo.val(resp.id_cargo);
           $txt_direccion.val(resp.direccion_personal);

           $cbo_departamento.val(resp.id_departamento).trigger("change");
           $cbo_provincia.val(resp.id_provincia).trigger("change");
           $cbo_distrito.val(resp.id_distrito).trigger("change");
           $cbo_cargo.val(resp.id_cargo).trigger("change");
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
function fnc_editar_personal ()
{
    var data={};
    var estado;
    if($chck_estado_personal.is(':checked'))
    {estado=1}
    else
    {estado=0}
    data.id_personal         = parseInt($(this).attr('data-idpersonal'));    
    data.id_distrito         = parseInt($cbo_distrito.val());
    data.txt_nombres         = $txt_nombres.val();
    data.txt_apellidos       = $txt_apellidos.val();
    data.txt_dni             = $txt_dni.val();
    data.txt_telefono        = $txt_telefono.val();
    data.id_cargo            = parseInt($cbo_cargo.val());
    data.txt_direccion       = $txt_direccion.val();
    data.chck_estado         = parseInt(estado);
     
    $.ajax({
        type: "POST",
        url: "editar_personal",
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
            fnc_listar_personal();
            fnc_sct_volver_personal();
            fnc_info_usuario();  
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