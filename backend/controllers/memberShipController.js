const Membership = require('../models/memberShipModel');  

exports.addMembership = async (req, res) => {
  try {
    const { months, price } = req.body;

    // Validate required fields
    if (!months || !price) {
      return res.status(400).json({ message: "Months and price are required" });
    }

    // Check if the membership already exists
    const existingMembership = await Membership.findOne({
      gym: req.user._id,
      months,
    });

    if (existingMembership) {
      return res.status(400).json({ message: "Membership for this duration already exists" });
    }

    // Create new membership if it doesn't exist
    const newMembership = new Membership({
      gym: req.user._id, 
      months,
      price,
    });

    // Save the new membership
    await newMembership.save();

    res.status(201).json({
      message: "Membership Created Successfully",
      membership: {
        _id: newMembership._id,
        months: newMembership.months,
        price: newMembership.price,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.getMemberships = async (req, res) => {
    try {
      const loggedInUser = req.user;  
      
      // Fetch memberships for the gym (logged-in user's ID)
      const memberships = await Membership.find({ gym: loggedInUser._id });
  
      if (memberships.length === 0) {
        return res.status(404).json({ message: "No memberships found for this gym." });
      }
  
      res.status(200).json({
        message: "Memberships Fetched Successfully",
        memberships,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Server Error",
      });
    }
  };
  