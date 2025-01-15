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
    const members = await Member.find({ gym: req.user._id }).skip(Number(skip)).limit(Number(limit));
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

    if (name) searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (mobileNo) searchCriteria.mobileNo = mobileNo;

    const members = await Member.find(searchCriteria).populate('membership');

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
    const members = await Member.find({ nextBillDate: { $lte: currentDate } }).populate('membership');

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

    const members = await Member.find({ nextBillDate: { $gte: currentDate, $lte: threeDaysFromNow } }).populate('membership');

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
    const members = await Member.find({ nextBillDate: { $lt: currentDate } }).populate('membership');

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
    const members = await Member.find({ status: 'Inactive' }).populate('membership');

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
    const memberDetails = await Member.findById(req.params.id).populate('membership');

    if (!memberDetails) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({
      message: "Member details",
      member: memberDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateMemberPlan = async (req, res) => {
  try {
    const { membership } = req.body;
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
