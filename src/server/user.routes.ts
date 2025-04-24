import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller.js";
import { SetupRoutes } from "../class/routes.class.js";

export class UserRoutes extends SetupRoutes {
    constructor(app: FastifyInstance) {
        super(app);
    }

    setupRoutes(): void {
        const userController = new UserController(this.app);

        this.app.register(async (userApp) => {
            userApp.post("/create", userController.CreateOneUser.bind(userController))
            userApp.get("/all", userController.FindAllUsers.bind(userController))
            userApp.get("/one/:id", userController.FindOneUser.bind(userController))
            userApp.put("/update/:id", userController.UpdateOneUser.bind(userController))
            userApp.delete("/delete/:id", userController.DeleteOneUser.bind(userController))
        }, { prefix: "/users" });

        console.log("User's routes are working!");
    }
}
