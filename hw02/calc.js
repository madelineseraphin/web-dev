(function () {
	"use strict";
	var currentNum = '0', // The current number the user is entering
		storedNum, // The number stored for calculation
		selectedFunc, // The selected function for calculation
		funcs; // All the possible functions of the calculator

	// Update the number shown in the display
	function updateResult() {
		var result = document.getElementById('result');
		result.innerHTML = currentNum;
	}

	// Calculate the answer and display it
	function getAnswer() {
		var num1 = parseFloat(storedNum),
			num2 = parseFloat(currentNum),
			answer;
		switch(selectedFunc) {
			case 'add':
				answer = num1 + num2;
				break;
			case 'subtract':
				answer = num1 - num2;
				break;
			case 'multiply':
				answer = num1 * num2;
				break;
			case 'divide':
				answer = num1 / num2;
				break;
		}
		currentNum = answer.toString();
		storedNum = currentNum;
		updateResult();
		currentNum = null;
	}

	// Update which function is selected
	function updateFuncs() {
		funcs.forEach(function (func) {
			if (func.id === selectedFunc) {
				func.classList.add('active');
			} else {
				func.classList.remove('active');
			}
		})
	}

	// Handles when a number is clicked
	function clickedNum(ev) {
		var num = ev.target.innerHTML;

		if (!currentNum || currentNum === '0') {
			currentNum = num;
		} else {
			currentNum = currentNum.concat(num);
		}
		updateResult();
	}

	// Handles when the decimal point is clicked
	function clickedDecimal() {
		if (!currentNum) {
			currentNum = '0';
		}
		if (!currentNum.includes('.')) {
			currentNum = currentNum.concat('.');
			updateResult();
		}
	}

	// Handles when a function is clicked
	function clickedFunc(ev) {
		if (currentNum && storedNum) {
			getAnswer();
		}
		if (currentNum && !storedNum) {
			storedNum = currentNum;
			currentNum = null;
		}
		selectedFunc = ev.target.id;
		updateFuncs();
	}

	// Handles when clear is clicked
	function clickedClear() {
		currentNum = '0';
		storedNum = null;
		selectedFunc = null;
		updateFuncs();
		updateResult();
	}

	// Initialize the web page, set up all on-click listeners
	function init() {
		var nums = document.getElementsByClassName('num');
		nums = Array.from(nums);
		nums.forEach(function (num) {
			num.addEventListener('click', clickedNum);
		})

		var decimal = document.getElementById('decimal');
		decimal.addEventListener('click', clickedDecimal);

		funcs = document.getElementsByClassName('func');
		funcs = Array.from(funcs);
		funcs.forEach(function (func) {
			func.addEventListener('click', clickedFunc);
		})

		var clear = document.getElementById('clear');
		clear.addEventListener('click', clickedClear);
	}

	window.addEventListener('DOMContentLoaded', init);

})();
