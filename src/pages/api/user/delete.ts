import { RefreshTokenGuard } from "middleware/auth";
import { UserController } from "middleware/user"

export default RefreshTokenGuard(UserController, "POST");