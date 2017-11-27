$(document).ready(init_n_entrega);
/******************************************************************************************************************************************************************************/
var $datatable_control          =   $('#datatable-control').DataTable({"bSort" : false});
var $btn_registrar_entregas     =   $('#btn-registrar-entregas');

var $txt_rango_fecha_control    =   $('#txt-rango-fecha-control');
var $btn_recuperar_entregas     =   $('#btn-recuperar-entregas');
var $ver_foto_guia              =   $('#ver-foto-guia');
var $modal_foto_control         =   $('#modal-foto-control');
var $foto_guia                  =   $('#foto-guia');
/******************************************************************************************************************************************************************************/
function init_n_entrega ()
{
    //parametros principales
 
 var contenidoHTML = '<p>Tu contenido HTML aqui</p><button onclick=\"closeModal()\">Cerrar</button>';
 
 var ancho = 600; 
 var alto = 250;

 $('#button').click(function(){
 // fondo transparente
 // creamos un div nuevo, con dos atributos
 var bgdiv = $('<div>').attr({
 className: 'bgtransparent',
 id: 'bgtransparent'
 });
 
 // agregamos nuevo div a la pagina
 $('body').append(bgdiv);
 
 // obtenemos ancho y alto de la ventana del explorer
 var wscr = $(window).width();
 var hscr = $(window).height();
 
 //establecemos las dimensiones del fondo
 $('#bgtransparent').css("width", wscr);
 $('#bgtransparent').css("height", hscr);
 
 
 // ventana modal
 // creamos otro div para la ventana modal y dos atributos
 var moddiv = $('<div>').attr({
 className: 'bgmodal',
 id: 'bgmodal'
 }); 
 
 // agregamos div a la pagina
 $('body').append(moddiv);

 // agregamos contenido HTML a la ventana modal
 $('#bgmodal').append(contenidoHTML);
 
 // redimensionamos para que se ajuste al centro y mas
 $(window).resize();
 });

 $(window).resize(function(){
 // dimensiones de la ventana del explorer 
 var wscr = $(window).width();
 var hscr = $(window).height();

 // estableciendo dimensiones de fondo
 $('#bgtransparent').css("width", wscr);
 $('#bgtransparent').css("height", hscr);
 
 // estableciendo tamaño de la ventana modal
 $('#bgmodal').css("width", ancho+'px');
 $('#bgmodal').css("height", alto+'px');
 
 // obtiendo tamaño de la ventana modal
 var wcnt = $('#bgmodal').width();
 var hcnt = $('#bgmodal').height();
 
 // obtener posicion central
 var mleft = ( wscr - wcnt ) / 2;
 var mtop = ( hscr - hcnt ) / 2;
 
 // estableciendo ventana modal en el centro
 $('#bgmodal').css("left", mleft+'px');
 $('#bgmodal').css("top", mtop+'px');
 });
    
}

function closeModal(){
 // removemos divs creados
 $('#bgmodal').remove();
 $('#bgtransparent').remove();
}
    ///////////////////////////////////////////////////////////////
   $btn_registrar_entregas.on("click",fnc_registrar_n_entregas);
   $btn_recuperar_entregas.on('click',fnc_recuperar_entregas);
   $ver_foto_guia.on('click',function(){
            $modal_foto_control.modal('show');
             alert("b")
           });

/******************************************************************************************************************************************************************************/
function fnc_registrar_n_entregas() 
{
    var array=[];
    var entrega = $("#txt-entregas").val().split('\n');

    for (var i = 0;i<entrega.length;i++)
    {
        if(entrega[i]!="")
        {
            array.push(entrega[i]);
        }
    }

    var data={};
    data.n_entregas   = array;
    data.tipo_entrega = $('#tipo_entrega').val();

    $.ajax({
        type: "POST",
        url: "registrar_guia_SE2",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        { 
        },
        success: function (resp) 
        {
            $("#txt-entregas").val('');
            showSuccess("Nro de entregas registradas.")
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
function fnc_recuperar_entregas()
{
    var data={};    
    var txt_fecha_inicio   = $txt_rango_fecha_control.data('daterangepicker').startDate.format('DD/MM/YYYY'); 
    var txt_fecha_fin      = $txt_rango_fecha_control.data('daterangepicker').endDate.format('DD/MM/YYYY');  

    data.txt_fecha_inicio  = stringToDate(txt_fecha_inicio,'dd/mm/yyyy','/');
    data.txt_fecha_fin     = stringToDate(txt_fecha_fin,'dd/mm/yyyy','/');

    $.ajax({
        type: "POST",
        url: "listar_entregas",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        { 
            $datatable_control.row().clear().draw( false );
        },
        success: function (resp) 
        {
            
            var a = "";
            for (var i = 0; i<resp.length;i++) 
            {
                $datatable_control.row.add([i+1,
                resp[i].fechac_lote,
                resp[i].numguiac_lote,
                resp[i].nombre_estado,
                resp[i].observacion_detalle_estado,
                //'<img class="img-rounded img-responsive img-size"  src="'+resp[i].foto_guia,+'"  style="width: 30%;">'
                '<a href="ver_foto">Ver Foto</a>',
                //'<input type="button" id="button" value="Mostrar Ventana" />'
                ]).draw(false);
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
