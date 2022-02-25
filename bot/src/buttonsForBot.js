export const buttonsForStartCommand = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Показать категории" },
				{ text: "Создать категорию" }
			],
			[
				{ text: "Удалить категорию" },
			]
		],
		resize_keyboard: true
	}),
};

export const buttonsForCreateCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Отменить создание категории" },
			],
		],
		resize_keyboard: true
	}),
}

export const buttonsForAfterCreateCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Перейти в главное меню" },
			],
		],
		resize_keyboard: true
	}),
}

export const buttonsForChangeCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Изменить название категории" },
				{ text: "Изменить описание категории" },
			],
			[
				{ text: "Изменить название и описание категории" }
			],
			[
				{ text: "Назад в главное меню" }
			]
		],
		resize_keyboard: true
	}),
}

export const buttonForChangeCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Отменить изменение категории" }
			]
		],
		resize_keyboard: true
	})
}

export const buttonForAfterChangeCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Перейти в главное меню" },
			],
		],
		resize_keyboard: true
	}),
}

export const buttonForChangeTitleCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Отменить изменение названия категории" }
			]
		],
		resize_keyboard: true
	})
}

export const buttonForAfterChangeTitleCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Перейти в главное меню" },
			],
		],
		resize_keyboard: true
	}),
}

export const buttonForChangeDescriptionCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Отменить изменение описания категории" }
			]
		],
		resize_keyboard: true
	})
}

export const buttonForAfterChangeDescriptionCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Перейти в главное меню" },
			],
		],
		resize_keyboard: true
	}),
}

export const buttonsForDeleteCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Подтвердить удаление категории" }
			],
			[
				{ text: "Отменить удаление категории" }
			]
		],
		resize_keyboard: true
	})
}

export const buttonsForSelectCategory = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Посмотреть список ссылок" },
				{ text: "Создать ссылку" }
			],
			[
				{ text: "Удалить ссылку" },
			],
			[
				{ text: "Назад в главное меню" },
			]
		],
		resize_keyboard: true
	}),
}

export const buttonForCreateLink = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Отменить создание ссылки" },
			],
		],
		resize_keyboard: true
	}),
}

export const buttonsForCancelCreateLink = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Перейти в главное меню" },
			],
		],
		resize_keyboard: true
	}),
}

export const buttonsForDeleteCategoryLink = {
	reply_markup: JSON.stringify({
		keyboard: [
			[
				{ text: "Подтвердить удаление ссылки" }
			],
			[
				{ text: "Отменить удаление ссылки" }
			]
		],
		resize_keyboard: true
	})
}