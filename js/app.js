// variable holds the student object array
var students = studentList;
// the number of students shown per page
const studentsPerPage = 10;
// the total number of pages needed for pagination 
const totalPage = getPageTotal(students);

// search function HTML elements
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.setAttribute('placeholder', 'Search for students...');
const searchButton = document.createElement('button');
searchButton.innerText = 'Search';

// show content and focus the search box when the page is loaded.
window.addEventListener('load', () => {
	showContent(students, totalPage, 1);
	addSearch();
	searchInput.focus();
});

// when user clicks one of the pagination links, use the page number to call showStudents() and setActiveLink().
document.querySelector('.pagination ul').addEventListener('click', (event) => {
	let pageNum = event.target.text;
	showStudents(students, pageNum);
	setActiveLink(pageNum);
});

// when user perform a search:
// if search result contains student object, set globe Students varialbe to the search result.
// if search result is "full list", set globe Students variable back to the whole list.
// else, show no match found message. 
searchButton.addEventListener('click', () => {
	let searchResult = search(studentList); // always search from the whole list
	if (Array.isArray(searchResult)) {
		students = searchResult;
		let totalPage = getPageTotal(searchResult);
		showContent(students, totalPage, 1);
	} else if (searchResult === "full list") {
		students = studentList;
		showContent(students, totalPage, 1);
	} else {
		print('.student-list', searchResult);
		document.querySelector('.pagination ul').style.display = 'none';
	}
});

// when user start typing in the search box:
// call search() to see if there is any match.
// if yes, show the matches to page. 
// if user clears the search box, show the whole list of students back to the page.
searchInput.addEventListener('keyup', () => {
	let searchResult = search(studentList);
	if (Array.isArray(searchResult)) {
		students = searchResult;
		let totalPage = getPageTotal(searchResult);
		showContent(students, totalPage, 1);
	} else if (searchResult === "full list") {
		students = studentList;
		showContent(students, totalPage, 1);
	} else {
		print('.student-list', searchResult);
		document.querySelector('.pagination ul').style.display = 'none';
	}
});

// takes the Student object array, the Total page number needed, and the Current page number.
function showContent(students, totalPage, currentPage) {
	showStudents(students, currentPage);
	showLinks(totalPage);
	setActiveLink(currentPage);
}

// render students to the current page.
function showStudents(studentList, currentPage) {
	let students = getStudentsForPage(currentPage, studentList);
	print('.student-list', getStudentHTML(students));
}

// based on the totalPage number, render the pagination links to the page.
// due to Event Delegation, only li items are dynamically generated. ul is not dynamically generated. 
function showLinks(totalPage) {
	let htmlString = '';
	for (let i = 1; i <= totalPage; i++) {
		htmlString += '<li>';
		htmlString += `<a href="#">${i}</a></li>`;
	}
	document.querySelector('.pagination ul').style.display = 'block'; // ul's display was set to 'none' if no student match. since it is not dynamically generated, have to set it to 'block' when add the links to the page. 
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
	return (Math.ceil(studentList.length/studentsPerPage));
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

// append the search elements to DOM.
function addSearch() {
	document.querySelector('.page-header').appendChild(searchDiv);
	searchDiv.appendChild(searchInput);
	searchDiv.appendChild(searchButton);
}

// handle the search logic:
// if query is empty string, return "full list".
// loop through the array and add matched object to new array. 
// if new array has more than 1 object, return the array.
// else return no match found message.  
function search(students) {
	let result;
	let query = searchInput.value;
	let match = [];
	if (query === "") return result = "full list";
	for (var i = 0; i < students.length; i++) {
		if (students[i].name.toLowerCase().includes(query.toLowerCase())) 
			match.push(students[i]);
	}	
	return result = (match.length < 1) ? '<h2>No student match the search term.</h2>' : match;
}

// print helper function
function print(selector, content) {
	document.querySelector(selector).innerHTML = content;
}
