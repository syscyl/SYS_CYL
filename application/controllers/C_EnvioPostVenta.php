 <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class C_EnvioPostVenta extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('M_EnvioPostVenta');
        $this->load->model('usuario_model');
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
            $response = $this->M_EnvioPostVenta->insertEnvioPostVentaDetalle($id_epostventa, 5, 'En servicio técnico',1, null);
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
        $pathfile_epostventa    =   $data['pathfile_epostventa'];

        $response = $this->M_EnvioPostVenta->insertEnvioPostVentaDetalle($id_epostventa, $id_estado, $descripccion_epdetalle, $estadodesc_epdetalle, $pathfile_epostventa);

        echo json_encode($response);
    }
/***************************************************************************************************************************************/
    public function uploadImageEPostVenta()
    {
       if(isset($_FILES['guia_epostventa']['tmp_name']))
        {   
            $archivo        =   $_FILES['guia_epostventa']['tmp_name'];        
            $nomarchivo     =   $_FILES['guia_epostventa']['name'];
            $ext            =   pathinfo($nomarchivo);
            $exte           =   strtolower($ext['extension']);
            $hoy            =   date("Ymd_His");  
            $caracteres     =   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"; 
            $numerodeletras =   10;
            $cadena         =   "";

            for($i = 0; $i < $numerodeletras; $i++)
            {
                $cadena .= substr($caracteres, rand(0, strlen($caracteres)), 1); 
            }
            $nvonomarch =   $hoy."_".$cadena.".".$exte;
            echo $destino="assets/images/guias_epostventa/".$nvonomarch;
            copy($archivo, $destino);
        } 
    }
/***************************************************************************************************************************************/
    public function deleteEPostVenta()
    {
        $json     = file_get_contents('php://input');
        $data     = json_decode($json, true);
        $response = $this->M_EnvioPostVenta->deleteEPostVenta($data['id_epostventa']);
        echo json_encode($response);
    }
/***************************************************************************************************************************************/
    public function seguimiento_EPostVenta()
    { 
        $cpostventa =    $this->input->get('cpostventa');
        $usuario    =    $this->input->get('usuario');
        $password   =    $this->input->get('password');        
        $data       =    array('cpostventa'=>$cpostventa);
        $schneider  =    $this->usuario_model->login_usuario($usuario, $password);

        if($schneider == true)
        {
            $this->load->view('usuario/header-usuario.html');
            $this->load->view('V_EnvioPostVenta/V_SeguimientoEPostVenta.php',$data);
            $this->load->view('usuario/footer-usuario.html');
        }
        else
        {
            $this->load->view('vista_SE/acceso_denegado.html');
        }      
    }
/***************************************************************************************************************************************/
    public function getEnvioPostVentaByCodigo()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $getEnvioPostVentaByCodigo=$this->M_EnvioPostVenta->getEnvioPostVentaByCodigo($data['txt_codenvio']);
        echo json_encode($getEnvioPostVentaByCodigo);
    }
/***************************************************************************************************************************************/
}