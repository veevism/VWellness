import mongoose, { Document } from 'mongoose';


type ImageUrl = string;
type PointsRequired = number;
type Title = string
type Description = string

enum ImageStatus {
    Active = "Active",
    Inactive = "Inactive",
}

export interface IImageCollection extends Document {
    imageUrl: ImageUrl;
    pointsRequired: PointsRequired;
    title: Title;
    status: ImageStatus
    description: Description
}

const ImageCollectionSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    pointsRequired: { type: Number, required: true },
    title: { type: String, required: true },
    status: {type : String, enum : Object.values(ImageStatus), default: ImageStatus.Active },
    description: {type : String, default: "This is Veevi"}
});

export const ImageCollection = mongoose.model<IImageCollection>('ImageCollection', ImageCollectionSchema);
