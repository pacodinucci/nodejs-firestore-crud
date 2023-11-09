import { Router } from "express";
import { createRecord, getRecords, updateRecord, deleteRecord } from "./controllers.js";

export const router = Router();

router.get("/", getRecords);

router.post("/create", createRecord);

router.patch("/update/:id", updateRecord);

router.delete("/delete/:id", deleteRecord);

