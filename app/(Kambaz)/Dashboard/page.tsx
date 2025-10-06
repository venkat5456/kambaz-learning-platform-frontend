"use client";

import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
  // helper to save last clicked course
  const handleCourseClick = (cid: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastCourse", cid);
    }
  };

  return (
    <div id="wd-dashboard" className="p-3">
      {/* Dashboard title */}
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      {/* Responsive grid of courses */}
      <div id="wd-dashboard-courses" className="mt-4">
        <Row xs={1} md={4} className="g-4">
          {/* React Course */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={() => handleCourseClick("CS1234")}
              >
                <CardImg
                  variant="top"
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS1234 React JS
                  </CardTitle>
                  <CardText style={{ height: "100px" }}>
                    Full Stack Software Development with React
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* NodeJS Course */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS2345/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={() => handleCourseClick("CS2345")}
              >
                <CardImg
                  variant="top"
                  src="/images/nodejs.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle>CS2345 Node JS</CardTitle>
                  <CardText style={{ height: "100px" }}>
                    Backend Development with Node.js
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Python Programming */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS3456/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={() => handleCourseClick("CS3456")}
              >
                <CardImg
                  variant="top"
                  src="/images/python.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle>CS3456 Python Programming</CardTitle>
                  <CardText style={{ height: "100px" }}>
                    Introduction to Python Programming
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Java Programming */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS4567/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={() => handleCourseClick("CS4567")}
              >
                <CardImg
                  variant="top"
                  src="/images/java.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle>CS4567 Java Programming</CardTitle>
                  <CardText style={{ height: "100px" }}>
                    Object-Oriented Programming in Java
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* AI Basics */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS5678/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={() => handleCourseClick("CS5678")}
              >
                <CardImg
                  variant="top"
                  src="/images/ml.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle>CS5678 AI Basics</CardTitle>
                  <CardText style={{ height: "100px" }}>
                    Introduction to Artificial Intelligence
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Databases */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS6789/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={() => handleCourseClick("CS6789")}
              >
                <CardImg
                  variant="top"
                  src="/images/db.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle>CS6789 Databases</CardTitle>
                  <CardText style={{ height: "100px" }}>
                    Database Management Systems
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Web Development */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS7890/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={() => handleCourseClick("CS7890")}
              >
                <CardImg
                  variant="top"
                  src="/images/cybersecurity.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle>CS7890 Web Development</CardTitle>
                  <CardText style={{ height: "100px" }}>
                    Frontend and Backend Web Development
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
