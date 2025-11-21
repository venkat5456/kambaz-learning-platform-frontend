"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, Button, FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import * as coursesClient from "../Courses/client";
import * as enrollClient from "../Enrollments/client";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
}

// 🟢 Fix: no `any` — use `unknown` and type narrow
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
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const isFaculty = currentUser?.role === "FACULTY";

  const loadDashboardData = async () => {
    const fetched = await coursesClient.fetchAllCourses();
    dispatch(setCourses(fetched.map(toSafeCourse)));

    if (!isFaculty && currentUser?._id) {
      const enrollments = await enrollClient.findEnrollments(currentUser._id);
      setEnrolledCourseIds(enrollments.map((e) => e.course));
    }
  };

  useEffect(() => {
    if (currentUser) loadDashboardData();
  }, [currentUser]);

  const [course, setCourse] = useState<Course>({
    _id: "",
    name: "",
    description: "",
    image: "/images/reactjs.jpg",
  });

  const enroll = async (courseId: string) => {
    if (!currentUser?._id) return alert("Sign in first!");
    await enrollClient.enrollUserInCourse(currentUser._id, courseId);
    loadDashboardData();
  };

  const createNewCourse = async () => {
    if (!isFaculty) return;
    const updatedList = await coursesClient.createCourse(course);
    dispatch(setCourses(updatedList.map(toSafeCourse)));
    setCourse({ _id: "", name: "", description: "", image: "/images/reactjs.jpg" });
  };

  const updateSelectedCourse = async () => {
    if (!isFaculty || !course._id) return;
    const updatedList = await coursesClient.updateCourse(course);
    dispatch(setCourses(updatedList.map(toSafeCourse)));
  };

  const deleteCourseById = async (courseId: string) => {
    if (!isFaculty) return;
    const updatedList = await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(updatedList.map(toSafeCourse)));
  };

  const myCourses = courses.filter((c) => enrolledCourseIds.includes(c._id));
  const availableCourses = courses.filter((c) => !enrolledCourseIds.includes(c._id));

  return (
    <div id="wd-dashboard" className="p-3">
      <h1>Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h4>Manage Courses</h4>
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) =>
              setCourse({ ...course, name: e.target.value })
            }
          />
          <FormControl
            className="mb-2"
            placeholder="Course Description"
            value={course.description ?? ""}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
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
                    <Button
                      variant="success"
                      onClick={() => enroll(c._id)}
                    >
                      Enroll
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

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
