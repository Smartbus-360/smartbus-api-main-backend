import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import { Server as socketIO } from 'socket.io'; 
import cors from 'cors';
import profileRoutes from './routes/profile.route.js';
import adminRoutes from './routes/admin.route.js';
import apiRoutes from './routes/api.route.js';
import sequelize from './config/database.js';
import { configureSocket } from './controllers/socket.controller.js'; 
import cookieParser from 'cookie-parser';
import path from 'path';
import './cronJobs.js';
import { setupAssociations } from './models/associations.js';
import attendanceRoutes from "./routes/attendance.route.js";
// import "./gps/gps.listener.js";
import homeworkRoutes from "./routes/homework.route.js";
import attendance_studentRoutes from "./routes/attendance_student.route.js";
import examRoutes from "./routes/exam.route.js";
import timetableRoutes from "./routes/timetable.routes.js";
import erp_notificationRoutes from "./routes/erp_notification.route.js";
import parentRoutes from "./routes/parent.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import feesRoutes from "./routes/fees.route.js";
import circularRoutes from "./routes/circular.route.js";
import leaveRoutes from "./routes/leave.route.js";
import messageRoutes from "./routes/message.route.js";
import profileExtendedRoutes from "./routes/profileExtended.route.js";
import adminTimetableRoutes from "./routes/adminTimetable.route.js";
// import adminDashboardRoutes from "./routes/adminDashboard.route.js";
import subjectRoutes from "./routes/subject.route.js";
import timetableAdminRoutes from "./routes/timetable_admin.route.js";
// import { addClass, getClasses, addSection, getSection } from "./controllers/class.controller.js";
import { httpAuth } from "./middleware/wsAuth.middleware.js";
import syllabusProgressRoutes from "./routes/syllabusProgress.route.js";
import studentAnalysisRoutes from "./routes/studentAnalysis.route.js";


// Sync models and setup associations

sequelize.sync().then(() => { //{ alter: true }
    setupAssociations();
    //console.log('Database & tables created!');
}).catch(err => {
    console.error('Error syncing database:', err);
});


const app = express();
const server = http.createServer(app);
const io = new socketIO(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"], 
        credentials: true
    },
    // transports: ["websocket"], 
});

// Middleware
app.use(cors({
    origin: true,           // Reflect the request origin
    credentials: true       // Allow cookies/auth headers
}));


app.use(express.json());
app.use(cookieParser());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api', apiRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/erp/homework", homeworkRoutes);
app.use("/erp/attendance", attendance_studentRoutes);
app.use("/erp/exams", examRoutes);
app.use("/erp/timetable", timetableRoutes);
app.use("/erp/notification", erp_notificationRoutes);
app.use("/api/parent", parentRoutes);
app.use("/erp/teacher", teacherRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/circulars", circularRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/profile", profileExtendedRoutes);
app.use("/api/admin/timetable", adminTimetableRoutes);
// app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/erp/subject", subjectRoutes);
app.use("/erp/admin/timetable", timetableAdminRoutes);
app.use("/erp/teacher/syllabus", syllabusProgressRoutes);
app.use("/erp/teacher/student-analysis", studentAnalysisRoutes);

// router.post("/class", httpAuth, addClass);
// router.get("/class/list", httpAuth, getClasses);

// SECTION
// router.post("/section", httpAuth, addSection);
// router.get("/section/list/:classId", httpAuth, getSections);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

configureSocket(io);
export { io };

// Start server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
