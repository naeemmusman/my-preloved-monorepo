import * as express from 'express'
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { forgetPasswordSchema, resetPasswordSchema } from './api/auth/schemas/forgot-password.schema';
import { signInResponseSchema, signInSchema } from './api/auth/schemas/signin.schema';
import { signUpResponseSchema, signupSchema } from './api/auth/schemas/signup.schema';
import { profileSchema, UserAvatarUploadResponseSchema, UserAvatarUploadSchema } from './api/auth/schemas/profile.schema';
import path from 'path';
import fs from 'fs';

const validationErrorSchema = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'integer',
            example: 400,
        },
        message: {
            type: 'string',
            example: 'Validation error',
        },
        error: {
            type: 'string',
            example: 'Bad Request',
        },
        notification:{
            type: 'string',
            example: 'info',
        },
        validationErrors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    field: {
                        type: 'string',
                        example: 'email',
                    },
                    message: {
                        type: 'string',
                        example: 'Email is required',
                    },
                },
            },
        },
    },
};

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for the project.',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter JWT token e.g. Bearer <JWT_TOKEN>'
            },
        },
        schemas: {
            ValidationError: validationErrorSchema,
            UserSignInRequest: signInSchema,
            UserSignInResponse: signInResponseSchema,
            UserSignUpRequest: signupSchema,
            UserSignUpResponse: signUpResponseSchema,
            UserProfileResponse:profileSchema,
            UserAvatarUploadRequest: UserAvatarUploadSchema,
            UserAvatarUploadResponse: UserAvatarUploadResponseSchema,
            ForgetPassword: forgetPasswordSchema,
            ResetPassword: resetPasswordSchema,
        }
    }
};

// const apisPath = path.resolve(__dirname + '**/*.routes.js');

const options = {
    swaggerDefinition,
    apis: [path.resolve(__dirname + '**/*.routes.js')], // Path to the API docs
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerUiSetup = (app: express.Application) => {

    try {
        const srcDir = path.resolve(__dirname, '../../api/src');
        const files = fs.readdirSync(srcDir, { withFileTypes: true });
        console.log(
        '📂 Files in src/:',
        files.map((f) => f.name)
        );
    } catch (err) {
        console.warn('⚠️ Could not list src directory:', err.message);
    }
  
    const { API_HOST, API_PORT, API_PREFIX } = process.env;
    app.use(`${API_PREFIX}/documentation`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`API documentation available at ${API_HOST}:${API_PORT}${API_PREFIX}/documentation`);
};