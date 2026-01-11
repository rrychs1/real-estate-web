import { Suspense } from "react";
import { client } from "@/lib/sanity";
import PropertiesClient from "./PropertiesClient";
import { Property } from "@/types/sanity";

async function getProperties(): Promise<Property[]> {
    const query = `*[_type == "property"] | order(_createdAt desc) {
        _id,
        title,
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
    return client.fetch(query, {}, { cache: 'no-store' }); // Disable cache for dev
}

export default async function PropertiesPage() {
    const properties = await getProperties();

    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Cargando propiedades...</div>}>
            <PropertiesClient properties={properties} />
        </Suspense>
    );
}
