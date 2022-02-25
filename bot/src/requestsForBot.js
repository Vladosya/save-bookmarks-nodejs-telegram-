import axios from "axios";

export const getAllCategories = async () => {
	const response = await axios.get("http://localhost:8080/api-v1/category");
	if (response) {
		return {
			messageOnRequest: response.data.message,
			resultOnRequest: response.data.result,
		};
	} else {
		return {
			messageOnRequest: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку",
			resultOnRequest: [],
		};
	}
};

export const getCategoryById = async (idCategory) => {
	const response = await axios.get(`http://localhost:8080/api-v1/category/${idCategory}`);
	if (response) {
		return {
			messageOnRequestLinks: response.data.message,
			resultOnRequestLinks: response.data.result
		}
	} else {
		return {
			messageOnRequest: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку",
			resultOnRequest: [],
		};
	}
}

export const createCategory = async (title, description) => {
	const response = await axios.post("http://localhost:8080/api-v1/category", { title, description })
	if (response) {
		return {
			statusOnReqCreate: response.data.status,
			messageOnReqCreate: response.data.message
		}
	} else {
		return {
			status: 404,
			message: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
		}
	}
}

export const deleteCategory = async (idCategory) => {
	const response = await axios.delete(`http://localhost:8080/api-v1/category/${idCategory}`);
	if (response) {
		return {
			statusOnReqDelete: response.data.status,
			messageOnReqDelete: response.data.message
		}
	} else {
		return {
			statusOnReqDelete: 404,
			messageOnReqDelete: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
		}
	}
}

export const deleteCategoryOnLink = async (_id, id_link) => {
	console.log("_id 1---> ", _id);
	console.log("id_link 1---> ", id_link);
	// const response = await axios.delete("http://localhost:8080/api-v1/category/link", { _id, id_link });
	// console.log("response ---> ", response);
	// if (response) {
	// 	return {
	// 		statusOnReqDeleteLink: response.data.status,
	// 		messageOnReqDeleteLink: response.data.message
	// 	}
	// } else {
	// 	return {
	// 		statusOnReqDeleteLink: 404,
	// 		messageOnReqDeleteLink: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
	// 	}
	// }
}

export const updateCategoryById = async (idCategory, newTitle, newDescription) => {
	const response = await axios.put("http://localhost:8080/api-v1/category", {
		_id: idCategory,
		title: newTitle,
		description: newDescription
	})
	if (response) {
		return {
			statusOnReqChangeCategory: response.data.status,
			messageOnReqChangeCategory: response.data.message
		}
	} else {
		return {
			statusOnReqChangeCategory: 404,
			messageOnReqChangeCategory: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
		}
	}
}

export const updateCategoryTitleById = async (idCategory, newTitle) => {
	const response = await axios.put("http://localhost:8080/api-v1/category/title", {
		_id: idCategory,
		title: newTitle
	})
	if (response) {
		return {
			statusOnReqChangeTitleCategory: response.data.status,
			messageOnReqChangeTitleCategory: response.data.message
		}
	} else {
		return {
			statusOnReqChangeTitleCategory: 404,
			messageOnReqChangeTitleCategory: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
		}
	}
}

export const updateCategoryDescriptionById = async (idCategory, newDescription) => {
	const response = await axios.put("http://localhost:8080/api-v1/category/description", {
		_id: idCategory,
		description: newDescription
	})
	if (response) {
		return {
			statusOnReqChangeDescriptionCategory: response.data.status,
			messageOnReqChangeDescriptionCategory: response.data.message
		}
	} else {
		return {
			statusOnReqChangeDescriptionCategory: 404,
			messageOnReqChangeDescriptionCategory: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
		}
	}
}

export const createLinkForCategory = async (idCategory, newAddress, newInformation) => {
	const response = await axios.put("http://localhost:8080/api-v1/category/link", {
		_id: idCategory,
		address: newAddress,
		information: newInformation
	});

	if (response) {
		return {
			statusOnReqCreateLink: response.data.status,
			messageOnReqCreateLink: response.data.message
		}
	} else {
		return {
			statusOnReqChangeDescriptionCategory: 404,
			messageOnReqChangeDescriptionCategory: "Ошибка сервера. Проверьте запущен ли сервер. И повторите попытку"
		}
	}
}