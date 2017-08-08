$(document).ready(init_usuario);
/******************************************************************************************************************************************************************************/
var $datatable_usuario      =   $('#datatable-usuario').DataTable();
var $form_login             =   $('#form-login');
var $form_registrar_u       =   $('#form-registrar-u');

var $txt_usuario            =   $('#txt-usuario');
var $txt_password           =   $('#txt-password');
var $nom_usuario            =   $('.nom-usuario');
var $profile_title          =   $('.profile-title');
var $img_usuario            =   $('.img-usuario');
var $img_usuariox           =   $('.img-usuariox');

var $login_wrapper          =   $('.login-wrapper');

var $file_foto_perfil       =   $('#file-foto-perfil');
var $txt_id_u               =   $('#txt-id-u');
var $txt_nuevo_u            =   $('#txt-nuevo-u');
var $txt_nuevo_p            =   $('#txt-nuevo-p');
var $txt_observacion_u      =   $('#txt-observacion-u');
var $chck_estado_usuario    =   $('#chck-estado-usuario');

var $btn_registro_u         =   $('#btn-registro-u');
var $btn_sct_volver_u       =   $('.btn-sct-volver-u');
var $sct_tabla_u            =   $('#sct-tabla-u');
var $sct_registro_u         =   $('#sct-registro-u');

var $title_usuario          =   $('.title-usuario');
var $btn_editar_usuario     =   $('#btn-editar-usuario');
var $btn_registrar_usuario  =   $('#btn-registrar-usuario');

/******************************************************************************************************************************************************************************/
function init_usuario ()
{
    fnc_info_usuario();
    fnc_listar_usuario();
    fnc_body_login();    
    $form_login.on('submit',fnc_login_usuario);

    $sct_registro_u.hide();
    $btn_registro_u.on('click',fnc_sct_usuario);
    $btn_sct_volver_u.on('click',fnc_sct_volver_u);

    $form_registrar_u.on('submit',fnc_registrar_usuario);
    $(document).on('click','.btn-ver-editar-usuario',fnc_ver_editar_usuario);
    
    $btn_editar_usuario.on('click',fnc_editar_usuario);

    fnc_list_personal();
    fnc_select2 ($cbo_personal,'Seleccionar personal...');

    $chck_estado_usuario.bootstrapSwitch({onText:'Activo',offText:'Inactivo'});
}
/******************************************************************************************************************************************************************************/
function fnc_body_login()
{
    if($login_wrapper.length)
    {
        $('body').addClass('login_page');
        $txt_usuario.focus();
    }
    else
    {
        $('body').removeAttr('class');
    }
}
/******************************************************************************************************************************************************************************/
function fnc_login_usuario ()
{
    var data={};   
    data.txt_usuario    = $txt_usuario.val();
    data.txt_password   = $txt_password.val();   

    $.ajax({
        type: "POST",
        url: "login_usuario",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {            
        },
        success: function (resp) 
        {  
            $('#msj-login').html(resp);
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
function fnc_info_usuario ()
{
    $.getJSON("info_usuario", function (data){

        $nom_usuario.html(data.nombres_personal);
        $profile_title.html(data.nombre_cargo);
        if(data.foto_usuario==null){
            $img_usuario.html('<img src="assets/images/silueta.png" class="img-responsive img-circle">');
            $img_usuariox.attr('src','assets/images/silueta.png');
        }
        else
        {
            $img_usuario.html('<img src="'+data.foto_usuario+'" class="img-responsive img-circle">');
            $img_usuariox.attr('src',data.foto_usuario);           
        }
        
    });
}
/******************************************************************************************************************************************************************************/
function fnc_sct_usuario()
{
    $title_usuario.text('REGISTRAR USUARIO');
    $btn_editar_usuario.hide();
    $sct_tabla_u.hide();
    $btn_registrar_usuario.show();
    $sct_registro_u.show();

    fnc_limpiar_campos();   

    $cbo_personal.select2("val","");

    $file_foto_perfil.fileinput('destroy');
    $file_foto_perfil.fileinput({ 
    overwriteInitial: true,
    maxFileSize: 1500,
    showClose: false,
    showCaption: false,
    browseLabel: '',
    removeLabel: '',
    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    elErrorContainer: '#kv-avatar-errors-1',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="assets/images/silueta.png" alt="Your Avatar" style="width:160px">',
    layoutTemplates: {main2: '{preview}  {remove} {browse}'},
    allowedFileExtensions: ["jpg", "png", "gif"]
    });
}
/******************************************************************************************************************************************************************************/
function fnc_sct_volver_u()
{
    $sct_tabla_u.show();
    $sct_registro_u.hide();    
}
/******************************************************************************************************************************************************************************/
function fnc_registrar_usuario ()
{
    var inputFilePerfil         =   $file_foto_perfil[0];
    var file_perfil             =   inputFilePerfil.files[0];
    var data_image_p            = new FormData();
    data_image_p.append('imagen',file_perfil)

    $.ajax({
        url: "subir_imagen_perfil",
        type:'POST',
        contentType:false,
        data: data_image_p,
        processData:false,
        cache:false,
        beforeSend: function()
        {
        },
        success: function(resp)
        {
            var data={};    
            data.id_personal         = parseInt($cbo_personal.val());
            data.txt_nuevo_u         = $txt_nuevo_u.val();
            data.txt_nuevo_p         = $txt_nuevo_p.val();
            data.file_foto_perfil    = resp; 
            data.txt_observacion_u   = $txt_observacion_u.val();

            $.ajax({
                type: "POST",
                url: "registrar_usuario",
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
                    fnc_sct_volver_u();
                    fnc_listar_usuario();
                },
                complete: function () 
                {     
                },
                error: function(resp)
                {
                }
            });
        }
    });
}
/******************************************************************************************************************************************************************************/
function fnc_listar_usuario()
{
    $.getJSON("listar_usuario", function (data){ 

    $datatable_usuario.row().clear().draw( false );
    for (var i = 0; i<data.length;i++) 
    {
        $datatable_usuario.row.add([i+1,
        data[i].nombre_completo,
        data[i].nombre_usuario,
        data[i].clave_usuario,
        data[i].estado_usuario,                
        '<button type="button" data-idusuario="'+data[i].id_usuario+'" class="btn btn-primary btn-ver-editar-usuario"><i class="fa fa-edit"></i></button>'
        ]).draw(false);
    }         
    });
}
/******************************************************************************************************************************************************************************/
function fnc_ver_editar_usuario()
{   
    $file_foto_perfil.fileinput('destroy');

   

    var data={};
    data.id_usuario  = parseInt($(this).attr('data-idusuario'));

    $.ajax({
        type: "POST",
        url: "obtener_usuario",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            if(resp.estado_usuario==1)
           {$chck_estado_usuario.bootstrapSwitch('state', true, true)}
           else
           {$chck_estado_usuario.bootstrapSwitch('state', false, false)}

            var img_foto=false;
            $sct_tabla_u.hide();
            $sct_registro_u.show();
            $title_usuario.html('EDITAR USUARIO');   
            $btn_registrar_usuario.hide();
            $btn_editar_usuario.show();

            $btn_editar_usuario.attr('data-idusuario',resp.id_usuario); 
            $txt_nuevo_u.val(resp.nombre_usuario);
            $txt_nuevo_p.val(resp.clave_usuario);
            $txt_observacion_u.val(resp.observaciones_usuario);
            //$id_cargo.val(resp.id_cargo);
            
            $cbo_personal.val(resp.id_personal).trigger("change");

            if(resp.foto_usuario!=null && resp.foto_usuario!=" ")
            {
                img_foto="<img src='"+resp.foto_usuario+"' class='kv-preview-data file-preview-image' style='width: 100%' alt='Desert' title='Desert'>";   
            }


            $file_foto_perfil.fileinput({
            overwriteInitial: true,
            maxFileSize: 1500,
            showClose: false,
            showCaption: false,
            browseLabel: '',
            removeLabel: '',
            browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
            removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
            elErrorContainer: '#kv-avatar-errors-1',
            msgErrorClass: 'alert alert-block alert-danger',
            defaultPreviewContent: '<img src="assets/images/silueta.png" alt="Your Avatar" style="width:160px">',
            layoutTemplates: {main2: '{preview}  {remove} {browse}'},
            allowedFileExtensions: ["jpg", "png", "gif"],
            initialPreview: img_foto
            });
           
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
function fnc_editar_usuario ()
{
     var data={};
     var estado;
    if($chck_estado_usuario.is(':checked'))
    {estado=1}
    else
    {estado=0}
    data.id_usuario         = parseInt($(this).attr('data-idusuario'));    
    data.id_personal        = parseInt($cbo_personal.val());
    data.txt_nuevo_u        = $txt_nuevo_u.val();
    data.txt_nuevo_p        = $txt_nuevo_p.val();
    /*data.file_foto_perfil   = resp; */
    data.txt_observacion_u  = $txt_observacion_u.val();
    data.chck_estado        = parseInt(estado);


    var inputFilePerfil         =   $file_foto_perfil[0];
    var file_perfil             =   inputFilePerfil.files[0];
    var data_image_p            = new FormData();
    data_image_p.append('imagen',file_perfil)

    $.ajax({
        url: "subir_imagen_perfil",
        type:'POST',
        contentType:false,
        data: data_image_p,
        processData:false,
        cache:false,
        beforeSend: function()
        {
        },
        success: function(resp)
        {

        data.file_foto_perfil   = resp;
        $.ajax({
        type: "POST",
        url: "editar_usuario",
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
            fnc_listar_usuario();
            fnc_sct_volver_u();
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
    });
}
/******************************************************************************************************************************************************************************/