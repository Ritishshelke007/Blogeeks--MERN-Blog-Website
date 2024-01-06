import React, { useRef, useState, useEffect } from "react";

const MobileHomeNav = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children,
}) => {
  const [activeNavIndex, setActiveNavIndex] = useState(defaultActiveIndex);
  const activeTabRef = useRef();
  const activeTab = useRef();

  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;

    activeTabRef.current.style.width = offsetWidth + "px";
    activeTabRef.current.style.left = offsetLeft + "px";
    setActiveNavIndex(i);
  };

  useEffect(() => {
    changePageState(activeTab.current, defaultActiveIndex);
  }, []);

  return (
    <>
      <div className="relative mb-8 border-b bg-white border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i === activeNavIndex ? activeTab : null}
              key={i}
              className={
                "px-5 p-4 capitalize " +
                (activeNavIndex === i ? "text-black " : "text-dark-grey ") +
                (defaultHidden.includes(route) ? " md:hidden " : " ")
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}
        <hr ref={activeTabRef} className="absolute bottom-0 duration-300" />
      </div>
      {Array.isArray(children) ? children[activeNavIndex] : children}
    </>
  );
};

export default MobileHomeNav;
