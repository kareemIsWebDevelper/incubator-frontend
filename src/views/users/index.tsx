"use client";

import React from "react";
import UsersTable from "./UsersTable";
import { UserType } from "@/types/UserTypes";
import { Button, ButtonProps, Grid, Typography } from "@mui/material";
import OpenDialogOnElementClick from "@/components/OpenDialogOnElementClick";
import UserForm from "./UserForm";

const mockUsers: Array<UserType> = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    gender: "Male",
    role: "Admin",
    hasCompany: true,
    created_at: "2023-01-15",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+0987654321",
    gender: "Female",
    role: "Editor",
    hasCompany: false,
    created_at: "2023-02-20",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1122334455",
    gender: "Male",
    role: "User",
    hasCompany: true,
    created_at: "2023-03-10",
    image: null,
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+5566778899",
    gender: "Female",
    role: "Not Verified",
    hasCompany: false,
    created_at: "2023-04-05",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.b@example.com",
    phone: "+2233445566",
    gender: "Male",
    role: "User",
    hasCompany: true,
    created_at: "2023-05-12",
    image: "https://via.placeholder.com/150",
  },
];

const Users = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<Array<UserType>>(mockUsers);
  const [user, setUser] = React.useState<UserType | null>(null);

  const onAddSubmit = (data: UserType) => {
    console.log("User added:", data);
    let newUser = {
      ...data,
      id: users.length + 1,
      name: data?.firstname + " " + data?.lastname,
      hasCompany: data.hasCompany || false,
      created_at: new Date().toISOString().split("T")[0],
      image: data.image || null,
    };
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setIsDialogOpen(true);
  };

  const onEditClick = (user: UserType) => {
    // console.log("userrrrr", user);
    setUser(user);
    setIsDialogOpen(true);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={6} md={6}>
        <Typography variant="h4" component="h1">
          Users List
        </Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 2 }}>
        <OpenDialogOnElementClick
          element={Button}
          elementProps={{
            variant: "contained",
            children: "Add New User",
            startIcon: <i className="tabler-plus" />,
            onClick: () => {
              setUser(null); 
              setIsDialogOpen(true);
            },
          }}
          dialog={UserForm}
          dialogProps={{
            onSubmit: onAddSubmit,
            onClose: () => setIsDialogOpen(false),
            open: isDialogOpen,
            setOpen: setIsDialogOpen,
            data: user,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <UsersTable usersData={users} onEdit={onEditClick} />
      </Grid>
    </Grid>
  );
};

export default Users;
