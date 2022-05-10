import "./styles.css";
import { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import { WORDS } from "./constans/words";
import { COLORS } from "./constans/colors";
import { FONTCOLORS } from "./constans/fontColors";
import { KEYCODES } from "./constans/keyCodes";
import { deepClone } from "./lib/utils";
import { KEYS } from "./constans/keys";
export default function App() {
  const TIMES_X = 5;
  const TIMES_Y = 6;
  // status 0 未确认 1 不存在 2 存在但是位置不对 3 存在且位置正确
  const ARRAY = new Array(TIMES_Y).fill(
    new Array(TIMES_X).fill({ label: "", status: 0 })
  );
  const RANDOM_PWD = WORDS[parseInt((WORDS.length - 1) * Math.random())];
  const [step, setStep] = useState([0, 0]);
  const [boxList, setBoxList] = useState(ARRAY);
  const [PASSWORD, setPASSWORD] = useState(RANDOM_PWD);
  const DEFAULT_ARR = KEYS.map((el) => {
    return el.map((el2) => {
      return {
        label: el2,
        status: 0
      };
    });
  });
  const [keys, setKeys] = useState(DEFAULT_ARR);
  // 单击键盘 key为对应字母
  function click(obj) {
    console.log(PASSWORD, "PASSWORD");
    const { label: key } = obj;
    const copyArr = deepClone(boxList);
    const type = key === "Enter" || key === "Delete" ? key : "add";
    if (type === "Enter") {
      if (step[1] === 4) {
        const word = copyArr[step[0]]
          .map((el) => el.label)
          .join("")
          .toLowerCase();
        if (WORDS.indexOf(word) > -1) {
          alert("单词正确, 开始匹配");
          matchWord(word, PASSWORD);
        } else {
          alert("单词错误");
        }
      } else {
        alert("字数没够");
      }
      return;
    }
    addOrDel(type, copyArr, key);
    setBoxList(copyArr);
  }
  // 字符串匹配
  function matchWord(word, rightWord) {
    let words = word.split("");
    let rightWords = rightWord.toLowerCase().split("");
    const arr = words.map((item, index) => {
      const matchIndex = rightWords.indexOf(item);
      let status = 1;
      if (matchIndex > -1) status = 2;
      if (item === rightWords[index]) status = 3;
      const obj = { index, status, key: item };
      return obj;
    });
    changeKeyBoardsStatus(arr);
    const copyArr = deepClone(boxList);
    arr.forEach((el) => {
      const { index, status } = el;
      copyArr[step[0]][index].status = status;
    });
    setBoxList(copyArr);
    if (word === PASSWORD.toLowerCase()) {
      window.confirm("恭喜您成功通关, 游戏已重置");
      refreshGame();
      return;
    }
    const copyStep = deepClone(step);
    if (copyStep[0] === TIMES_Y - 1) {
      window.confirm("猜错啦, 游戏已重置");
      refreshGame();
      return;
    }
    copyStep[1] = 0;
    copyStep[0] += 1;
    setStep(copyStep);
  }
  // keyboards组件中 将当前字母对应对象status置换（规则原值3不置换, 原值2 新值3置换, 原值1或者0 直接置换）
  function changeKeyBoardsStatus(arr) {
    const cloneKeys = deepClone(keys);
    for (let i = 0; i < arr.length; i++) {
      const { key, status } = arr[i];
      for (let j = 0; j < cloneKeys.length; j++) {
        for (let n = 0; n < cloneKeys[j].length; n++) {
          let { label, status: preStatus } = cloneKeys[j][n];
          if (label.toLowerCase() === key) {
            if (preStatus !== 3) {
              if (preStatus === 2 && status === 3) {
                preStatus = 3;
              } else {
                preStatus = status;
              }
            }
          }
          cloneKeys[j][n].status = preStatus;
        }
      }
    }
    setKeys(cloneKeys);
  }
  // 单击字母或Delete
  function addOrDel(type, copyArr, key) {
    const copyStep = deepClone(step);
    let currentBox = copyArr[step[0]][step[1]];
    let nextBox = copyArr[step[0]][step[1] + 1];
    let preBox = copyArr[step[0]][step[1] - 1];
    if (type === "add") {
      if (!currentBox.label) currentBox.label = key;
      else if (currentBox.label && nextBox && !nextBox.label)
        nextBox.label = key;
      if (copyStep[1] !== 4) {
        copyStep[1] += 1;
        setStep(copyStep);
      }
    } else if (type === "Delete") {
      if (currentBox.label) currentBox.label = "";
      else if (!currentBox.label && preBox && preBox.label) preBox.label = "";
      if (copyStep[1] !== 0) {
        copyStep[1] -= 1;
        setStep(copyStep);
      }
    }
  }
  // state 置为初始状态
  function refreshGame() {
    setBoxList(ARRAY);
    setStep([0, 0]);
    setPASSWORD(RANDOM_PWD);
    setKeys(DEFAULT_ARR);
  }
  function listenKeyup(e) {
    const key = KEYCODES[e.keyCode];
    const obj = [...keys[0], ...keys[1], ...keys[2]].find(
      (el) => el.label === key
    );
    if (obj) click(obj);
  }
  function getBorderColor(obj) {
    const { label, status } = obj;
    let borderColor = "rgb(229, 231, 235)";
    let animation = null;
    if (status === 0) {
      borderColor = label ? "rgb(0, 0, 0)" : "rgb(229, 231, 235)";
      animation = label ? ".25s linear 0s 2 alternate scaleAn" : null;
    } else {
      borderColor = "transparent";
    }
    return { borderColor, animation };
  }
  useEffect(() => {
    document.addEventListener("keyup", listenKeyup);
    return () => {
      document.removeEventListener("keyup", listenKeyup);
    };
  }, [step, boxList, PASSWORD]);
  return (
    <div className="App">
      <Header></Header>
      <div className="box_container">
        {boxList.map((el, index) => {
          return (
            <div className="box_x" key={index}>
              {el.map((el2, index2) => {
                return (
                  <div
                    className="box"
                    key={index2}
                    style={{
                      backgroundColor: COLORS[el2.status],
                      color: el2.status === 0 ? FONTCOLORS[0] : FONTCOLORS[1],
                      ...getBorderColor(el2)
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
      <Keyboard handleClick={click} PASSWORD={PASSWORD} keys={keys}></Keyboard>
    </div>
  );
}
