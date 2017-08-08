<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cargo_model extends CI_Model {
/************************************************************************************************************************************************************************/
public function registrar_cargo($data)
  {
    $v_nombre         = $data['txt_nombre_cargo'];       
    $v_observaciones  = $data['txt_observaciones'];
    $v_estado         = $data['cbo_estado_cargo'];    
    
    $query=$this->db->query("CALL sp_insert_cargo('$v_nombre','$v_observaciones',$v_estado)");   
  }
/************************************************************************************************************************************************************************/
public function listar_cargo_crud()
{
    $query=$this->db->query("CALL sp_get_cargo();");
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
public function listar_cargo($nombre)
  {
    $query=$this->db->query("CALL sp_get_cargo_likenombre('$nombre');");
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
  public function listar_cargo_nombre($nombre)
  {
    $query=$this->db->query("CALL sp_get_cargo_nombre('$nombre');");
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
public function obtener_cargo($id_cargo)
  {
    $query=$this->db->query("CALL sp_get_editar_cargo($id_cargo);");
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
  public function editar_cargo($data)
  {
    $id_cargo         = $data['id_cargo'];
    $v_cargo          = $data['txt_nombre_cargo'];
    $v_observaciones  = $data['txt_observaciones']; 
    $v_estado         = $data['chck_estado'];
    
    $query=$this->db->query("CALL sp_update_cargo($id_cargo,'$v_cargo','$v_observaciones', $v_estado)");   
  }
/************************************************************************************************************************************************************************/
}