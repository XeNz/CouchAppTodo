//function createDoc(){
//
//	var titel = $("#lastName").val();
//	var details = $("#firstName").val();
//	var points = $("#points").val();
//
//	var doc = {};
//
//	doc.lastName = lastName.replace(/\s+/g, '');
//	doc.firstName = firstName;
//	doc.points = parseInt(points);
//	var json = JSON.stringify(doc);
//
//	$.ajax({
//		type : 'PUT',
//		url : '../../' + doc.lastName + firstName,
//		//url : 'http://3ppo.cloudant.com/students/' + name + firstName,
//		data : json,
//		contentType : 'application/json',
//		async : true,
//		success : function(data){
//			$("#lastName").val('');
//			$("#firstName").val('');
//			$("#points").val('');
//			$("#students").val('');
//			fillTypeAhead();
//		},
//		error : function(XMLHttpRequest, textStatus, errorThrown){
//			console.log(textStatus);
//		}
//	});
//}

//function buildOutput(){
//
//	$('#output').empty();
//	var html = '<table class="table table-hover">';
//	$.ajax({
//		type : 'GET',
//		url : '../../_all_docs?include_docs=true',
//		async : true,
//		success : function(data){
//			var arr = JSON.parse(data).rows;
//
//			for(var i = 0; i < arr.length; i++){
//
//				if (arr[i].id.indexOf('_design') == -1){
//					var doc = arr[i].doc;
//					html += '<tr><td>' + doc.lastName + '</td><td>' + doc.firstName
//							+ '</td><td>' + doc.points + '</td>'
//							+ '<td><button type="button" class="btn btn-danger" onClick="deleteDoc(\'' + doc._id + '\',\'' + doc._rev + '\')">X</button></td>'
//							+ '<td><button type="button" class="btn btn-success" onClick="editDoc(\'' + doc._id + '\',\'' + doc._rev + '\',\'' + doc.lastName+ '\',\'' + doc.firstName + '\',\'' + doc.points + '\')">Edit</button></td>';
//				}
//			}
//			html += '</table>';
//			$('#output').html(html);
//		},
//		error : function(XMLHttpRequest, textStatus, errorThrown){
//			console.log(errorThrown);
//		}
//	});
//}



function editDoc(id, rev, status, description, priority, begindate, enddate){
	
	$('#output').hide();
	$('#edit').show();
	
	var html = '';
	
	// Build edit form
	html += '<h3>Editeer todo record</h3><table class="table table-hover">';
	html += '<input type="hidden" id="_id" value="' + id + '"/>';
	html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
	html += '<tr><td>status :</td><td><input id="status2" type="text" size="50" value="' + status + '"/></td></tr>';
	html += '<tr><td>priority:</td><td><input id="priority2" type="text" size="50" value="' + priority + '"/></td></tr>';
	html += '<tr><td>description:</td><td><input id="description2" type="text" size="10" value="' + description + '"/></td></tr>';
	html += '<tr><td>begindate:</td><td><input id="begindate2" type="text" size="10" value="' + begindate + '"/></td></tr>';
	html += '<tr><td>enddate:</td><td><input id="enddate2" type="text" size="10" value="' + enddate + '"/></td></tr>';
	html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateDoc()">Ok</button></td></tr>';
	html += '</table>';
	
	$('#edit').html(html);
}

function updateDoc(){
	
	var id = $("#_id").val();
	var rev = $("#_rev").val();
	var priority = $("#priority2").val();
	var status = $("#status2").val();
	var description = $("#description2").val();
	var begindate = $("#begindate2").val();
	var enddate = $("#enddate2").val();

	var doc = {};

	doc._id = id;
	doc._rev = rev;
	doc.priority = priority;
	doc.status = status;
	doc.description = description;
	doc.begindate = begindate;
	doc.enddate = enddate;
	var json = JSON.stringify(doc);

	$.ajax({
		type : 'PUT',
		url : '../../' + id,
		data : json,
		contentType : 'application/json',
		async : true,
		success : function(data){
			$('#edit').hide();
			$('#output').show();
			//buildOutput();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}



function searchDoc(){
	
	var name = $("#todo").val();
	var docName = name.replace(/\s+/g, '');
	console.log(docName);
	
	$.ajax({
		type:	'GET',
		url:	'../../' + docName,
	    async: true,
	    success:function(data){
	    	var doc = JSON.parse(data);
	    	editDoc(docName, doc._rev, doc.status, doc.description, doc.priority, doc.begindate,doc.enddate);
	    	$("#todo").val('');
	    },
		error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
	});	
}


