import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Platform } from "react-native";
import { api } from "../api/api";

// For Web: simple dropdown selectors
const timeSlots = [
  "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00"
];

export default function BookingScreen({ route, navigation }) {
  const { consultant, userId } = route.params;

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(timeSlots[0]);

  const book = async () => {
    try {
      await api.post("/bookings", {
        userId,
        consultantId: consultant._id,
        date,
        time
      });

      alert("Booking Confirmed ✔");
      navigation.replace("Consultants", { userId });
    } catch (e) {
      console.log(e.response?.data);
      alert("Booking failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Appointment</Text>
      <Text style={styles.name}>{consultant.user.name}</Text>

      {/* DATE PICKER FOR WEB */}
      <Text style={styles.label}>Choose Date</Text>
      <input
        type="date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
        style={styles.webInput}
      />

      {/* TIME PICKER FOR WEB */}
      <Text style={styles.label}>Choose Time</Text>
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={styles.webInput}
      >
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>{slot}</option>
        ))}
      </select>

      <View style={{ marginTop: 25 }}>
        <Button title="Confirm Booking" color="#3b82f6" onPress={book} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  name: { fontSize: 20, fontWeight: "600", marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  webInput: {
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    width: "100%",
  }
});
