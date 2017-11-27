<!DOCTYPE html>
<html lang="en">
<page style="font-size: 8pt;font-family: sans-serif ;">

<head>
	<meta charset="utf-8">
	<title>PDF Created</title>


	<style type="text/css">
	.normal {
  width: 1050px;
  border: 1px solid #000;
  border-collapse: collapse;
}
.normal th, .normal td {
  border: 1px solid #000;
}
</style>
</head>
<body>
<?php       $empresa1 = $this->session->userdata('id_empresa');
            $mes1 = $this->session->userdata('mes');
            $año1 = $this->session->userdata('año');
           if($mes1==01){$mes_nombre="ENERO";} else if($mes1==02){$mes_nombre="FEBRERO";}else if($mes1==03){$mes_nombre="MARZO";}else if($mes1==04){$mes_nombre="ABRIL";}else if($mes1==05){$mes_nombre="MAYO";}else if($mes1==06){$mes_nombre="JUNIO";}else if($mes1==07){$mes_nombre="JULIO";}else if($mes1==08){$mes_nombre="AGOSTO";}else if($mes1==09){$mes_nombre="SEPTIEMBRE";}else if($mes1==10){$mes_nombre="OCTUBRE";}else if($mes1==11){$mes_nombre="NOVIEMBRE";}else if($mes1==12){$mes_nombre="DICIEMBRE";}
            $consuta4 = $this->ebenezer_model->consultaventa($empresa1,$mes1,$año1);
                $suma1=0;
                $suma2=0;
                $suma3=0;
                 if($consuta4==TRUE){
                foreach($consuta4 as $fila)
                
            {             
              $nombre2=$fila->nombre;
              $nroruc=$fila->ruc;}?>

<span align="center" style="font-size: 15px">
<table  width="1050px" border="0"><tr><td align="left" width="230"><sup><b><?=$nombre2?></b><BR><span style="font-size: 12px">RUC&nbsp;&nbsp;N°<?=$nroruc?></span>
      </sup></td>
     <td ><u><b>REGISTRO DE VENTAS&nbsp;&nbsp;<?=$mes_nombre?>&nbsp;-&nbsp;<?=$año1?></b></u></td>
     <td align="right" style="font-size: 12px">Fecha de Impresión:&nbsp;&nbsp;<?=date("d/m/Y")?></td>
   </tr></table>


<!--table  width="1050px" border="0"><tr><td align="left" width="250">&nbsp;&nbsp;
     </td>
     <td><b></b></td></tr></table>-->
    </span><br>


 <table class="normal">
               
                   <thead style="font-weight:bold;background-color:#C9D2D8; text-transform: uppercase; " >
                  
                      <tr>
                        <th>O.</th>
                        <th >Vou</th>
                        <th>Fecha D.</th>                        
                        <th>Doc.</th>
                        <th>Serie</th>
                       <th>Nº Doc.</th>
                        <th>Doc. Iden</th>
                        <th>Nº Doc. Iden</th>
                        <th>Razón Social</th>
                        <th>B. Imp.</th>
                        <th>I.G.V.</th>
                        <th>Total</th>
                        <!-- <th>Glosa</th>                        -->

                      </tr>                    
                   
                  </thead>
                  <tbody> 
                   
             
                      
<?php
            if($consuta4==TRUE){
            foreach($consuta4 as $fila)
                
            {
              $bimpo=$fila->b_imponible_cont;
              $igvc=$fila->igv_cont;
              $mont=$fila->monto_cont;
              $tipocont=$fila->tipo_compro_cont;
              $tipodoc=$fila->tipo_docu_cont;
              $seriedoc=$fila->serie_docu_cont;
              $nrodoc=$fila->nro_docu_cont;
              $tipodoci=$fila->tipo_docui_cp;
              $nrodoci=$fila->nro_docui_cp;
              $idvou=$fila->id_contabilidad;
              $nombre=$fila->nombre_emp_cp;

              $suma1=$suma1+$bimpo;
              $suma2=$suma2+$igvc;
              $suma3=$suma3+$mont;

              $fechad=$fila->fecha_docu_cont;
              $fechay=strtotime($fechad);                               
              $fechax=date('d/m/Y',  $fechay); 

             $bimpo2=number_format($bimpo, 2);
             $igvc2=number_format($igvc, 2);
             $mont2=number_format($mont, 2);

             $totalbi=number_format($suma1, 2);
             $totaligv=number_format($suma2, 2);
             $totalmont=number_format($suma3, 2);

       
            
          echo '<tr align="center" >
                       <td >'.$tipocont.'</td>

                      <td >'.$idvou.'                   
                      </td>

                       <td >'.$fechax.'
                      </td>

                      

                      <td >
                       '.$tipodoc.'
                      </td>

                      <td >
                       '.$seriedoc.'
                      </td>

                      <td >
                       '.$nrodoc.'
                      </td>

                      <td>
                       '.$tipodoci.'
                      </td>

                      <td >
                        '.$nrodoci.'
                      </td>

                      <td align="rigth">
                       '.$nombre.'
                      </td>

                      <td >
                        '.$bimpo2.'
                      </td>

                      <td>
                       '.$igvc2.'
                      </td>

                      <td >
                       '.$mont2.'
                      </td>

                     
                     
                   </tr>';

                    // <td>
                    //     '.$fila->glosa.'
                    //   </td>

  }}?>
  

               
                 <!-- <thead style="background-color:#2a5c8b;" >
                  
                      <tr align="right" role="row">
                      <th colspan="20"></th>
                        <th >Base Imponible</th>
                        <th>I.G.V.</th>
                        <th>Total</th>
                         </tr>                    
                   
                  </thead>
                  <tbody > -->
                    
                    <tr align="center">
                    <td colspan="9" align="right" style="background-color: #C9D2D8;"><b>TOTAL GENERAL:</b></td>

                      <td   >
                       <?='S/. '.$totalbi?>
                      </td>

                      <td >
                        <?='S/. '.$totaligv?>
                      </td>
                      <td >
                        <?='S/. '.$totalmont?>
                      </td>

      
                    </tr>

<!-- </tbody> -->
 </tbody>
                </table>

<?php } else { echo '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<center><span style="font-size: 60px">NO HAY REGISTROS!</span></center>';}?>
</body>

</page>
</html>