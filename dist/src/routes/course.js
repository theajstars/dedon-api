"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = require("../Lib/JWT");
const Methods_1 = require("../Lib/Methods");
const Misc_1 = require("../Lib/Misc");
const Course_1 = require("../models/Course");
const course_1 = require("../validation/course");
const Lecture_1 = require("../models/Lecture");
const Practice_1 = require("../models/Practice");
const Examination_1 = require("../models/Examination");
const basePath = "/course";
function default_1(app) {
    app.post(`${basePath}s/all`, course_1.validateGetAllCourses, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { token } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (id && user) {
            const courses = yield Course_1.Course.find({});
            res.json({
                status: true,
                statusCode: 200,
                message: "Courses found!",
                data: courses,
            });
        }
        else {
            res.json(Misc_1.UnauthorizedResponseObject);
        }
    }));
    app.post(`${basePath}s/instructor/all`, course_1.validateGetAllCourses, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { token, instructorID } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (user === "instructor") {
            const courses = yield Course_1.Course.find({ instructorID: instructorID !== null && instructorID !== void 0 ? instructorID : id });
            res.json({
                status: true,
                statusCode: 200,
                message: "Courses found!",
                data: courses,
            });
        }
        else {
            res.json(Misc_1.UnauthorizedResponseObject);
        }
    }));
    app.post(`${basePath}/get`, course_1.validateGetSingleCourseSchema, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { token, courseID } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (user && id) {
            const course = yield Course_1.Course.findOne({ id: courseID });
            res.json({
                status: true,
                statusCode: 200,
                message: "Course details retrieved!",
                data: course,
            });
        }
        else {
            res.json(Misc_1.UnauthorizedResponseObject);
        }
    }));
    app.post(`${basePath}/create`, course_1.validateCreateCourse, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { title, code, description, school, token, instructorID } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (user === "admin" || user === "instructor") {
            const course = yield new Course_1.Course({
                id: (0, Methods_1.generateRandomString)(32),
                instructorID: user === "admin" ? instructorID : id,
                title,
                code,
                description,
                school,
                students: [],
                active: false,
            }).save();
            res.json({
                status: true,
                statusCode: 201,
                message: "Course created successfully!",
                data: course,
            });
        }
    }));
    app.post(`${basePath}/update`, course_1.validateUpdateCourse, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { courseID, title, code, instructorID, description, school, token } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (user === "admin" || user === "instructor") {
            const course = yield Course_1.Course.findOneAndUpdate({ id: courseID }, {
                title,
                code,
                school,
                instructorID,
                description,
            });
            res.json({
                status: true,
                statusCode: 200,
                message: "Course details updated successfully!",
                data: course,
            });
        }
    }));
    app.post(`${basePath}/status/toggle`, course_1.validateDefaultCourseRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { token, status, courseID } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (id && user && user === "instructor") {
            const course = yield Course_1.Course.findOneAndUpdate({ id: courseID }, {
                active: status,
            });
            res.json({
                status: true,
                statusCode: 200,
                message: `Course set to ${status ? "active" : "inactive"}`,
                data: course,
            });
        }
    }));
    app.post(`${basePath}/enroll`, course_1.validateCourseEnrollmentRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { courseID, token } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (id && user && user === "student") {
            //Check if course is active
            const isCourseActive = yield Course_1.Course.findOne({ id: courseID });
            if (isCourseActive && isCourseActive.active) {
                //Course exists and registration is ongoing
                const course = yield Course_1.Course.findOneAndUpdate({ id: courseID, active: true }, { $push: { students: id } });
                res.json({
                    status: true,
                    statusCode: 200,
                    message: "Enrollment successful!",
                    data: course,
                });
            }
            else {
                res.json({
                    status: true,
                    statusCode: 405,
                    message: "You cannot register for this course!",
                });
            }
        }
        else {
            res.json(Misc_1.UnauthorizedResponseObject);
        }
    }));
    app.post(`${basePath}/student/dismiss`, course_1.validateCourseEnrollmentRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { courseID, token, studentID } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (id && user && user !== "student") {
            const findCourse = yield Course_1.Course.findOne({ id: courseID });
            const course = yield Course_1.Course.findOneAndUpdate({ id: courseID }, { students: findCourse.students.filter((s) => s !== studentID) });
            res.json({
                status: true,
                statusCode: 200,
                message: "Dismissal successful!",
                data: course,
            });
        }
        else {
            res.json(Misc_1.UnauthorizedResponseObject);
        }
    }));
    app.delete(`${basePath}/delete`, course_1.validateDefaultCourseRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { token, courseID } = req.body;
        const { id, user } = (0, JWT_1.verifyToken)(token);
        if (id && user && user === "admin") {
            const course = yield Course_1.Course.deleteOne({ id: courseID });
            const lectures = yield Lecture_1.Lecture.deleteMany({ courseID });
            const practice = yield Practice_1.Practice.deleteMany({ courseID });
            const examination = yield Examination_1.Examination.deleteMany({ course: courseID });
            res.json({
                status: true,
                statusCode: 200,
                data: { course, lectures, practice, examination },
            });
        }
        else {
            res.json(Misc_1.UnauthorizedResponseObject);
        }
    }));
}
exports.default = default_1;
//# sourceMappingURL=course.js.map