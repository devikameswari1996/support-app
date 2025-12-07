router.get('/:id/slots', async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id);
    res.json(consultant.slots);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
