// КОМАНДЫ ГЛАВНОГО МЕНЮ:

export const processingStart = async (bot, message, buttonsForStartCommand) => {
	await bot.sendMessage(
		message.chat.id,
		"Привет, этот бот-закладка для программиста Dale. \nСо списками полезных, важных статей для него.",
	);
	return bot.sendMessage(message.chat.id, "Главное меню", buttonsForStartCommand);
}

export const processingHelp = async (bot, message) => {
	return bot.sendMessage(message.chat.id, "Команда Help");
}

export const processingShowCategories = async (
	bot,
	message,
	messageOnRequest,
	resultOnRequest,
) => {
	if (
		messageOnRequest ===
		"Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
	) {
		return bot.sendMessage(message.chat.id, messageOnRequest);
	}
	if (resultOnRequest.length > 0) {
		for (let i = 0; i < resultOnRequest.length; i++) {
			if (!resultOnRequest[i + 1]) {
				return bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequest[i].title.toUpperCase()} 🚩🚩</b> \n<b>${resultOnRequest[i].description}</b>`, {
					parse_mode: "HTML", reply_markup: {
						inline_keyboard: [
							[
								{ text: "Выбрать категорию", callback_data: `Выбрать категорию ${resultOnRequest[i].title.toUpperCase()}` },
								{ text: "Изменить категорию", callback_data: `Изменить категорию ${resultOnRequest[i].title.toUpperCase()}` }
							]
						]
					}
				})
			} else {
				await bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequest[i].title.toUpperCase()} 🚩🚩</b> \n<b>${resultOnRequest[i].description}</b>`, {
					parse_mode: "HTML", reply_markup: {
						inline_keyboard: [
							[
								{ text: "Выбрать категорию", callback_data: `Выбрать категорию ${resultOnRequest[i].title.toUpperCase()}` },
								{ text: "Изменить категорию", callback_data: `Изменить категорию ${resultOnRequest[i].title.toUpperCase()}` }
							]
						]
					}
				})
			}
		}
	} else {
		return await bot.sendMessage(
			message.chat.id,
			"Созданные категории отсутствуют. \nЧтобы посмотреть этот раздел нужно создать категорию",
		);
	}
}

export const processingCreateCategory = async (bot, message, buttonsForCreateCategory) => {
	return bot.sendMessage(
		message.chat.id,
		"Напишите название категории, которую вы хотите создать...",
		buttonsForCreateCategory
	);
}

export const processingCancelCreateCategory = async (bot, message, buttonsForStartCommand) => {
	return bot.sendMessage(
		message.chat.id,
		"Отмена создания категории",
		buttonsForStartCommand,
	);
}

export const processingGoToMainMenu = async (bot, message, buttonsForStartCommand) => {
	return bot.sendMessage(
		message.chat.id,
		"Главное меню",
		buttonsForStartCommand,
	);
}

export const processingDeleteCategory = async (
	bot,
	message,
	messageOnRequest,
	resultOnRequest,
) => {
	if (
		messageOnRequest ===
		"Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
	) {
		return bot.sendMessage(message.chat.id, messageOnRequest);
	}
	if (resultOnRequest.length > 0) {
		for (let i = 0; i < resultOnRequest.length; i++) {
			if (!resultOnRequest[i + 1]) {
				return bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequest[i].title.toUpperCase()} 🚩🚩</b> \n<b>${resultOnRequest[i].description}</b>`, {
					parse_mode: "HTML", reply_markup: {
						inline_keyboard: [
							[
								{ text: "Удалить категорию", callback_data: `Удалить категорию ${resultOnRequest[i].title.toUpperCase()}` }
							]
						]
					}
				})
			} else {
				await bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequest[i].title.toUpperCase()} 🚩🚩</b> \n<b>${resultOnRequest[i].description}</b>`, {
					parse_mode: "HTML", reply_markup: {
						inline_keyboard: [
							[
								{ text: "Удалить категорию", callback_data: `Удалить категорию ${resultOnRequest[i].title.toUpperCase()}` }
							]
						]
					}
				})
			}
		}
	} else {
		return bot.sendMessage(
			message.chat.id,
			"Созданные категории отсутствуют. \nЧтобы посмотреть этот раздел нужно создать категорию",
		);
	}
}

export const processingConfirmCategoryDeletion = async (bot, message, buttonsForStartCommand, { statusOnReqDelete, messageOnReqDelete }) => {
	if (statusOnReqDelete === 200) {
		return bot.sendMessage(message.chat.id, messageOnReqDelete, buttonsForStartCommand);
	} else {
		return bot.sendMessage(message.chat.id, messageOnReqDelete, buttonsForStartCommand);
	}
}

export const processingCancelCategoryDeletion = async (bot, message, buttonsForStartCommand) => {
	return bot.sendMessage(
		message.chat.id,
		"Отмена удаления категории",
		buttonsForStartCommand,
	);
}

// КОМАНДЫ ПОСЛЕ ВЫБОРА ИЗМЕНИТЬ КАТЕГОРИЮ:
export const processingChangeCategory = async (bot, message, buttonForChangeCategory, { oldCategoryTitle, oldCategoryDescription }) => {
	await bot.sendMessage(message.chat.id, `Текущее название категории: ${oldCategoryTitle} \nТекущее описание категории: ${oldCategoryDescription}`);
	return bot.sendMessage(
		message.chat.id,
		"Напишите новое название категории, которое вы хотите изменить...",
		buttonForChangeCategory
	)
}

export const processingCancelCategory = async (bot, message, buttonsForChangeCategory) => {
	return bot.sendMessage(
		message.chat.id,
		"Отмена изменения категории",
		buttonsForChangeCategory,
	);
}

export const processingChangeCategoryTitle = async (bot, message, buttonForChangeTitleCategory, { oldCategoryTitle }) => {
	await bot.sendMessage(message.chat.id, `Текущее название категории: ${oldCategoryTitle}`);
	return bot.sendMessage(
		message.chat.id,
		"Напишите новое название категории, которое вы хотите изменить...",
		buttonForChangeTitleCategory
	)
}

export const processingCancelCategoryTitle = async (bot, message, buttonsForChangeCategory) => {
	return bot.sendMessage(
		message.chat.id,
		"Отмена изменения названия категории",
		buttonsForChangeCategory,
	);
}

export const processingChangeCategoryDescription = async (bot, message, buttonForChangeDescriptionCategory, { oldCategoryDescription }) => {
	await bot.sendMessage(message.chat.id, `Текущее описание категории: ${oldCategoryDescription}`);
	return bot.sendMessage(
		message.chat.id,
		"Напишите новое описание категории, которое вы хотите изменить...",
		buttonForChangeDescriptionCategory
	)
}

export const processingCancelCategoryDescription = async (bot, message, buttonsForChangeCategory) => {
	return bot.sendMessage(
		message.chat.id,
		"Отмена изменения описания категории",
		buttonsForChangeCategory,
	);
}

// КОМАНДЫ ПОСЛЕ ВЫБОРА КАТЕГОРИИ:
export const processingCreateLink = async (bot, message, buttonForCreateLink) => {
	return bot.sendMessage(
		message.chat.id,
		"Введите url адрес ссылки, которую вы хотите создать...",
		buttonForCreateLink
	);
}

export const processingCancelCreateLink = async (bot, message, buttonsForSelectCategory) => {
	return bot.sendMessage(
		message.chat.id,
		"Отмена создания ссылки",
		buttonsForSelectCategory,
	);
}

export const processingShowLinks = async (bot, message, messageOnRequestLinks, resultOnRequestLinks) => {
	if (
		messageOnRequestLinks ===
		"Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
	) {
		return bot.sendMessage(message.chat.id, messageOnRequestLinks);
	}
	if (resultOnRequestLinks.links.length > 0) {
		for (let i = 0; i < resultOnRequestLinks.links.length; i++) {
			if (!resultOnRequestLinks.links[i + 1]) {
				return bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequestLinks.links[i].information} 🚩🚩</b> \n<a href="${resultOnRequestLinks.links[i].address}">Ссылка на контент</a>`, {
					parse_mode: "HTML"
				});
			} else {
				await bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequestLinks.links[i].information} 🚩🚩</b> \n<a href="${resultOnRequestLinks.links[i].address}">Ссылка на контент</a>`, {
					parse_mode: "HTML"
				});
			}
		}
	} else {
		return await bot.sendMessage(
			message.chat.id,
			"Созданные ссылки отсутствуют. \nЧтобы посмотреть этот раздел нужно создать ссылку",
		);
	}
}

export const processingDeleteLink = async (bot, message, messageOnRequestLinks, resultOnRequestLinks) => {
	if (
		messageOnRequestLinks ===
		"Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
	) {
		return bot.sendMessage(message.chat.id, messageOnRequestLinks);
	}
	if (resultOnRequestLinks.links.length > 0) {
		for (let i = 0; i < resultOnRequestLinks.links.length; i++) {
			if (!resultOnRequestLinks.links[i + 1]) {
				return bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequestLinks.links[i].information} 🚩🚩</b> \n<a href="${resultOnRequestLinks.links[i].address}">Ссылка на контент</a>`, {
					parse_mode: "HTML", reply_markup: {
						inline_keyboard: [
							[
								{ text: "Удалить ссылку", callback_data: `Удалить ссылку ${resultOnRequestLinks.links[i].information.toUpperCase()}` }
							]
						]
					}
				});
			} else {
				await bot.sendMessage(message.chat.id, `<b>🚩🚩 ${resultOnRequestLinks.links[i].information} 🚩🚩</b> \n<a href="${resultOnRequestLinks.links[i].address}">Ссылка на контент</a>`, {
					parse_mode: "HTML", reply_markup: {
						inline_keyboard: [
							[
								{ text: "Удалить ссылку", callback_data: `Удалить ссылку ${resultOnRequestLinks.links[i].information.toUpperCase()}` }
							]
						]
					}
				});
			}
		}
	} else {
		return await bot.sendMessage(
			message.chat.id,
			"Созданные ссылки отсутствуют. \nЧтобы посмотреть этот раздел нужно создать ссылку",
		);
	}
}

export const processingConfirmDeleteLink = async (bot, message) => {

}

export const processingGoBackToMainMenu = async (bot, message, buttonsForStartCommand) => {
	return bot.sendMessage(
		message.chat.id,
		"Главное меню",
		buttonsForStartCommand
	)
}

// вспомагательные ф-ции:
export const checkResultonRequest = (resultOnRequest, needDelete) => {
	// console.log("resultOnRequest ---> ", resultOnRequest);
	for (let i = 0; i < resultOnRequest.length; i++) {
		if (resultOnRequest[i].links.length > 0) {
			for (let j = 0; j < resultOnRequest[i].links.length; j++) {
				if (needDelete.toLowerCase().indexOf(resultOnRequest[i].links[j].information.toLowerCase()) !== -1) {
					return {
						idNeedCategory: resultOnRequest[i]._id,
						idNeedLink: resultOnRequest[i].links[j]
					};
				}
			}
		}
	}
}