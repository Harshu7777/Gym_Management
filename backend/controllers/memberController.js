const Member = require("../models/memberModel");
const Membership = require("../models/memberShipModel");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// Helper function to add months to a date
function addMonthsToDate(months, date) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

exports.registerMember = async (req, res) => {
  try {
    const { name, mobileNo, address, membership, joiningDate } = req.body;

    // Validate membership ID
    if (!membership) {
      return res.status(400).json({ message: "Membership ID is required" });
    }

    // Find the membership by ID
    const membershipDetails = await Membership.findById(membership);
    if (!membershipDetails) {
      return res.status(400).json({ message: "Invalid membership ID" });
    }

    // Validate file upload
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload profile picture to Cloudinary
    const uploadedProfilePic = await uploadOnCloudinary(req.file.path);
    if (!uploadedProfilePic || !uploadedProfilePic.url) {
      return res.status(500).json({ message: "Error uploading profile picture to Cloudinary" });
    }
    const profilePic = uploadedProfilePic.url;

    // Calculate the next bill date
    const nextBillDate = addMonthsToDate(membershipDetails.months, new Date(joiningDate));

    // Create the new member
    const newMember = new Member({
      name,
      mobileNo,
      address,
      membership,
      profilePic,
      gym: req.user._id,
      nextBillDate,
    });

    await newMember.save();

    res.status(201).json({ message: "Member registered successfully", member: newMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getAllMembers = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;  // Default pagination values

    // Aggregation pipeline for fetching all members with pagination, gym details, and membership details
    const members = await Member.aggregate([
      // Match members for the specific gym (logged-in user's ID)
      {
        $match: {
          gym: req.user._id,  // Only fetch members for the current gym
        },
      },
      // Lookup to join the membership details
      {
        $lookup: {
          from: 'memberships',  // Join with the 'memberships' collection
          localField: 'membership',  // Field in the Member collection
          foreignField: '_id',  // Field in the Membership collection
          as: 'membershipDetails',  // Alias for the joined data
        },
      },
      // Unwind the membershipDetails array (since $lookup returns an array)
      {
        $unwind: '$membershipDetails',
      },
      // Lookup to join the gym details (User collection)
      {
        $lookup: {
          from: 'users',  // Join with the 'users' collection (gym details)
          localField: 'gym',  // Field in the Member collection
          foreignField: '_id',  // Field in the User collection
          as: 'gymDetails',  // Alias for the joined data
        },
      },
      {
        $unwind: {
          path: '$gymDetails',
          preserveNullAndEmptyArrays: true,  // Allow empty arrays
        },
      },
      {
        $skip: Number(skip),
      },
      {
        $limit: Number(limit),
      },
      {
        $project: {
          _id: 1,
          name: 1,
          mobileNo: 1,
          address: 1,
          profilePic: 1,
          status: 1,
          lastPayment: 1,
          nextBillDate: 1,
        }
      }
    ]);

    // Count the total number of members for pagination
    const totalMember = await Member.countDocuments({ gym: req.user._id });

    res.status(200).json({
      message: "Members Fetched Successfully",
      members,
      totalMember,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Helper function to calculate the next bill date by adding months to the joining date
function addMonthsToDate(months, joiningDate) {
  let today = joiningDate;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Months are 0-indexed
  const currentDay = today.getDate();

  // Calculate the future month and year
  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  const adjustedMonth = futureMonth % 12;

  const futureDate = new Date(futureYear, adjustedMonth, 1);
  const lastDayOfFutureMonth = new Date(futureYear, adjustedMonth + 1, 0).getDate();

  const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);
  futureDate.setDate(adjustedDay);

  return futureDate;
}

exports.searchMember = async (req, res) => {
  try {
    const { name, mobileNo } = req.query;
    const searchCriteria = {};

    // Build search criteria
    if (name) searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (mobileNo) searchCriteria.mobileNo = mobileNo;

    // Aggregation pipeline to search members based on the search criteria
    const members = await Member.aggregate([
      // Match query based on the search parameters
      {
        $match: searchCriteria,
      },
      // Lookup to fetch membership details
      {
        $lookup: {
          from: 'memberships', // Ensure this matches the actual collection name
          localField: 'membership', // Reference field in Member collection
          foreignField: '_id', // Reference field in Membership collection
          as: 'membershipDetails',
        },
      },
      // Unwind the membershipDetails array if it's returned as an array
      {
        $unwind: {
          path: '$membershipDetails',
          preserveNullAndEmptyArrays: true, // Optional: If no membership, preserve member data
        },
      },
      // Optional: Project fields to return
      {
        $project: {
          _id: 1,
          name: 1,
          mobileNo: 1,
          address: 1,
          profilePic: 1,
          status: 1,
          lastPayment: 1,
          nextBillDate: 1,
          membership: 1, // You can include membership details or customize this based on your needs
        },
      },
    ]);

    res.status(200).json({
      message: "Members found",
      members,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.monthlyMember = async (req, res) => {
  try {
    const currentDate = new Date();
    
    // Aggregation pipeline for monthly members
    const members = await Member.aggregate([
      {
        $match: {
          nextBillDate: { $gt: currentDate },
        },
      },
      
    ]);

    res.status(200).json({
      message: "Monthly members retrieved",
      members,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.expiringWithin3Days = async (req, res) => {
  try {
    const currentDate = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(currentDate.getDate() + 3);

    // Aggregation pipeline for members expiring within 3 days
    const members = await Member.aggregate([
      {
        $match: {
          nextBillDate: { $gte: currentDate, $lte: threeDaysFromNow },
        },
      },
      {
        $lookup: {
          from: 'memberships',
          localField: 'membership',
          foreignField: '_id',
          as: 'membershipDetails',
        },
      },
      {
        $unwind: '$membershipDetails',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          mobileNo: 1,
          address: 1,
          nextBillDate: 1,
          membershipDetails: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Members expiring within 3 days",
      members,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.expiredMember = async (req, res) => {
  try {
    const currentDate = new Date();

    // Aggregation pipeline for expired members
    const members = await Member.aggregate([
      {
        $match: {
          nextBillDate: { $lt: currentDate },
        },
      },
      {
        $lookup: {
          from: 'memberships',
          localField: 'membership',
          foreignField: '_id',
          as: 'membershipDetails',
        },
      },
      {
        $unwind: '$membershipDetails',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          mobileNo: 1,
          address: 1,
          nextBillDate: 1,
          membershipDetails: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Expired members",
      members,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.inActiveMember = async (req, res) => {
  try {
    // Aggregation pipeline for inactive members
    const members = await Member.aggregate([
      {
        $match: {
          status: 'Inactive',
        },
      },
      {
        $lookup: {
          from: 'memberships',
          localField: 'membership',
          foreignField: '_id',
          as: 'membershipDetails',
        },
      },
      {
        $unwind: '$membershipDetails',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          mobileNo: 1,
          address: 1,
          status: 1,
          membershipDetails: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Inactive members",
      members,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getMebershipDetails = async (req, res) => {
  try {
    const memberId = req.params.id;

    // Aggregation pipeline to get member details by ID
    const memberDetails = await Member.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(memberId), // Match the member by ID
        },
      },
      {
        $lookup: {
          from: 'memberships',
          localField: 'membership',
          foreignField: '_id',
          as: 'membershipDetails',
        },
      },
      {
        $unwind: '$membershipDetails',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          mobileNo: 1,
          address: 1,
          profilePic: 1,
          status: 1,
          lastPayment: 1,
          nextBillDate: 1,
          membershipDetails: 1,
        },
      },
    ]);

    if (!memberDetails.length) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({
      message: "Member details",
      member: memberDetails[0], // Member details are returned as an array
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateMemberPlan = async (req, res) => {
  try {
    const { membership } = req.body;

    // Aggregation pipeline to update the membership and fetch updated member
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { membership },
      { new: true }
    ).populate('membership');

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({
      message: "Member plan updated",
      member: updatedMember,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

