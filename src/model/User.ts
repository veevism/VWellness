import mongoose, { Document } from "mongoose";

enum UserStatus {
    Active = "Active",
    Inactive = "Inactive",
}
type Email = string;
type AccessToken = string;
type RefreshToken = string;
type ImageUrl = string;

interface IImageCollectionOccupied {
    imageUrl: ImageUrl;
    imageCollectionId: mongoose.Types.ObjectId;
    title: string;
}

interface IUser extends Document {
    email: Email;
    password: string;
    name: string;
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    points: number;
    imageCollectionOccupied: IImageCollectionOccupied[];
    status: UserStatus;
}
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    points: { type: Number, default: 0 },
    imageCollectionOccupied: [{
        imageUrl: { type: String, required: true },
        imageCollectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String, required: true }
    }],
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.Active }
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };