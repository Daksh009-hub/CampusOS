let clubs = []; 

const createClub = async (req, res) => {
  try {
    const { name, description, logoUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Club name is required' });
    }

    const newClub = {
      id: Date.now().toString(), 
      name,
      description,
      logoUrl,
    };

    clubs.push(newClub);

    return res.status(201).json({ success: true, data: newClub });
  } catch (error) {
    console.error('Error creating club:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createClub };