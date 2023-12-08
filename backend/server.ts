import express from "express";
import { Request, Response } from "express";
import { sampleData } from "./stores/adminStore";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//  const pageNumber = parseInt(page as string, 10) || 1;
//  const pageSizeNumber = parseInt(pageSize as string, 10) || 5;

//  const startIndex = (pageNumber - 1) * pageSizeNumber;
//  const endIndex = startIndex + pageSizeNumber;

//  const paginatedData = sampleData.slice(startIndex, endIndex);

//  res.json({
//    data: paginatedData,
//    total: sampleData.length,
//    totalages: Math.ceil(sampleData.length / pageSizeNumber),
//  });
