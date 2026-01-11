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
            name: 'features',
            title: 'Características Internas',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Aire Acondicionado', value: 'aire_acondicionado' },
                    { title: 'Balcón', value: 'balcon' },
                    { title: 'Baño de Servicio', value: 'bano_servicio' },
                    { title: 'Barra Estilo Americano', value: 'barra_americana' },
                    { title: 'Biblioteca/Estudio', value: 'biblioteca' },
                    { title: 'Calentador', value: 'calentador' },
                    { title: 'Chimenea', value: 'chimenea' },
                    { title: 'Citófono', value: 'citofono' },
                    { title: 'Cocina Integral', value: 'cocina_integral' },
                    { title: 'Depósito / Bodega', value: 'deposito' },
                    { title: 'Gas Domiciliario', value: 'gas_domiciliario' },
                    { title: 'Habitación de Servicio', value: 'habitacion_servicio' },
                    { title: 'Hall de Alcobas', value: 'hall_alcobas' },
                    { title: 'Jacuzzi', value: 'jacuzzi' },
                    { title: 'Piso en Madera/Laminado', value: 'piso_madera' },
                    { title: 'Puerta de Seguridad', value: 'puerta_seguridad' },
                    { title: 'Vista Panorámica', value: 'vista_panoramica' },
                    { title: 'Zona de Lavandería', value: 'zona_lavanderia' },
                ]
            }
        }),
        defineField({
            name: 'commonZones',
            title: 'Zonas Comunes',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Acceso Pavimentado', value: 'acceso_pavimentado' },
                    { title: 'Área Social', value: 'area_social' },
                    { title: 'Ascensor', value: 'ascensor' },
                    { title: 'BBQ / Parrilla', value: 'bbq' },
                    { title: 'Cancha de Baloncesto', value: 'cancha_baloncesto' },
                    { title: 'Cancha de Fútbol', value: 'cancha_futbol' },
                    { title: 'Cancha de Squash', value: 'cancha_squash' },
                    { title: 'Cancha de Tenis', value: 'cancha_tenis' },
                    { title: 'Circuito Cerrado de TV', value: 'cctv' },
                    { title: 'Club House', value: 'club_house' },
                    { title: 'Gimnasio', value: 'gimnasio' },
                    { title: 'Jardín', value: 'jardin' },
                    { title: 'Jaula de Golf', value: 'jaula_golf' },
                    { title: 'Kiosko', value: 'kiosko' },
                    { title: 'Parqueadero Visitantes', value: 'parqueadero_visitantes' },
                    { title: 'Piscina', value: 'piscina' },
                    { title: 'Planta Eléctrica', value: 'planta_electrica' },
                    { title: 'Portería / Recepción', value: 'porteria' },
                    { title: 'Salón Comunal', value: 'salon_comunal' },
                    { title: 'Sauna / Turco', value: 'sauna_turco' },
                    { title: 'Terraza', value: 'terraza' },
                    { title: 'Urbanización Cerrada', value: 'urbanizacion_cerrada' },
                    { title: 'Vigilancia 24/7', value: 'vigilancia' },
                    { title: 'Zona Infantil', value: 'zona_infantil' },
                    { title: 'Zonas Verdes', value: 'zonas_verdes' },
                ]
            }
        }),
        defineField({
            name: 'videos',
            title: 'Videos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Título' },
                        { name: 'url', type: 'url', title: 'URL del Video (YouTube / Vimeo)' }
                    ]
                }

            ]
        }),
        defineField({
            name: 'highlighted',
            title: 'Destacado',
            type: 'boolean',
            initialValue: false,
        })
    ],
})
