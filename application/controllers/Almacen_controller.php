<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Almacen_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('almacen_model');
        $this->load->model('M_EnvioPostVenta');
    }
/************************************************************************************************************************************************************************/
    public function almacen() 
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('usuario/menu-usuario.html');
        $this->load->view('almacen/index-almacen.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
    public function envio() 
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('usuario/menu-usuario.html');
        $this->load->view('almacen/index-envio.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
    public function listar_lote()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_lote=$this->almacen_model->listar_lote($data);
        echo json_encode($listar_lote);
    }
/************************************************************************************************************************************************************************/
    public function registrar_lote()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registrar_lote=$this->almacen_model->registrar_lote($data);
        echo json_encode($registrar_lote);
    }
    /************************************************************************************************************************************************************************/
    public function eliminar_lote()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $eliminar_lote=$this->almacen_model->eliminar_lote($data);
        echo json_encode($eliminar_lote);
    }
/************************************************************************************************************************************************************************/
  
    public function subir_imagen()
    {
       if(isset($_FILES['imagen']['tmp_name']))
        {   
            $archivo=$_FILES['imagen']['tmp_name'];        
            $nomarchivo=$_FILES['imagen']['name'];
            $ext=pathinfo($nomarchivo);
            $exte = strtolower($ext['extension']); 

            $hoy = date("Ymd_His");  
            $caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"; 
            $numerodeletras=10;
            $cadena = "";

            for($i=0;$i<$numerodeletras;$i++)
            {
                $cadena .= substr($caracteres,rand(0,strlen($caracteres)),1); 
            }
            $nvonomarch=$hoy."_".$cadena.".".$exte;
            echo $destino="assets/images/GUIAS/".$nvonomarch;
            copy($archivo,$destino);
        } 
    }
/************************************************************************************************************************************************************************/
    public function registrar_destinatario()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registrar_destinatario=$this->almacen_model->registrar_destinatario($data);
        echo json_encode($registrar_destinatario);
    }
/************************************************************************************************************************************************************************/
    public function listar_destinatarios()
    {    
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_destinatarios=$this->almacen_model->listar_destinatarios($data['txt_nombre_destinatario']);
        echo json_encode($listar_destinatarios);
    }
/************************************************************************************************************************************************************************/
    public function listar_destinatario_nombre()
    {    
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_destinatario_nombre=$this->almacen_model->listar_destinatario_nombre($data['txt_nombre_destinatario']);
        echo json_encode($listar_destinatario_nombre);
    }
/************************************************************************************************************************************************************************/
    public function obtener_envio_lote()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $obtener_envio_lote=$this->almacen_model->obtener_envio_lote($data['id_lote']);
        echo json_encode($obtener_envio_lote);
    }
/************************************************************************************************************************************************************************/
    public function cambiar_estado_envio()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $cambiar_estado_envio=$this->almacen_model->cambiar_estado_envio($data['id_envio'],$data['id_estado'],$data['observacion'],$data['estado_detalle'],$data['file_fotoguia_lote']);
        echo json_encode($cambiar_estado_envio);
    }
/************************************************************************************************************************************************************************/
    public function cambiar_estado_envio2()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $count=count($data['all_idenvio']);    
        for ($i = 0; $i < $count; $i++)
        {
            $cambiar_estado_envio=$this->almacen_model->cambiar_estado_envio($data['all_idenvio'][$i],'2',"Material en trayecto al cliente.",'1');
        }
        echo json_encode($cambiar_estado_envio);
    }
/************************************************************************************************************************************************************************/
    public function listar_envio_estado()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_envio_estado=$this->almacen_model->listar_envio_estado($data['id_lote'],$data['id_estado']);
        echo json_encode($listar_envio_estado);
    }
/************************************************************************************************************************************************************************/
    public function listar_envio()
    {
        $listar_envio=$this->cyl_model->listar_envio();
        echo json_encode($listar_envio);
    }
/************************************************************************************************************************************************************************/
    public function consultar_envio()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $consultar_envio=$this->almacen_model->consultar_envio($data['txt_cod_envio']);
        echo json_encode($consultar_envio);
    }
/************************************************************************************************************************************************************************/
    public function consultar_envio_SE()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $consultar_envio=$this->almacen_model->consultar_envio_SE($data['txt_codenvio']);
        echo json_encode($consultar_envio);
    }

/************************************************************************************************************************************************************************/
    public function registrar_guia_SE()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registro=$this->almacen_model->registro_guia_SE($data['txt_codenvio']);
        echo json_encode($registro);
    }
/************************************************************************************************************************************************************************/
    public function registrar_guia_SE2()
    {
        $json         = file_get_contents('php://input');
        $data         = json_decode($json,TRUE);        
        $tipo_entrega = $data['tipo_entrega'];
        $count        = count($data['n_entregas']);

        for ($i = 0; $i < $count; $i++)
        {
            if($tipo_entrega == 0) {
                $registro = $this->almacen_model->registro_guia_SE($data['n_entregas'][$i]);
            }
            else if($tipo_entrega == 1) {
                $registro = $this->M_EnvioPostVenta->insert_EnvioPostVenta($data['n_entregas'][$i]);
            }
        }
       
        echo json_encode($registro);
    }
/************************************************************************************************************************************************************************/
    public function listar_departamento()
    {
        $listar_departamento=$this->almacen_model->listar_departamento();
        echo json_encode($listar_departamento);
    }
/************************************************************************************************************************************************************************/
    public function listar_provincia()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_provincia=$this->almacen_model->listar_provincia($data['id_departamento']);
        echo json_encode($listar_provincia);
    }
/************************************************************************************************************************************************************************/
    public function listar_distrito()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_distrito=$this->almacen_model->listar_distrito($data['id_provincia']);
        echo json_encode($listar_distrito);
    }
/************************************************************************************************************************************************************************/
    public function editar_lote()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $editar_lote=$this->almacen_model->editar_lote($data);
        echo json_encode($editar_lote);
    }
/************************************************************************************************************************************************************************/
}