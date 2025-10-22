export default function IfElse() {
  const true1 = true;
const false1 = false;

  return (
    <div id="wd-if-else" className="p-3">
      <h4>If Else</h4>
      {/* Rendered only if true1 is true */}
      {true1 && <p>true1</p>}

      {/* Ternary operator example */}
      {!false1 ? <p>!false1</p> : <p>false1</p>}

      <hr />
    </div>
  );
}