router.post('/', async (req, res) => {
  const { userId, consultantId, date, time } = req.body;
  
  const exists = await Booking.findOne({
    consultant: consultantId,
    "slot.date": date,
    "slot.time": time
  });

  if (exists) {
    return res.status(400).json({ msg: 'Slot already booked' });
  }

  const booking = new Booking({
    user: userId,
    consultant: consultantId,
    slot: { date, time }
  });

  await booking.save();
  res.json({ msg: 'Booking confirmed', booking });
});
