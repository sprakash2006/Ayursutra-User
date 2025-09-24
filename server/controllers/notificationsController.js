import { supabase } from "../supabaseClient.js";

export const getNotificationsByPatient = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: "Missing userId" });
    }

    const { data, error } = await supabase
      .from("notifications")
      .select(
        "id, type, title, message, isread, priority, icon, color, created_at"
      )
      .eq("patient_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const notifications = data.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      created_at: n.created_at,
      isRead: n.isread === "yes", // ✅ normalized boolean
      priority: n.priority,
      icon: n.icon,
      color: n.color,
    }));

    res.status(200).json({ success: true, notifications });
  } catch (err) {
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
