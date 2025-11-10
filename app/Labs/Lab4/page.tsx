"use client";

import { Provider } from "react-redux";
import store from "./store";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import UseStateExample from "./UseStateExample";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import TodoList from "./todos/TodoList";

export default function Lab4() {
  // callback function for PassingFunctions
  function sayHello(): void {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-lab4" className="p-4 space-y-4">
        <h2>Lab 4</h2>

        {/* Part 1 – Handling Click Events */}
        <ClickEvent />

        {/* Part 2 – Passing Data on Event */}
        <PassingDataOnEvent />

        {/* Part 3 – Passing Functions as Parameters */}
        <PassingFunctions theFunction={sayHello} />

        {/* Part 4 – Event Object */}
        <EventObject />

        {/* Part 5 – Managing Component State (useState example) */}
        <UseStateExample />

        {/* Part 6 – Counter Example (Integer State Variable) */}
        <Counter />

        {/* Part 7 – Boolean State Variables */}
        <BooleanStateVariables />

        {/* Part 8 – String State Variables */}
        <StringStateVariables />

        {/* Part 9 – Date State Variable */}
        <DateStateVariable />

        {/* Part 10 – Object State Variables */}
        <ObjectStateVariable />

        {/* Part 11 – Array State Variables */}
        <ArrayStateVariable />

        {/* Part 12 – Sharing State Between Components */}
        <ParentStateComponent />

        {/* Part 13 – Managing Application State with Redux */}
        <ReduxExamples />

        {/* Part 14 – Todo List Example */}
        <TodoList />
      </div>
    </Provider>
  );
}