import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
 name:String
}
const UserSchema: Schema = new Schema({

  name: { type: String, required: true }
});

export const User: Model<IUser> = model('User', UserSchema);