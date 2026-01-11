import { defineField, defineType } from 'sanity'

export const propertyType = defineType({
    name: 'property',
    title: 'Propiedad',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
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
            name: 'price',
            title: 'Precio',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'currency',
            title: 'Moneda',
            type: 'string',
            options: {
                list: [
                    { title: 'COP', value: 'COP' },
                    { title: 'USD', value: 'USD' }
                ],
                layout: 'radio'
            },
            initialValue: 'COP',
        }),
        defineField({
            name: 'operationType',
            title: 'Tipo de Operación',
            type: 'string',
            options: {
                list: [
                    { title: 'Venta', value: 'venta' },
                    { title: 'Alquiler', value: 'alquiler' },
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'area',
            title: 'Área (m²)',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'rooms',
            title: 'Habitaciones',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'bathrooms',
            title: 'Baños',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'parking',
            title: 'Parqueaderos',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'location',
            title: 'Ubicación',
            type: 'object',
            fields: [
                defineField({ name: 'city', title: 'Ciudad', type: 'string' }),
                defineField({ name: 'neighborhood', title: 'Barrio', type: 'string' }),
                defineField({ name: 'address', title: 'Dirección (Privada)', type: 'string' }),
                defineField({ name: 'mapUrl', title: 'URL Mapa (Embed)', type: 'url' }),
            ],
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
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
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'amenities',
            title: 'Amenidades',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Piscina', value: 'piscina' },
                    { title: 'Gimnasio', value: 'gimnasio' },
                    { title: 'Parqueadero', value: 'parqueadero' },
                    { title: 'Terraza', value: 'terraza' },
                    { title: 'Jardín', value: 'jardin' },
                    { title: 'Seguridad 24/7', value: 'seguridad' },
                    { title: 'Ascensor', value: 'ascensor' },
                ]
            }
        }),
        defineField({
            name: 'highlighted',
            title: 'Destacado',
            type: 'boolean',
            initialValue: false,
        })
    ],
})
