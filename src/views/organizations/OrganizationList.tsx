"use client";

import React from "react";
import { Menu, MenuItem } from "@mui/material";
import OrganizationCard from "./OrganizationCard";

interface Organization {
  id: number;
  name: string;
  image_url?: string;
  status: number;
  user: {
    email?: string;
    phone?: string;
    img_url?: string;
    name: string;
  };
  total_startups: number;
  cycles: any[];
}

interface OrganizationListProps {
  organizations: Organization[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedOrgId, setSelectedOrgId] = React.useState<number | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    orgId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrgId(orgId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrgId(null);
  };

  const handleEdit = () => {
    if (selectedOrgId && onEdit) {
      onEdit(selectedOrgId);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedOrgId && onDelete) {
      onDelete(selectedOrgId);
    }
    handleMenuClose();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((organization) => (
        <OrganizationCard
          key={organization.id}
          organization={organization}
          handleMenuOpen={handleMenuOpen}
        />
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="p-0"
      >
        <MenuItem onClick={handleEdit}>
          <i className="tabler-edit text-info mr-2 text-xl" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <i className="tabler-trash text-error mr-2 text-xl" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default OrganizationList;
