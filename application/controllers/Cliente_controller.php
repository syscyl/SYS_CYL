<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cliente_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('cliente_model');
    }
/************************************************************************************************************************************************************************/
public function cliente()
{
    $this->load->view('usuario/header-usuario.html');
    $this->load->view('usuario/menu-usuario.html');
    $this->load->view('cliente/index-cliente.html');
    $this->load->view('usuario/footer-usuario.html');
}
/************************************************************************************************************************************************************************/
public function registrar_cliente()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registrar_cliente=$this->cliente_model->registrar_cliente($data);
        echo json_encode($registrar_cliente);
    }
/************************************************************************************************************************************************************************/
    public function listar_clientes()
    {    
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_cliente=$this->cliente_model->listar_clientes($data['txt_nombre_remitente']);
        echo json_encode($listar_cliente);
    }
/************************************************************************************************************************************************************************/
    public function listar_cliente_nombre()
    {    
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_cliente_nombre=$this->cliente_model->listar_cliente_nombre($data['txt_nombre_remitente']);
        echo json_encode($listar_cliente_nombre);
    }
/************************************************************************************************************************************************************************/
    public function listar_cliente_crud()
    {                   
        $listar_cliente_crud=$this->cliente_model->listar_clientes_crud();
        echo json_encode($listar_cliente_crud);
    }
/************************************************************************************************************************************************************************/
    public function obtener_cliente()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $obtener_cliente=$this->cliente_model->obtener_cliente($data['id_cliente']);
        echo json_encode($obtener_cliente);
    }
/************************************************************************************************************************************************************************/
    public function editar_cliente()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $editar_cliente=$this->cliente_model->editar_cliente($data);
        echo json_encode($editar_cliente);
    }
/************************************************************************************************************************************************************************/
}