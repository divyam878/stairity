import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

// GET - Fetch user's favorite blogs
export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  
  if (!supabase) {
    return NextResponse.json({ favorites: [] });
  }

  try {
    const { data, error } = await supabase
      .from("blog_favorites")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching favorites:", error);
      return NextResponse.json({ favorites: [] });
    }

    return NextResponse.json({ favorites: data || [] });
  } catch (err) {
    console.error("Failed to fetch favorites:", err);
    return NextResponse.json({ favorites: [] });
  }
}

// POST - Add a blog to favorites
export async function POST(request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, title, image } = await request.json();

  if (!slug || !title) {
    return NextResponse.json({ error: "Blog slug and title required" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    // Check if already favorited
    const { data: existing } = await supabase
      .from("blog_favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json({ message: "Already favorited", favorited: true });
    }

    // Add to favorites
    const { error } = await supabase
      .from("blog_favorites")
      .insert({
        user_id: userId,
        slug,
        title,
        image: image || null,
      });

    if (error) {
      console.error("Error adding favorite:", error);
      return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
    }

    return NextResponse.json({ message: "Added to favorites", favorited: true });
  } catch (err) {
    console.error("Failed to add favorite:", err);
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}

// DELETE - Remove a blog from favorites
export async function DELETE(request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await request.json();

  if (!slug) {
    return NextResponse.json({ error: "Blog slug required" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { error } = await supabase
      .from("blog_favorites")
      .delete()
      .eq("user_id", userId)
      .eq("slug", slug);

    if (error) {
      console.error("Error removing favorite:", error);
      return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
    }

    return NextResponse.json({ message: "Removed from favorites", favorited: false });
  } catch (err) {
    console.error("Failed to remove favorite:", err);
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }
}
