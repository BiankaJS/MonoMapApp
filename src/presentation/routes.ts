import { Router } from "express";
import { casesRoutes } from "./controllers/Cases/routes";

export class AppRoutes {
  static get routes() : Router{
    const router = Router();
    router.use("/api/cases", casesRoutes.routes);
    return router;
  }
}