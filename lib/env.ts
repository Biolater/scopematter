const required = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`[env] Missing ${key}`);
    return value;
};

export type Env = {
    AIRTABLE_API_KEY: string;
    AIRTABLE_BASE_ID: string;
    AIRTABLE_TABLE_NAME: string;
};

export const env: Env = {
    AIRTABLE_API_KEY: required('AIRTABLE_API_KEY'),
    AIRTABLE_BASE_ID: required('AIRTABLE_BASE_ID'),
    AIRTABLE_TABLE_NAME: required('AIRTABLE_TABLE_NAME'),
};

export default env;