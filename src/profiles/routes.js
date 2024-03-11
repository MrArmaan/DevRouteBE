const { Router } = require("express");
const profileRouter = Router();

const { addProfile, getAllProfiles } = require("./controllers");

profileRouter.post("/profiles/addProfile", addProfile);
profileRouter.get("/profiles/getAllProfiles", getAllProfiles);

module.exports = profileRouter;
