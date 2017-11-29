<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_EnvioPostVenta extends CI_Model {
/***************************************************************************************************************************************/
    
	public function insert_EnvioPostVenta($codigo_epostventa)
	{
        $this->db->query("CALL SP_Insert_EnvioPostVenta('$codigo_epostventa')");
	}
/***************************************************************************************************************************************/

    public function getEnvioPostVenta($data)
    {
        $v_fechai = $data['txt_fecha_inicio'];
        $v_fechaf = $data['txt_fecha_fin'];

        $query=$this->db->query("CALL SP_getEnvioPostVenta('$v_fechai','$v_fechaf');");
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
    public function getEnvioPostVentaById($data)
    {
        $id_epostventa = $data['id_epostventa'];        

        $query=$this->db->query("CALL SP_getEnvioPostVentaById($id_epostventa);");
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
    public function insertEnvioPostVentaDetalle($id_epostventa, $id_estado, $descripccion_epdetalle, $estadodesc_epdetalle)
    {
        $this->db->query("CALL SP_Insert_EnvioPostVentaDetalle($id_epostventa, $id_estado, '$descripccion_epdetalle', $estadodesc_epdetalle)");
    }
/***************************************************************************************************************************************/
    public function getStatusByIdePostVenta($data)
    {
        $id_epostventa = $data['id_epostventa'];
        $id_estado     = $data['id_estado'];

        $query=$this->db->query("CALL SP_getStatusByIdePostVenta($id_epostventa, $id_estado);");
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
}