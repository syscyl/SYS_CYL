$(document).ready(init_cargo);
/******************************************************************************************************************************************************************************/
var $datatable_cargo      =   $('#datatable-cargo').DataTable();
var $title_cargo          =   $('.title-cargo');
var $btn_registrar_cargo  =   $('#btn-registrar-cargo');
var $btn_editar_cargo     =   $('#btn-editar-cargo');
var $chck_estado_cargo    =   $('#chck-estado-cargo');

var $cbo_cargo            =   $('.cbo-cargo');
/******************************************************************************************************************************************************************************/
function init_cargo ()
{
   $btn_modal_cargo.on('click',fnc_modal_cargo);
   $form_cargo.on('submit',fnc_registrar_cargo);

   fnc_listar_cargocrud();

   $(document).on('click','.btn-ver-editar-cargo',fnc_ver_editar_cargo);
   $btn_editar_cargo.on('click',fnc_editar_cargo);

   $chck_estado_cargo.bootstrapSwitch({onText:'Activo',offText:'Inactivo'});
}
/******************************************************************************************************************************************************************************/
function fnc_listar_cargocrud()
{
    $.getJSON("listar_cargo_crud", function (data){ 

    $datatable_cargo.row().clear().draw( false );
    for (var i = 0; i<data.length;i++) 
    {
        $datatable_cargo.row.add([i+1,
        data[i].nombre_cargo,
        data[i].observaciones_cargo,
        data[i].estado_cargo,                
        '<button type="button" data-idcargo="'+data[i].id_cargo+'" class="btn btn-primary btn-ver-editar-cargo"><i class="fa fa-edit"></i></button>'
        ]).draw(false);
    }         
    });
}
/******************************************************************************************************************************************************************************/
function fnc_editar_cargo ()
{
    var data={};
    var estado;
    if($chck_estado_cargo.is(':checked'))
    {estado=1}
    else
    {estado=0}

    data.id_cargo           = parseInt($(this).attr('data-idcargo'));
    data.txt_nombre_cargo   = $txt_nombre_cargo.val();
    data.txt_observaciones  = $txt_observaciones.val();
    data.chck_estado        = parseInt(estado);

    $.ajax({
        type: "POST",
        url: "editar_cargo",
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
            $modal_cargo.modal("hide");
            fnc_listar_cargocrud();                                    
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
function fnc_ver_editar_cargo()
{
    $modal_cargo.modal("show");
    $title_cargo.text('EDITAR CARGO');   
    $btn_registrar_cargo.hide();
    var data={};
    data.id_cargo  = parseInt($(this).attr('data-idcargo'));

    $.ajax({
        type: "POST",
        url: "obtener_cargo",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            if(resp[0].estado_cargo==1)
           {$chck_estado_cargo.bootstrapSwitch('state', true, true)}
           else
           {$chck_estado_cargo.bootstrapSwitch('state', false, false)}

           $btn_editar_cargo.show().attr('data-idcargo',resp[0].id_cargo); 
           $txt_nombre_cargo.val(resp[0].nombre_cargo);
           $txt_observaciones.val(resp[0].observaciones_cargo);
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