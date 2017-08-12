<style>
    .table-fixed thead
    {   
      background-color: #139843;
      /*width: 100%; */
      color:white;
    }

    .table-fixed tbody
    {
      height: 230px;
      overflow-y: auto;
      /*width: 100%;*/
    }

    .table-fixed tbody, .table-fixed tr, .table-fixed td, .table-fixed th
    {
      /*display: block;*/
    }

    .table-fixed tbody td, .table-fixed thead > tr> th
    {
      float: left;
      border-bottom-width: 0;
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
                        <div class="col-md-6 col-sm-12 col-xs-6"> 
                            <input id="file-es" name="file-es[]" type="file" multiple>                            
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-6">
                            <table id="table-filemanager" class="table table-fixed">
                                <thead>
                                    <tr>
                                        <th class="col-xs-2">Nº</th>
                                        <th class="col-xs-8">Archivo</th>
                                        <th class="col-xs-2">Opción</th>
                                    </tr>
                                </thead>
                                <tbody>                                                        
                                </tbody>
                            </table>
                        </div>
                    </div>               
                </div>
            </section>
        </div>
    </section>
</section>