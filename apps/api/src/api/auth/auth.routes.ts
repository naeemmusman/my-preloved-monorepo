// routhes
import { Router } from 'express';
import multer from 'multer';
import { ValidateMiddleware } from '../../core/middlewares/validate.middleware';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { ForgetPasswordDTO, forgetPasswordSchema, ResetPasswordDTO, resetPasswordSchema, SignInDTO, signInSchema, SignUpDTO, signUpSchema } from './auth.validator';

const uploadAvatar = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb: multer.FileFilterCallback) => {
        console.log(`File received: ${file.originalname}, Type: ${file.mimetype}`);
        
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
});


export class AuthRoutes {
    static get router(): Router {
        const router = Router();

        const authController = new AuthController();

        /**
         * @swagger
         * /api/auth/signin:
         *  post:
         *   summary: User Sign in
         *   description: User Sign in
         */
        router.post(
            '/signin',
            ValidateMiddleware.validate<SignInDTO>(signInSchema),
            AuthMiddleware.validateSignIn,
            authController.signin
        );

        /**
         * @swagger
         * /api/auth/signup:
         *  post:
         *   tags:
         *    - Authenication
         *   summary: User Sign up
         *   description: User Sign up
         *   security: []
         *   requestBody:
         *    required: true
         *    content:
         *     application/json:
         *      schema:
         *       $ref: '#/components/schemas/UserSignUpRequest'
         *   responses:
         *    201:
         *     description: User signUp successful !
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/UserSignUpResponse'
         *    400:
         *     description: Validation error
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/ValidationError'
         * 
         */
        router.post(
            '/signup',
            ValidateMiddleware.validate<SignUpDTO>(signUpSchema),
            AuthMiddleware.userExists,
            authController.signup);


        /**
        * @swagger
        * /api/auth/profile:
        *  get:
        *   tags:
        *    - Authenication
        *   summary: Get signed-in user profile
        *   description: Get signed-in user profile
        *   security:
        *       - bearerAuth: []
        *   responses:
        *    200:
        *     description: User loaded successful !
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/UserProfileResponse'
        *    400:
        *     description: Validation error
        *     schema:
        *      $ref: '#/components/schemas/ValidationError'
        * 
        */
        router.get(
            '/profile',
            ValidateMiddleware.validateAuthHeader,
            AuthMiddleware.authenticateJwt,
            authController.getProfile);


        /**
         * @swagger
         * /api/auth/profile/avatar:
         *  post:
         *   tags:
         *    - Authenication
         *   summary: for upload user avatar
         *   description: for upload user avatar
         *   security: 
         *          - bearerAuth: []
         *   requestBody:
         *    required: true
         *    content:
         *     multipart/form-data:
         *      schema:
         *       $ref: '#/components/schemas/UserAvatarUploadRequest'
         *   responses:
         *    200:
         *     description: Avatar uploaded successfully!
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/UserAvatarUploadResponse'
         *    400:
         *     description: Validation error
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/ValidationError'
         */
        router.post(
            '/profile/avatar',
            ValidateMiddleware.validateAuthHeader,
            AuthMiddleware.authenticateJwt,
            uploadAvatar.single('avatar'),
            authController.uploadAvatar,    
        );

        
        /**
        * @swagger
        * /api/auth/profile:
        *  put:
        *   tags:
        *    - Authenication
        *   summary: update signed-in user profile
        *   description: update signed-in user profile
        *   security:
        *       - bearerAuth: []
        *   responses:
        *    200:
        *     description: User updated successful !
        *     
        *    400:
        *     description: Validation error
        *     schema:
        *      $ref: '#/components/schemas/ValidationError'
        * 
        */
        router.put(
            '/profile',
            ValidateMiddleware.validateAuthHeader,
            AuthMiddleware.authenticateJwt,
            authController.updateProfile);

        /**
        * @swagger
        * /api/auth/forgot-password:
        *  post:
        *   tags:
        *    - Authenication
        *   summary: for forgot password
        *   description: for forgot password
        *   security: []
        *   requestBody:
        *    required: true
        *    content:
        *     application/json:
        *      schema:
        *       $ref: '#/components/schemas/ForgetPassword'
        *   responses:
        *    200:
        *     description: click the URL !
        *    400:
        *     description: Validation error
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/ValidationError'
        * 
        */
        router.post(
            '/forgot-password',
            ValidateMiddleware.validate<ForgetPasswordDTO>(forgetPasswordSchema),
            AuthMiddleware.validateUserByEmail,
            authController.createPasswordReset);

        /**
        * @swagger
        * /api/auth/forgot-password:
        *  post:
        *   tags:
        *    - Authenication
        *   summary: for forgot password
        *   description: for forgot password
        *   security: []
        *   requestBody:
        *    required: true
        *    content:
        *     application/json:
        *      schema:
        *       $ref: '#/components/schemas/ForgetPassword'
        *   responses:
        *    200:
        *     description: click the URL !
        *    400:
        *     description: Validation error
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/ValidationError'
        * 
        */
        router.post(
            '/reset-password',
            ValidateMiddleware.validate<ResetPasswordDTO>(resetPasswordSchema),
            AuthMiddleware.validateUserByEmail,
            AuthMiddleware.validateResetPassword,
            authController.resetPassword);

        return router;
    }
}