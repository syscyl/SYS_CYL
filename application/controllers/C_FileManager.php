 <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class C_FileManager extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('M_FileManager');
    }
/***************************************************************************************************************************************/
    public function V_FileManager()
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('usuario/menu-usuario.html');
        $this->load->view('V_FileManager/V_FileManager');
        $this->load->view('usuario/footer-usuario.html');
    }
/***************************************************************************************************************************************/
}