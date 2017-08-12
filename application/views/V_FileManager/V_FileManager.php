<style>
    .table-fixed thead
    {   
      background-color: #139843;
      color:white;
    }
    .dataTables_wrapper.no-footer .dataTables_scrollBody
    {
        border-bottom: 1px solid #eaeaea;
    }
</style>
<section id="main-content" class=" ">
    <section class="wrapper" style='margin-top:60px;display:inline-block;width:100%;padding:15px 0 0 15px;'>
        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div class="page-title">
                <div class="pull-left">
                    <h1 class="title">Administrador de archivos</h1>
                </div>
            </div>
        </div>           
        <div class="col-lg-12">
            <section class="box ">
                <header class="panel_header">
                    <div class="pull-left title">
                        <div class="col-md-3">
                            &nbsp;
                        </div>
                    </div>
                    <div class="actions panel_actions pull-right">
                        <i class="box_toggle fa fa-chevron-down"></i>
                    </div>
                </header>
                <div class="content-body">    
                    <div class="row">
                        <div class="col-md-6 col-sm-12 col-xs-12" style="padding-top: 5px;"> 

                            <!-- BEGIN PLUGIN BOOSTRAP FILE INPUT-->
                            <input id="file-es" name="file-es[]" type="file" multiple>
                            <!-- BEGIN PLUGIN BOOSTRAP FILE INPUT-->

                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">                            
                            <div class="div-table" hidden="">

                                <!-- BEGIN DATATABLE-->
                                <table id="table-filemanager" class="table table-fixed">
                                </table>
                                <!-- END DATATABLE-->

                            </div>
                            <div class="spin-loading" style="text-align: center;padding-top: 10%;"></div>
                        </div>
                    </div>               
                </div>
            </section>
        </div>
    </section>
</section>

<!-- BEGIN MODAL MESSAGE-->
<div id="modal-delete-file" class="modal fade bs-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content" style="width: 300px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Confirmación</h4>
            </div>
            <div class="modal-body" style="text-align:center;word-wrap: break-word;">¿Desea eliminar el archivo <b><span id="span-filecaption"></span></b>?</div>
            <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn default">Cancelar</button>
                <button type="button" id="btn-delete-file" class="btn btn-primary">Aceptar</button>
            </div>
        </div>
    </div>
</div>
<!-- END MODAL MESSAGE-->