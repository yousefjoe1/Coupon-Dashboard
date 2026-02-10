export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginResponse<T> {
    data: T;
    message: string;
    status: string;
}