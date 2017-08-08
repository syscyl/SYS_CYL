<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Camion_model extends CI_Model {
/************************************************************************************************************************************************************************/
  public function listar_camion()
  {
    $query=$this->db->query("CALL sp_get_camion();");
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
public function registrar_camion($data)
  {
    $v_placa       = $data['txt_placa'];
    $v_color       = $data['txt_color'];    
    
    $query=$this->db->query("CALL sp_insert_camion('$v_placa','$v_color')");   
  }
/************************************************************************************************************************************************************************/
  public function obtener_camion($id_camion)
  {
    $query=$this->db->query("CALL sp_get_editar_camion($id_camion);");
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
  public function editar_camion($data)
  {
    $id_camion  = $data['id_camion'];
    $v_placa    = $data['txt_placa'];
    $v_color    = $data['txt_color'];
    $v_estado   = $data['chck_estado'];
    
    $query=$this->db->query("CALL sp_update_camion($id_camion,'$v_placa','$v_color', $v_estado)");   
  }
/************************************************************************************************************************************************************************/
}