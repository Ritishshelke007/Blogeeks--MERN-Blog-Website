import React from "react";
import { Link } from "react-router-dom";

const AboutUser = ({ className, bio, social_links, joinedAt }) => {
  let date = new Date(joinedAt);
  return (
    <div className={"md:w-[90%] mt-5 " + className}>
      <p className="leading-7 text-lg">
        {bio.length ? { bio } : "Nothing to read here"}
      </p>

      <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 justify-start items-center text-dark-grey">
        {Object.keys(social_links).map((key) => {
          let link = social_links[key];

          return link ? (
            <Link to={link} key={key} target="_blank">
              <i
                className={
                  "fi " +
                  (key != "website" ? "fi-brands-" + key : "fi-rr-globe") +
                  " text-2xl hover:text-black"
                }
              ></i>
            </Link>
          ) : (
            ""
          );
        })}
      </div>

      <p className="font-medium">
        Joined on{" "}
        <span>
          {date.toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </p>
    </div>
  );
};

export default AboutUser;
