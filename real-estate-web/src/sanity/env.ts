export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-11'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yjrhlnen';

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    // Return v if defined, otherwise log warning and return undefined (or handle upstream)
    // But since we are providing defaults above, this function might not be needed as strictly.
    // However, to keep the signature:
    if (v === undefined) {
        // console.warn(errorMessage);
        throw new Error(errorMessage)
    }
    return v
}
