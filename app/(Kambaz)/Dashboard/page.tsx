"use client";

import { useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

// ✅ Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import { RootState } from "../store";
import * as db from "../Database";

export default function Dashboard() {
  const dispatch = useDispatch();

  // ✅ Access current user & all courses
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  // ✅ Local state for editing/adding
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    description: "New Description",
    image: "/images/reactjs.jpg",
    href: "/Courses/NewCourse/Home",
  });

  // ✅ Filter courses: show only user’s own or enrolled
  const userCourses =
    currentUser && currentUser._id
      ? courses.filter(
          (c: any) =>
            c.owner === currentUser._id ||
            db.enrollments.some(
              (e: any) =>
                e.user === currentUser._id && e.course === c._id
            )
        )
      : [];

  // ✅ Add new course → assign current user as owner
  const handleAddCourse = () => {
    if (!currentUser) {
      alert("Please sign in to add a course.");
      return;
    }
    const newCourse = {
      ...course,
      _id: uuidv4(),
      owner: currentUser._id,
    };
    dispatch(addNewCourse(newCourse));
  };

  // ✅ Handle course click (save in localStorage)
  const handleCourseClick = (cid: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastCourse", cid);
    }
  };

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* ✅ Add/Edit Form */}
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={handleAddCourse}
        >
          Add
        </button>

        <button
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}
        >
          Update
        </button>
      </h5>
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        className="mb-3"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />
      <hr />

      {/* ✅ Published Courses */}
      <h2 id="wd-dashboard-published">
        Published Courses ({userCourses.length})
      </h2>
      <hr />

      {/* ✅ Empty message for new users */}
      {userCourses.length === 0 ? (
        <p className="text-muted">You have no courses yet.</p>
      ) : (
        <div id="wd-dashboard-courses" className="mt-4">
          <Row xs={1} md={4} className="g-4">
            {userCourses.map((course: any) => (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={course.href || `/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={() => handleCourseClick(course._id)}
                  >
                    <CardImg
                      variant="top"
                      src={course.image || "/images/default.jpg"}
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title">
                        {course.name}
                      </CardTitle>
                      <CardText style={{ height: "100px" }}>
                        {course.description}
                      </CardText>

                      {/* ✅ Action buttons */}
                      <div className="d-flex justify-content-between">
                        <Button variant="primary">Go</Button>

                        <div>
                          <Button
                            id="wd-edit-course-click"
                            variant="warning"
                            className="me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course); // Copy course to form
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            id="wd-delete-course-click"
                            variant="danger"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}
