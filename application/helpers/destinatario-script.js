$(document).ready(init_destinatario);
/******************************************************************************************************************************************************************************/
var $datatable_destinatario      =   $('#datatable-destinatario').DataTable();
var $title_destinatario          =   $('.title-destinatario');
var $btn_registrar_destinatario  =   $('#btn-registrar-destinatario');
var $btn_editar_destinatario     =   $('#btn-editar-destinatario');
/******************************************************************************************************************************************************************************/
function init_destinatario ()
{
   $btn_modal_destina.on('click',fnc_modal_destinatario);
   fnc_listar_destinatario();

   $(document).on('click','.btn-ver-editar-destinatario',fnc_ver_editar_destinatario);
   $btn_editar_destinatario.on('click',fnc_editar_destinatario);
}
/******************************************************************************************************************************************************************************/
function fnc_listar_destinatario()
{
    $.getJSON("listar_destinatario", function (data){ 

    $datatable_destinatario.row().clear().draw( false );
    for (var i = 0; i<data.length;i++) 
    {
        $datatable_destinatario.row.add([i+1,
        data[i].nombre_destinatario,
        data[i].direccion_destinatario,
        '<button type="button" data-iddestinatario="'+data[i].id_destinatario+'" class="btn btn-primary btn-ver-editar-destinatario"><i class="fa fa-edit"></i></button>'
        ]).draw(false);
    }         
    });
}
/******************************************************************************************************************************************************************************/
function fnc_editar_destinatario ()
{
    var data={};
    data.id_destinatario        = parseInt($(this).attr('data-iddestinatario'));
    data.id_distrito            = parseInt($cbo_distrito.val());
    data.txt_nombre_destino     = $txt_nombre_destino.val();
    data.txt_direccion_destino  = $txt_direccion_destino.val();

    $.ajax({
        type: "POST",
        url: "editar_destinatario",
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
            $modal_destinatario.modal("hide");
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
function fnc_ver_editar_destinatario()
{
    var data={};
    data.id_destinatario  = parseInt($(this).attr('data-iddestinatario'));

    $.ajax({
        type: "POST",
        url: "obtener_destinatario",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            $modal_destinatario.modal("show");
            $title_destinatario.text('EDITAR DESTINATARIO');   
            $btn_registrar_destinatario.hide();
            $btn_editar_destinatario.show();
            
            $btn_editar_destinatario.show().attr('data-iddestinatario',resp[0].id_destinatario); 
            $txt_nombre_destino.val(resp[0].nombre_destinatario);
            $txt_direccion_destino.val(resp[0].direccion_destinatario);

            $cbo_departamento.val(resp[0].id_departamento).trigger("change");
            $cbo_provincia.val(resp[0].id_provincia).trigger("change");
            $cbo_distrito.val(resp[0].id_distrito).trigger("change");          
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