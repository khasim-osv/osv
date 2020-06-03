const express = require("express");
const router = express.Router();

router.use(require("./userRoutes"));
router.use(require("./translationRoutes"));
router.use(require("./modulesRoutes"));
router.use(require("./errorCodesRoutes"));
router.use(require("./groupsRoutes"));
router.use(require("./banksRoutes"));
router.use(require("./licenseRoutes"));
router.use(require("./userProfileRoutes"));
router.use(require("./userManagementRoutes"));
router.use(require("./roleManagementRoutes"));

module.exports = router;
