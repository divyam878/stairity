  // src/lib/sanity.js
  import { createClient } from '@sanity/client';

  // Validate project ID format
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    console.warn('NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please add it to your .env.local file.');
  }

  export const sanity = createClient({
    projectId: projectId || 'demo-project-id', // Valid format: only lowercase letters, numbers, and dashes
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-01-01',
    useCdn: true,
    token: process.env.SANITY_API_TOKEN, // Optional: for private datasets
  });

  // Helper function to fetch blog posts with error handling
  export const fetchBlogPosts = async () => {
    try {
      const posts = await sanity.fetch(`*[_type == "blog"] | order(publishedAt desc){
        _id,
        title,
        slug,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        excerpt,
        publishedAt
      }`);
      return posts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  };

  // Helper function to fetch single blog post
  export const fetchBlogPost = async (slug) => {
    try {
      const post = await sanity.fetch(
        `*[_type == "blog" && slug.current == $slug][0]{
          title,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          body,
          publishedAt,
          excerpt
        }`,
        { slug }
      );
      return post;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  };