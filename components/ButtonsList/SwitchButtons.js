"use client";
import React, { memo, useEffect, useState } from "react";
import "./style.scss";

const SwitchButtons = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setSelectedTab(index);

    // setTimeout(() => {

    // }, 300);
    onTabChange(tab, index);
  };
  console.log(" Rerendering outside");
  useEffect(() => {
    console.log(" Rerendering");
  }, [data, onTabChange]);

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};
const MemoizedSwitchButtons = memo(SwitchButtons);
export default MemoizedSwitchButtons;
