import bcrypt from "bcrypt";
import mongoose, { Document, Query, Schema } from "mongoose";
import { Address, AddressSchema } from "./address";

const SALT_ROUNDS = 10;

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    middleName: string;
    displayName: string;
    dateOfBirth: Date;
    username: string;
    email: string;
    phone: string;
    address: Address;
    password: string;
    role: string;
    avatar?: Buffer; // optional blob field
    avatarMimeType?: string; 
    isDefaultAvatar?: boolean;
    failedLogins: number;
    lockedUntil: Date | null;
    verificationCode?: string;
    accountActivated: boolean;
    passwordReset?: PasswordReset;
    createdAt: Date;
    updatedAt: Date;
}

export interface PasswordReset {
    resetOTP: number;
    expires: Date;
}

const passwordResetSchema = new Schema<PasswordReset>({
    resetOTP: {
        type: Number,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
}, {
    _id: false,
    timestamps: true,
    versionKey: false,
});


const userSchema = new Schema<UserDocument>({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: AddressSchema,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: { 
        type: Buffer
    },
    avatarMimeType: { 
        type: String 
    },
    isDefaultAvatar: {
        type: Boolean,
        default: true, // assuming new users have a default avatar
    },
    failedLogins:{
        type: Number,
        default: 0
    },
    lockedUntil:{
        type: Date,
        default: null
    },
    verificationCode: {
        type: String,
        default: null,
    },
    accountActivated: {
        type: Boolean,
        default: false,
    },
    passwordReset: {
        type: passwordResetSchema,
        default: null,
    },
}, { timestamps: true });

userSchema.pre(/^save/, async function(next) {
    const user = this as any;
    
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error as Error);
    }
});

userSchema.pre(/^findOneAndUpdate/, async function (this: Query<any, UserDocument>, next) {

    const update = (this as any).getUpdate();
    if (update.password) {
        try {
            const hashedPassword = await bcrypt.hash(update.password, SALT_ROUNDS);
            update.password = hashedPassword;
            (this as any).setUpdate(update);
            next();
        } catch (error) {
            return next(error as Error);
        }
    }
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
