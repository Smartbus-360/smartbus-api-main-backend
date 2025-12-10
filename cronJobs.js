import cron from 'node-cron';
import sequelize from './config/database.js';
import DriverAttendanceTemp from "./models/driverAttendanceTemp.model.js";

// Schedules a job to delete records older than 3 days
cron.schedule("0 0 * * *", async () => {
    try {
        await sequelize.query(
            `DELETE FROM tbl_sm360_stop_reach_logs 
             WHERE createdAt < DATE_SUB(NOW(), INTERVAL 3 DAY)`
        );
        //console.log("Old reach times deleted successfully");
    } catch (error) {
        console.error("Error deleting old reach times:", error);
    }
});

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("🧹 Clearing temporary driver attendance...");
    const deleted = await DriverAttendanceTemp.destroy({
      where: {},
      truncate: true
    });
    console.log("✅ Temporary attendance table cleared at", new Date());
  } catch (error) {
    console.error("❌ Error clearing temp attendance:", error);
  }
});
