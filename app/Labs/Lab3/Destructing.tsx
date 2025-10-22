export default function Destructing() {
  const person = { name: "John", age: 25 };
  const { name, age } = person;

  const numbers = ["one", "two", "three"];
  const [first, second, third] = numbers;

  return (
    <div id="wd-destructing" className="p-3">
      <h2>Destructuring</h2>
      <h3>Object Destructuring</h3>
      const &#123; name, age &#125; =
     <p>&#123; name: &quot;John&quot;, age: 25 &#125;</p>
      <br /><br />
      name = {name}
      <br />
      age = {age}
      <h3>Array Destructuring</h3>
      <p>const [first, second, third] = [&quot;one&quot;,&quot;two&quot;,&quot;three&quot;]</p>
      <br /><br />
      first = {first}
      <br />
      second = {second}
      <br />
      third = {third}
      <hr />
    </div>
  );
}