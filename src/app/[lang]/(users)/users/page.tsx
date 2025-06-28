// Next Imports
import type { Metadata } from "next";
import Users from "@/views/users";

export const metadata: Metadata = {
  title: "Users",
  description: "Users",
};

const UsersPage = () => {
  return <Users />;
};

export default UsersPage;
