$(document).ready(init_camion);
/******************************************************************************************************************************************************************************/
var $datatable_camion      =   $('#datatable-camion').DataTable();

var $modal_camion          =   $('#modal-camion');
var $btn_modal_camion      =   $('#btn-modal-camion');

var $form_camion           =   $('#form-camion');

var $txt_placa             =   $('#txt-placa');
var $txt_color             =   $('#txt-color');
var $chck_estado_camion    =   $('#chck-estado-camion');

var $title_camion          =   $('.title-camion');
var $btn_registrar_camion  =   $('#btn-registrar-camion');
var $btn_editar_camion     =   $('#btn-editar-camion');
/******************************************************************************************************************************************************************************/
function init_camion ()
{
   $btn_modal_camion.on('click',fnc_modal_camion);
   $form_camion.on('submit',fnc_registrar_camion);

   fnc_listar_camion();

   $(document).on('click','.btn-editar-camion',fnc_ver_editar_camion);
   $btn_editar_camion.on('click',fnc_editar_camion);

   $chck_estado_camion.bootstrapSwitch({onText:'Activo',offText:'Inactivo'});
}
/******************************************************************************************************************************************************************************/
function fnc_modal_camion()
{
    $modal_camion.modal("show");
    $title_camion.text('REGISTRAR CAMION');
    $btn_editar_camion.hide();
    $btn_registrar_camion.show();
    fnc_limpiar_campos();
    fnc_text_fechaActual();    
}
/******************************************************************************************************************************************************************************/
function fnc_registrar_camion ()
{
    var data={}; 
    data.txt_placa            = $txt_placa.val();
    data.txt_color            = $txt_color.val();
      

    $.ajax({
        type: "POST",
        url: "registrar_camion",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp) 
        {  
            $modal_camion.modal("hide");
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
function fnc_listar_camion()
{
    $.getJSON("listar_camion", function (data){ 

    $datatable_camion.row().clear().draw( false );
    for (var i = 0; i<data.length;i++) 
    {
        $datatable_camion.row.add([i+1,
        data[i].placa_camion,
        data[i].color_camion,
        data[i].estado_camion,                
        '<button type="button" data-idcamion="'+data[i].id_camion+'" class="btn btn-primary btn-editar-camion"><i class="fa fa-edit"></i></button>'
        ]).draw(false);
    }         
    });
}
/******************************************************************************************************************************************************************************/
function fnc_editar_camion ()
{
    var data={};
    var estado;
    if($chck_estado_camion.is(':checked'))
    {estado=1}
    else
    {estado=0}
    data.id_camion      = parseInt($(this).attr('data-idcamion'));
    data.txt_placa      = $txt_placa.val();
    data.txt_color      = $txt_color.val();
    data.chck_estado    = parseInt(estado);

    $.ajax({
        type: "POST",
        url: "editar_camion",
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
            $modal_camion.modal("hide");
            fnc_listar_camion();                                    
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
function fnc_ver_editar_camion()
{
    $modal_camion.modal("show");
    $title_camion.text('EDITAR CAMION');   
    $btn_registrar_camion.hide();
    var data={};
    data.id_camion  = parseInt($(this).attr('data-idcamion'));

    $.ajax({
        type: "POST",
        url: "obtener_camion",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            if(resp[0].estado_camion==1)
           {$chck_estado_camion.bootstrapSwitch('state', true, true)}
           else
           {$chck_estado_camion.bootstrapSwitch('state', false, false)}
           $btn_editar_camion.show().attr('data-idcamion',resp[0].id_camion); 
           $txt_placa.val(resp[0].placa_camion);
           $txt_color.val(resp[0].color_camion);           
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