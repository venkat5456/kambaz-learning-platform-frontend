import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>

      {/* Email input */}
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="name@example.com" />

      {/* Textarea */}
      <Form.Label className="mt-3">Example textarea</Form.Label>
      <Form.Control as="textarea" rows={3} />

      {/* Dropdown */}
      <div id="wd-css-styling-dropdowns" className="mt-4">
        <h3>Dropdowns</h3>
        <Form.Select defaultValue="0">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>

      {/* Switches */}
      <div id="wd-css-styling-switches" className="mt-4">
        <h3>Switches</h3>
        <Form.Check type="switch" defaultChecked={false} label="Unchecked switch checkbox input" />
        <Form.Check type="switch" defaultChecked={true} label="Checked switch checkbox input" />
        <Form.Check type="switch" defaultChecked={false} label="Unchecked disabled switch checkbox input" disabled />
        <Form.Check type="switch" defaultChecked={true} label="Checked disabled switch checkbox input" disabled />
      </div>

      {/* Range / Slider */}
      <div id="wd-css-styling-range-and-sliders" className="mt-4">
        <h3>Range</h3>
        <Form.Label>Example range</Form.Label>
        <Form.Range min={0} max={5} step={0.5} />
      </div>

      {/* Addons */}
      <div id="wd-css-styling-addons" className="mt-4">
        <h3>Addons</h3>
        <InputGroup className="mb-3">
          <InputGroupText>$</InputGroupText>
          <InputGroupText>0.00</InputGroupText>
          <Form.Control />
        </InputGroup>
        <InputGroup>
          <Form.Control />
          <InputGroupText>$</InputGroupText>
          <InputGroupText>0.00</InputGroupText>
        </InputGroup>
      </div>

      {/* Responsive Forms */}
      <div id="wd-css-responsive-forms-1" className="mt-4">
        <h3>Responsive forms</h3>
        <Form>
          <Row className="mb-3">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" defaultValue="email@example.com" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2}>
              Bio
            </Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" style={{ height: "100px" }} />
            </Col>
          </Row>

          {/* ✅ Radios */}
          <Row className="mb-3">
            <Form.Label column sm={2}>
              Radios
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="first radio"
                name="formRadios"
                id="radio1"
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="second radio"
                name="formRadios"
                id="radio2"
              />
              <Form.Check
                type="radio"
                label="third radio"
                name="formRadios"
                id="radio3"
              />
            </Col>
          </Row>

          {/* ✅ Checkbox */}
          <Row className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check type="checkbox" label="Remember me" />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
