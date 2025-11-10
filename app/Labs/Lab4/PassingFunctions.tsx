"use client";

export default function PassingFunctions(
  { theFunction }: { theFunction: () => void }
) {
  return (
    <div id="wd-passing-functions">
      <h2>Passing Functions</h2>

      {/* function passed in as a parameter */}
      <button onClick={theFunction} className="btn btn-primary" id="wd-invoke-function-click">
        Invoke the Function
      </button>

      <hr />
    </div>
  );
}