import Category from "./categorySchema.js";

class CategoryController {
	async createCategory(req, res) {
		try {
			const { title, description } = req.body;
			await Category.create({ title, description });
			res.status(200).json({
				status: 200,
				message: "Категория успешно создана",
			});
		} catch (error) {
			res.status(500).json({
				status: 400,
				message: error,
			});
		}
	}

	async getAllCategories(_, res) {
		try {
			const categories = await Category.find();
			res.status(200).json({
				status: 200,
				message: "Result getting all categories successful",
				result: categories,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async getAllCategoryLinks(_, res) {
		try {
			const categories = await Category.find();
			let all_links = [];
			categories.map((e) => {
				if (e.links.length > 0) {
					all_links.push(...e.links);
				}
			});
			res.status(200).json({
				status: 200,
				message: "Result getting all categories links successful",
				result: all_links,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async getCategoryById(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				res.status(500).json({
					status: 400,
					message: "Id not passed",
				});
			}
			const category = await Category.findById(id);
			res.status(200).json({
				status: 200,
				message: "Result getting category by id successful",
				result: category,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async updateCategoryById(req, res) {
		try {
			const category = req.body;
			if (!category._id) {
				res.status(500).json({
					status: 400,
					message: "Id not passed",
				});
			}
			const updateCategory = await Category.findByIdAndUpdate(category._id, category, {
				new: true,
			});
			res.status(200).json({
				status: 200,
				message: "Название и описание категории успешно изменено",
				result: updateCategory,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async updateCategoryTitleById(req, res) {
		try {
			const { title, _id } = req.body;
			if (!_id) {
				req.status(500).json({
					status: 400,
					message: "Id not passed",
				});
			}
			const updateTitle = await Category.findById(_id);
			updateTitle.overwrite({ title: `${title}`, description: updateTitle.description });
			await updateTitle.save();

			res.status(200).json({
				status: 200,
				message: "Название категории успешно изменено",
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async updateCategoryDescriptionById(req, res) {
		try {
			const { description, _id } = req.body;
			if (!_id) {
				req.status(500).json({
					status: 400,
					message: "Id not passed",
				});
			}
			const updateDescription = await Category.findById(_id);
			updateDescription.overwrite({
				title: updateDescription.title,
				description: `${description}`,
			});
			await updateDescription.save();

			res.status(200).json({
				status: 200,
				message: "Описание категории успешно изменено",
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async updateCategoryLinkById(req, res) {
		try {
			const { _id, address, information } = req.body;
			if (!_id) {
				res.status(500).json({
					status: 400,
					message: "Id not passed",
				});
			}
			const category = await Category.findById(_id);
			category.links.push({ address: address, information: information });
			category.overwrite({
				title: category.title,
				description: category.description,
				links: category.links,
			});
			await category.save();
			res.status(200).json({
				status: 200,
				message: "Ссылка для категории успешно создана",
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async deleteCategoryLinkById(req, res) {
		try {
			const { _id, id_link } = req.body;
			if (!_id) {
				res.status(500).json({
					status: 400,
					message: "Id not passed",
				});
			}
			const category = await Category.findById(_id);
			if (category.links.length === 0) {
				res.status(500).json({
					status: 400,
					message: "There are no links in this list",
				});
			} else {
				category.overwrite({
					title: category.title,
					description: category.description,
					links: category.links.filter((l) => {
						return l._id.toString() !== id_link;
					}),
				});
				await category.save();
				res.status(200).json({
					status: 200,
					message: "Ссылка успешно удалена",
				});
			}
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}

	async deleteCategoryById(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				res.status(500).json({
					status: 400,
					message: "Id not passed",
				});
			}
			const category = await Category.findByIdAndDelete(id);
			res.status(200).json({
				status: 200,
				message: "Категория успешно удалена",
				result: category,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error,
			});
		}
	}
}

export default new CategoryController();
