/******************************************************************************************************************************************************************************/
var request;
var request1;
function get_today()
{
	var d = new Date(); var meses=""; var dias=""; var horas=""; var minutos=""; var today = "";
	meses = d.getMonth()+1;  if (meses<10) {  meses = "0"+meses; };
	dias = d.getDate();  if (dias<10) {  dias = "0"+dias;  }; 
	today = dias + "/" + meses + "/" + d.getFullYear();
	return today;
}
/******************************************************************************************************************************************************************************/
function get_time()
{
	var d = new Date(); var hour=""; var minute=""; var horapm = ""; var time = "";
	hour = d.getHours();  if (hour<10) {  hour = "0"+hour;  }; 
	minute = d.getMinutes();  if (minute<10) {  minute = "0"+minute;  }; 
	horapm= (hour > 12) ? ("0"+(hour-12)) : (hour);  
	time = (hour >= 12) ? (horapm + ':' + minute +' PM') : (hour + ':' + minute +' AM');
	return time;
}
/******************************************************************************************************************************************************************************/
function get_rangetoday()
{
    var d = new Date(); var meses=""; var dias=""; var horas=""; var minutos=""; var today = "";
    meses = d.getMonth()+1;  if (meses<10) {  meses = "0"+meses; };
    dias = d.getDate();  if (dias<10) {  dias = "0"+dias;  }; 
    today = dias + "/" + meses + "/" + d.getFullYear();
    return today+' - '+today;
}
/******************************************************************************************************************************************************************************/
function fnc_limpiar_campos () 
{
	$('input[type="text"],input[type="password"],input[type="email"],textarea').val('');
	$('input[type="checkbox"]').removeAttr('checked');	
}
/******************************************************************************************************************************************************************************/
function stringToDate(_date,_format,_delimiter)
{
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
}
/******************************************************************************************************************************************************************************/
function fnc_text_fechaActual () 
{
	var $fecha_today	=	$('.today');	
	$fecha_today.val(get_today);
}
/******************************************************************************************************************************************************************************/
function fnc_text_horaActual () 
{
	var $hora_today	=	$('.hour-today');	
	$hora_today.val(get_time);
}
/******************************************************************************************************************************************************************************/
function fnc_text_fechaRangoActual () 
{
    var $daterange   =   $('.daterange');    
    $daterange.val(get_rangetoday);
}

/******************************************************************************************************************************************************************************/
function fnc_datatable (_datatable,_columns)
{
	return _datatable.DataTable({"pageLength": 10,"aoColumns": _columns,
				responsive: {
					details: {
						renderer: function ( api, rowIdx ) {
							var data = api.cells( rowIdx, ':hidden' ).eq(0).map( function ( cell ) {
								var header = $( api.column( cell.column ).header() );
								return '<tr>'+
								'<td><b>'+
								header.text()+':'+
								'</b></td> '+
								'<td align="left">'+
								api.cell( cell ).data()+
								'</td>'+ 
								'</tr>';
							} ).toArray().join('');

							return data ?
							$('<table/>').append( data ) :
							false;
						}
					}
				}
			});
}
/******************************************************************************************************************************************************************************/
function fcn_typeahead(_textbox,source)
{
    _textbox.typeahead("destroy");
	_textbox.typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	}, {
		name: 'states',
		displayKey: 'value',
		source: substringMatcher(source)
	});
}
/******************************************************************************************************************************************************************************/
var substringMatcher = function(strs) {

		return function findMatches(q, cb) {
			var matches, substrRegex;
			matches = [];

			substrRegex = new RegExp(q, 'i');
			$.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					matches.push({
						value: str
					});
				}
			});
			cb(matches);
		};
	};
/******************************************************************************************************************************************************************************/
function fnc_select2 (_select,_placeholder)
{
	_select.html('<option></option>');
	_select.select2({
		placeholder: _placeholder,
		allowClear: true
	});

}
/******************************************************************************************************************************************************************************/
function fnc_list_departamento()
{
   $.getJSON("listar_departamento", function (data){ 
        $cbo_departamento.html('<option></option>');
        for (var i = 0; i<data.length;i++) 
        {
            $cbo_departamento.append('<option value="'+data[i].id_departamento+'">'+data[i].nombre_departamento+'</option>');                   
        }
    });
}
/******************************************************************************************************************************************************************************/

function fnc_list_provincia ()
{
    var data={};
    data.id_departamento  = parseInt($cbo_departamento.val());

    $.ajax({
        type: "POST",
        url: "listar_provincia",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
           $cbo_provincia.html('<option></option>');
        },
        success: function (resp) 
        {
            for (var i =0;i<resp.length; i++)
            {
                $cbo_provincia.append('<option value="'+resp[i].id_provincia+'">'+resp[i].nombre_provincia+'</option>');
            }
            $cbo_provincia.select2('val', '');
            $cbo_distrito.select2('val', $('.cbo-provincia option:first-child').val());
            fnc_list_distrito();           
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
function fnc_list_distrito ()
{
    var data={};
    var id_provincia=$cbo_provincia.val();   
   
    if(id_provincia=='')
    {id_provincia=0;}
    data.id_provincia = id_provincia; 

   $.ajax({
        type: "POST",
        url: "listar_distrito",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
           $cbo_distrito.html('<option></option>');
        },
        success: function (resp) 
        {
            for (var i =0;i<resp.length; i++)
            {
                $cbo_distrito.append('<option value="'+resp[i].id_distrito+'">'+resp[i].nombre_distrito+'</option>');
            }
            $cbo_distrito.select2('val', $('.cbo-provincia option:first-child').val());
        //request1=null;
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
        }
    });
   //}
}
/******************************************************************************************************************************************************************************/
function fnc_tooltip ()
{
    $('[data-toggle="tooltip"]').each(function() {
        var animate = $(this).attr("data-animate");
        var colorclass = $(this).attr("data-color-class");
        $(this).tooltip({
            template: '<div class="tooltip ' + animate + ' ' + colorclass + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });
     });
}
/******************************************************************************************************************************************************************************/
function fnc_list_personal()
{
   $.getJSON("listar_personal", function (data){ 
        $cbo_personal.html('<option></option>');
        for (var i = 0; i<data.length;i++) 
        {
            $cbo_personal.append('<option value="'+data[i].id_personal+'">'+data[i].nombre_completo+'</option>');                   
        }
    });
}
/******************************************************************************************************************************************************************************/
function fnc_list_cargo()
{
   $.getJSON("listar_cargo_crud", function (data){ 
        $cbo_cargo.html('<option></option>');
        for (var i = 0; i<data.length;i++) 
        {
            $cbo_cargo.append('<option value="'+data[i].id_cargo+'">'+data[i].nombre_cargo+'</option>');                   
        }
    });
}
/******************************************************************************************************************************************************************************/