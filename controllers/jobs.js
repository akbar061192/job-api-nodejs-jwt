const Job = require("../models/Jobs");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../error");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdByUserId: req.user.userId }).sort(
    "-updatedAt"
  );
  res.status(StatusCodes.OK).json({ success: true, count: jobs.length, jobs });
};

const createNewJob = async (req, res) => {
  const { company, position } = req.body;
  const job = {
    company,
    position,
    createdByUserId: req.user.userId,
    createdByUserEmail: req.user.email,
  };
  const newJob = await Job.create(job);
  res.status(StatusCodes.CREATED).json({ success: true, newJob });
};

const getSingleJob = async (req, res, next) => {
  const { id } = req.params;
  const { userId, email } = req.user;
  const job = await Job.findOne({ _id: id, createdByUserId: userId });
  if (!job) {
    return next(
      NotFoundError(
        `Job not found for given job id ${id} for the user ${email}`
      )
    );
  }

  res.status(StatusCodes.OK).send({ success: true, job });
};

const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { userId, email } = req.user;
  const job = await Job.findOne({ _id: id, createdByUserId: userId });
  if (!job) {
    return next(
      NotFoundError(
        `Job not found for given job id ${id} for the user ${email}`
      )
    );
  }

  const updatedJob = await Job.findOneAndUpdate(
    { _id: id, createdByUserId: userId },
    req.body,
    { runValidators: true, new: true }
  );
  res.status(StatusCodes.OK).json({ success: true, updatedJob });
};

const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const { userId, email } = req.user;
  const job = await Job.findOne({ _id: id, createdByUserId: userId });
  if (!job) {
    return next(
      NotFoundError(
        `Job not found for given job id ${id} for the user ${email}`
      )
    );
  }

  await Job.findByIdAndDelete({
    _id: id,
    createdByUserId: userId,
  });

  res.status(StatusCodes.OK).send("SUCCESS");
};

module.exports = {
  getAllJobs,
  createNewJob,
  getSingleJob,
  updateJob,
  deleteJob,
};
