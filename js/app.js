const students = students53;
const studentsPerPage = 10;
const totalPage = getPageTotal(students);

showStudents(students, 1);
showLinks();
setActiveLink(1);

document.querySelector('.pagination ul').addEventListener('click', (event) => {
	let pageNum = event.target.text;
	showStudents(students, pageNum);
	setActiveLink(pageNum);
});

function showStudents(studentList, currentPage) {
	let students = getStudentsOnPage(currentPage, studentList);
	document.querySelector('.student-list').innerHTML = getStudentHTML(students);
}

function showLinks() {
	let htmlString = '<ul>';
	for (let i = 1; i <= totalPage; i++) {
		htmlString += '<li>';
		htmlString += `<a href="#">${i}</a></li>`;
	}
	htmlString += '</ul>';
	document.querySelector('.pagination').innerHTML = htmlString;
}

// count from 1
function getPageTotal(studentList) {
	var total = Math.floor(studentList.length / 10);
	return total += (studentList.length % 10) ? 1 : 0;
}

function getStudentsOnPage(currentPage, studentList) {
	let endIndex = currentPage * studentsPerPage;
	let startIndex = endIndex - studentsPerPage;
	if (currentPage === totalPage) endIndex = studentList.length;
	console.log('start: ', startIndex, 'end: ', endIndex);
	return studentList.slice(startIndex, endIndex);
}

function getStudentHTML(studentList) {
	var htmlString = '';
	for (let i = 0; i < studentList.length; i++) {
			htmlString += `<li class="student-item cf"><div class="student-details">`;
			htmlString += `<img class="avatar" src="${studentList[i].profilePic}">`;
			htmlString += `<h3>${studentList[i].name}</h3>`;
			htmlString += `<span class="email">${studentList[i].email}</span></div>`;
			htmlString += `<div class="joined-details">`;
			htmlString += `<span class="date">Joined ${studentList[i].dateJoined}</span>`;
			htmlString += `</div></li>`;
	}
	return htmlString;
}

function setActiveLink(currentPage) {
	let links = document.querySelectorAll('.pagination a');
	for (let i = 0; i < links.length; i++) {
		links[i].className = '';
	}
	links[currentPage - 1].className = "active";
}
