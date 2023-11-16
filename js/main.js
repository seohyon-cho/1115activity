const screen = document.querySelector('.screen');
const numbers = screen.querySelectorAll('span');
const ampm = document.querySelector('em.on');
const main = document.querySelector('main');
const btns = document.querySelectorAll('nav span');

// 자주 바뀔만한 값을 전역변수 형태로, 객체를 배열로 묶어두는 형태로 따로 빼서 관리하는 것.
// 해당 값이 아래 함수에서 호출되도록 처리
const data = [
	{ time: new Date().getHours() >= 5 && new Date().getHours() < 11, name: 'morning' },
	{ time: new Date().getHours() >= 11 && new Date().getHours() < 16, name: 'afternoon' },
	{ time: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ time: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

let timer = setInterval(() => {
	ampm.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	// getTime 함수가 [hr, min, sec] 배열을 반환
	// 반환된 배열값을 그대로 반복 돌면서 각각 setTime 함수에 인수로 전달됨
	// setTime 함수는 반복을 돌면서 시간, 분, 초가 한 자릿수일 때 0을 붙여주는 공통의 로직을 반복 실행함.
	getTime().forEach((num, idx) => setTime(num, idx));
	// 전역변수인 data를 인수로 받아서 호출 처리
	changeTheme(data);
}, 1000);

btns.forEach((btn) => {
	// 각 버튼 클릭 시
	btn.addEventListener('click', (e) => {
		// 클릭한 버튼만 활성화 처리
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');

		// 기존의 자동 롤링 기능 끊어줌.
		clearInterval(timer);
		// main의 모든 클래스 제거
		main.className = '';
		// 클릭한 버튼의 글자를 가져와서 소문자로 변경한 다음, 그 내용을 main의 클래스명으로 지정.
		main.classList.add(e.currentTarget.innerText.toLowerCase());
	});
});

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

function changeTheme(info) {
	// const hr = new Date().getHours();
	// 전역 data 값을 바로 활용하는 것이 아닌, info라는 파라미터를 통해서 전달받도록 처리하는 것.
	main.className = '';

	/*if (hr >= 5 && hr < 11) {
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
	}*/

	info.forEach((el) => {
		if (el.time) main.classList.add(el.name);
	});
}
