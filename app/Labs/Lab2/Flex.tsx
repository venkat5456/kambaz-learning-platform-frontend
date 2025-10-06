export default function Flex() {
  return (
    <div id="wd-css-flex">
      <h2>Flex</h2>

      {/* Example 1: Simple flex row */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red">Column 3</div>
      </div>

      {/* Example 2: Last column grows */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3 (grows)</div>
      </div>

      {/* Example 3: Mix fixed width + flex grow */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-width-75px">Column 1 (75px)</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3 (grows)</div>
      </div>
    </div>
  );
}
