"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";

import * as coursesClient from "../Courses/client";

// ⭐ NEW — REMOVE OLD ENROLL CLIENT
// import * as enrollClient from "../Enrollments/client";

// ⭐ NEW — USE THESE INSTEAD
import {
  enrollIntoCourse,
  unenrollFromCourse,
} from "../Courses/client";

// ---------------- TYPES ----------------
interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
}

// Safe transformer
const toSafeCourse = (c: unknown): Course => {
  const course = c as Partial<Course>;
  return {
    _id: course._id ?? "",
    name: course.name ?? "",
    description: course.description ?? "",
    image: course.image ?? "/images/reactjs.jpg",
  };
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const isFaculty = currentUser?.role === "FACULTY";

  // ---------------- LOAD DASHBOARD ----------------
  const loadDashboardData = async () => {
    // Load all courses
    const fetched = await coursesClient.fetchAllCourses();
    dispatch(setCourses(fetched.map(toSafeCourse)));

    // Students → load *their* courses from MongoDB
    if (!isFaculty && currentUser?._id) {
      const myCourses = await coursesClient.findMyCourses();
      setEnrolledCourseIds(myCourses.map((c: Course) => c._id));
    }
  };

  useEffect(() => {
    if (currentUser) loadDashboardData();
  }, [currentUser]);

  // ---------------- STATE FOR FORM ----------------
  const [course, setCourse] = useState<Course>({
    _id: "",
    name: "",
    description: "",
    image: "/images/reactjs.jpg",
  });

  // ---------------- ENROLL ----------------
  const enroll = async (courseId: string) => {
    if (!currentUser?._id) return alert("Sign in first!");
    await enrollIntoCourse(currentUser._id, courseId);
    await loadDashboardData();
  };

  // ---------------- FACULTY: CREATE ----------------
  const createNewCourse = async () => {
    if (!isFaculty) return;
    const newCourse = await coursesClient.createCourse(course);
    await loadDashboardData();
    setCourse({ _id: "", name: "", description: "", image: "/images/reactjs.jpg" });
  };

  // ---------------- FACULTY: UPDATE ----------------
  const updateSelectedCourse = async () => {
    if (!isFaculty || !course._id) return;
    await coursesClient.updateCourse(course);
    await loadDashboardData();
  };

  // ---------------- FACULTY: DELETE ----------------
  const deleteCourseById = async (courseId: string) => {
    if (!isFaculty) return;
    await coursesClient.deleteCourse(courseId);
    await loadDashboardData();
  };

  // ---------------- FILTER ----------------
  const myCourses = courses.filter((c) => enrolledCourseIds.includes(c._id));
  const availableCourses = courses.filter(
    (c) => !enrolledCourseIds.includes(c._id)
  );

  // ---------------- UI ----------------
  return (
    <div id="wd-dashboard" className="p-3">
      <h1>Dashboard</h1>
      <hr />

      {/* FACULTY SECTION */}
      {isFaculty && (
        <>
          <h4>Manage Courses</h4>
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Course Description"
            value={course.description ?? ""}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <Button className="btn btn-primary me-2" onClick={createNewCourse}>
            Add Course
          </Button>
          <Button className="btn btn-warning me-2" onClick={updateSelectedCourse}>
            Update
          </Button>
          <hr />
        </>
      )}

      {/* STUDENT SECTION */}
      {!isFaculty && (
        <>
          <h2>My Courses ({myCourses.length})</h2>
          <Row className="g-4 mt-3">
            {myCourses.map((c) => (
              <Col key={c._id}>
                <Card>
                  <Link
                    href={`/Courses/${c._id}/Home`}
                    className="text-decoration-none text-dark"
                  >
                    <CardImg src="/images/reactjs.jpg" height={160} />
                    <CardBody>
                      <CardTitle>{c.name}</CardTitle>
                      <Button variant="primary">Go</Button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>

          <hr />
          <h2>Available Courses ({availableCourses.length})</h2>
          <Row className="g-4 mt-3">
            {availableCourses.map((c) => (
              <Col key={c._id}>
                <Card>
                  <CardImg src="/images/reactjs.jpg" height={160} />
                  <CardBody>
                    <CardTitle>{c.name}</CardTitle>
                    <Button variant="success" onClick={() => enroll(c._id)}>
                      Enroll
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* FACULTY: VIEW ALL */}
      {isFaculty && (
        <>
          <h2>All Courses ({courses.length})</h2>
          <Row className="g-4 mt-3">
            {courses.map((c) => (
              <Col key={c._id}>
                <Card>
                  <Link
                    href={`/Courses/${c._id}/Home`}
                    className="text-decoration-none text-dark"
                  >
                    <CardImg src="/images/reactjs.jpg" height={160} />
                    <CardBody>
                      <CardTitle>{c.name}</CardTitle>

                      <Button
                        className="btn btn-danger mt-2"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCourseById(c._id);
                        }}
                      >
                        Delete
                      </Button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
