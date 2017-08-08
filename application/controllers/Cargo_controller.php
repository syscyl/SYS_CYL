<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cargo_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('cargo_model');
    }
/************************************************************************************************************************************************************************/
public function cargo()
{
    $this->load->view('usuario/header-usuario.html');
    $this->load->view('usuario/menu-usuario.html');
    $this->load->view('cargo/index-cargo.html');
    $this->load->view('usuario/footer-usuario.html');
}
/************************************************************************************************************************************************************************/
public function registrar_cargo()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registrar_cargo=$this->cargo_model->registrar_cargo($data);
        echo json_encode($registrar_cargo);
    }
/************************************************************************************************************************************************************************/
 /*   public function listar_cargo()
    {    
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_cargos=$this->cargo_model->listar_cargo($data['txt_nombre_cargo']);
        echo json_encode($listar_cargos);
    }*/
/************************************************************************************************************************************************************************/
  /*  public function listar_cargo_nombre()
    {    
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_cargos_nombre=$this->cargo_model->listar_cargo_nombre($data['txt_nombre_cargo']);
        echo json_encode($listar_cargos_nombre);
    }*/
/************************************************************************************************************************************************************************/
    public function listar_cargo_crud()
    {                   
        $listar_cargo_crud=$this->cargo_model->listar_cargo_crud();
        echo json_encode($listar_cargo_crud);
    }
/************************************************************************************************************************************************************************/
    public function obtener_cargo()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $obtener_cargo=$this->cargo_model->obtener_cargo($data['id_cargo']);
        echo json_encode($obtener_cargo);
    }
/************************************************************************************************************************************************************************/
    public function editar_cargo()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $editar_cargo=$this->cargo_model->editar_cargo($data);
        echo json_encode($editar_cargo);
    }
/************************************************************************************************************************************************************************/
}