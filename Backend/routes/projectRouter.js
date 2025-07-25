import express from 'express';
import { deleteProject, getAllProjects, getMyProjects, getSearchProjects, getSingleProject, getTrendingProjects, postProject, updateProject } from '../controllers/projectController.js';
import {isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.get("/getall",getAllProjects);
router.post("/post",isAuthenticated,postProject);
router.get("/myprojects",isAuthenticated,getMyProjects);
router.put("/update/:id",isAuthenticated,updateProject); 
router.delete("/delete/:id",isAuthenticated,deleteProject); 
router.get("/:id",isAuthenticated,getSingleProject); 
router.get("/trending",getTrendingProjects)
router.get("/search",getSearchProjects)

export default router;
