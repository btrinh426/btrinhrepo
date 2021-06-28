import React from "react";
import * as FaIcons from "react-icons/fa";

const SideBarData = [
  {
    title: "Home",
    path: "/home",
    icon: <FaIcons.FaHome />,
    cName: "nav-text",
  },
  {
    title: "People",
    path: "/",
    icon: <FaIcons.FaUsers />,
    cName: "nav-text",
  },
  {
    title: "Blog",
    path: "/",
    icon: <FaIcons.FaComments />,
    cName: "nav-text",
  },
  {
    title: "Tech Companies",
    path: "/",
    icon: <FaIcons.FaGlobe />,
    cName: "nav-text",
  },
  {
    title: "Jobs",
    path: "/",
    icon: <FaIcons.FaBriefcase />,
    cName: "nav-text",
  },
  {
    title: "Events",
    path: "/",
    icon: <FaIcons.FaCalendarAlt />,
    cName: "nav-text",
  },
];

export default SideBarData;
