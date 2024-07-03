// models/AboutContent.ts
import mongoose from 'mongoose';

const AboutContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const AboutContent = mongoose.models.AboutContent || mongoose.model('AboutContent', AboutContentSchema);

export default AboutContent;
