
export interface Property {
    _id: string;
    title: string;
    slug: { current: string };
    price: number;
    currency: 'COP' | 'USD';
    operationType: 'venta' | 'alquiler';
    area: number;
    rooms: number;
    bathrooms: number;
    parking: number;
    location: {
        city: string;
        neighborhood?: string;
        address?: string;
    };
    mainImage: any;
    gallery?: any[];
    description: string;
    amenities?: string[];
    features?: string[];
    commonZones?: string[];
    videos?: {
        title?: string;
        url: string;
    }[];
    highlighted?: boolean;
}
