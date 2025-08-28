export interface SignUpRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    password: string;
    address: Address;
}

export interface Address {
    building: string;
    street: string;
    town: string;
    county?: string;
    postcode: string;
}

export interface SignUpResponse {
    firstName: string,
    lastName: string,
    email: string,
}