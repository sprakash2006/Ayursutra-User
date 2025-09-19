import { supabase } from "../supabaseClient.js";

// ✅ Get therapies
export const getTherapies = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("therapies")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    // Since benefits is text[], Supabase returns it as a JS array already
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching therapies:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getDoctors = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("id", { ascending: true });
  
      if (error) throw error;
  
      // Since benefits is text[], Supabase returns it as a JS array already
      res.status(200).json(data);
    } catch (err) {
      console.error("Error fetching therapies:", err.message);
      res.status(500).json({ error: err.message });
    }
  };



  export const createBooking = async (req, res) => {
    try {
      const { patient_id, therapy_id, staff_id, date, time } = req.body;
  
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          patient_id,
          therapy_id,
          staff_id,
          date,
          time,
          status: 'Pending',
          center_id: 1
        }]);
  
      if (error) return res.status(400).json({ error: error.message });
  
      res.status(200).json({ message: 'Booking created', data });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };