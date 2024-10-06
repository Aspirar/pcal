const express = require("express");

const createMeeting = require("./actions/create-meeting");
const createScheduler = require("./actions/create-scheduler");
const deleteMeeting = require("./actions/delete-meeting");
const getSchedulers = require("./actions/get-schedulers");
const getSlots = require("./actions/get-slots");
const health = require("./actions/health");
const login = require("./actions/login");
const loginView = require("./views/login");
const createSchedulerView = require("./views/create-scheduler");

const router = new express.Router();
router.get("/health", health);
router.post("/login", login);
router.post("/schedulers/:schedulerId/meeting/create", createMeeting);
router.get("/schedulers/:schedulerId/slots", getSlots);

const authenticatedRouter = new express.Router();
authenticatedRouter.post("/scheduler/create", createScheduler);
authenticatedRouter.get("/schedulers", getSchedulers);
authenticatedRouter.post("/meeting/:meetingId/delete", deleteMeeting);

const viewsRouter = new express.Router();
viewsRouter.get("/login", loginView);
viewsRouter.get("/scheduler/create", createSchedulerView);

module.exports = {
  router,
  authenticatedRouter,
  viewsRouter,
};
