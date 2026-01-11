export const mockProperties = [
    {
        _id: 'mock-1',
        title: 'Penthouse de Lujo en Rosales',
        price: 4500000000,
        currency: 'COP',
        operationType: 'venta',
        area: 320,
        rooms: 4,
        bathrooms: 5,
        parking: 3,
        location: {
            city: 'Bogotá',
            neighborhood: 'Rosales',
            address: 'Cra 4 # 72'
        },
        mainImage: {
            asset: {
                _ref: 'image-mock-1', // Won't function with urlFor unless we handle it, handling in page.tsx or client
                url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
            }
        },
        description: 'Espectacular penthouse con vista panorámica a la ciudad y los cerros.',
        amenities: ['Terraza Privada', 'Gimnasio', 'Seguridad 24/7', 'Ascensor Privado'],
        highlighted: true
    },
    {
        _id: 'mock-2',
        title: 'Casa Campestre en Llanogrande',
        price: 3800000000,
        currency: 'COP',
        operationType: 'venta',
        area: 450,
        rooms: 5,
        bathrooms: 6,
        parking: 4,
        location: {
            city: 'Rionegro',
            neighborhood: 'Llanogrande',
            address: 'Vía Aeropuerto'
        },
        mainImage: {
            asset: {
                url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
            }
        },
        description: 'Exclusiva casa rodeada de naturaleza, con acabados modernos y piscina climatizada.',
        amenities: ['Piscina', 'Zona BBQ', 'Jardines', 'Casa de Mayordomo'],
        highlighted: true
    },
    {
        _id: 'mock-3',
        title: 'Apartamento Moderno en El Poblado',
        price: 12000000,
        currency: 'COP',
        operationType: 'alquiler',
        area: 140,
        rooms: 2,
        bathrooms: 3,
        parking: 2,
        location: {
            city: 'Medellín',
            neighborhood: 'El Poblado',
            address: 'Av Las Palmas'
        },
        mainImage: {
            asset: {
                url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
            }
        },
        description: 'Apartamento amoblado con diseño de interiorismo premium.',
        amenities: ['Amoblado', 'Coworking', 'Rooftop', 'Piscina'],
        highlighted: false
    },
    {
        _id: 'mock-4',
        title: 'Loft Industrial en Chapinero Alto',
        price: 850000000,
        currency: 'COP',
        operationType: 'venta',
        area: 95,
        rooms: 1,
        bathrooms: 2,
        parking: 1,
        location: {
            city: 'Bogotá',
            neighborhood: 'Chapinero Alto',
            address: 'Calle 65'
        },
        mainImage: {
            asset: {
                url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop'
            }
        },
        description: 'Espacio único con doble altura y vista increíble.',
        amenities: ['Doble Altura', 'Balcón', 'Automatización'],
        highlighted: false
    }
];
