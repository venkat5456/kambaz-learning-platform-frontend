import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";

// NEW async components
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

import HttpClient from "./HttpClient";
import TodosClient from "./TodosClient";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>

      <div className="list-group">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>
      </div>

      <hr />

      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />

      {/* NEW ASYNC WORKING WITH OBJECTS */}
      <WorkingWithObjectsAsynchronously />

      {/* NEW ASYNC WORKING WITH ARRAYS */}
      <WorkingWithArraysAsynchronously />

      <HttpClient />
      <TodosClient />
    </div>
  );
}
