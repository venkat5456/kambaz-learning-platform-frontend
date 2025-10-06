import { Table } from "react-bootstrap";

export default function BootstrapTables() {
  return (
    <div>
      {/* Styled Table with 7 subjects */}
      <div id="wd-css-styling-tables">
        <h2>Tables</h2>
        <Table>
          <thead>
            <tr className="table-dark">
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-warning">
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr className="table-danger">
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr className="table-primary">
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>90</td>
            </tr>
            <tr className="table-info">
              <td>Q4</td>
              <td>Nodes</td>
              <td>2/24/21</td>
              <td>88</td>
            </tr>
            <tr className="table-secondary">
              <td>Q5</td>
              <td>Python Programming</td>
              <td>3/3/21</td>
              <td>92</td>
            </tr>
            <tr className="table-warning">
              <td>Q6</td>
              <td>Java Programming</td>
              <td>3/10/21</td>
              <td>87</td>
            </tr>
            <tr className="table-success">
              <td>Q7</td>
              <td>Machine Learning</td>
              <td>3/17/21</td>
              <td>95</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="table-success">
              <td colSpan={3}>Average</td>
              <td>89</td>
            </tr>
          </tfoot>
        </Table>
      </div>

      {/* Responsive Table */}
      <div id="wd-css-responsive-tables" className="mt-4">
        <h2>Responsive tables</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Very</th>
              <th>long</th>
              <th>set</th>
              <th>of</th>
              <th>columns</th>
              <th>Very</th>
              <th>long</th>
              <th>set</th>
              <th>of</th>
              <th>columns</th>
              <th>Very</th>
              <th>long</th>
              <th>set</th>
              <th>of</th>
              <th>columns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Very</td>
              <td>long</td>
              <td>set</td>
              <td>of</td>
              <td>columns</td>
              <td>Very</td>
              <td>long</td>
              <td>set</td>
              <td>of</td>
              <td>columns</td>
              <td>Very</td>
              <td>long</td>
              <td>set</td>
              <td>of</td>
              <td>columns</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
