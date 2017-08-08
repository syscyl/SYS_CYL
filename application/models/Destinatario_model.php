<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Destinatario_model extends CI_Model {
/************************************************************************************************************************************************************************/
  public function listar_destinatario()
  {
    $query=$this->db->query("CALL sp_get_destinatario();");
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
  public function obtener_destinatario($id_destinatario)
  {
    $query=$this->db->query("CALL sp_get_editar_destinatario($id_destinatario);");
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
  public function editar_destinatario($data)
  {
    $id_destinatario  = $data['id_destinatario'];
    $id_distrito      = $data['id_distrito'];
    $v_destino        = $data['txt_nombre_destino'];
    $v_direccion      = $data['txt_direccion_destino']; 
    
    $query=$this->db->query("CALL sp_update_destinatario($id_destinatario,$id_distrito,'$v_destino','$v_direccion')");   
  }
/************************************************************************************************************************************************************************/
}