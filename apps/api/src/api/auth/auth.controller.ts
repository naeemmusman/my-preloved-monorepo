import { Request, Response } from "express";
import { Types } from "mongoose";
import { ErrorType, HttpCode } from "../../core/enums";
import { AppError } from "../../core/errors/app.error";
import { AuthService } from "./auth.service";
import path from "node:path";
import fs from 'fs';


const authService = new AuthService();

export class AuthController {

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const user = await authService.signUp(req.body);
            if (!user) {
                throw AppError.badRequest(ErrorType.BadRequest);
            }
            const { firstName, lastName, email } = user;
            res.send({ firstName, lastName, email });

        } catch (error: any) {
            console.error('Error during signup:', error);
            
            res.status(HttpCode.badRequest).json({ message: error.message });
        }
    }

    signin(req: Request, res: Response): void {
        try {
            if (!req.user) {
                throw AppError.unauthorized(ErrorType.Unauthorized);
            }
            res.send(authService.signIn(req.user));
        } catch (error: any) {
            res.status(HttpCode.unauthorized).json({ message: error.message });
        }
    }

    getProfile(req: Request, res: Response): any {
        if (req.user) {
            const { firstName, middleName, lastName, displayName, username, email, phone, dateOfBirth, address, accountActivated, avatar, avatarMimeType, role, isDefaultAvatar } = req.user;

            res.json({ firstName, middleName, lastName, displayName, email, username, phone, dateOfBirth, address, accountActivated, avatar, avatarMimeType, role, isDefaultAvatar });
        }
    }

    async updateProfile(req: Request, res: Response): Promise<any> {
        if (req.user) {

            const payload = req.body;

            if (payload.avatar === null || payload.avatar === undefined) {
                const avatarPath = path.join(__dirname, '../../../src/assets/avatar.jpg');
                payload.avatar = fs.readFileSync(avatarPath);
                payload.avatarMimeType = "image/jpeg";
                payload.isDefaultAvatar = true; // Reset to default avatar                
            }
            // else{
            //     payload.isDefaultAvatar = false;
            // }

            console.log('Update Profile Payload:', payload);


            try {
                const { _id } = req.user;
                await authService.updateProfile(_id as Types.ObjectId, payload);

                const user = await authService.getUserById(_id as Types.ObjectId);
                if (!user) {
                    throw AppError.notFound('User not found');
                }

                const { firstName, middleName, lastName, displayName, username, email, phone, dateOfBirth, address, accountActivated, avatar, avatarMimeType, role, isDefaultAvatar } = user;
                res.send({ firstName, middleName, lastName, displayName, email, username, phone, dateOfBirth, address, accountActivated, avatar, avatarMimeType, role, isDefaultAvatar });

            } catch (error: any) {
                console.error('Error updating profile:', error);
            }
        }
    }

    async uploadAvatar(req: Request, res: Response): Promise<any> {
        if (!req.file) {
            return res.status(HttpCode.badRequest).json({
                message: 'Avatar file is required',
                error: ErrorType.BadRequest
            });
        }

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            return res.status(HttpCode.badRequest).json({
                message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.',
                error: ErrorType.BadRequest
            });
        }
        if (!req.user) {
            return res.status(HttpCode.unauthorized).json({
                message: 'Unauthorized',
                error: ErrorType.Unauthorized
            });
        }

        try {
            const { _id } = req.user;
            const file = req.file;
            await authService.uploadAvatar(_id as Types.ObjectId, file.buffer, file.mimetype, false); // Assuming new users do not have a default avatar
            
            const user = await authService.getUserById(_id as Types.ObjectId);

            return res.status(200).json({ message: 'Avatar uploaded successfully', avatar: user?.avatar, avatarMimeType: user?.avatarMimeType, isDefaultAvatar: user?.isDefaultAvatar });
            
        } catch (err: any) {
            console.error('Avatar upload failed:', err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async deleteAvatar(req: Request, res: Response): Promise<any> {
        if (!req.user) {
            return res.status(HttpCode.unauthorized).json({
                message: 'Unauthorized',
                error: ErrorType.Unauthorized
            });
        }

        try {
            const { _id } = req.user;
            const avatarPath = path.join(__dirname, '../../../src/assets/avatar.jpg');
            const avatarBuffer = fs.readFileSync(avatarPath);
            const mimeType = "image/jpeg"; // Assuming default avatar is JPEG
            
            await authService.uploadAvatar(_id as Types.ObjectId, avatarBuffer, mimeType, true); // Set isDefaultAvatar to true to reset avatar
            
            return res.status(200).json({ message: 'Avatar deleted successfully', avatar: avatarBuffer, avatarMimeType: mimeType, isDefaultAvatar: true });
            
        } catch (error: any) {
            console.error('Error deleting avatar:', error);
            return res.status(HttpCode.internalServerError).json({ message: 'Internal server error' });
        }

    }



    async createPasswordReset(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                throw AppError.unauthorized(ErrorType.Unauthorized);
            }

            const resetPasswordOTP = await authService.createPasswaordResetRequest(req.user);
            res.send(resetPasswordOTP);
        } catch (error: any) {
            res.status(HttpCode.unauthorized).json({ message: error.message });
        }

    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                throw AppError.unauthorized(ErrorType.Unauthorized);
            }
            const { password } = req.body;
            const result = await authService.resetPassword(req.user._id as Types.ObjectId, password);

            res.send(result);
        } catch (error: any) {
            res.send({ success: false, message: error.message });
        }
    }
}