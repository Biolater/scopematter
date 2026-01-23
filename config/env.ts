const required = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`[env] Missing ${key}`);
    return value;
};

export const env = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: required('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
    CLERK_SECRET_KEY: required('CLERK_SECRET_KEY'),

    NEXT_PUBLIC_CLERK_SIGN_IN_URL: required('NEXT_PUBLIC_CLERK_SIGN_IN_URL'),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: required('NEXT_PUBLIC_CLERK_SIGN_UP_URL'),
    API_URL: required('API_URL'),
    PUBLIC_API_URL: required('PUBLIC_API_URL'),
};

export default env;