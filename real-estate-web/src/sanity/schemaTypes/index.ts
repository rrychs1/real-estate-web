import { type SchemaTypeDefinition } from 'sanity'
import { propertyType } from './property'
import projectType from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [propertyType, projectType],
}
