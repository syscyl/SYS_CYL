<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_FileManager extends CI_Model {
/***************************************************************************************************************************************/
    //Insertar un archivo.
	public function SetFileManager($file_type, $file_name, $file_caption, $file_path, $file_extension)
	{
        $this->db->query("CALL SP_SetFileManager('$file_type', '$file_name', '$file_caption', '$file_path', '$file_extension')");
	}
/***************************************************************************************************************************************/
    //Obtener todos los archivos.
    public function GetFileManager()
    {
        $query=$this->db->query("CALL SP_GetFileManager(0);");
        if ($query->num_rows()>0)
        {
          return $query->result();
        }
        else
        {
          return false;
        }
    }
/***************************************************************************************************************************************/
    //Obtener un archivo por id.
    public function GetFileManagerByFileID($file_id)
    {
        $query=$this->db->query("CALL SP_GetFileManager($file_id);");
        if ($query->num_rows()==1)
        {
            mysqli_next_result($this->db->conn_id);
            return $query->row();
        }
        else
        {
          return false; 
        }
    }
/***************************************************************************************************************************************/
    //Eliminar un archivo por id.
    public function DeleteFileManagerByFileID($file_id)
    {
        $query = $this->db->query("CALL SP_DeleteFileManagerByFileID($file_id)");
     
    }
/***************************************************************************************************************************************/
}