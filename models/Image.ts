// models/Image.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IImage extends Document {
  url: string;
  createdAt: Date;
}

const ImageSchema: Schema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
