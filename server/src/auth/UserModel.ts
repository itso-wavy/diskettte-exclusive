import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  profile: {
    nickname: string | null;
    image: string | null;
    description: string | null;
  };
  createdAt: Date;
}

export const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    nickname: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null },
  },
  createdAt: { type: Date, default: Date.now },
});

/* {
  _id: new ObjectId('665d04c8ce1a85381b1ce295'),
  username: 'wavy',
  password: '$argon2id$v=19$m=65536,t=3,p=4$b2hlf3+7GSzcuZn3TwD1Cw$lLqFWv9/5NdtcUPMV0+Z/E7g/fQD8FXr/v1KktVKzjw',
  profile: { 
    nickname: 'wavy', 
    image: null, 
    description: null
  },    
  createdAt: 2024-06-02T23:48:24.647Z,
  __v: 0
} */
