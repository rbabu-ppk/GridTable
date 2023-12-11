import express from "express";
import { Request, Response } from "express";
import { sampleData } from "./stores/adminStore";
import cors from "cors";
import { dbConnection } from "./database/database";
import router from "./router/routes";

const app = express();
app.use(cors());
app.use(express.json());

dbConnection();

const PORT = 3001;

app.get("/api/data", (req: Request, res: Response) => {
  const { page, pageSize } = req.query;
  let filteredData = [...sampleData];
  const pageNumber = parseInt(page as string, 10);
  const pageSizeNumber = parseInt(pageSize as string, 10);
  const startIndex = (pageNumber - 1) * pageSizeNumber;
  const endIndex = startIndex + pageSizeNumber;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    total: filteredData.length,
    totalPages: Math.ceil(filteredData.length / pageSizeNumber),
  });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
