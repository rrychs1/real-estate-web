import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título del Proyecto',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'location',
            title: 'Ubicación',
            type: 'object',
            fields: [
                { name: 'city', title: 'Ciudad', type: 'string' },
                { name: 'neighborhood', title: 'Barrio', type: 'string' },
                { name: 'address', title: 'Dirección', type: 'string' },
            ],
        }),
        defineField({
            name: 'features',
            title: 'Características Generales',
            type: 'object',
            fields: [
                { name: 'stratum', title: 'Estrato', type: 'number' },
                { name: 'deliveryDate', title: 'Fecha de Entrega', type: 'string' },
                { name: 'units', title: 'Total Unidades', type: 'number' },
            ]
        }),
        defineField({
            name: 'priceRange',
            title: 'Rango de Precios',
            type: 'object',
            fields: [
                { name: 'minPrice', title: 'Precio Desde', type: 'number' },
                { name: 'maxPrice', title: 'Precio Hasta', type: 'number' },
                { name: 'currency', title: 'Moneda', type: 'string', initialValue: 'COP' },
            ]
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Galería de Imágenes',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'videos',
            title: 'Videos (YouTube/Vimeo)',
            type: 'array',
            of: [{ type: 'url' }],
        }),
        defineField({
            name: 'amenities',
            title: 'Zonas Comunes / Amenities',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Piscina', value: 'Piscina' },
                    { title: 'Gimnasio', value: 'Gimnasio' },
                    { title: 'Salón Comunal', value: 'Salón Comunal' },
                    { title: 'Parque Infantil', value: 'Parque Infantil' },
                    { title: 'Zonas Verdes', value: 'Zonas Verdes' },
                    { title: 'BBQ', value: 'BBQ' },
                    { title: 'Coworking', value: 'Coworking' },
                    { title: 'Lobby', value: 'Lobby' },
                    { title: 'Vigilancia 24h', value: 'Vigilancia 24h' },
                ],
            },
        }),
    ],
})
