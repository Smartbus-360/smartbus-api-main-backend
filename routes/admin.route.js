import express from "express";
import { httpAuth } from "../middleware/wsAuth.middleware.js";
import {
  signup,
  signin,
  refreshAccessToken,
  google,
  getDetails,
  getInstituteById,
  getRoutesByInstitute,
  getAllRoutes,
  addUpdateDriverRoute,
  joinUs,
  getEnquiries,
  studentSelfRegister,
  oneTimeLogin,
  changeStudentPassword,
  getMyBasics
} from "../controllers/auth.controller.js";
import {
  getInstitutes,
  addInstitute,
  updateInstitute,
  deleteInstitute,
  uploadLogoImage,
  setInstituteMapAccess
} from "../controllers/institute.controller.js";
import {
  getAdmins,
  addAdmins,
  updateAdmin,
  deleteAdmin,
  searchAdmins,
  addPendingStudent,
  checkUsername,
  addStudentDirect,
} from "../controllers/admin.controller.js";
import {
  getAllStoppages,
  addStop,
  updateStop,
  deleteStop,
} from "../controllers/stoppage.controller.js";
import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
  uploadDriverImage,
  updateDriverShift,
} from "../controllers/driver.controller.js";
import {
generateDriverQr,
revokeDriverQr,
} from "../controllers/driverQr.controller.js";
import {
  addRoute,
  updateRoute,
  deleteRoute,
} from "../controllers/route.controller.js";
import {
  getBuses,
  addBus,
  updateBus,
  deleteBus,
  getReplaceBuses,
  addReplaceBus,
  updateReplaceBus,
  deleteReplaceBus
} from "../controllers/bus.controller.js";
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  uploadUserImage
} from "../controllers/user.controller.js";
import {
  getAllAdvertisements,
  addAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  upload
} from "../controllers/advertisement.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getNotifications, createNotification, deleteNotification, getBusNotifications, createBusNotification, deleteBusNotification } from "../controllers/notification.controller.js";
import { generateQrForStudent, revokeQrForStudent } from "../controllers/qr.Controller.js";
import { adminExportAttendance } from "../controllers/attendanceExport.controller.js";
import { getSchoolStudents } from "../controllers/user.controller.js";
import { getAttendanceByStudent } from "../controllers/attendance.controller.js";
import {
  createClass,
  getClasses,
  updateClass,
  deleteClass
} from "../controllers/class.controller.js";

import {
  createSection,
  getSectionsByClass,
  updateSection,
  deleteSection
} from "../controllers/section.controller.js";
import { addTeacher,getAllTeachers,deleteTeacher,updateTeacher,assignTeacher } from "../controllers/adminTeacher.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/refresh', refreshAccessToken);
router.post("/google", google);
router.get("/get-details", verifyToken, getDetails);
router.post("/join-us", joinUs);
router.get("/enquiries", verifyToken, getEnquiries);
router.post('/one-time-login', oneTimeLogin);
router.get('/check-username', checkUsername); // ✅ new route



router.get("/admins", getAdmins);
router.post("/admins", addAdmins);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);
router.get("/search", verifyToken, searchAdmins); 
router.post('/pending-student', verifyToken, addPendingStudent);
router.post("/add-student-direct", verifyToken, addStudentDirect);
router.post("/generate/:studentId", httpAuth, generateQrForStudent);
router.post("/revoke/:studentId", httpAuth, revokeQrForStudent);
router.post("/class", verifyToken, createClass);
router.get("/class/list", verifyToken, getClasses);
router.put("/class/:id", verifyToken, updateClass);
router.delete("/class/:id", verifyToken, deleteClass);
router.post("/add-teacher", httpAuth, addTeacher);
router.get("/teachers", verifyToken, getAllTeachers);
router.put("/teachers/:id", verifyToken, updateTeacher);
router.delete("/teachers/:id", verifyToken, deleteTeacher);
router.post("/assign-teacher", httpAuth, assignTeacher);

router.post("/section", verifyToken, createSection);
router.get("/section/list/:classId", verifyToken, getSectionsByClass);
router.put("/section/:id", verifyToken, updateSection);
router.delete("/section/:id", verifyToken, deleteSection);




router.post("/institutes", verifyToken, uploadLogoImage.single("logo"), addInstitute);
router.put("/institutes/:id", verifyToken, uploadLogoImage.single("logo"), updateInstitute);
router.get("/institutes", verifyToken, getInstitutes);
router.get("/institutes/:id", getInstituteById);

router.get("/routes", verifyToken, getAllRoutes);
router.post("/routes", verifyToken, addRoute);
router.get("/routes/institute/:instituteId?", getRoutesByInstitute);
router.put("/routes/:id", verifyToken, updateRoute);
router.delete("/routes/:id", verifyToken, deleteRoute);
router.put("/institutes/:id/map-access", verifyToken, setInstituteMapAccess);

// router.get('/institutes/:instituteId/routes', getRoutesByInstitute);

router.delete("/institutes/:id", deleteInstitute);
router.get("/drivers", verifyToken, getDrivers);
router.post("/drivers", verifyToken, uploadDriverImage.single("profilePicture"), addDriver);
router.put("/drivers/:id", verifyToken, uploadDriverImage.single("profilePicture"), updateDriver);
router.delete("/drivers/:id", verifyToken, deleteDriver);
router.post("/drivers/routes", addUpdateDriverRoute);
// Admin export route (permanent records)
router.get("/admin/export", httpAuth, adminExportAttendance);

// router.get("/drivers/:id/subdrivers", verifyToken, listSubDrivers);
// Create a sub-driver under a driver
// router.post("/drivers/:id/subdriver", verifyToken, createSubDriver);
// Generate time-boxed QR for login handoff
router.post("/driver-qr/generate", verifyToken, generateDriverQr);
// Revoke a driver QR token
router.post("/driver-qr/revoke/:id", verifyToken, revokeDriverQr);
router.put("/drivers/:id/shift", verifyToken, updateDriverShift);



// Buses
router.post("/buses", verifyToken, addBus);
router.put("/buses/:id", verifyToken, updateBus);
router.delete("/buses/:id", verifyToken, deleteBus);
router.get("/buses", verifyToken, getBuses);
router.get('/replaced_buses', verifyToken, getReplaceBuses);
router.post('/replaced_buses', verifyToken, addReplaceBus);
router.put('/replaced_buses/:id', verifyToken, updateReplaceBus);
router.delete('/replaced_buses/:id', verifyToken, deleteReplaceBus);

// Stops
router.get("/stoppages", verifyToken, getAllStoppages);
router.post("/stoppages", verifyToken, addStop);
router.put("/stoppages/:id", verifyToken, updateStop);
router.delete("/stoppages/:id", verifyToken, deleteStop);
// router.get('/stoppages', getStopsByRoute);

// Users
router.get("/users", verifyToken, getAllUsers);
router.post("/users", verifyToken, uploadUserImage.single("profilePicture"), addUser);
router.put("/users/:id", verifyToken, uploadUserImage.single("profilePicture"), updateUser);
router.delete("/users/:id", verifyToken, deleteUser);
router.post('/self-register', studentSelfRegister);
router.put('/auth/change-student-password', changeStudentPassword);
router.get('/auth/me/basic', httpAuth, getMyBasics);
router.get("/users/school-students", verifyToken, getSchoolStudents);
// Attendance Routes
router.get("/attendance/student/:registrationNumber", verifyToken, getAttendanceByStudent);
router.post("/attendance/qr/generate/:studentId", verifyToken, generateQrForStudent);
router.post("/attendance/qr/revoke/:studentId", verifyToken, revokeQrForStudent);



//Advertisement
router.get("/ads", getAllAdvertisements);
router.post("/ads", upload.single("image"), addAdvertisement);
router.put("/ads/:id", upload.single("image"), updateAdvertisement);
router.delete("/ads/:id", deleteAdvertisement);

//Notifications
router.post("/notifications/create", verifyToken, createNotification);
router.get("/notifications", verifyToken, getNotifications);
router.delete("/notifications/:id", verifyToken, deleteNotification);

//Bus Specific Notifications
router.post("/bus-notifications/create", verifyToken, createBusNotification);
router.get("/bus-notifications", verifyToken, getBusNotifications);
router.delete("/bus-notifications/:id", verifyToken, deleteBusNotification);

// router.get('/users/search', searchUser);

export default router;
