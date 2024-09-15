import { Router } from "express";
import { CaseController } from "./CaseControlller";

export class casesRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new CaseController();

        router.get("/", controller.getCases);
        router.post("/new", controller.createNewCase);
        router.get("/:id", controller.getCaseById);
        router.put("/:id", controller.updateCase);
        router.delete("/:id", controller.deleteCase);

        return router;
    }
}