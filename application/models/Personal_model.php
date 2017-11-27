<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class personal_model extends CI_Model {
/************************************************************************************************************************************************************************/
public function registrar_personal($data)
  {
    $id_cargo       = $data['id_cargo'];
    $id_distrito    = $data['id_distrito'];    
    $v_nombres      = $data['txt_nombres'];
    $v_apellidos    = $data['txt_apellidos'];
    $v_dni          = $data['txt_dni'];
    $v_telefono     = $data['txt_telefono'];            
    $v_direccion    = $data['txt_direccion'];    
    
    $query=$this->db->query("CALL sp_insert_personal($id_cargo,$id_distrito,'$v_nombres','$v_apellidos','$v_dni','$v_telefono','$v_direccion')");   
  }
/************************************************************************************************************************************************************************/
public function listar_personal()
  {
    $query=$this->db->query("CALL sp_get_personal()");
    if ($query->num_rows()>0)
    {
      return $query->result();
    }
    else
    {
      return false;
    } 
  }
/************************************************************************************************************************************************************************/
public function obtener_personal($idpersonal)
  {
    $query=$this->db->query("CALL sp_get_info_personal($idpersonal)");
    if ($query->num_rows()==1)
    {
      return $query->row();
    }
    else
    {
      return false; 
    } 
  }
/************************************************************************************************************************************************************************/
public function editar_personal($data)
  {
    $id_personal    = $data['id_personal'];
    $id_cargo       = $data['id_cargo'];
    $id_distrito    = $data['id_distrito'];    
    $v_nombres      = $data['txt_nombres'];
    $v_apellidos    = $data['txt_apellidos'];
    $v_dni          = $data['txt_dni'];
    $v_telefono     = $data['txt_telefono'];            
    $v_direccion    = $data['txt_direccion'];
    $v_estado       = $data['chck_estado'];
    
    $query=$this->db->query("CALL sp_update_personal($id_personal, $id_cargo,$id_distrito,'$v_nombres','$v_apellidos','$v_dni','$v_telefono','$v_direccion', $v_estado)");   
  }
/************************************************************************************************************************************************************************/
}
