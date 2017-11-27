<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Camion_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('camion_model');
    }
/************************************************************************************************************************************************************************/
public function camion()
{
    $this->load->view('usuario/header-usuario.html');
    $this->load->view('usuario/menu-usuario.html');
    $this->load->view('camion/index-camion.html');
    $this->load->view('usuario/footer-usuario.html');
}
/************************************************************************************************************************************************************************/
    public function listar_camion()
    {    
        $listar_camion=$this->camion_model->listar_camion();
        echo json_encode($listar_camion);
    }
/************************************************************************************************************************************************************************/
  public function registrar_camion()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registrar_camion=$this->camion_model->registrar_camion($data);
        echo json_encode($registrar_camion);
    }
/************************************************************************************************************************************************************************/
    public function obtener_camion()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $obtener_camion=$this->camion_model->obtener_camion($data['id_camion']);
        echo json_encode($obtener_camion);
    }
/************************************************************************************************************************************************************************/
    public function editar_camion()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $editar_camion=$this->camion_model->editar_camion($data);
        echo json_encode($editar_camion);
    }
/************************************************************************************************************************************************************************/
}