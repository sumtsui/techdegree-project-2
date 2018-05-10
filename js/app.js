// variable holds the student object array.
var students = studentList;
const studentsPerPage = 10;
// the total number of pages needed for pagination.
const totalPage = getPageTotal(students);

// search function HTML elements
const searchForm = document.createElement('form');
searchForm.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.setAttribute('placeholder', 'Search for students...');
const searchButton = document.createElement('button');
searchButton.innerText = 'Search';

// show content and focus the search box when the page is loaded.
window.addEventListener('load', () => {
	showStudents(students, 1);
	showLinks(totalPage);
	setActiveLink(1);
	addSearch();
	searchInput.focus();
	addToggle();
});

// when user clicks one of the pagination links:
document.querySelector('.pagination ul').addEventListener('click', (event) => {
	if (event.target.tagName === "A") {
		let pageNum = event.target.text;
		showStudents(students, pageNum);
		setActiveLink(pageNum);		
	}
});

// when user perform a search:
searchForm.addEventListener('submit', (event) => {
	event.preventDefault();
	search(); 
});

// render students to the current page.
function showStudents(list, currentPage) {
	let students = getStudentsForPage(currentPage, list);
	print('.student-list', getStudentHTML(students));
}

// take the total page number, render the pagination links to the page.
// due to Event Delegation, only dynamically generate li items, ul is not dynamically generated. 
function showLinks(num) {
	let htmlString = '';
	for (let i = 1; i <= num; i++) {
		htmlString += '<li>';
		htmlString += `<a href="#">${i}</a></li>`;
	}
	document.querySelector('.pagination ul').style.display = 'block'; 
	print('.pagination ul', htmlString);
}

// take the current page number and the student object array, calculate and return the sliced array.
// slice() works even when the endIndex is out of bound. 
function getStudentsForPage(page, list) {
	let endIndex = page * studentsPerPage;
	let startIndex = endIndex - studentsPerPage;

	return list.slice(startIndex, endIndex);
}

// get total page number needed, counting from 1.
function getPageTotal(list) {
	return (Math.ceil(list.length/studentsPerPage));
}

// convert the given student object array to htmlString.
function getStudentHTML(list) {
	var htmlString = '';
	for (let i = 0; i < list.length; i++) {
			htmlString += `<li class="student-item cf"><div class="student-details">`;
			htmlString += `<img class="avatar" src="${list[i].profilePic}">`;
			htmlString += `<h3>${list[i].name}</h3>`;
			htmlString += `<span class="email">${list[i].email}</span></div>`;
			htmlString += `<div class="joined-details">`;
			htmlString += `<span class="date">Joined ${list[i].dateJoined}</span>`;
			htmlString += `</div></li>`;
	}
	return htmlString;
}

// take the current page number, give the "active" class to the correct link.
function setActiveLink(page) {
	let links = document.querySelectorAll('.pagination a');
	for (let i = 0; i < links.length; i++) {
		links[i].className = '';
	}
	links[page - 1].className = "active";
}

// append the search elements to DOM.
function addSearch() {
	document.querySelector('.page-header').appendChild(searchForm);
	searchForm.appendChild(searchInput);
	searchForm.appendChild(searchButton);
}

// handle search query:
function search() {
	let query = searchInput.value;
	let match = [];

	if (query === "") students = studentList;

	for (let i = 0; i < studentList.length; i++) {
		if (studentList[i].name.toLowerCase().includes(query.toLowerCase())) 
			match.push(studentList[i]);
	}	
	students = (match.length < 1) ? '<h2>No student match the search term.</h2>' : match;

	if (Array.isArray(students)) {
		let totalPage = getPageTotal(students);
		showStudents(students, 1);
		showLinks(totalPage);
		setActiveLink(1);
	} else {
		print('.student-list', students);
		document.querySelector('.pagination ul').style.display = 'none';
	}
}

// print helper
function print(selector, content) {
	document.querySelector(selector).innerHTML = content;
}

// toggle between Instant Search and normal search.
const toggleLabel = document.createElement('label');
const toggleInput = document.createElement('input');
const toggleSpan = document.createElement('span');
const toggleDiv = document.createElement('div');
const toggleName = document.createElement('label');
toggleLabel.className = "switch";
toggleInput.setAttribute('type', 'checkbox');
toggleSpan.className = "slider round";
toggleName.textContent = 'Instant Search';
toggleDiv.className = 'toggle-menu';

function addToggle() {
	document.querySelector('.page-header').insertBefore(toggleDiv, searchForm);
	toggleDiv.appendChild(toggleName);
	toggleDiv.appendChild(toggleLabel);
	toggleLabel.appendChild(toggleInput);
	toggleLabel.appendChild(toggleSpan);
}

toggleInput.addEventListener('change', (event) => {
	if (event.target.checked) {
		searchButton.style.display = 'none';
		searchInput.focus();
		// when user start typing in the search box:
		searchInput.addEventListener('keyup', search);
	} else {
		searchButton.style.display = 'inline-block';
		searchInput.focus();
		searchInput.removeEventListener('keyup', search);
	}
});


