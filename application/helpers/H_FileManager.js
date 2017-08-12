$(document).ready(H_FileManager);
/******************************************************************************************************************************************************************************/
//Variables globales
var $table_filemanager = $('#table-filemanager');
/******************************************************************************************************************************************************************************/
//Inicializar Helper H_FileManager
function H_FileManager()
{
    SetFileManager();
    GetFileManager();

    $(document).on('click','.btn-download-file',GetFileManagerByFileID);
}
/******************************************************************************************************************************************************************************/
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
        GetFileManager();
    });
}
/******************************************************************************************************************************************************************************/
function GetFileManager()
{
    $.getJSON("GetFileManager", function (data){

        $table_filemanager.children('tbody').empty();

        for (var i = 0; i < data.length; i++) 
        {
            $table_filemanager.children('tbody').append('<tr>'
            +'<td class="col-xs-2">'+(i+1)+'</td>'
            +'<td class="col-xs-8">'+data[i].file_caption+'</td>'
            +'<td class="col-xs-2">'
            +'<button type="button" data-id="'+data[i].file_id+'" class="btn-option-filemanager btn-download-file" title="Descargar"><i class="fa fa-download"></i></button>'
            +'<button type="button" data-id="'+data[i].file_id+'" class="btn-option-filemanager btn-delete-file" title="Eliminar"><i class="fa fa-remove"></i></button>'
            +'</td>'
            +'</tr>');
        }         
    });    
}
/******************************************************************************************************************************************************************************/
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
            // window.location.href = resp.file_path;
            window.open(resp.file_path);
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
