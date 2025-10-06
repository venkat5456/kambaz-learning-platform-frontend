export default function Float() {
  return (
    <div id="wd-float-divs">
      <h2>Float</h2>

      {/* Example 1: Images floated left/right with lorem text */}
      <div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
        provident dolorem, maxime possimus vero. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eius hic provident dolorem, maxime possimus
        vero.
        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
        provident dolorem, maxime possimus vero. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eius hic provident dolorem, maxime possimus
        vero.
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
        provident dolorem, maxime possimus vero. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eius hic provident dolorem, maxime possimus
        vero.
        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
        provident dolorem, maxime possimus vero. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eius hic provident dolorem, maxime possimus
        vero.
        <div className="wd-float-done"></div>
      </div>

      {/* Example 2: Floating divs horizontally */}
      <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
          Yellow
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
          Blue
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
          Red
        </div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        <div className="wd-float-done"></div>
      </div>
    </div>
  );
}
