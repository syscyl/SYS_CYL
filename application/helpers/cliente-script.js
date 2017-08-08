$(document).ready(init_cliente);
/******************************************************************************************************************************************************************************/
var $datatable_cliente      =   $('#datatable-cliente').DataTable({
        "language": {
            "lengthMenu": "_MENU_ Record por pagina",
            "zeroRecords": "No se encontró ningún dato",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "No existen datos",
            "infoFiltered": "(Filtrado de _MAX_ registros)",
            "search":"Buscar",
            "paginate": {
            "previous": "Anterior",
            "next": "Siguiente"
    }
        }
    } );

var $modal_cliente          =   $('#modal-cliente');
var $btn_modal_cliente      =   $('#btn-modal-cliente');

var $form_cliente           =   $('#form-cliente');

var $chck_estado_cliente    =   $('#chck-estado-cliente');
var $txt_cliente            =   $('#txt-cliente');
var $txt_ruc                =   $('#txt-ruc');
var $txt_direccion          =   $('#txt-direccion');

var $title_cliente          =   $('.title-cliente');
var $btn_registrar_cliente  =   $('#btn-registrar-cliente');
var $btn_editar_cliente     =   $('#btn-editar-cliente');
/******************************************************************************************************************************************************************************/
function init_cliente ()
{
    $btn_modal_cliente.on('click',fnc_modal_cliente);
    $form_cliente.on('submit',fnc_registrar_cliente);

    fnc_listar_clientecrud();
    $(document).on('click','.btn-ver-editar-cliente',fnc_ver_editar_cliente);
    $btn_editar_cliente.on('click',fnc_editar_cliente);

   $chck_estado_cliente.bootstrapSwitch({onText:'Activo',offText:'Inactivo'});
}
/******************************************************************************************************************************************************************************/
function fnc_modal_cliente()
{   
    $modal_cliente.modal("show");
    
    $title_cliente.text('REGISTRAR CLIENTE');
    $btn_editar_cliente.hide();
    $btn_registrar_cliente.show();

    fnc_limpiar_campos();
    fnc_text_fechaActual();    

    $cbo_departamento.select2("val","");
    $cbo_provincia.select2("val","");
    $cbo_distrito.select2("val","");

    /*fnc_select2($cbo_estado,'Seleccione estado...');
    $cbo_estado.html('<option value="1">Activo</option><option value="0">Inactivo</option>');*/
}
/******************************************************************************************************************************************************************************/
function fnc_registrar_cliente ()
{
    var data={};    
    data.id_distrito          = parseInt($cbo_distrito.val());        
    data.txt_cliente          = $txt_cliente.val();
    data.txt_ruc              = $txt_ruc.val();
    data.txt_direccion        = $txt_direccion.val();
     
    $.ajax({
        type: "POST",
        url: "registrar_cliente",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp) 
        {  
            $modal_cliente.modal("hide");
            showSuccess('Se registró correctamente'); 
            fnc_listar_clientecrud();
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
function fnc_listar_clientecrud()
{
    $.getJSON("listar_cliente_crud", function (data){ 

    $datatable_cliente.row().clear().draw( false );
    for (var i = 0; i<data.length;i++) 
    {
        $datatable_cliente.row.add([i+1,
        data[i].nombre_cliente,
        data[i].ruc_cliente,
        data[i].direccion_cliente,
        data[i].estado_cliente,                
        '<button type="button" data-idcliente="'+data[i].id_cliente+'" class="btn btn-primary btn-ver-editar-cliente"><i class="fa fa-edit"></i></button>'
        ]).draw(false);
    }         
    });
}
/******************************************************************************************************************************************************************************/
function fnc_ver_editar_cliente()
{        
    var data={};
    data.id_cliente  = parseInt($(this).attr('data-idcliente'));

    $.ajax({
        type: "POST",
        url: "obtener_cliente",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {

        },
        success: function (resp) 
        {
           if(resp.estado_cliente==1)
           {$chck_estado_cliente.bootstrapSwitch('state', true, true)}
           else
           {$chck_estado_cliente.bootstrapSwitch('state', false, false)}

            $modal_cliente.modal("show");
            $title_cliente.text('EDITAR CLIENTE');   
            $btn_registrar_cliente.hide();
            $btn_editar_cliente.show();

            $btn_editar_cliente.attr('data-idcliente',data.id_cliente); 

            $txt_cliente.val(resp.nombre_cliente);
            $txt_ruc.val(resp.ruc_cliente);           
            $txt_direccion.val(resp.direccion_cliente);

            $cbo_departamento.val(resp.id_departamento).trigger("change");
            $cbo_provincia.val(resp.id_provincia).trigger("change");
            $cbo_distrito.val(resp.id_distrito).trigger("change");

           
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
function fnc_editar_cliente ()
{
    var data={};
    var estado;
    if($chck_estado_cliente.is(':checked'))
    {estado=1}
    else
    {estado=0}
    data.id_cliente         = parseInt($(this).attr('data-idcliente'));    
    data.id_distrito        = parseInt($cbo_distrito.val());
    data.txt_cliente        = $txt_cliente.val();
    data.txt_ruc            = $txt_ruc.val();
    data.txt_direccion      = $txt_direccion.val();
    data.chck_estado        = parseInt(estado);
     
    $.ajax({
        type: "POST",
        url: "editar_cliente",
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
            $modal_cliente.modal("hide"); 
            fnc_listar_clientecrud();   
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