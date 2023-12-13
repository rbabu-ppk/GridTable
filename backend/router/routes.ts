// server.js
import express, { Request, Response } from "express";
import * as controller from "../controllers/uploadController";
import multer from "multer";
import csvParser from "csv-parser";
import departmentModel from "../models/departmentModel";
import jobModel from "../models/jobModel";
import employeeModel from "../models/employeeModel";
import siteModel from "../models/siteModel";
import { Departments, Employees, Jobs, Sites } from "../types/adminTypes";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), controller.uploadFile);

// router.post("/job", upload.single("file"), (req, res) => {
//   const uploadedFile = req.file;
//   const email = req.body.email;
//   const selectedOption = req.body.selectedOption;

//   if (!uploadedFile || !email || !selectedOption) {
//     return res.status(400).send("Please fill in all fields");
//   }

//   const employees: Employees[] = [];
//   const sites: Sites[] = [];
//   const departments: Departments[] = [];
//   const jobs: Jobs[] = [];
//   const deptId: any = [];

//   const csvData = uploadedFile.buffer.toString("utf8");

//   const parseStream = csvParser()
//     .on("data", (data) => {
//       const id = data.id;
//       const firstName = data.firstName;
//       const lastName = data.lastName;
//       const siteName = data.siteName;
//       const address = data.address;
//       const siteId = data.siteId;
//       const departmentName = data.departmentName;
//       const departmentId = data.departmentId;
//       const email = req.body.email;
//       const status = "Completed";

//       deptId.push({ departmentId });

//       departments.push({ departmentId, departmentName });
//       sites.push({ siteId, siteName });
//       employees.push({ firstName, lastName, departmentId, siteId, address });
//       jobs.push({ email, status });
//     })
//     .on("end", async () => {
//       try {
//         // console.log(departments);

//         const departmentIds = departments.map(
//           (department) => department.departmentId
//         );

//         console.log(departmentIds);

//         departmentModel
//           .find({ departmentId: { $in: departmentIds } })
//           .then(async (foundDepartments) => {
//             if (foundDepartments.length > 0) {
//               console.log("Record Exist");
//             } else {
//               await departmentModel.insertMany(departments);
//               await employeeModel.insertMany(employees);
//             }
//           })
//           .catch((err) => {
//             console.error(err);
//           });

//         // if (selectedOption === "Department") {
//         //   await departmentModel.insertMany(departments);
//         //   await employeeModel.insertMany(employees);
//         // } else if (selectedOption === "Site") {
//         //   await siteModel.insertMany(sites);
//         //   await employeeModel.insertMany(employees);
//         // } else if (selectedOption === "Employee") {
//         //   await employeeModel.insertMany(employees);
//         // }

//         await jobModel.create(jobs);
//         res.send("Data uploaded, parsed, and saved successfully");
//       } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//       }
//     });

//   const csvStream = require("stream").PassThrough();
//   csvStream.end(csvData);
//   csvStream.pipe(parseStream);
// });

export default router;
