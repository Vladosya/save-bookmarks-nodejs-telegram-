import TelegramBot from "node-telegram-bot-api";

import {
	buttonsForStartCommand,
	buttonsForCreateCategory,
	buttonsForAfterCreateCategory,
	buttonsForSelectCategory,
	buttonsForDeleteCategory,
	buttonsForChangeCategory,
	buttonForChangeCategory,
	buttonForAfterChangeCategory,
	buttonForChangeTitleCategory,
	buttonForAfterChangeTitleCategory,
	buttonForChangeDescriptionCategory,
	buttonForAfterChangeDescriptionCategory,
	buttonForCreateLink,
	buttonsForCancelCreateLink,
	buttonsForDeleteCategoryLink
} from "./buttonsForBot.js";
import {
	getAllCategories,
	createCategory,
	deleteCategory,
	updateCategoryById,
	updateCategoryTitleById,
	updateCategoryDescriptionById,
	getCategoryById,
	createLinkForCategory,
	deleteCategoryOnLink
} from "./requestsForBot.js";
import {
	processingStart,
	processingHelp,
	processingShowCategories,
	processingCreateCategory,
	processingCancelCreateCategory,
	processingGoToMainMenu,
	processingDeleteCategory,
	processingConfirmCategoryDeletion,
	processingCancelCategoryDeletion,
	processingChangeCategory,
	processingCancelCategory,
	processingChangeCategoryTitle,
	processingCancelCategoryTitle,
	processingChangeCategoryDescription,
	processingCancelCategoryDescription,
	processingGoBackToMainMenu,
	processingCreateLink,
	processingCancelCreateLink,
	processingShowLinks,
	processingDeleteLink,
	processingConfirmDeleteLink,
	checkResultonRequest
} from "./processCommForBot.js";

import "dotenv/config";

const adminId = 5028753141;
let currentCategoryChoosed = "";
let categoryTitle = "";
let categoryDescription = "";
let candidateCategoryForRemove = "";

let newCategoryTitle = "";
let oldCategoryTitle = "";
let newCategoryDescription = "";
let oldCategoryDescription = "";
let candidateCategoryForChange = "";

let candidateCategoryChoose = "";
let categoryLinkAddress = "";
let categoryLinkInformation = "";
let candidateCategoryForRemoveLink = "";

const token = process.env.token ? process.env.token : "AAFNdmqI77Io2YHZGUzNlKhCZwvWFPEie9Y";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
	{ command: "/start", description: "Запустить бота" },
	{ command: "/help", description: "Руководство по боту" },
]);

const start = () => {
	bot.on("message", async (message) => {
		if (message.text.length > 0) {
			if (message.chat.id === adminId) {
				let { messageOnRequest, resultOnRequest } = await getAllCategories();
				switch (message.text) {
					case "/start":
						return await processingStart(bot, message, buttonsForStartCommand);
					case "/help":
						return await processingHelp(bot, message);

					case "Показать категории":
						currentCategoryChoosed = "Показать категории";
						return await processingShowCategories(bot, message, messageOnRequest, resultOnRequest);

					case "Создать категорию":
						currentCategoryChoosed = "Создать категорию";
						return await processingCreateCategory(bot, message, buttonsForCreateCategory);

					case "Отменить создание категории":
						categoryTitle = "";
						categoryDescription = "";
						return await processingCancelCreateCategory(bot, message, buttonsForStartCommand);

					case "Перейти в главное меню":
						categoryTitle = "";
						categoryDescription = "";
						newCategoryTitle = "";
						newCategoryDescription = "";
						candidateCategoryForChange = "";
						return await processingGoToMainMenu(bot, message, buttonsForStartCommand);

					case "Изменить название и описание категории":
						currentCategoryChoosed = "Изменить название и описание категории";
						return await processingChangeCategory(bot, message, buttonForChangeCategory, { oldCategoryTitle, oldCategoryDescription });

					case "Отменить изменение категории":
						newCategoryTitle = "";
						newCategoryDescription = "";
						return await processingCancelCategory(bot, message, buttonsForChangeCategory);

					case "Изменить название категории":
						currentCategoryChoosed = "Изменить название категории";
						return await processingChangeCategoryTitle(bot, message, buttonForChangeTitleCategory, { oldCategoryTitle });

					case "Отменить изменение названия категории":
						newCategoryTitle = "";
						return await processingCancelCategoryTitle(bot, message, buttonsForChangeCategory);

					case "Изменить описание категории":
						currentCategoryChoosed = "Изменить описание категории";
						return await processingChangeCategoryDescription(bot, message, buttonForChangeDescriptionCategory, { oldCategoryDescription });

					case "Отменить изменение описания категории":
						newCategoryDescription = "";
						return await processingCancelCategoryDescription(bot, message, buttonsForChangeCategory);

					case "Удалить категорию":
						currentCategoryChoosed = "Удалить категорию";
						return await processingDeleteCategory(bot, message, messageOnRequest, resultOnRequest);

					case "Подтвердить удаление категории":
						let { statusOnReqDelete, messageOnReqDelete } = await deleteCategory(candidateCategoryForRemove);
						await processingConfirmCategoryDeletion(bot, message, buttonsForStartCommand, { statusOnReqDelete, messageOnReqDelete });
						return candidateCategoryForRemove = "";

					case "Отменить удаление категории":
						await processingCancelCategoryDeletion(bot, message, buttonsForStartCommand);
						return candidateCategoryForRemove = "";

					case "Назад в главное меню":
						candidateCategoryChoose = "";
						return await processingGoBackToMainMenu(bot, message, buttonsForStartCommand);

					case "Создать ссылку":
						currentCategoryChoosed = "Создать ссылку";
						return await processingCreateLink(bot, message, buttonForCreateLink);

					case "Отменить создание ссылки":
						categoryLinkAddress = "";
						categoryLinkInformation = "";
						return await processingCancelCreateLink(bot, message, buttonsForSelectCategory);

					case "Посмотреть список ссылок":
						currentCategoryChoosed = "Посмотреть список ссылок";
						let resGetCategoryByIdForShow = await getCategoryById(candidateCategoryChoose);
						return await processingShowLinks(bot, message, resGetCategoryByIdForShow.messageOnRequestLinks, resGetCategoryByIdForShow.resultOnRequestLinks);
					case "Удалить ссылку":
						currentCategoryChoosed = "Удалить ссылку";
						let resGetCategoryByIdForDelete = await getCategoryById(candidateCategoryChoose);
						return await processingDeleteLink(bot, message, resGetCategoryByIdForDelete.messageOnRequestLinks, resGetCategoryByIdForDelete.resultOnRequestLinks);
					case "Подтвердить удаление ссылки":
						// let { statusOnReqDeleteLink, messageOnReqDeleteLink } = await deleteCategoryOnLink(candidateCategoryChoose, candidateCategoryForRemoveLink);
						return await deleteCategoryOnLink(candidateCategoryChoose, candidateCategoryForRemoveLink);
					case "Отменить удаление ссылки":
						console.log("Отменить удаление ссылки");
						return candidateCategoryForRemoveLink = "";
					default:
						if (currentCategoryChoosed === "Создать категорию") {
							if (categoryTitle.length === 0) {
								categoryTitle = message.text;
								await bot.sendMessage(message.chat.id, "Ваши данные по названию категории приняты");
								return bot.sendMessage(message.chat.id, "Введите описание для категории");
							} else {
								if (categoryDescription.length === 0) {
									categoryDescription = message.text;
									await bot.sendMessage(
										message.chat.id,
										"Ваши данные по описанию категории приняты"
									);
									const { statusOnReqCreate, messageOnReqCreate } = await createCategory(
										categoryTitle,
										categoryDescription,
									);
									await bot.sendMessage(message.chat.id, "Идёт создание категории");
									if (statusOnReqCreate === 200) {
										return bot.sendMessage(message.chat.id, messageOnReqCreate, buttonsForAfterCreateCategory);
									} else {
										return bot.sendMessage(message.chat.id, messageOnReqCreate, buttonsForAfterCreateCategory);
									}
								}
							}
						} else if (currentCategoryChoosed === "Изменить название и описание категории") {
							if (newCategoryTitle.length === 0) {
								newCategoryTitle = message.text;
								await bot.sendMessage(message.chat.id, "Ваши данные по названию категории приняты");
								return bot.sendMessage(message.chat.id, "Введите описание для категории");
							} else {
								if (newCategoryDescription.length === 0) {
									newCategoryDescription = message.text;
									await bot.sendMessage(message.chat.id, "Ваши данные по описанию категории приняты");
									const { statusOnReqChangeCategory, messageOnReqChangeCategory } = await updateCategoryById(candidateCategoryForChange, newCategoryTitle, newCategoryDescription);
									if (statusOnReqChangeCategory === 200) {
										return bot.sendMessage(message.chat.id, messageOnReqChangeCategory, buttonForAfterChangeCategory);
									} else {
										return bot.sendMessage(message.chat.id, messageOnReqChangeCategory, buttonForAfterChangeCategory);
									}
								}
							}
						} else if (currentCategoryChoosed === "Изменить название категории") {
							if (newCategoryTitle.length === 0) {
								newCategoryTitle = message.text;
								await bot.sendMessage(message.chat.id, "Ваши данные по новому названию категории приняты");
								let { statusOnReqChangeTitleCategory, messageOnReqChangeTitleCategory } = await updateCategoryTitleById(candidateCategoryForChange, newCategoryTitle);
								if (statusOnReqChangeTitleCategory === 200) {
									return bot.sendMessage(message.chat.id, messageOnReqChangeTitleCategory, buttonForAfterChangeTitleCategory);
								} else {
									return bot.sendMessage(message.chat.id, messageOnReqChangeTitleCategory, buttonForAfterChangeTitleCategory);
								}
							}
						} else if (currentCategoryChoosed === "Изменить описание категории") {
							if (newCategoryDescription.length === 0) {
								newCategoryDescription = message.text;
								await bot.sendMessage(message.chat.id, "Ваши данные по новому описанию категории приняты");
								let { statusOnReqChangeDescriptionCategory, messageOnReqChangeDescriptionCategory } = await updateCategoryDescriptionById(candidateCategoryForChange, newCategoryDescription);
								if (statusOnReqChangeDescriptionCategory === 200) {
									return bot.sendMessage(message.chat.id, messageOnReqChangeDescriptionCategory, buttonForAfterChangeDescriptionCategory);
								} else {
									return bot.sendMessage(message.chat.id, messageOnReqChangeDescriptionCategory, buttonForAfterChangeDescriptionCategory);
								}
							}
						} else if (currentCategoryChoosed === "Создать ссылку") {
							if (categoryLinkAddress.length === 0) {
								categoryLinkAddress = message.text;
								await bot.sendMessage(message.chat.id, "Ваши данные по адресу ссылки приняты");
								return bot.sendMessage(message.chat.id, "Введите описание ссылки");
							} else {
								if (categoryLinkInformation.length === 0) {
									categoryLinkInformation = message.text;
									await bot.sendMessage(message.chat.id, "Ваши данные по описанию ссылки приняты");
									let { statusOnReqCreateLink, messageOnReqCreateLink } = await createLinkForCategory(candidateCategoryChoose, categoryLinkAddress, categoryLinkInformation);
									if (statusOnReqCreateLink === 200) {
										return bot.sendMessage(message.chat.id, messageOnReqCreateLink, buttonsForCancelCreateLink);
									} else {
										return bot.sendMessage(message.chat.id, messageOnReqCreateLink, buttonsForCancelCreateLink);
									}
								}
							}
						} else {
							return bot.sendMessage(message.chat.id, "Данной команды не существует");
						}
				}
			} else {
				return bot.sendMessage(
					message.chat.id,
					"Данный бот вы не можете использовать т.к этот бот создан для личных нужд. Пока",
				);
			}
		}
	});

	bot.on("callback_query", async (query) => {
		let { messageOnRequest, resultOnRequest } = await getAllCategories();
		resultOnRequest.find((e) => {
			if (query.data.toLowerCase().indexOf(e.title.toLowerCase()) !== -1) {
				if (query.data === `Выбрать категорию ${e.title.toUpperCase()}`) {
					candidateCategoryChoose = e._id;
					return bot.sendMessage(query.message.chat.id, `Вы выбрали категорию ${e.title.toUpperCase()}`, buttonsForSelectCategory);
				} else if (query.data === `Изменить категорию ${e.title.toUpperCase()}`) {
					candidateCategoryForChange = e._id;
					oldCategoryTitle = e.title.toUpperCase();
					oldCategoryDescription = e.description;
					return bot.sendMessage(query.message.chat.id, `Изменение категории ${e.title.toUpperCase()}`, buttonsForChangeCategory);
				} else if (query.data === `Удалить категорию ${e.title.toUpperCase()}`) {
					candidateCategoryForRemove = e._id;
					return bot.sendMessage(query.message.chat.id, `Подтвердить удаление категории ${e.title.toUpperCase()}`, buttonsForDeleteCategory);
				}
			}
		})
		if (currentCategoryChoosed === "Удалить ссылку") {
			let { idNeedCategory, idNeedLink } = checkResultonRequest(resultOnRequest, query.data);
			candidateCategoryChoose = idNeedCategory;
			candidateCategoryForRemoveLink = idNeedLink._id;
			return bot.sendMessage(query.message.chat.id, `Подтвердить удаление ссылки ${idNeedLink.information}`, buttonsForDeleteCategoryLink);
		}
	});
};

start();