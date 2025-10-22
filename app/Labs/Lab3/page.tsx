import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import Spreader from "./Spreader";
import FunctionDestructing from "./FunctionDestructing";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";
import TodoList from "./todos/TodoList";

export default function Lab3() {
  // ✅ Debugging Section — Logs to the browser console
  console.log("Hello World!");

  return (
    <div id="wd-lab3" className="p-3">
      <h3>Lab 3: Introduction to JavaScript</h3>
      <p>
        This lab introduces JavaScript fundamentals including variables, data
        types, conditionals, functions, arrays, loops, JSON, styling, and
        parameterized components. We’ll also practice debugging using the
        browser console.
      </p>

      {/* Exercise 1: Variables and Constants */}
      <VariablesAndConstants />

      {/* Exercise 2: Variable Types */}
      <VariableTypes />

      {/* Exercise 3: Boolean Variables */}
      <BooleanVariables />

      {/* Exercise 4: If Else */}
      <IfElse />

      {/* Exercise 5: Ternary Conditional Operator */}
      <TernaryOperator />

      {/* Exercise 6: Conditional Output If Else */}
      <ConditionalOutputIfElse />

      {/* Exercise 7: Conditional Output Inline */}
      <ConditionalOutputInline />

      {/* Exercise 8: Legacy Functions */}
      <LegacyFunctions />

      {/* Exercise 9: Arrow Functions */}
      <ArrowFunctions />

      {/* Exercise 10: Implied Return */}
      <ImpliedReturn />

      {/* Exercise 11: Template Literals */}
      <TemplateLiterals />

      {/* Exercise 12: Simple Arrays */}
      <SimpleArrays />

      {/* Exercise 13: Array Index and Length */}
      <ArrayIndexAndLength />

      {/* Exercise 14: Adding and Removing Data To/From Arrays */}
      <AddingAndRemovingToFromArrays />

      {/* Exercise 15: For Loops */}
      <ForLoops />

      {/* Exercise 16: Map Function */}
      <MapFunction />

      {/* Exercise 17: Find Function */}
      <FindFunction />

      {/* Exercise 18: Find Index Function */}
      <FindIndex />

      {/* Exercise 19: Filter Function */}
      <FilterFunction />

      {/* Exercise 20: JSON Stringify */}
      <JsonStringify />

      {/* Exercise 21: JavaScript Object (House JSON Example) */}
      <House />

      {/* Exercise 22: Spread Operator */}
      <Spreader />

      {/* Exercise 23: Destructuring */}
      <Destructing />

      {/* Exercise 24: Function Destructuring */}
      <FunctionDestructing />

      {/* Exercise 25: Destructuring Imports */}
      <DestructingImports />

      {/* Exercise 26: Dynamic Styling - Working with HTML Classes */}
      <Classes />

      {/* Exercise 27: Working with the HTML Style Attribute */}
      <Styles />

      {/* Exercise 28: Parameterized and Child Components */}
      <Add a={3} b={4} />

      {/* Exercise 30: Encoding Path Parameters */}
      <PathParameters />

      <h4>Square of 4</h4>
      <Square>4</Square>

      <h4>Highlighted Text</h4>
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        ratione eaque illo minus cum, saepe totam vel nihil repellat nemo
        explicabo excepturi consectetur. Modi omnis minus sequi maiores,
        provident voluptates.
      </Highlight>
      <hr />

      {/* Exercise: Rendering a Data Structure (Todo List) */}
      <TodoList />
    </div>
  );
}
