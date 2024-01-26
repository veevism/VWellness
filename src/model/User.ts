import mongoose from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    access_token: string;
    refresh_token: string;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    access_token: { type : String},
    refresh_token: { type : String}
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
