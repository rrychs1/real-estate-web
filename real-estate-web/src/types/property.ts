export type PropertyType = 'venta' | 'alquiler';
export type PropertyCategory = 'casa' | 'apartamento' | 'comercial' | 'terreno';

export interface Property {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    currency: 'USD' | 'COP'; // COP for Colombian Peso if local
    type: PropertyType;
    category: PropertyCategory;
    location: {
        city: string;
        address?: string;
        neighborhood?: string;
    };
    features: {
        bedrooms: number;
        bathrooms: number;
        area: number; // in square meters
        parking: number;
    };
    images: string[];
    isFeatured?: boolean;
}
