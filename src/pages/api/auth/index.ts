import { AuthController, AccessTokenGuard } from "middleware/auth";

export default AccessTokenGuard(AuthController, "POST");
