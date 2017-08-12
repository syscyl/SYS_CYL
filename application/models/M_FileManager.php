<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_FileManager extends CI_Model {
/***************************************************************************************************************************************/
	public function SetFileManager($file_type, $file_name, $file_caption, $file_path, $file_extension)
	{
        $this->db->query("CALL SP_SetFileManager('$file_type', '$file_name', '$file_caption', '$file_path', '$file_extension')");
	}
/***************************************************************************************************************************************/
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
    public function GetFileManagerByFileID($file_id)
    {
        $query=$this->db->query("CALL SP_GetFileManager($file_id);");
        if ($query->num_rows()==1)
        {
          return $query->row();
        }
        else
        {
          return false; 
        }
    }
/***************************************************************************************************************************************/
}