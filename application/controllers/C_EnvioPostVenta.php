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
        $data = json_decode($json, true);
        $getEnvioPostVenta=$this->M_EnvioPostVenta->getEnvioPostVenta($data);
        echo json_encode($getEnvioPostVenta);
    }
/***************************************************************************************************************************************/

    public function getEnvioPostVentaById()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $getEnvioPostVentaById=$this->M_EnvioPostVenta->getEnvioPostVentaById($data);
        echo json_encode($getEnvioPostVentaById);
    }
/***************************************************************************************************************************************/
    public function insertSTEnvioPostVentaDetalle()
    {
        $json      =    file_get_contents('php://input');
        $data      =    json_decode($json, true);
        $count     =    count($data['all_id_epostventa']);    
        for ($i = 0; $i < $count; $i++)
        {
            $id_epostventa = $data['all_id_epostventa'][$i];
            $response = $this->M_EnvioPostVenta->insertEnvioPostVentaDetalle($id_epostventa, 5, 'En servicio técnico',1);
        }
        echo json_encode($response);
    }
/***************************************************************************************************************************************/

    public function getStatusByIdePostVenta()
    {
        $json      =    file_get_contents('php://input');
        $data      =    json_decode($json, true);
        $respponse =    $this->M_EnvioPostVenta->getStatusByIdePostVenta($data);
        echo json_encode($respponse);
    }
/***************************************************************************************************************************************/
    public function insertEnvioPostVentaDetalle()
    {
        $json                   =   file_get_contents('php://input');
        $data                   =   json_decode($json, true);         
        $id_epostventa          =   $data['id_epostventa'];
        $id_estado              =   $data['id_estado'];
        $descripccion_epdetalle =   $data['descripccion_epdetalle'];
        $estadodesc_epdetalle   =   $data['estadodesc_epdetalle'];

        $response = $this->M_EnvioPostVenta->insertEnvioPostVentaDetalle($id_epostventa, $id_estado, $descripccion_epdetalle, $estadodesc_epdetalle);

        echo json_encode($response);
    }
/***************************************************************************************************************************************/
}