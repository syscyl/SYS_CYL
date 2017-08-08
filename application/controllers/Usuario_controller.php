 <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('usuario_model');
    }
/************************************************************************************************************************************************************************/
    public function index()
    {
        switch ($this->session->userdata('nombre_cargo'))
        {
            case '':
            $this->load->view('usuario/header-usuario.html');
            $this->load->view('usuario/login-usuario.html');
            $this->load->view('usuario/footer-usuario.html');
            break;

            case 'ADMINISTRADOR':   
            $this->load->view('usuario/header-usuario.html');
            $this->load->view('usuario/menu-usuario.html');
            $this->load->view('inicio/index-inicio.html');
            $this->load->view('usuario/footer-usuario.html');
            break;

            case 'SOPORTE':
            $this->load->view('usuario/header-usuario.html');
            $this->load->view('usuario/menu-usuario.html');
            $this->load->view('inicio/index-inicio.html');
            $this->load->view('usuario/footer-usuario.html');
            break;
        }
    }
/************************************************************************************************************************************************************************/
    public function login_usuario()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $login_usuario = $this->usuario_model->login_usuario($data['txt_usuario'], $data['txt_password']);

        if($login_usuario==TRUE)
        {           
            $usuario_data = array(  
                'id_usuario'        => $login_usuario->id_usuario,
                'id_personal'       => $login_usuario->id_personal,
                'nombre_usuario'    => $login_usuario->nombre_usuario,
                'nombres_personal'  => $login_usuario->nombres_personal,
                'foto_usuario'      => $login_usuario->foto_usuario,
                'nombre_cargo'      => $login_usuario->nombre_cargo 
            ); 
            $this->session->set_userdata($usuario_data);          
            echo json_encode('<script>window.location.href="login"</script>');        
        }
        else
        {
          echo json_encode('<span style="color:red;">El usuario y/o clave son incorrectas, vuelva a intentarlo.</span>');
        } 
    }
/************************************************************************************************************************************************************************/
    public function logout_usuario() 
    {
        $this->session->sess_destroy();           
        echo '<script> sessionStorage.clear(); window.location.href="login"</script>';
    }
/************************************************************************************************************************************************************************/
    public function informacion_usuario()
    {
        // $data= array(                   
        // 'nombre_usuario'    => $this->session->userdata('nombre_usuario'),
        // 'nombres_personal'  => $this->session->userdata('nombres_personal'),
        // 'foto_usuario'      =>$this->session->userdata('foto_usuario'),   
        // 'nombre_cargo'      =>$this->session->userdata('nombre_cargo')              
        // ); 
        $idusuario=$this->session->userdata('id_usuario');
        $obtener_usuario=$this->usuario_model->obtener_usuario($idusuario);
        echo json_encode($obtener_usuario);
    }
/************************************************************************************************************************************************************************/
    public function usuario() 
    {
        $this->load->view('usuario/header-usuario.html');
        $this->load->view('usuario/menu-usuario.html');
        $this->load->view('usuario/index-usuario.html');
        $this->load->view('usuario/footer-usuario.html');
    }
/************************************************************************************************************************************************************************/
    public function registrar_usuario()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $registrar_usuario=$this->usuario_model->registrar_usuario($data);
        echo json_encode($registrar_usuario);
    }
    /************************************************************************************************************************************************************************/
    public function subir_imagen_perfil()
    {
       if(isset($_FILES['imagen']['tmp_name']))
        {   
            $archivo=$_FILES['imagen']['tmp_name'];        
            $nomarchivo=$_FILES['imagen']['name'];
            $ext=pathinfo($nomarchivo);
            $exte = strtolower($ext['extension']); 

            $hoy = date("Ymd_His");  
            $caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"; 
            $numerodeletras=10;
            $cadena = "";

            for($i=0;$i<$numerodeletras;$i++)
            {
                $cadena .= substr($caracteres,rand(0,strlen($caracteres)),1); 
            }
            $nvonomarch=$hoy."_".$cadena.".".$exte;
            echo $destino="assets/images/Perfiles/".$nvonomarch;
            copy($archivo,$destino);
        } 
    }
    /************************************************************************************************************************************************************************/
        public function listar_usuario()
    {    
        $listar_usuario=$this->usuario_model->listar_usuario();
        echo json_encode($listar_usuario);
    }
    /************************************************************************************************************************************************************************/
    public function obtener_usuario()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $obtener_usuario=$this->usuario_model->obtener_usuario($data['id_usuario']);
        echo json_encode($obtener_usuario);
    }
    /************************************************************************************************************************************************************************/
    public function editar_usuario()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $editar_usuario=$this->usuario_model->editar_usuario($data);
        echo json_encode($editar_usuario);
    }
    /************************************************************************************************************************************************************************/
}