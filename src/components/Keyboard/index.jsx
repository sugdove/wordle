import "./index.css";
import { COLORS } from "../../constans/colors";
import { FONTCOLORS } from "../../constans/fontColors";

export default function Keyboard(props) {
  const { keys } = props;
  function handleClickKey(obj) {
    props.handleClick(obj);
  }
  let colors = COLORS.map((el) => el);
  colors[0] = "rgb(226 232 240)";
  return (
    <div className="keyboard_container">
      {keys.map((el, index) => {
        return (
          <div className="key_box" key={index}>
            {el.map((el2, index2) => {
              return (
                <div
                  className="key"
                  key={index2}
                  onClick={() => handleClickKey(el2)}
                  style={{
                    backgroundColor: colors[el2.status],
                    color: el2.status === 0 ? FONTCOLORS[0] : FONTCOLORS[1],
                    padding:
                      el2.label !== "Enter" && el2.label2 !== "Delete"
                        ? "0.9em 0.5em"
                        : "0.9em"
                  }}
                >
                  {el2.label}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
