import { supabase } from "../supabaseClient.js";

// ✅ Utility: format "time ago"
function formatTimeAgo(dateString) {
  const createdAt = new Date(dateString);
  const now = new Date();

  const diffMs = now - createdAt;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return diffMin === 1 ? "1 min ago" : `${diffMin} mins ago`;
  if (diffHr < 24) return diffHr === 1 ? "1 hour ago" : `${diffHr} hours ago`;
  if (diffDay < 7) return diffDay === 1 ? "yesterday" : `${diffDay} days ago`;
  if (diffWeek < 5) return diffWeek === 1 ? "1 week ago" : `${diffWeek} weeks ago`;
  if (diffMonth < 12) return diffMonth === 1 ? "1 month ago" : `${diffMonth} months ago`;
  return diffYear === 1 ? "1 year ago" : `${diffYear} years ago`;
}

export const getNotificationsByPatient = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: "Missing userId" });
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("id, type, title, message, isread, priority, icon, color, created_at")
      .eq("patient_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const notifications = data.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      timeAgo: formatTimeAgo(n.created_at), // ✅ only send relative time
      isRead: n.isread === true || n.isread === "yes",
      priority: n.priority,
      icon: n.icon,
      color: n.color,
    }));

    res.status(200).json({ success: true, notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err.message || err);
    res.status(500).json({ success: false, error: err.message });
  }
};



export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: "Missing notification id" });
    }

    const { data, error } = await supabase
      .from("notifications")
      .update({ isread: "yes" })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.status(200).json({ success: true, notification: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, error: "Missing userId" });
    }

    const { data, error } = await supabase
      .from("notifications")
      .update({ isread: "yes" })
      .eq("user_id", userId)
      .select();

    if (error) throw error;

    res.status(200).json({ success: true, notifications: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
