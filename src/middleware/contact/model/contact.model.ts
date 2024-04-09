import mongoose from "mongoose";
import ContactSchema from "../schema/contact.schema";

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
