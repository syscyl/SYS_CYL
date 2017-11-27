<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Publicidad_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('usuario_model');
    }
/************************************************************************************************************************************************************************/
    public function index()
    {
        $this->load->view('publicidad/index.html');
    }
/************************************************************************************************************************************************************************/
    public function nosotros() 
    {
        $this->load->view('publicidad/nosotros/index.html');
    }
/************************************************************************************************************************************************************************/
    public function servicios() 
    {
        $this->load->view('publicidad/servicios/index.html');
    }
/************************************************************************************************************************************************************************/
    public function galeria() 
    {
        $this->load->view('publicidad/galeria/index.html');
    }
/************************************************************************************************************************************************************************/
    public function contacto() 
    {
        $this->load->view('publicidad/contacto/index.html');
    }
/************************************************************************************************************************************************************************/
    public function seguimiento()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('publicidad/seguimiento/index.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
    public function seguimiento_SE()
    {       

        $guia=$this->input->get('guia');
        $usuario=$this->input->get('usuario');
        $password=$this->input->get('password');
        
        $data = array('guia'=>$guia);

        $schneider = $this->usuario_model->login_usuario($usuario, $password);

        if($schneider==TRUE)
        {
            $this->load->view('usuario/header-usuario.html');
            $this->load->view('seguimiento_SE/seguimiento_SE.php',$data);
            $this->load->view('usuario/footer-usuario.html');

        }
        else
        {
            $this->load->view('vista_SE/acceso_denegado.html');
        }      
    }
/************************************************************************************************************************************************************************/
}