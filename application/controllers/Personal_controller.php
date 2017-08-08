<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Personal_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('personal_model');
    }
/************************************************************************************************************************************************************************/
public function personal()
{
    $this->load->view('usuario/header-usuario.html');
    $this->load->view('usuario/menu-usuario.html');
    $this->load->view('personal/index-personal.html');
    $this->load->view('usuario/footer-usuario.html');
}
/************************************************************************************************************************************************************************/
public function registrar_personal()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registrar_personal=$this->personal_model->registrar_personal($data);
        echo json_encode($registrar_personal);
    }
/************************************************************************************************************************************************************************/
public function listar_personal()
    {
        $listar_personal=$this->personal_model->listar_personal();
        echo json_encode($listar_personal);
    }
/************************************************************************************************************************************************************************/
public function obtener_personal()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $obtener_personal=$this->personal_model->obtener_personal($data['id_personal']);
        echo json_encode($obtener_personal);
    }
/************************************************************************************************************************************************************************/
public function editar_personal()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $editar_personal=$this->personal_model->editar_personal($data);
        echo json_encode($editar_personal);
    }
/************************************************************************************************************************************************************************/
}