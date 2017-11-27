$(document).ready(H_FileManager);
/******************************************************************************************************************************************************************************/
//Variables globales
var $datatable_filemanager;
/******************************************************************************************************************************************************************************/
//Inicializar Helper H_FileManager
function H_FileManager()
{
    SetFileManager();

    $datatable_filemanager = GetFileManager($('#table-filemanager'));

    $(document).on('click','.btn-download-file',GetFileManagerByFileID);

    $(document).on('click','.btn-showmodal-delete-file',ShowModalDeleteFile);

    $(document).on('hidden.bs.modal','#modal-delete-file', function () {
        $('#btn-delete-file').removeAttr('data-id');    
    });

    $(document).on('click','#btn-delete-file',DeleteFileManagerByFileID);
}
/******************************************************************************************************************************************************************************/
//Insertar archivos usando el plugin "Boostrap File input".
function SetFileManager()
{
    $('#file-es').fileinput({
        uploadAsync: true,
        language: 'es',
        uploadUrl: 'SetFileManager',
        allowedFileExtensions: ['jpg', 'png', 'gif','doc','docx','pdf','xls','xlsx','pptx','ppt']      
    });

    $('#file-es').on('fileuploaded', function(event, data, previewId, index){
        
        $(this).fileinput('clear').fileinput('enable');
        $(this).fileinput('refresh');

        $datatable_filemanager.ajax.reload();

        showSuccess('Se registró correctamente');
    });
}
/******************************************************************************************************************************************************************************/
//Obtener todos los archivos y listar en una tabla usando el plugin "DataTable Jquery".
function GetFileManager(table)
{ 
    $('.spin-loading').html('<i class="fa fa-refresh fa-spin" style="font-size: 100px;"></i>');

    var datatable = table.DataTable({
        "ajax":
        {
            "dataSrc": "",
            "type"   : "POST",
            "url"    : "GetFileManager",
            "data"   : function(d)
            {
                d.file_id= 0;
            },
            complete: function () 
            {                
                $('.spin-loading').empty();                
            },
        },
        "bLengthChange" : false,    
        "bFilter" : false,    
        "bInfo" : false,
        "bSort" : false,
        "scrollY":        "240px",
        "scrollCollapse": true,
        "paging":         false,
        "autoWidth": false,
        "aoColumns": [
            { "data":null, "title": "Nº","sClass": "text-center","sWidth": "20%" },
            { "data":"file_caption", "title": "Nombre del archivo","sClass": "text-center","sWidth": "60%" },                    
            {"title": "Opción","data":null,"sWidth": "20%", 
                "mRender": function(data, type, full) {
                return '<button type="button" data-id="'+data['file_id']+'" class="btn-option-filemanager btn-download-file" title="Descargar"><i class="fa fa-download"></i></button>'
                +'<button type="button" data-id="'+data['file_id']+'"  data-caption="'+data['file_caption']+'" class="btn-option-filemanager btn-showmodal-delete-file" title="Eliminar"><i class="fa fa-remove"></i></button>'
                }
            }
        ],
        "columnDefs" : [],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            $('td:eq(1)', nRow).removeClass( "text-center" ).addClass( "text-left" );          
            $('td:eq(0)',nRow).html(iDisplayIndex +1);

            // $('.btn-editmodal-user', nRow).tooltip({html: true, title: 'Editar usuario'});
            // $('.btn-deletemodal-user', nRow).tooltip({html: true, title: 'Eliminar usuario'});
        },
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
    });
    $('.div-table').show();
    return datatable;
}
/******************************************************************************************************************************************************************************/
//Obtener un archivo por id y descargar archivo del directorio.
function GetFileManagerByFileID()
{
    var data = {};
    data.file_id = parseInt($(this).attr('data-id'));
    $.ajax({
        type: "POST",
        url: "GetFileManagerByFileID",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            window.open(resp.file_path);
            showSuccess('Se descargó correctamente');
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
//Mostrar modal de confirmación para eliminar archivo.
function ShowModalDeleteFile()
{
    var file_id = $(this).attr('data-id');
    var file_caption = $(this).attr('data-caption');
    $('#btn-delete-file').attr('data-id',file_id);
    $('#span-filecaption').text(file_caption);
    $('#modal-delete-file').modal('show');
}
/******************************************************************************************************************************************************************************/
//Eliminar un archivo.
function DeleteFileManagerByFileID()
{
    var data = {};
    data.file_id = parseInt($(this).attr('data-id'));
    $.ajax({
        type: "POST",
        url: "DeleteFileManagerByFileID",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            $('#modal-delete-file').modal('hide');

            $datatable_filemanager.ajax.reload();
            
            showSuccess('Se eliminó correctamente');

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
