import * as sanityImage from '@sanity/image-url';
console.log('Exports:', Object.keys(sanityImage));
try {
    console.log('createImageUrlBuilder type:', typeof sanityImage.createImageUrlBuilder);
} catch (e) {
    console.log('Error accessing createImageUrlBuilder');
}
try {
    console.log('default export type:', typeof sanityImage.default);
} catch (e) {
    console.log('Error accessing default export');
}
