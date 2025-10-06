"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeoplePage() {
  return (
    <div id="wd-people-table" className="p-3">
      <h2>People</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {/* Tony Stark */}
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Tony Stark</td>
            <td>001234561S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-10-01</td>
            <td>10:21:32</td>
          </tr>

          {/* Bruce Wayne */}
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Bruce Wayne</td>
            <td>001234562S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-11-02</td>
            <td>15:32:43</td>
          </tr>

          {/* Steve Rogers */}
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Steve Rogers</td>
            <td>001234563S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-10-02</td>
            <td>23:32:43</td>
          </tr>

          {/* Natasha Romanoff */}
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Natasha Romanoff</td>
            <td>001234564S</td>
            <td>S101</td>
            <td>TA</td>
            <td>2020-11-05</td>
            <td>13:23:34</td>
          </tr>

          {/* Thor Odinson */}
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Thor Odinson</td>
            <td>001234565S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-12-01</td>
            <td>11:22:33</td>
          </tr>

          {/* Bruce Banner */}
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Bruce Banner</td>
            <td>001234566S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-12-01</td>
            <td>22:33:44</td>
          </tr>

          {/* Indian Names */}
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Arjun Mehta</td>
            <td>001234567I</td>
            <td>S102</td>
            <td>STUDENT</td>
            <td>2020-12-03</td>
            <td>09:45:12</td>
          </tr>

          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Priya Sharma</td>
            <td>001234568I</td>
            <td>S102</td>
            <td>STUDENT</td>
            <td>2020-12-05</td>
            <td>14:22:31</td>
          </tr>

          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Rohan Iyer</td>
            <td>001234569I</td>
            <td>S103</td>
            <td>TA</td>
            <td>2020-12-06</td>
            <td>17:05:20</td>
          </tr>

          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Ananya Gupta</td>
            <td>001234570I</td>
            <td>S103</td>
            <td>STUDENT</td>
            <td>2020-12-07</td>
            <td>19:18:45</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
