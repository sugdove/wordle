import "./index.css";
import Info from "../../assets/info";
import Dialog from "../Dialog";
import React, { useState } from "react";
export default function Header() {
  const [dialogVisible, setDialogVisible] = useState(false);
  function handleClickInfo() {
    setDialogVisible(true);
  }
  function close() {
    setDialogVisible(false);
  }
  return (
    <>
      <div className="header">
        <div className="info_content">
          <Info click={handleClickInfo} />
        </div>
        <p>WORDLE</p>
        <div className="info_content"></div>
      </div>
      <Dialog dialogVisible={dialogVisible} close={close}>
        <p>
          1、游戏是一个5*6的方格，意思是答案是一个五个字母的单词，6行是你有六次猜测的机会。
        </p>
        <p>
          2、你猜测完之后，会在你猜测的字母里面打上颜色进行提示，各种颜色的意思如下：
        </p>
        <p>
          <span style={{ color: "#21c55e" }}>绿色 ：</span>
          说明答案里有这个字母、并且位置也是对的。
        </p>
        <p>
          <span style={{ color: "#eab320" }}>黄色：</span>
          说明答案里有这个字母、但是字母的位置不对。
        </p>
        <p>
          <span style={{ color: "#94a3b8" }}>灰色：</span>
          答案里面没有这个字母，可以直接排除了。
        </p>
        <p>3、我们可以根据一次次的输入来确定答案中的字母和具体位置。</p>
      </Dialog>
    </>
  );
}
