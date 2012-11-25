function $(id) {
	return document.getElementById(id);
}

function addEventRow() {
	var table = $('eventTable');
	table.innerHTML += '<tr>'+
							'<td>Имя</td>'+
							'<td>Место23423423423</td>'+
							'<td>Начало234234234234</td>'+
							'<td>Конец234234234234234</td>'+
							'<td>Периодичность</td>'+
							'<td>Предупреждение</td>'+
							'<td>Заметки</td>'+
						'</tr>';
}

function addClick(e) {
	title = $('title').value;
	addEventRow();
	return false;
}