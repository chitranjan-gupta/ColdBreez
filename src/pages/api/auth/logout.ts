import { AuthController, RefreshTokenGuard } from "middleware/auth";

export default RefreshTokenGuard(AuthController, "POST");
