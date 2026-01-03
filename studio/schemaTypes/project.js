/* schemas/project.js */
export default {
    name: 'project',
    title: 'Portfolio Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'services',
            title: 'Services Performed',
            type: 'array',
            of: [{ type: 'string' }]
        }
    ],
}

