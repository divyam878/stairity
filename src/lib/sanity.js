// src/lib/sanity.js
import { createClient } from '@sanity/client';

// Validate project ID format
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  console.warn('NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please add it to your .env.local file.');
}

export const sanity = createClient({
  projectId: projectId || 'demo-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
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
      publishedAt,
      "authorName": author->name,
      "authorImage": author->image.asset->url,
      "authorBio": author->bio,
      categories[]->{
        _id,
        title,
        slug,
        color
      }
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
        excerpt,
        "authorName": author->name,
        "authorImage": author->image.asset->url,
        "authorBio": author->bio,
        categories[]->{
          _id,
          title,
          slug,
          color
        }
      }`,
      { slug }
    );
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// Helper function to fetch all categories
export const fetchCategories = async () => {
  try {
    const categories = await sanity.fetch(`*[_type == "category"] | order(title asc){
      _id,
      title,
      slug,
      color
    }`);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Helper function to fetch related posts (ensures at least 'limit' posts)
export const fetchRelatedPosts = async (currentSlug, categoryIds = [], limit = 3) => {
  try {
    // First, try to get posts from the same categories
    let posts = await sanity.fetch(
      `*[_type == "blog" && slug.current != $currentSlug && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc)[0...$limit]{
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
        publishedAt,
        "authorName": author->name,
        "authorImage": author->image.asset->url,
        categories[]->{
          _id,
          title,
          slug,
          color
        }
      }`,
      { currentSlug, categoryIds, limit }
    );

    // If we don't have enough, fill with recent posts
    if (posts.length < limit) {
      const existingIds = posts.map(p => p._id);
      const remaining = limit - posts.length;
      
      const morePosts = await sanity.fetch(
        `*[_type == "blog" && slug.current != $currentSlug && !(_id in $existingIds)] | order(publishedAt desc)[0...$remaining]{
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
          publishedAt,
          "authorName": author->name,
          "authorImage": author->image.asset->url,
          categories[]->{
            _id,
            title,
            slug,
            color
          }
        }`,
        { currentSlug, existingIds, remaining }
      );
      
      posts = [...posts, ...morePosts];
    }

    return posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};