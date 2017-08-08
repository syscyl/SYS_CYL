<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Almacen_model extends CI_Model {
	
/************************************************************************************************************************************************************************/
  public function registrar_lote($data)
  {
    $id_cliente     = $data['id_cliente'];
    $id_destinatario= $data['id_destinatario']; 
    $v_fecha        = $data['txt_fecha_lote'];
    $v_hora         = $data['txt_hora_lote'];
    $v_guiacliente  = $data['txt_guiac_lote'];
    $v_fotoguia     = $data['file_fotoguia_lote'];
    $v_cantidad     = $data['txt_cantidad_lote'];
    $v_observacion  = $data['txt_observacion_lote'];
    $id_usuario     =$this->session->userdata('id_usuario');

    $query=$this->db->query("CALL sp_insert_lote($id_cliente,$id_destinatario,$id_usuario,'$v_fecha','$v_hora','$v_guiacliente','$v_fotoguia','$v_cantidad','$v_observacion')");   
  }
  /************************************************************************************************************************************************************************/
    public function eliminar_lote($data)
    {
	$id_lote    = $data['id_lote'];       
	
	$query=$this->db->query("CALL sp_delete_lote($id_lote)");   
    }
/************************************************************************************************************************************************************************/
    public function registrar_destinatario($data)
    {    
        $id_distrito    = $data['id_distrito']; 
        $v_nombre       = $data['txt_nombre_destino'];      
        $v_direccion    = $data['txt_direccion_destino'];
        $query=$this->db->query("CALL sp_insert_destinatario($id_distrito,'$v_nombre','$v_direccion')");   
    }
/************************************************************************************************************************************************************************/
  public function listar_destinatarios($nombre)
  {
    $query=$this->db->query("CALL sp_get_destinatario_likenombre('$nombre');");
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
  public function listar_destinatario_nombre($nombre)
  {
    $query=$this->db->query("CALL sp_get_destinatario_nombre('$nombre');");
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
  public function listar_lote($data)
  {
    $v_fechai = $data['txt_fecha_inicio'];
    $v_fechaf = $data['txt_fecha_fin'];

    $query=$this->db->query("CALL sp_get_lote('$v_fechai','$v_fechaf');");
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
  public function obtener_envio_lote($id_lote)
  {
    $query=$this->db->query("CALL sp_get_envio_lote($id_lote);");
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
  public function cambiar_estado_envio($id_envio,$id_estado,$observacion,$estado,$foto_guia)
  {
    $id_usuario = $this->session->userdata('id_usuario');
    $query=$this->db->query("CALL sp_update_estado_envio($id_envio,$id_estado,$id_usuario,'$observacion',$estado,'$foto_guia');");
  }
/************************************************************************************************************************************************************************/
  public function listar_envio_estado($id_lote,$id_estado)
  {   
    $query=$this->db->query("CALL sp_get_envio_estado($id_lote,$id_estado);");
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
  public function consultar_envio($txt_codenvio)
  {
    $query=$this->db->query("CALL sp_get_codenvio('$txt_codenvio');");
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
  public function consultar_envio_SE($txt_codenvio)
  {
    $query=$this->db->query("CALL sp_get_codenvio_SE('$txt_codenvio')");
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
  public function registro_guia_SE($txt_codenvio)
  {    
    $query=$this->db->query("CALL sp_insert_lote_SE(2,'$txt_codenvio');"); 
  }
/************************************************************************************************************************************************************************/
  public function listar_departamento()
  {
    $query=$this->db->query("CALL sp_get_departamento()");
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
 public function listar_provincia($id_departamento)
  {
    $query=$this->db->query("CALL sp_get_provincia($id_departamento)");
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
 public function listar_distrito($id_provincia)
  {
    $query=$this->db->query("CALL sp_get_distrito($id_provincia)");
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
  public function editar_lote($data)
  {
    $id_lote        = $data['id_lote'];
    $id_cliente     = $data['id_cliente'];
    $id_destinatario= $data['id_destinatario']; 
    $v_fecha        = $data['txt_fecha_lote'];
    $v_guiacliente  = $data['txt_guiac_lote'];   
    $v_cantidad     = $data['txt_cantidad_lote'];
    $v_observacion  = $data['txt_observacion_lote'];
    $v_foto_guia    = $data['file_fotoguia_lote'];

    $query=$this->db->query("CALL sp_update_lote($id_lote,'$v_observacion',$v_cantidad,'$v_guiacliente','$v_fecha','$v_foto_guia',$id_destinatario,$id_cliente)");   
  }
/************************************************************************************************************************************************************************/
public function listar_entregas($data)
  {
    $v_fechai = $data['txt_fecha_inicio'];
    $v_fechaf = $data['txt_fecha_fin'];

    $query=$this->db->query("CALL sp_get_entregas('$v_fechai','$v_fechaf');");
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
}

   
