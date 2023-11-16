const screen = document.querySelector('.screen');
const numbers = screen.querySelectorAll('span');
const ampm = document.querySelector('em.on');
const main = document.querySelector('main');
const btns = document.querySelectorAll('nav span');
const autoBtn = document.querySelector('main button.auto');

const data = [
	{ time: new Date().getHours() >= 5 && new Date().getHours() < 11, name: 'morning' },
	{ time: new Date().getHours() >= 11 && new Date().getHours() < 16, name: 'afternoon' },
	{ time: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ time: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

// 1초마다 전자시계를 출력하는 함수 호출
// 특정함수를 콜백함수에 전달할 때, ()를 붙인 함수호출구문 형태가 아닌, ()가 안 붙은 정의문 형태로 전달해야 함.
// setWatch처럼 함수명만 넣으면 정의형태이기 때문에 바로 등록이 가능함.
setInterval(setWatch, 1000);

// changeTheme의 경우는, data라는 인수를 전달해야 하므로 ()를 붙여야 함.
// ()를 붙이는 순간에 정의형태가 아닌 호출형태로 변경이 되므로 다시 익명함수 형태로 호출문을 wrapping해서 정의형태로 변경해야 함.
// 순서 1 - 로딩이 되자마자 1초 간격으로 changeTheme 반복 실행
let timer = setInterval(() => changeTheme(data), 1000);
// 순서 2 - 메뉴 버튼 클릭 시 강제로 clearInterval(timer) 로 changeTheme 반복 중지
btns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');
		clearInterval(timer);
		// main의 모든 클래스 제거
		main.className = '';
		main.classList.add(e.currentTarget.innerText.toLowerCase());
	});
});
// 순서 3 - auto 버튼 클릭 시, 다시 1초 간격으로 changeTheme 반복 실행
autoBtn.addEventListener('click', () => {
	timer = setInterval(() => changeTheme(data), 1000);
	btns.forEach((btn) => btn.classList.remove('on'));
});

function setWatch() {
	ampm.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}

function getTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();
	hr = hr > 12 ? hr - 12 : hr;
	return [hr, min, sec];
}

function setTime(num, index) {
	numbers[index].innerText = num < 10 ? '0' + num : num;
}

function changeTheme(info) {
	main.className = '';
	info.forEach((el) => {
		if (el.time) main.classList.add(el.name);
	});
}
