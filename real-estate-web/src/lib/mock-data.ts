import { Property } from "@/types/property";

export const MOCK_PROPERTIES: Property[] = [
    {
        id: "1",
        title: "Penthouse de Lujo con Vista Panorámica",
        slug: "penthouse-vista-panoramica",
        description: "Espectacular penthouse duplex con acabados de primera...",
        price: 1250000000,
        currency: "COP",
        type: "venta",
        category: "apartamento",
        location: {
            city: "Bogotá",
            neighborhood: "Rosales",
            address: "Calle 72 # 5-20"
        },
        features: {
            bedrooms: 3,
            bathrooms: 4,
            area: 250,
            parking: 2
        },
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"],
        isFeatured: true
    },
    {
        id: "2",
        title: "Casa Moderna en Conjunto Cerrado",
        slug: "casa-moderna-conjunto-cerrado",
        description: "Hermosa casa familiar con jardín privado...",
        price: 850000000,
        currency: "COP",
        type: "venta",
        category: "casa",
        location: {
            city: "Chía",
            neighborhood: "Fontanar",
        },
        features: {
            bedrooms: 4,
            bathrooms: 3,
            area: 180,
            parking: 2
        },
        images: ["https://images.unsplash.com/photo-1600596542815-e328701102b9?auto=format&fit=crop&q=80"],
        isFeatured: true
    },
    {
        id: "3",
        title: "Apartaestudio Ejecutivo Amoblado",
        slug: "apartaestudio-ejecutivo",
        description: "Ideal para profesionales, ubicación estratégica...",
        price: 3500000,
        currency: "COP",
        type: "alquiler",
        category: "apartamento",
        location: {
            city: "Medellín",
            neighborhood: "El Poblado",
        },
        features: {
            bedrooms: 1,
            bathrooms: 1,
            area: 45,
            parking: 1
        },
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"]
    },
    {
        id: "4",
        title: "Oficina Corporativa Prime",
        slug: "oficina-corporativa-prime",
        description: "Espacio de trabajo moderno en edificio inteligente...",
        price: 15000000,
        currency: "COP",
        type: "alquiler",
        category: "comercial",
        location: {
            city: "Bogotá",
            neighborhood: "Chicó Norte"
        },
        features: {
            bedrooms: 0,
            bathrooms: 2,
            area: 120,
            parking: 3
        },
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"]
    }
];
