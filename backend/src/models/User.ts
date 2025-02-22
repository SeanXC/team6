import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id type
  googleId: string;
  name: string;
  email: string;
  age: number | 0;
  interests: string[];
  token?: string;
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: null },
  interests: { type: [String], default: [] },
  token: { type: String },
}, { timestamps: true });

// Ensure `email` is properly indexed and required
UserSchema.path('email').validate(function (value: string) {
  return value && value.length > 0;
}, 'Email is required.');

export default mongoose.model<IUser>('User', UserSchema);