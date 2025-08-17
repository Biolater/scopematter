const required = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`[env] Missing ${key}`);
    return value;
};



export const env = {
    AIRTABLE_API_KEY: required('AIRTABLE_API_KEY'),
    AIRTABLE_BASE_ID: required('AIRTABLE_BASE_ID'),
    AIRTABLE_TABLE_NAME: required('AIRTABLE_TABLE_NAME'),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: required('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
    CLERK_SECRET_KEY: required('CLERK_SECRET_KEY'),
    DATABASE_PASSWORD: required('DATABASE_PASSWORD'),
};

export default env;