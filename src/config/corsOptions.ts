import { CorsOptions } from "cors";
import allowedOrigins from "../../../ezorder-backoffice-control-backend/src/api/v1/configs/allowOrigins.config";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
