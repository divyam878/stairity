export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short description of this category'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for the category badge (e.g., #4d3258)',
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
