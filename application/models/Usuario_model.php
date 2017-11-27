<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_model extends CI_Model {
/******************************************************************************************************************************************************************************/
	public function login_usuario($usuario, $password)
	{
		$query=$this->db->query("CALL sp_login_usuario('$usuario','$password')");

		if ($query->num_rows()==1)
		{
			return $query->row();
		}
		else
		{
			return false; 
		}
	}
/******************************************************************************************************************************************************************************/
	public function registrar_usuario($data)
  {
    $id_personal       	= $data['id_personal'];
    $v_nuevo_u    		  = $data['txt_nuevo_u'];
    $v_nuevo_p      	  = $data['txt_nuevo_p'];
    $v_foto_perfil   	  = $data['file_foto_perfil'];
    $v_observacion_u    = $data['txt_observacion_u'];
    $v_estado           = $data['chck_estado'];
   
    $query=$this->db->query("CALL sp_insert_usuario($id_personal,'$v_nuevo_u','$v_nuevo_p','$v_foto_perfil','$v_observacion_u' $v_estado)");   
  }
/******************************************************************************************************************************************************************************/
  public function listar_usuario()
  {
    $query=$this->db->query("CALL sp_get_usuarios();");
    if ($query->num_rows()>0)
    {
      return $query->result();
    }
    else
    {
      return false;
    } 
  }
/******************************************************************************************************************************************************************************/
public function obtener_usuario($idusuario)
  {
    $query=$this->db->query("CALL sp_get_editar_usuario($idusuario)");
    if ($query->num_rows()==1)
    {
      return $query->row();
    }
    else
    {
      return false; 
    } 
  }
/******************************************************************************************************************************************************************************/
public function editar_usuario($data)
  {
    $id_usuario         = $data['id_usuario'];
    $id_personal        = $data['id_personal'];
    $v_nuevo_u          = $data['txt_nuevo_u'];
    $v_nuevo_p          = $data['txt_nuevo_p'];
    $v_foto_perfil      = $data['file_foto_perfil'];
    $v_observacion_u    = $data['txt_observacion_u'];
    $v_estado           = $data['chck_estado']; 
    
    $query=$this->db->query("CALL sp_update_usuario($id_usuario, $id_personal,'$v_nuevo_u','$v_nuevo_p','$v_foto_perfil','$v_observacion_u', $v_estado)");   
  }
/******************************************************************************************************************************************************************************/
}


