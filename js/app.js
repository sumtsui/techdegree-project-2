// variable holding the student object array
const students = students44;
// the number of students shown per page
const studentsPerPage = 10;
// the total number of pages needed for pagination 
const totalPage = getPageTotal(students);

// prepare the page when loaded the first time. 
showStudents(students, 1);
showLinks();
setActiveLink(1);

// when user clicks one of the pagination links, gets the page number, calls showStudents(), and setActiveLink().
document.querySelector('.pagination ul').addEventListener('click', (event) => {
	let pageNum = event.target.text;
	showStudents(students, pageNum);
	setActiveLink(pageNum);
});

// render students to the current page.
function showStudents(studentList, currentPage) {
	let students = getStudentsOnPage(currentPage, studentList);
	document.querySelector('.student-list').innerHTML = getStudentHTML(students);
}

// based on the totalPage number, render the pagination links to the page.
function showLinks() {
	let htmlString = '<ul>';
	for (let i = 1; i <= totalPage; i++) {
		htmlString += '<li>';
		htmlString += `<a href="#">${i}</a></li>`;
	}
	htmlString += '</ul>';
	document.querySelector('.pagination').innerHTML = htmlString;
}

// takes the currentPage number and the whole student object array, calculate and return the sliced student object array.
function getStudentsOnPage(currentPage, studentList) {
	let endIndex = currentPage * studentsPerPage;
	let startIndex = endIndex - studentsPerPage;
	return studentList.slice(startIndex, endIndex);
}

// based on the length of student object array and students per page, return the total pages needed. count from 1.
function getPageTotal(studentList) {
	var total = Math.floor(studentList.length / studentsPerPage);
	return total += (studentList.length % studentsPerPage) ? 1 : 0;
}

// convert the given student object array to html.
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

// based on the current page number, give the "active" class to the correct link.
function setActiveLink(currentPage) {
	let links = document.querySelectorAll('.pagination a');
	for (let i = 0; i < links.length; i++) {
		links[i].className = '';
	}
	links[currentPage - 1].className = "active";
}
