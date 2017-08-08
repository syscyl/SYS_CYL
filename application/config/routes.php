<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] 	= 'publicidad_controller';//'vistaSE_controller/acceso_denegado';
$route['404_override'] 			= '';
$route['translate_uri_dashes']	= FALSE;
/************************************************************************************************************************************************************************/
$route['inicio'] 				= 'publicidad_controller/index';
$route['nosotros'] 				= 'publicidad_controller/nosotros';
$route['servicios'] 			= 'publicidad_controller/servicios';
$route['galeria'] 				= 'publicidad_controller/galeria';
$route['contacto'] 				= 'publicidad_controller/contacto';
$route['seguimiento'] 			= 'publicidad_controller/seguimiento';
/************************************************************************************************************************************************************************/
$route['login'] 				= 'usuario_controller/index';
$route['login_usuario'] 		= 'usuario_controller/login_usuario';
$route['logout'] 				= 'usuario_controller/logout_usuario';
$route['info_usuario'] 			= 'usuario_controller/informacion_usuario';
/************************************************************************************************************************************************************************/
$route['almacen'] 				= 'almacen_controller/almacen';
$route['envio'] 				= 'almacen_controller/envio';
$route['registrar_destino'] 	= 'almacen_controller/registrar_destinatario';
$route['listar_destinatarios'] 	= 'almacen_controller/listar_destinatarios';
$route['listar_destinatario_n'] = 'almacen_controller/listar_destinatario_nombre';
$route['eliminar_lote'] 		= 'almacen_controller/eliminar_lote';

$route['listar_departamento'] 	= 'almacen_controller/listar_departamento';
$route['listar_provincia'] 		= 'almacen_controller/listar_provincia';
$route['listar_distrito'] 		= 'almacen_controller/listar_distrito';

$route['listar_lote'] 			= 'almacen_controller/listar_lote';
$route['registrar_lote'] 		= 'almacen_controller/registrar_lote';
$route['editar_lote'] 			= 'almacen_controller/editar_lote';
$route['obtener_envio_lote'] 	= 'almacen_controller/obtener_envio_lote';
$route['cambiar_estado_envio'] 	= 'almacen_controller/cambiar_estado_envio';
$route['cambiar_estado_envio2'] = 'almacen_controller/cambiar_estado_envio2';
$route['listar_envio_estado'] 	= 'almacen_controller/listar_envio_estado';
$route['consultar_envio'] 		= 'almacen_controller/consultar_envio';
$route['consultar_envio_SE'] 	= 'almacen_controller/consultar_envio_SE';
$route['registrar_guia_SE'] 	= 'almacen_controller/registrar_guia_SE';
$route['registrar_guia_SE2'] 	= 'almacen_controller/registrar_guia_SE2';

$route['subir_imagen'] 			= 'almacen_controller/subir_imagen';
/************************************************************************************************************************************************************************/
$route['personal'] 				= 'personal_controller/personal';
$route['listar_personal'] 		= 'personal_controller/listar_personal';
$route['registrar_personal'] 	= 'personal_controller/registrar_personal';
$route['obtener_personal'] 		= 'personal_controller/obtener_personal';
$route['editar_personal'] 		= 'personal_controller/editar_personal';
/************************************************************************************************************************************************************************/
$route['cargo'] 				= 'cargo_controller/cargo';
$route['registrar_cargo'] 		= 'cargo_controller/registrar_cargo';
$route['listar_cargo'] 			= 'cargo_controller/listar_cargo';
$route['listar_cargo_nombre'] 	= 'cargo_controller/listar_cargo_nombre';
$route['listar_cargo_crud'] 	= 'cargo_controller/listar_cargo_crud';
$route['editar_cargo'] 			= 'cargo_controller/editar_cargo';
$route['obtener_cargo'] 		= 'cargo_controller/obtener_cargo';
/************************************************************************************************************************************************************************/
$route['cliente'] 				= 'cliente_controller/cliente';
$route['registrar_cliente'] 	= 'cliente_controller/registrar_cliente';
$route['listar_clientes'] 		= 'cliente_controller/listar_clientes';
$route['listar_cliente_n'] 		= 'cliente_controller/listar_cliente_nombre';
$route['listar_cliente_crud'] 	= 'cliente_controller/listar_cliente_crud';
$route['editar_cliente'] 		= 'cliente_controller/editar_cliente';
$route['obtener_cliente'] 		= 'cliente_controller/obtener_cliente';
/************************************************************************************************************************************************************************/
$route['camion'] 				= 'camion_controller/camion';
$route['registrar_camion'] 		= 'camion_controller/registrar_camion';
$route['listar_camion'] 		= 'camion_controller/listar_camion';
$route['editar_camion'] 		= 'camion_controller/editar_camion';
$route['obtener_camion'] 		= 'camion_controller/obtener_camion';
/************************************************************************************************************************************************************************/
$route['destinatario'] 				= 'destinatario_controller/destinatario';
$route['listar_destinatario'] 		= 'destinatario_controller/listar_destinatario';
$route['editar_destinatario'] 		= 'destinatario_controller/editar_destinatario';
$route['obtener_destinatario'] 		= 'destinatario_controller/obtener_destinatario';
/************************************************************************************************************************************************************************/
$route['seguimiento_SE'] 		= 'publicidad_controller/seguimiento_SE';
$route['repartir_SE'] 			= 'vistaSE_controller/repartir_SE';
$route['acceso_denegado'] 		= 'vistaSE_controller/acceso_denegado';
$route['ver_foto'] 				= 'vistaSE_controller/ver_foto';
$route['n_entregas'] 			= 'vistaSE_controller/n_entregas';
$route['control_entregas'] 		= 'vistaSE_controller/control_entregas';
$route['listar_entregas'] 		= 'vistaSE_controller/listar_entregas';
/************************************************************************************************************************************************************************/
$route['usuario'] 				= 'usuario_controller/usuario';
$route['registrar_usuario'] 	= 'usuario_controller/registrar_usuario';
$route['listar_usuario'] 		= 'usuario_controller/listar_usuario';
$route['subir_imagen_perfil'] 	= 'usuario_controller/subir_imagen_perfil';
$route['obtener_usuario'] 		= 'usuario_controller/obtener_usuario';
$route['editar_usuario'] 		= 'usuario_controller/editar_usuario';
/************************************************************************************************************************************************************************/