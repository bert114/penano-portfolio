import React, { useEffect, useState } from "react";
import ProjectListing from "./ProjectListing";
import chevron from "../assets/icons/chevdown.svg";
import { Link } from "react-scroll";
import Loader from "./Loading";
import projectJ from "../projects.json";

function ProjectListings() {
  const [projects, setProjects] = useState([]);
  const [click, isClick] = useState(false);
  const [url, setUrl] = useState("/api/projects?_limit=3");

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(3);
  const [text, setText] = useState("View More");

  /*
  const fetchProject = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  */

  /*
  useEffect(() => {
    fetchProject(url);
  }, [url]);
  */

  /*
  const handelClick = () => {
    if (!click) {
      isClick(true);
      setLoading(true);

      setUrl("/api/projects?_limit=40");
    } else {
      isClick(false);
      setLoading(true);

      setUrl("/api/projects?_limit=3");

      setTimeout(() => {
        document
          .getElementById("projects")
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  */

  const handelClick = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setText(text === "View Less" ? "View More" : "View Less");
      if (limit == 3) {
        setLimit(60);
      } else {
        setLimit(3);
      }
    }, 1000);
  };

  return (
    <>
      <div className="project-wrapper">
        <div className="project-container" id="projects">
          <h2>MY PROJECTS:</h2>
          <p></p>
          {loading ? (
            <div className="loading-wrapper">
              <Loader />
            </div>
          ) : (
            <ul>
              {projectJ.projects.slice(0, limit).map((project, index) => (
                <ProjectListing project={project} key={index} />
              ))}
            </ul>
          )}

          <button className="more" onClick={handelClick}>
            {text}
            <img src={chevron} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectListings;
