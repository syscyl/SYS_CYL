$(document).ready(init_seguimiento);
/******************************************************************************************************************************************************************************/
var $datatable_almacen =   $('#datatable-almacen').DataTable();

var $form_codenvio         =   $('#form-codenvio');
var $txt_codenvio          =   $('#txt-codenvio');
var $img_porcent           =   $('#img-porcent');

var $form_cod_envio        =   $('#form-cod-envio');
var $txt_cod_envio         =   $('#txt-cod-envio');
var $img_flecha            =   $('.img-flecha');
var $cliente_entrega       =   $('#cliente-entrega');
var $direccion_entrega     =   $('#direccion-entrega');

var $link_foto_crono       =   $('#link-foto-crono');
var $modal_foto_crono      =   $('#modal-foto-crono');
var $img_foto_crono        =   $('#img-foto-crono');
var $table_envio_estado    =   $('#table-envio-estado');
/******************************************************************************************************************************************************************************/
function init_seguimiento ()
{
  $form_cod_envio.on('submit',fnc_consultar_envio);
  fnc_consultar_envio_SE();

  $link_foto_crono.on('click',fnc_modal_imagencrono);
}
/******************************************************************************************************************************************************************************/
function fnc_modal_imagencrono() 
{
    $modal_foto_crono.modal('show');
}
/******************************************************************************************************************************************************************************/
function fnc_consultar_envio_SE ()
{
    var data={};
    data.txt_codenvio   = $txt_codenvio.val();
    
    $.ajax({
        type: "POST",
        url: "consultar_envio_SE",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            $table_envio_estado.children('tbody').empty();
            $img_porcent.empty();
        },
        success: function (resp) 
        { 
            if(resp.length)
            { 
                $sct_ver_envio.show();
                var idestado =   parseInt(resp[0].id_estado);
                var img;
                var img_f;            
                var nombre_estado;
                var destinatario;
                var direccion;

                $('.li-op').children('a').attr('data-idlote',resp[0].id_lote);  
                switch(idestado)
                {
                    // case 1:                                        
                    //     nombre_estado="Por recoger";
                    //     $click_recoger.trigger('click');
                    //     _div_button=$op_recoger;                   
                    //     img=' <img src="assets/images/Seguimiento/Por_recoger.png" alt="" style="width: 80%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    // break;

                    case 1: 
                        nombre_estado="En almacén"; 
                        $click_almacen.trigger('click');
                        _div_button=$op_almacen;
                        img=' <img src="assets/images/Seguimiento/En_almacen.png" alt="" style="width: 40%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    break;

                    case 2:
                        nombre_estado="En trayecto";
                        $click_trayecto.trigger('click');               
                        _div_button=$op_trayecto;                    
                        img=' <img src="assets/images/Seguimiento/En_trayecto.png" alt="" style="width: 40%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    break;

                    case 3:
                        nombre_estado="Entregado";
                        $click_entregado.trigger('click');
                        _div_button=$op_entregado;                  
                        img=' <img src="assets/images/Seguimiento/Entregado.png" alt="" style="width: 40%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    break;
                }

                 $table_envio_estado.children('tbody').append(
                '<tr><td>'+resp[0].numguiac_lote+'</td>'
                +'<td style="display:none;">'+resp[0].nombre_distrito+'</td>'
                +'<td>'+nombre_estado+'</td></tr>'
                );      
                $img_porcent.html(img);
                $('.info-envio').show();
                //destinatario='<label style="font-size: 16px; text-aling: left;">'+resp[0].nombre_destinatario+'</label>';
               // $cliente_entrega.html(destinatario);
                //direccion='<label style="font-size: 16px;">'+resp[0].direccion_destinatario+'</label>';
                //$direccion_entrega.html(direccion);
                $img_foto_guia .html('<img class="img-rounded img-responsive img-size" src="'+resp[0].fotoguiac_lote+'">');
                $img_foto_crono .html('<img class="img-crono" src="assets/images/Seguimiento/crono.jpg">');
            }
            else
            {
                fnc_registrar_guia_SE ();
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
function fnc_registrar_guia_SE ()
{
    var data={};
    data.txt_codenvio   = $txt_codenvio.val();
    
    $.ajax({
        type: "POST",
        url: "registrar_guia_SE",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
             fnc_consultar_envio_SE();
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
function fnc_consultar_envio ()
{
    var data={};
    data.txt_cod_envio   = $txt_cod_envio.val();
    
    $.ajax({
        type: "POST",
        url: "consultar_envio",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            $table_envio_estado.children('tbody').empty();
            $img_porcent.empty();
        },
        success: function (resp) 
        { 
            if(resp.length)
            { 
                $sct_ver_envio.show();
                var idestado =   parseInt(resp[0].id_estado);
                var img;
                var img_f;            
                var nombre_estado;
                var destinatario;
                var direccion;
                $('.li-op').children('a').attr('data-idlote',resp[0].id_lote);  
                switch(idestado)
                {
                    case 1:                                        
                        nombre_estado="Por recoger";
                        $click_recoger.trigger('click');
                        _div_button=$op_recoger;                   
                        img=' <img src="assets/images/Seguimiento/Por_recoger.png" alt="" style="width: 80%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    break;

                    case 2: 
                        nombre_estado="En almacén"; 
                        $click_almacen.trigger('click');
                        _div_button=$op_almacen;
                        img=' <img src="assets/images/Seguimiento/En_almacen.png" alt="" style="width: 80%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    break;

                    case 3:
                        nombre_estado="En trayecto";
                        $click_trayecto.trigger('click');               
                        _div_button=$op_trayecto;                    
                        img=' <img src="assets/images/Seguimiento/En_trayecto.png" alt="" style="width: 80%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    break;

                    case 4:
                        nombre_estado="Entregado";
                        $click_entregado.trigger('click');
                        _div_button=$op_entregado;                  
                        img=' <img src="assets/images/Seguimiento/Entregado.png" alt="" style="width: 80%;overflow: hidden;margin: 0 auto;padding: 0;position: relative;">';
                    break;
                }

                 $table_envio_estado.children('tbody').append(
                '<tr><td>'+resp[0].cod_envio+'</td>'
                +'<td>'+resp[0].numguiac_lote+'</td>'            
                +'<td>'+nombre_estado+'</td></tr>'
                );      
                $img_porcent.html(img);
                $('.info-envio').show();
                destinatario='<label style="font-size: 16px; text-aling: left;">'+resp[0].nombre_destinatario+'</label>';
                $cliente_entrega.html(destinatario);
                direccion='<label style="font-size: 16px;">'+resp[0].nombre_distrito+'</label>';
                $direccion_entrega.html(direccion);
                $img_foto_guia .html('<img class="img-rounded img-responsive img-size" src="'+resp[0].fotoguiac_lote+'">');
            }
            else
            {
                alert('No Existe!');
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