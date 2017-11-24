 <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class C_EnvioPostVenta extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('M_EnvioPostVenta');
    }
/***************************************************************************************************************************************/    
    public function V_EnvioPostVenta()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('usuario/menu-usuario.html');
        $this->load->view('V_EnvioPostVenta/V_EnvioPostVenta');
        $this->load->view('usuario/footer-usuario.html');
    }
/***************************************************************************************************************************************/

    public function getEnvioPostVenta()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $getEnvioPostVenta=$this->M_EnvioPostVenta->getEnvioPostVenta($data);
        echo json_encode($getEnvioPostVenta);
    }
/***************************************************************************************************************************************/

    public function getEnvioPostVentaById()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $getEnvioPostVentaById=$this->M_EnvioPostVenta->getEnvioPostVentaById($data);
        echo json_encode($getEnvioPostVentaById);
    }
/***************************************************************************************************************************************/

}