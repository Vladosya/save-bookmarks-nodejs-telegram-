import Router from "express";
import categoryController from "./categoryController.js";

const router = new Router();

router.post("/category", categoryController.createCategory);

router.get("/category", categoryController.getAllCategories);

router.get("/category/links", categoryController.getAllCategoryLinks);

router.get("/category/:id", categoryController.getCategoryById);

router.put("/category", categoryController.updateCategoryById);

router.put("/category/title", categoryController.updateCategoryTitleById);

router.put("/category/description", categoryController.updateCategoryDescriptionById);

router.put("/category/link", categoryController.updateCategoryLinkById);

router.delete("/category/link", categoryController.deleteCategoryLinkById);

router.delete("/category/:id", categoryController.deleteCategoryById);

export default router;