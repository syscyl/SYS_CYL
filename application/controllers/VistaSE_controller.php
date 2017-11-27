<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class VistaSE_controller extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('almacen_model');
    }
/************************************************************************************************************************************************************************/
    public function repartir_SE()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('vista_SE/repartir_SE.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
    public function acceso_denegado()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('vista_SE/acceso_denegado.html');
        $this->load->view('usuario/footer-usuario.html');
    }
    public function ver_foto()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('vista_SE/ver_foto.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
public function n_entregas()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('usuario/menu-usuario.html');
        $this->load->view('vista_SE/n_entregas.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
public function control_entregas()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('usuario/menu-usuario.html');
        $this->load->view('vista_SE/control_entregas.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
public function listar_entregas()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $listar_entregas=$this->almacen_model->listar_entregas($data);
        echo json_encode($listar_entregas);
    }
}
