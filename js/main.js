const screen = document.querySelector('.screen');
const numbers = screen.querySelectorAll('span');
const ampm = document.querySelector('em.on');
const main = document.querySelector('main');

setInterval(() => {
	ampm.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	// getTime 함수가 [hr, min, sec] 배열을 반환
	// 반환된 배열값을 그대로 반복 돌면서 각각 setTime 함수에 인수로 전달됨
	// setTime 함수는 반복을 돌면서 시간, 분, 초가 한 자릿수일 때 0을 붙여주는 공통의 로직을 반복 실행함.
	getTime().forEach((num, idx) => setTime(num, idx));
	changeTheme();
}, 1000);

// 시간값을 구해서 반환하는 함수
function getTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();
	// 현재 '시'값이 13이상이 되면, 12를 뺀 값을 hr로 반환
	hr = hr > 12 ? hr - 12 : hr;
	return [hr, min, sec];
}

// 반환된 시간값을 인수로 받아서 DOM에 셋팅하는 함수
function setTime(num, index) {
	numbers[index].innerText = num < 10 ? '0' + num : num;
}

function changeTheme() {
	const hr = new Date().getHours();
	main.className = '';

	if (hr >= 5 && hr < 11) {
		main.classList.add('morning');
	}
	if (hr >= 11 && hr < 16) {
		main.classList.add('afternoon');
	}
	if (hr >= 16 && hr < 20) {
		main.classList.add('evening');
	}
	if (hr >= 20 || hr < 5) {
		main.classList.add('night');
	}
}
