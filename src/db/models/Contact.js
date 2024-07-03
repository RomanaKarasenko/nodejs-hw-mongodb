import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // Включити, якщо email є обов'язковим
    },
    photo: {
      type: String, // Поле для зберігання URL фотографії
    },
    isFavourite: {
      type: Boolean,
    },
    contactType: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Contact = model('Contact', contactSchema);

export default Contact;
