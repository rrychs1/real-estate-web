import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
