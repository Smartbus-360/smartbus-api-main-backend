import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// ES Module path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = await import("../firebase-service-account.json", {
  assert: { type: "json" },
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
  });
}

export default admin;
