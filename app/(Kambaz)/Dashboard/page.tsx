"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, Button, FormControl
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";

import * as coursesClient from "../Courses/client";
import * as enrollClient from "../Enrollments/client";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";

  const [course, setCourse] = useState({
    _id: "",
    name: "",
    description: "",
    image: "/images/reactjs.jpg",
  });

  const loadDashboardData = async () => {
    const allCourses = await coursesClient.fetchAllCourses();
    dispatch(setCourses(allCourses));

    if (!isFaculty && currentUser) {
      const enrollments = await enrollClient.findEnrollments(currentUser._id);
      setEnrolledCourseIds(enrollments.map((e: any) => e.course));
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const enroll = async (courseId: string) => {
    if (!currentUser) return alert("Sign in first!");
    await enrollClient.enrollUserInCourse(currentUser._id, courseId);
    loadDashboardData();
  };

  const createNewCourse = async () => {
    if (!isFaculty) return;
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    setCourse({ _id: "", name: "", description: "", image: "/images/reactjs.jpg" });
  };

  const updateSelectedCourse = async () => {
    if (!isFaculty || !course._id) return;
    const updated = await coursesClient.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => (c._id === updated._id ? updated : c))));
  };

  const deleteCourse = async (courseId: string) => {
    if (!isFaculty) return;
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const myCourses = courses.filter((c: any) => enrolledCourseIds.includes(c._id));
  const availableCourses = courses.filter((c: any) => !enrolledCourseIds.includes(c._id));

  return (
    <div id="wd-dashboard" className="p-3">
      <h1>Dashboard</h1>
      <hr />

      {/* ⭐ Course Manage Panel for Faculty */}
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
            value={course.description}
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

      {/* 🧑‍🎓 STUDENT VIEW */}
      {!isFaculty && (
        <>
          <h2>My Courses ({myCourses.length})</h2>
          {myCourses.length === 0 ? (
            <p>You are not enrolled yet.</p>
          ) : (
            <Row className="g-4 mt-3">
              {myCourses.map((c: any) => (
                <Col key={c._id}>
                  <Card>
                    <Link href={`/Courses/${c._id}/Home`} className="text-decoration-none text-dark">
                      <CardImg src={c.image} height={160} />
                      <CardBody>
                        <CardTitle>{c.name}</CardTitle>
                        <Button variant="primary">Go</Button>
                      </CardBody>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <hr />

          <h2>Available Courses ({availableCourses.length})</h2>
          <Row className="g-4 mt-3">
            {availableCourses.map((c: any) => (
              <Col key={c._id}>
                <Card>
                  <CardImg src={c.image} height={160} />
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

      {/* 🧑‍🏫 FACULTY COURSE LIST */}
      {isFaculty && (
        <>
          <h2>All Courses ({courses.length})</h2>
          <Row className="g-4 mt-3">
            {courses.map((c: any) => (
              <Col key={c._id}>
                <Card>
                  <Link href={`/Courses/${c._id}/Home`} className="text-decoration-none text-dark">
                    <CardImg src={c.image} height={160} />
                    <CardBody>
                      <CardTitle>{c.name}</CardTitle>
                      <Button
                        className="btn btn-danger mt-2"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCourse(c._id);
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
