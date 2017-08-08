<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cliente_model extends CI_Model {
/************************************************************************************************************************************************************************/
public function registrar_cliente($data)
  {
    $id_distrito    = $data['id_distrito'];
    $v_cliente      = $data['txt_cliente'];
    $v_ruc          = $data['txt_ruc'];
    $v_direccion    = $data['txt_direccion'];
    
    
    $query=$this->db->query("CALL sp_insert_cliente($id_distrito,'$v_cliente','$v_ruc','$v_direccion')");   
  }
/************************************************************************************************************************************************************************/
  public function listar_clientes($nombre)
  {
    $query=$this->db->query("CALL sp_get_cliente_likenombre('$nombre');");
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
  public function listar_cliente_nombre($nombre)
  {
    $query=$this->db->query("CALL sp_get_cliente_nombre('$nombre');");
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
public function listar_clientes_crud()
{
    $query=$this->db->query("CALL sp_get_cliente();");
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
  public function obtener_cliente($id_cliente)
  {
    $query=$this->db->query("CALL sp_get_editar_cliente($id_cliente);");
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
  public function editar_cliente($data)
  {
    $id_cliente     = $data['id_cliente'];
    $id_distrito    = $data['id_distrito'];
    $v_cliente      = $data['txt_cliente'];
    $v_ruc          = $data['txt_ruc'];
    $v_direccion    = $data['txt_direccion']; 
    $v_estado       = $data['chck_estado'];
    
    $query=$this->db->query("CALL sp_update_cliente($id_cliente, $id_distrito, '$v_cliente','$v_ruc', '$v_direccion',$v_estado)");   
  }
/************************************************************************************************************************************************************************/
}