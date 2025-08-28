import moment from 'moment';
import { Types } from "mongoose";
import { AppError } from '../../core/errors/app.error';
import { UserDocument, UserModel } from "../../domain/models/user";
import { generateToken } from "../../utils/jwt.utils";
import { SignUpDTO } from "./auth.validator";
import path from 'path';
import fs from 'fs';

export class AuthService {
    public async signUp(userData: SignUpDTO): Promise<UserDocument> {
        const { firstName, middleName, lastName, displayName = null , dateOfBirth, username = null, email, phone, address, password } = userData;

        const avatarPath = path.join(__dirname, '../../../src/assets/avatar.jpg');
        const avatarBuffer = fs.readFileSync(avatarPath);
        const mimeType = "image/jpeg"; // Assuming default avatar is JPEG
        
        const newUser = new UserModel({
            firstName,
            middleName,
            lastName,
            displayName: displayName ?? `${firstName} ${lastName}`,
            dateOfBirth,
            username: username ?? `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${moment().format('YY')}`,
            email,
            phone,
            address,
            password,
            role: 'user',
            isDefaultAvatar: true, // assuming new users have a default avatar
            failedLogins: 0,
            avatarMimeType: mimeType,
            avatar: avatarBuffer,
        });

        return newUser.save();
        // return newUser;
    }

    public signIn(user: UserDocument): { token: string } {
        const { firstName, lastName, email, phone, address } = user;
        return { token: generateToken({ firstName, lastName, email, phone, address }) };
    }

    public async uploadAvatar(userId: Types.ObjectId, avatarBuffer: Buffer, mimeType: string, isDefaultAvatar: boolean): Promise<void> {
        try {
            await UserModel.findByIdAndUpdate( userId, { avatar: avatarBuffer, avatarMimeType: mimeType, isDefaultAvatar }, { new: true } );
              
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw AppError.internalServerError('Failed to upload avatar');
        }   
    }

    public async updateProfile(userId: Types.ObjectId, userData: Partial<SignUpDTO>): Promise<UserDocument> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { ...userData, updatedAt: new Date() },
                { new: true }
            );

            if (!updatedUser) {
                throw AppError.notFound('User not found');
            }

            return updatedUser;

        } catch (error) {
            console.error('Error updating profile:', error);
            throw AppError.internalServerError('Failed to update profile');
        }
    }

    public async getUserById(userId: Types.ObjectId): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw AppError.notFound('User not found');
            }
            return user;
            
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw AppError.internalServerError('Failed to fetch user');
        }
    }
            


    public async createPasswaordResetRequest(userDOC: UserDocument): Promise<{ otp: number }> {

        try {
            const passwordReset = {
                resetOTP: this.generateOTP(),
                expires: moment().add(1, 'hour').toDate()
            };

            await UserModel.findOneAndUpdate(
                { email: userDOC.email },
                { passwordReset },
                { new: true }
            );

            // const { API_HOST, API_PORT, API_PREFIX } = process.env;
            // const resetPasswordURL = `${API_HOST}:${API_PORT}/${API_PREFIX}/auth/reset-password/${forgetPasswordToken}`;

            return { otp: passwordReset.resetOTP };

        } catch (error) {
            console.error('Error creating password reset request', error);
            throw AppError.internalServerError('Failed to create password reset request');
        }
    }


    public async resetPassword(_id: Types.ObjectId, password: string): Promise<{ success: boolean, message: string }> {
        try {

            const updatedUser = await UserModel.findByIdAndUpdate(
                _id,
                { password, passwordReset: null },
                { new: true }
            );

            if (!updatedUser) {
                throw AppError.notFound('User not found');
            }
            return { success: true, message: 'Password reset successfully' };

        } catch (error) {
            console.error('Error resetting password');
            console.error(error);
            throw AppError.internalServerError('Failed to reset password');
        }
    }


    private generateOTP(): number {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}