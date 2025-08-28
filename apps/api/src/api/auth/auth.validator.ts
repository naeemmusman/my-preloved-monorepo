import Joi from "joi";

export interface SignInDTO {
    email: string;
    password: string;
}

export const signInSchema = Joi.object<SignInDTO>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
}).required().messages({
    'string.empty': 'Email and password are required',
    'any.required': 'Email and password are required',
});

export interface AddressDTO {
    building: string;
    street: string;
    town: string;
    county?: string;
    postcode: string;
}

export const addressSchema = Joi.object<AddressDTO>({
    building: Joi.string().required(),
    street: Joi.string().required(),
    town: Joi.string().required(),
    county: Joi.string(),
    postcode: Joi.string().required(),
}).required()
    .messages({
        'string.empty': 'Building, street, town and postcode are required',
        'any.required': 'Building, street, town and postcode are required',
        'string.min': 'Building, street, town and postcode must be at least 1 character long',
        'string.max': 'Building, street, town and postcode must be at most 100 characters long',
    });

export interface SignUpDTO {
    firstName: string;
    middleName?: string;
    lastName: string;
    displayName?: string;
    dateOfBirth: Date;
    username?: string;
    email: string;
    phone: string;
    address: AddressDTO;
    password: string;
    confirmPassword: string;
}

export const signUpSchema = Joi.object<SignUpDTO>({
    firstName: Joi.string().min(3).max(15).required(),
    middleName: Joi.string().min(3).max(15).optional(),
    lastName: Joi.string().min(3).max(15).required(),
    displayName: Joi.string().min(3).max(15).optional(),
    dateOfBirth: Joi.date().iso().required(),
    username: Joi.string().min(8).max(20),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(15).required(),
    address: addressSchema,
    password: Joi.string()
        .min(8)
        .max(25)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 25 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({ 'any.only': 'Passwords do not match' }),
}).required();



export interface ForgetPasswordDTO {
    email: string;
}

export const forgetPasswordSchema = Joi.object<ForgetPasswordDTO>({
    email: Joi.string().email().required(),
}).required().messages({
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
});

export interface ResetPasswordDTO {
    email: string;
    verificationCode: number;
    password: string;
    confirmPassword: string;
}

export const resetPasswordSchema = Joi.object<ResetPasswordDTO>({
    email: Joi.string().email().required(),
    verificationCode: Joi.number().required(),
    password: Joi.string().min(6).max(20).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({ 'any.only': 'Passwords do not match' }),
}).required().messages({
    'string.empty': 'Password, confirm password and OTP are required',
    'any.required': 'Password, confirm password and OTP are required',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be at most 20 characters long',
    'string.email': 'Email must be a valid email address',
});