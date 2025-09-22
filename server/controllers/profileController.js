// controllers/patientController.js
import { supabase } from '../supabaseClient.js';



// Fetch patient details by userId
export const getPatientById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "userId is required" });

  try {
    const { data, error } = await supabase
      .from('patients')
      .select('name, email, address, created_at, contact')
      .eq('id', userId)
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};



export const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, address } = req.body;

  const { data, error } = await supabase
    .from('patients')
    .update({ name, email, contact, address })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};



export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        date,
        time,
        status,
        therapies:therapy_id (name),
        doctors:Doctor_id (name, location)
      `)
      .eq("patient_id", userId);  // filter by userId

    if (error) throw error;

    // Format response
    const formatted = data.map(b => ({
      bookingId: b.id,
      therapyName: b.therapies?.name,
      doctorName: b.doctors?.name,
      doctorLocation: b.doctors?.location,
      date: b.date,
      time: b.time,
      status: b.status
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

export const getUserRecords = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("records")
      .select(`
        id,
        date,
        time,
        therapy,
        doctors:doctor_id(name,location),
        medical_notes,
        patient_notes,
        doctor_rating
      `)
      .eq("patient_id", userId);  // filter by userId

    if (error) throw error;

    // Format response
    const formatted = data.map(b => ({
      recordId: b.id,
      date: b.date,
      time: b.time,
      therapyName: b.therapy,
      doctorName: b.doctors?.name,
      doctorLocation: b.doctors?.location,
      medicalNotes: b.medical_notes,
      patientNotes: b.patient_notes,
      doctorRating: b.doctor_rating
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};