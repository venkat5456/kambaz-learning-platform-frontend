"use client";

const add = (a: number, b: number): void => {
  alert(`${a} + ${b} = ${a + b}`);
};

export default function PassingDataOnEvent() {
  return (
    <div id="wd-passing-data-on-event">
      <h2>Passing Data on Event</h2>

      {/* ✅ correct way — wrap call in arrow function */}
      <button
        onClick={() => add(2, 3)}
        className="btn btn-primary"
        id="wd-pass-data-click"
      >
        Pass 2 and 3 to add()
      </button>

      {/* ❌ wrong way (causes infinite loop)
          onClick={add(2, 3)}
      */}

      <hr />
    </div>
  );
}