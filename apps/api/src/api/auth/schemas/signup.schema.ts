export const signupSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'phone', 'password'],
    properties: {
        firstName: {
            type: 'string',
            example: 'John'
        },
        lastName: {
            type: 'string',
            example: 'Doe'
        },
        dateOfBirth: {
            type: 'string',
            format: 'date',
            example: '1990-01-01'
        },
        email: {
            type: 'string',
            format: 'email',
            example: 'admin@example.com'
        },
        phone: {
            type: 'string',
            example: '+1234567890'
        },
        address: {
            type: 'object',
            properties: {
                building: {
                    type: 'string',
                    example: '108 Oldham Court'
                },
                street: {
                    type: 'string',
                    example: 'Bristol Road'
                },
                town: {
                    type: 'string',
                    example: 'Birmingham'
                },
                county: {
                    type: 'string',
                    example: 'West Midlands'
                },
                postcode: {
                    type: 'string',
                    example: 'B5 7AA'
                }
            }
        },
        password: {
            type: 'string',
            example: 'password123'
        }
    }
};


export const signUpResponseSchema = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            example: 'John'
        },
        lastName: {
            type: 'string',
            example: 'Doe'
        },
        email: {
            type: 'string',
            format: 'email',
            example: 'admin@example.com'
        },
    }
};