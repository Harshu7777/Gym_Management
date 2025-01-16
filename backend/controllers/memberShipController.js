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
    const loggedInUser = req.user;  // Get the logged-in user

    // Aggregation pipeline to fetch memberships and join with the gym (User) collection
    const memberships = await Membership.aggregate([
      // Match memberships for the specific gym (logged-in user's ID)
      {
        $match: {
          gym: loggedInUser._id, 
        },
      },
      {
        $lookup: {
          from : "users",
          localField: "gym",
          foreignField: "_id",
          as: "gymDetails",
        }
      },
      {
        $project : {
          _id: 1,
          months: 1,
          price: 1
        }
      }
    ]);

    // Return the fetched memberships along with gym details
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
