<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class destinatario_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('destinatario_model');
    }
/************************************************************************************************************************************************************************/
public function destinatario()
{
    $this->load->view('usuario/header-usuario.html');
    $this->load->view('usuario/menu-usuario.html');
    $this->load->view('destinatario/index-destinatario.html');
    $this->load->view('usuario/footer-usuario.html');
}
/************************************************************************************************************************************************************************/
    public function listar_destinatario()
    {                   
        $listar_destinatario=$this->destinatario_model->listar_destinatario();
        echo json_encode($listar_destinatario);
    }
/************************************************************************************************************************************************************************/
    public function obtener_destinatario()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $obtener_destinatario=$this->destinatario_model->obtener_destinatario($data['id_destinatario']);
        echo json_encode($obtener_destinatario);
    }
/************************************************************************************************************************************************************************/
    public function editar_destinatario()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $editar_destinatario=$this->destinatario_model->editar_destinatario($data);
        echo json_encode($editar_destinatario);
    }
/************************************************************************************************************************************************************************/
}