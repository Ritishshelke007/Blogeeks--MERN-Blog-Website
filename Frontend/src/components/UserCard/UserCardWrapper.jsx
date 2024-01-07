import React from "react";
import Loader from "../Loader/Loader";
import NoDataMessage from "../NoDataMessage/NoDataMessage";
import AnimationWrapper from "../../common/page-animation";
import UserCard from "./UserCard";

const UserCardWrapper = ({ users }) => {
  return (
    <>
      {users == null ? (
        <Loader />
      ) : users.length ? (
        users.map((user, i) => {
          return (
            <AnimationWrapper
              key={i}
              transition={{ duration: 1, delay: i * 0.08 }}
            >
              <UserCard user={user} />
            </AnimationWrapper>
          );
        })
      ) : (
        <NoDataMessage message="No user found" />
      )}
    </>
  );
};

export default UserCardWrapper;
