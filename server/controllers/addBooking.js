import { supabase } from "../supabaseClient.js";
import { transporter } from "../mailTransporter.js" 

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
    const { patient_id, therapy_id, Doctor_id, date, time } = req.body;

    // 1️⃣ Create Booking
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert([{
        patient_id,
        therapy_id,
        Doctor_id,
        date,
        time,
        status: 'Pending',
        center_id: 1
      }])
      .select('*');

    if (bookingError || !bookingData || bookingData.length === 0) {
      console.error("Booking insert failed:", bookingError);
      return res.status(400).json({ error: bookingError?.message || "Booking insert returned no data" });
    }

    const booking = bookingData[0];

    // 2️⃣ Fetch Patient Info (to get email and name)
    const { data: patientData, error: patientError } = await supabase
      .from('patients')
      .select('name, email')
      .eq('id', patient_id)
      .single();

    if (patientError || !patientData) {
      return res.status(400).json({ error: patientError?.message || "Patient not found" });
    }

    const userName = patientData.name;
    const userEmail = patientData.email;

    // 3️⃣ Get Therapy Name
    const { data: therapyData, error: therapyError } = await supabase
      .from('therapies')
      .select('name')
      .eq('id', therapy_id)
      .single();

    if (therapyError || !therapyData) {
      return res.status(400).json({ error: therapyError?.message || "Therapy not found" });
    }

    const therapyName = therapyData.name;

    // 4️⃣ Format Date & Time
    const bookingDate = new Date(`${date}T${time}`);
    const formattedDate = bookingDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
    let hours = bookingDate.getHours();
    const minutes = bookingDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    // 5️⃣ Create Notification
    const notificationMessage = `Your booking for ${therapyName} therapy on ${formattedDate} at ${formattedTime} at AyurSutra has been created.`;

    const { data: notificationData, error: notificationError } = await supabase
      .from('notifications')
      .insert([{
        patient_id,
        message: notificationMessage,
        title: 'New Booking Created',
        isread: false,
        type: 'Booking',
        priority: 'high',
        icon: 'calendar',
        color: 'green'
      }]);

    const notification = notificationData && notificationData[0] ? notificationData[0] : null;

    // 6️⃣ Send Email
      const mailOptions = {
        from: 'prakashswami150569@gmail.com',
        to: userEmail,
        subject: 'Booking Registered!',
        html: `
          <h2>Hello ${userName},</h2>
          
          <p>Your booking for <b>${therapyName}</b> therapy on <b>${formattedDate}</b> at <b>${formattedTime}</b> has been booked.</p>
          
          <h3>Pre-care instructions will be shared with you soon.</h3>
          
          <p>Thank you,<br/>AyurSutra</p>
        `
      };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // 7️⃣ Respond to client
    res.status(200).json({
      message: 'Booking created, notification added, and email sent!',
      booking,
      notification
    });

  } catch (err) {
    console.error("Error creating booking:", err.message || err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};