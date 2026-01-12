
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { NextResponse } from "next/server";

// Server-side client with write token
const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const doc = {
            _type: 'project',
            title: body.title,
            slug: { _type: 'slug', current: body.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') },
            description: body.description,
            location: {
                city: body.location.city,
                neighborhood: body.location.neighborhood,
                address: body.location.address,
            },
            features: {
                stratum: Number(body.features.stratum),
                deliveryDate: body.features.deliveryDate,
                units: Number(body.features.units),
            },
            priceRange: {
                minPrice: Number(body.priceRange.minPrice),
                maxPrice: Number(body.priceRange.maxPrice),
                currency: body.priceRange.currency
            },
            amenities: body.amenities,
            gallery: body.images?.map((id: string) => ({
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: id
                }
            })) || [],
            mainImage: body.images?.[0] ? {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: body.images[0]
                }
            } : undefined,
        };

        const result = await client.create(doc);

        return NextResponse.json({ success: true, id: result._id });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to create project",
            details: error
        }, { status: 500 });
    }
}
