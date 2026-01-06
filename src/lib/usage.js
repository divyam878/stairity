import { getServiceSupabase } from "./supabase";

const FREE_PROMPT_LIMIT = 15;

/**
 * Check if user has remaining prompts for a specific tool
 * @param {string} userId - Clerk user ID
 * @param {string} toolName - Name of the AI tool
 * @returns {Promise<{allowed: boolean, remaining: number, used: number}>}
 */
export async function checkUsage(userId, toolName) {
  const supabase = getServiceSupabase();
  
  if (!supabase) {
    // If Supabase is not configured, allow unlimited usage
    console.warn("Supabase not configured - allowing unlimited usage");
    return { allowed: true, remaining: FREE_PROMPT_LIMIT, used: 0 };
  }

  try {
    const { data, error } = await supabase
      .from("ai_usage")
      .select("prompt_count")
      .eq("user_id", userId)
      .eq("tool_name", toolName)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found, which is fine for new users
      console.error("Error checking usage:", error);
      return { allowed: true, remaining: FREE_PROMPT_LIMIT, used: 0 };
    }

    const used = data?.prompt_count || 0;
    const remaining = Math.max(0, FREE_PROMPT_LIMIT - used);
    
    return {
      allowed: used < FREE_PROMPT_LIMIT,
      remaining,
      used,
    };
  } catch (err) {
    console.error("Usage check failed:", err);
    return { allowed: true, remaining: FREE_PROMPT_LIMIT, used: 0 };
  }
}

/**
 * Increment usage count for a specific tool
 * @param {string} userId - Clerk user ID
 * @param {string} toolName - Name of the AI tool
 * @returns {Promise<{success: boolean, newCount: number}>}
 */
export async function incrementUsage(userId, toolName) {
  const supabase = getServiceSupabase();
  
  if (!supabase) {
    return { success: true, newCount: 0 };
  }

  try {
    // Upsert: insert if not exists, otherwise increment
    const { data: existing } = await supabase
      .from("ai_usage")
      .select("prompt_count")
      .eq("user_id", userId)
      .eq("tool_name", toolName)
      .single();

    if (existing) {
      // Update existing record
      const newCount = existing.prompt_count + 1;
      await supabase
        .from("ai_usage")
        .update({ 
          prompt_count: newCount,
          last_used: new Date().toISOString()
        })
        .eq("user_id", userId)
        .eq("tool_name", toolName);
      
      return { success: true, newCount };
    } else {
      // Insert new record
      await supabase
        .from("ai_usage")
        .insert({
          user_id: userId,
          tool_name: toolName,
          prompt_count: 1,
          last_used: new Date().toISOString()
        });
      
      return { success: true, newCount: 1 };
    }
  } catch (err) {
    console.error("Failed to increment usage:", err);
    return { success: false, newCount: 0 };
  }
}

/**
 * Get usage stats for all tools for a user
 * @param {string} userId - Clerk user ID
 * @returns {Promise<Object>}
 */
export async function getAllUsage(userId) {
  const supabase = getServiceSupabase();
  
  if (!supabase) {
    return {};
  }

  try {
    const { data, error } = await supabase
      .from("ai_usage")
      .select("tool_name, prompt_count")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching usage:", error);
      return {};
    }

    return data.reduce((acc, item) => {
      acc[item.tool_name] = {
        used: item.prompt_count,
        remaining: Math.max(0, FREE_PROMPT_LIMIT - item.prompt_count),
        limit: FREE_PROMPT_LIMIT
      };
      return acc;
    }, {});
  } catch (err) {
    console.error("Failed to get usage:", err);
    return {};
  }
}
