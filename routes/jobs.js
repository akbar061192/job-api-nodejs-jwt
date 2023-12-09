const {
  getAllJobs,
  createNewJob,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const express = require("express");

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", createNewJob);
router.get("/:id", getSingleJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
