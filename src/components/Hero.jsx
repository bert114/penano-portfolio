import "../scss/style.scss";

import React, { useEffect, useState } from "react";
import logo from "../assets/icons/logo.png";
import menuIcon from "../assets/icons/menu.svg";
import closeIcon from "../assets/icons/close.svg";
import heroImg from "../assets/img/hero.png";

import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

function Hero() {
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    if (!menu) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
      const media = window.matchMedia(query);
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  };

  const isMobile = useMediaQuery("(min-width: 640px)");
  const condition = isMobile || !menu ? "menu-wrapper" : "menu-desktop";

  const hideMenu = (e) => {
    console.log(e);
  };

  useEffect(() => {
    const content = document.querySelector(".menu-wrapper");
    if (menu) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }

    window.addEventListener("click", (e) => {
      const target = e.target;
      const btn = document.querySelector(".menu-btn");

      if (target.matches("ul") || target.matches("li") || target.matches("a"))
        return;

      setMenu(false);

      return;
      handleMenu();
      // handleClick();
    });
  }, [menu]);

  useEffect(() => {
    const lists = document.querySelectorAll(".menu-wrapper ul li");

    const handleActive = async (e) => {
      const li = e.target.closest("li");
      const link = li.querySelector("a");

      lists.forEach((li) => {
        li.classList.remove("active");
        link.click();
      });

      li.classList.add("active");

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          setMenu(false);
        }, 1000);
      });
    };

    lists.forEach((elem) => {
      elem.addEventListener("click", handleActive);
    });

    return () => {
      lists.forEach((elem) => {
        elem.removeEventListener("click", handleClick);
      });
    };
  });

  const handleMenu = (e) => {
    const button = e.currentTarget;
    const state = button.getAttribute("data-state");
    e.stopPropagation();

    if (state === "menu") {
      setMenu(false);
    } else {
      setMenu(true);
    }

    console.log(state);
  };

  return (
    <div className="hero wrapper">
      <div className="nav-wrapper">
        <div className="nav">
          <div className="logo">
            <a href="#">
              <img src={logo} alt="web_logo" />
            </a>
          </div>
          <button
            className="menu-btn"
            onClick={(e) => handleMenu(e)}
            data-state={menu ? "menu" : "close"}
          >
            {/* <img src={!menu ? menuIcon : closeIcon} alt="menu" /> */}
            <FontAwesomeIcon icon={!menu ? faBars : faClose} />
          </button>
        </div>

        <div className={`menu-wrapper`}>
          <ul>
            <li>
              <Link to="about" smooth={true} duration={500}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="skills" smooth={true} duration={500}>
                SKILLS
              </Link>
            </li>
            <li>
              <Link to="projects" smooth={true} duration={500}>
                PROJECTS
              </Link>
            </li>
            <li>
              <Link to="contact" smooth={true} duration={500}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="showcase">
        <div className="showcase-container">
          <div className="content">
            <div className="">
              <h4>
                Hi I'm <span>Albert Penano</span> a student
              </h4>
              <h1>Front-end developer </h1>
              <p>
                A Frontend Developer focused on crafting responsive and
                intuitive web experiences
              </p>
            </div>
            <div>
              <Link to="projects">
                <button className="primary-btn ">VIEW MY WORK</button>
              </Link>
            </div>
          </div>
          <picture>
            <img src={heroImg} alt="bert_img" />
          </picture>
        </div>
      </div>
    </div>
  );
}

export default Hero;
