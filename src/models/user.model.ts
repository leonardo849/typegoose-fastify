import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({schemaOptions: {timestamps: true}})
class User {
    @prop({required: true})
    name!: string;

    @prop({required: true, unique: true})
    email!: string;
}

export const UserModel = getModelForClass(User)
