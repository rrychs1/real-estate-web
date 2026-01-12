
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { NextResponse } from "next/server";

// Server-side client with write token
const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_TOKEN, // Requires this env var
    useCdn: false, // We need fresh data
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation could go here

        const doc = {
            _type: 'property',
            title: body.title,
            price: Number(body.price),
            currency: body.currency,
            operationType: body.operationType,
            category: body.category,
            location: {
                city: body.location.city,
                neighborhood: body.location.neighborhood,
                address: body.location.address,
            },
            slug: { _type: 'slug', current: body.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') },
            // Optional fields
            description: body.description,
            area: Number(body.features.area),
            rooms: Number(body.features.bedrooms),
            bathrooms: Number(body.features.bathrooms),
            parking: Number(body.features.parking),
            commonZones: body.commonZones,
            mainImage: body.images?.[0] ? {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: body.images[0]
                }
            } : undefined,
            gallery: body.images?.map((id: string) => ({
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: id
                }
            })) || [],
        };

        console.log("Attempting to create property:", JSON.stringify(doc, null, 2));

        const result = await client.create(doc);

        return NextResponse.json({ success: true, id: result._id });
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to create property",
            details: error
        }, { status: 500 });
    }
}
