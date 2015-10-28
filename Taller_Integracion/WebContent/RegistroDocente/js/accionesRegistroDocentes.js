$( document ).ready(function() {
	
	function initData ()  {
        var rows = [];
        /*for (var i = 0; i < 0; i++) {
        	rows.push({
                id_telefono: i,
                telefono: ''
            });
        }*/
        return rows;
    }
	
	// init table use data
    $table = $('#table_telefono,#table_email,#table_documento,#table_gradoAcademico,#table_curso,#table_curso_modal,#table_rangoHoras').bootstrapTable({
        data: initData()
    });
    
	function append_telefono(){
		var telefono=$('#telefono').val();
		if(telefono!=''){
			var rows = [];
			rows.push({
	            id: -1,
	            valor: telefono,
	            id_local: telefono
	        });
			$('#telefono').val('');
			return rows;
		}
		else
			alert("Complete el campo telefono");
		return null;
	}
	function append_documento(){
		var numero=$('#documento').val();
		var tipodoc=$('#tipodoc').val();
		var tipodocshow=$('#tipodoc option:selected').text();
		if(numero!=''&&tipodoc!=''){
			var rows = [];
			rows.push({
	            id: -1,
	            valor: numero,
	            tipodocshow:tipodocshow,
	            tipodoc:tipodoc,
	            id_local: numero
	        });
			$('#documento').val('');
			return rows;
		}
		else
			alert("Complete todos los campos de documento");
		return null;
	}
	function append_rangoHoras(){
		var dia=$('#cdias option:selected').text();
		var rangoinicio=$('#rangoinicio option:selected').text();
		var rangofin=$('#rangofin option:selected').text();
		var diaL=$('#cdias option:selected').val();
		var rangoinicioL=$('#rangoinicio option:selected').val();
		var rangofinL=$('#rangofin option:selected').val();
		if(dia!=''&&rangoinicio!=''){
			var rows = [];
			rows.push({
	            id: -1,
	            dia: dia,
	            horaInicio:rangoinicio,
	            horaFin:rangofin,
	            diaL: diaL,
	            horaInicioL:rangoinicioL,
	            horaFinL:rangofinL,
	            id_local: generarIdLocal("rangoHoras")
	        });
			return rows;
		}
		else
			alert("Complete todos los campos de documento");
		return null;
	}
	function append_gradoAcademico(){
		var gradoAcademico=$('#gradoAcademico').val();
		var profesion=$('#profesion').val();
		var especialidad=$('#especialidad').val();
		var especialidadshow=$('#especialidad option:selected').text();
		var institucion=$('#institucion').val();
		var fechaIngreso=$('#fechaIngreso').val();
		if(gradoAcademico!=''&&profesion!=''){
			var rows = [];
			rows.push({
	            id: -1,
	            gradoAcademico: gradoAcademico,
	            profesion:profesion,
	            especialidad: especialidad,
	            especialidadshow:especialidadshow,
	            institucion:institucion,
	            id_local:generarIdLocal("gradoAcademico"),
	            fechaIngreso:fechaIngreso
	        });
			$('#gradoAcademico').val("");
			$('#profesion').val("");
			$('#especialidad').val("");
			$('#institucion').val("");
			$('#fechaIngreso').val("");
			return rows;
		}
		else
			alert("Complete todos los campos de documento");
		return null;
	}
	
	function generarIdLocal(tabla){
		var table=$('#table_'+tabla);
		var data = table.bootstrapTable('getData');
		var cont=0;
		var max=0;
		$.map(data, function (row) {
			if(data.length==0)
				return max;
			else{
				if(row.id_local>=max){
					max=row.id_local;
				}
			}
        });
		console.log(max+1);
		return max+1;
		
	}
	function append_email(){
		var email=$('#email').val();
		if(email!=''){
			var rows = [];
			rows.push({
	            id: -1,
	            valor: email,
	            id_local: email
	        });
			$('#email').val('');
			return rows;
		}
		else
			alert("Complete el campo E-mail");
		return null;
	}
	
	$(".btn").on('click', function() {
		var tabla=$(this).data('table');
		var table=$('#table_'+tabla);
		var accion = $(this).attr('data-method');
		var valueInput=$('#'+tabla).val();
		if(accion=='append'){
			var data=eval(accion+"_"+tabla).call();
			var dataTable = table.bootstrapTable('getData');
			//comprobar que e valor no exista en la tabla
			for(var i=0;i<dataTable.length;i++){
				if(dataTable[i].id_local==valueInput)
					data=null;
			}
			if(data!=null)
			table.bootstrapTable(accion,data);
		}else{
			var selects = table.bootstrapTable('getSelections');
            ids = $.map(selects, function (row) {
                return row.id_local;
            });
            table.bootstrapTable('remove', {
                field: 'id_local',
                values: ids
            });
		}
		
	});
	
	


});


function addCursoApto(tabla){
	var table=$("#table_"+tabla);
	var tableModal=$("#table_"+tabla+"_modal");
	var data = tableModal.bootstrapTable('getSelections');
	var row = [];

	var codigos=$.map(data, function (r) {
		 row=r;
		 return r.codigo;
     });
	
	if(row!=null)
	table.bootstrapTable("append",row);

	tableModal.bootstrapTable('remove', {
        field: 'codigo',
        values: codigos
    });
}

function removeCursoApto(tabla){
	var table=$("#table_"+tabla);
	var tableModal=$("#table_"+tabla+"_modal");
	var data = table.bootstrapTable('getSelections');

	var codigos=$.map(data, function (r) {
		 return r.codigo;
     });
	//comprobar que e valor no exista en la tabla
	if(data!=null)
	tableModal.bootstrapTable("append",data);

	table.bootstrapTable('remove', {
        field: 'codigo',
        values: codigos
    });
}
	
