"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import moment from "moment";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Interface definitions
interface Vendor {
  name: string;
  email: string;
  phone: string;
}

interface ServiceRequestType {
  serviceName: string;
  comment: string;
  vendor: Vendor;
  createdAt: string;
}

interface ManageServiceRequestDialogProps {
  open: boolean;
  onClose: () => void;
  serviceRequest: ServiceRequestType | null;
  onApprove: (request: ServiceRequestType) => void;
  onDisapprove: (request: ServiceRequestType) => void;
}

const ManageServiceRequestDialog = ({
  open,
  onClose,
  serviceRequest,
  onApprove,
  onDisapprove,
}: ManageServiceRequestDialogProps) => {
  if (!serviceRequest) return null;

  const handleApprove = () => {
    onApprove(serviceRequest);
    onClose();
  };

  const handleDisapprove = () => {
    onDisapprove(serviceRequest);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { overflow: "auto" } }}
      fullWidth
      // Make the dialog full screen on mobile devices
      aria-labelledby="user-dialog-title"
      fullScreen={typeof window !== undefined ? window.innerWidth < 600 : false}
      scroll="paper"
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle>
        Manage Service Request: {serviceRequest.serviceName}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Service Request Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Service Request Details
            </Typography>
            <Box mb={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Created on:
              </Typography>
              <Typography variant="body1">
                {moment(serviceRequest.createdAt).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Service Name:
              </Typography>
              <Typography variant="body1">
                {serviceRequest.serviceName}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Comment:
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {serviceRequest.comment}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Vendor Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Vendor Information
            </Typography>
            <Box mb={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Vendor Name:
              </Typography>
              <Typography variant="body1">
                {serviceRequest.vendor.name}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Email:
              </Typography>
              <Typography variant="body1">
                {serviceRequest.vendor.email}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Phone:
              </Typography>
              <Typography variant="body1">
                {serviceRequest.vendor.phone}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="text">
          Cancel
        </Button>
        <Button onClick={handleDisapprove} color="error" variant="tonal">
          Disapprove
        </Button>
        <Button onClick={handleApprove} color="primary" variant="contained">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageServiceRequestDialog;
