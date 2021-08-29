import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop()
    emailVerificationToken: string;

    @Prop()
    phoneNumber: string;


    @Prop({ required: true, default: false })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);