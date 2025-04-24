import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({schemaOptions: {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }}})
class User {
    @prop({required: true})
    name!: string;

    @prop({required: true, unique: true})
    email!: string;

    @prop({ default: Date.now })
    createdAt!: Date;

    @prop({ default: Date.now })
    updatedAt!: Date;
}

export const UserModel = getModelForClass(User)
