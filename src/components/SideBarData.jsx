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
    path: "/people",
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
  { title: "Cars", path: "/cars", icon: <FaIcons.FaCar />, cName: "nav-text" },
];

export default SideBarData;
