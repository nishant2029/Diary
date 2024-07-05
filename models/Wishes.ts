// models/AboutContent.ts
import mongoose from 'mongoose';

const WishSchema = new mongoose.Schema({
  wishcontent: {
    type: String,
    required: true,
  },
});

const Wish = mongoose.models.Wish || mongoose.model('Wish', WishSchema);

export default Wish;
