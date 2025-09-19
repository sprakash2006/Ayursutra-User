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