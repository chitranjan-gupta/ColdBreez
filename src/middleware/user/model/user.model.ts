import mongoose from "mongoose";
import UserSchema from "../schema/user.schema";

export default mongoose.models.User || mongoose.model("User", UserSchema);
