const filterByType = (type, ...values) => values.filter(value => typeof value === type), // в функции получаем 2 аргумента где возвращаем true/false равны ли они между собой


	hideAllResponseBlocks = () => { // функция скрытия блока с информацией
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // в переменную создаем массив из элемента div на странице
		responseBlocksArray.forEach(block => block.style.display = 'none'); // каждому элементу задаем значение невидимости
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // функция показа блока с информацией
		hideAllResponseBlocks(); // сначала скрываем все блоки
		document.querySelector(blockSelector).style.display = 'block'; // делаем блок видимым
		if (spanSelector) { // в зависимости от ид блока error or ok
			document.querySelector(spanSelector).textContent = msgText; // записываем текст в блок
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // функция показа текста об ошибке

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // функция показа текста в случае правильного результата

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // показ текста если результат не назначен

	tryFilterByType = (type, values) => { // функция для проверки на ошибки
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // представляет ошибку, возникающую в глобальной функции двух аргументов, и методом join обьединяем в строку
			const alertMsg = (valuesArray.length) ? // проверяем если массив не пустой
				`Данные с типом ${type}: ${valuesArray}` : // записываем данные в переменную 
				`Отсутствуют данные типа ${type}`; // записываем сообщение если массив пустой
			showResults(alertMsg); // возвращаем результат
		} catch (e) { // если будет ошибка
			showError(`Ошибка: ${e}`); // показываем сообщение с ошибкой
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получаем кнопку "Фильтровать" со страницы

filterButton.addEventListener('click', e => { // вешаем на нее обработчик
	const typeInput = document.querySelector('#type'); // получаем селект с выбором
	const dataInput = document.querySelector('#data'); // получаем инпут где будем вводить данные

	if (dataInput.value === '') { // проверка если в инпут пустая строка
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // выводим стандартную подсказку с текстом
		showNoResults(); // запускаем функцию показа если нету результата
	} else { // иначе
		dataInput.setCustomValidity(''); // обнуляем сообщение стандартной подсказки
		e.preventDefault(); // отменяем стандартное поведение элемента
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // запускаем функцию проверки на ошибки в которую передаем значение селект и инпута с обрезаными пробелами в начале и конце

	}
});

