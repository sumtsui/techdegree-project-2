// globle variable holds the student object array
var students = studentList;
// the number of students shown per page
const studentsPerPage = 10;
// the total number of pages needed for pagination 
const totalPage = getPageTotal(students);

// search function HTML elements
const searchForm = document.createElement('form');
searchForm.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.setAttribute('placeholder', 'Search for students...');
const searchButton = document.createElement('button');
searchButton.innerText = 'Search';
searchButton.type = 'submit';

// prepare the page when being loaded for the first time. 
showStudents(students, 1);
showLinks(totalPage);
setActiveLink(1);
addSearch();

// when user clicks one of the pagination links, gets the page number, calls showStudents(), and setActiveLink().
document.querySelector('.pagination ul').addEventListener('click', (event) => {
	let pageNum = event.target.text;
	showStudents(students, pageNum);
	setActiveLink(pageNum);
});

searchForm.addEventListener('submit', (event) => {
	event.preventDefault();
	let searchResult = search(studentList); // always search from the whole list
	if (Array.isArray(searchResult)) {
		students = searchResult;
		let totalPage = getPageTotal(searchResult);
		showStudents(searchResult, 1);
		showLinks(totalPage);
		setActiveLink(1);
	} else if (searchResult === "full list") {
		students = studentList;
		showStudents(students, 1);
		showLinks(totalPage);
		setActiveLink(1);
	} else {
		print('.student-list', searchResult);
		document.querySelector('.pagination ul').style.display = 'none';
	}
});

// render students to the current page.
function showStudents(studentList, currentPage) {
	let students = getStudentsForPage(currentPage, studentList);
	print('.student-list', getStudentHTML(students));
}

// based on the totalPage number, render the pagination links to the page.
function showLinks(totalPage) {
	let htmlString = '';
	for (let i = 1; i <= totalPage; i++) {
		htmlString += '<li>';
		htmlString += `<a href="#">${i}</a></li>`;
	}
	document.querySelector('.pagination ul').style.display = 'block';
	print('.pagination ul', htmlString);
}

// takes the currentPage number and the whole student object array, calculate and return the sliced student object array.
// slice() works even when the endIndex is out of bound. 
function getStudentsForPage(currentPage, studentList) {
	let endIndex = currentPage * studentsPerPage;
	let startIndex = endIndex - studentsPerPage;
	console.log('start: ', startIndex, 'end: ', endIndex);
	return studentList.slice(startIndex, endIndex);
}

// based on the length of student object array and students per page, return the total pages needed, starting from 1.
function getPageTotal(studentList) {
	var total = Math.floor(studentList.length / studentsPerPage);
	return total += (studentList.length % studentsPerPage) ? 1 : 0;
}

// convert the given student object array to htmlString.
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

function addSearch() {
	document.querySelector('.page-header').appendChild(searchForm);
	searchForm.appendChild(searchInput);
	searchForm.appendChild(searchButton);
}

function search(students) {
	let result;
	let query = searchInput.value;
	let match = [];
	if (query === "" || query === " ") return result = "full list";
	for (var i = 0; i < students.length; i++) {
		if (students[i].name.toLowerCase().includes(query.toLowerCase())) 
			match.push(students[i]);
	} 		
	return result = (match.length < 1) ? '<h2>No student match the search term.</h2>' : match;
}

function print(selector, content) {
	document.querySelector(selector).innerHTML = content;
}
