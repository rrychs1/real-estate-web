import { Suspense } from "react";
import { client } from "@/lib/sanity";
import PropertiesClient from "./PropertiesClient";
import { Property } from "@/types/sanity";

async function getProperties(): Promise<Property[]> {
    const query = `*[_type == "property"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        price,
        currency,
        operationType,
        area,
        rooms,
        bathrooms,
        parking,
        location,
        mainImage,
        description,
        amenities,
        highlighted
    }`;
    try {
        const data = await client.fetch(query, {}, { cache: 'no-store' });
        if (!data || data.length === 0) {
            console.log("No content found in Sanity, using mock data for demo.");
            // Cast to any to bypass strict type check for now, ensuring shape matches broadly
            const { mockProperties } = await import("@/lib/mockData");
            return mockProperties as any as Property[];
        }
        return data;
    } catch (error) {
        console.error("Error fetching properties, using mock fallback:", error);
        const { mockProperties } = await import("@/lib/mockData");
        return mockProperties as any as Property[];
    }
}

export default async function PropertiesPage() {
    const properties = await getProperties();

    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Cargando propiedades...</div>}>
            <PropertiesClient properties={properties} />
        </Suspense>
    );
}
