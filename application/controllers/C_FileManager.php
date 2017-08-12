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
    public function SetFileManager()
    {
        if(isset($_FILES['file-es']))
        {
            $images = $_FILES['file-es'];

            // get file names
            $filenames = $images['name'];

            // loop and process files
            for($i=0; $i < count($filenames); $i++)
            {
                $ext = explode('.', basename($filenames[$i]));
                $file_type = "AA";
                $file_caption = $filenames[$i];
                $file_extension = array_pop($ext);
                $file_name = md5(uniqid());
                $file_path = "assets/file/".$file_name.".".$file_extension;

                if(move_uploaded_file($images['tmp_name'][$i], $file_path))
                {
                    $success = true;
                    $paths[] = $file_path;

                    $this->M_FileManager->SetFileManager($file_type, $file_name, $file_caption, $file_path, $file_extension);
                    // $success = array('file_type' => $file_type,
                    //     'file_name' => $file_name,
                    //     'file_caption' => $file_caption,
                    //     'file_path' => $file_path,
                    //     'file_extension' => $file_extension,
                    // );
                }
                else
                {
                    $success = false;
                    break;
                }
            }
            $output = ['uploaded' => $success];
            echo json_encode($output);
        }
    }
/***************************************************************************************************************************************/
    public function GetFileManager()
    {
        $GetFileManager=$this->M_FileManager->GetFileManager();
        echo json_encode($GetFileManager);
    }
/***************************************************************************************************************************************/
    public function GetFileManagerByFileID()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $GetFileManagerByFileID=$this->M_FileManager->GetFileManagerByFileID($data['file_id']);
        echo json_encode($GetFileManagerByFileID);
    }
/***************************************************************************************************************************************/
}