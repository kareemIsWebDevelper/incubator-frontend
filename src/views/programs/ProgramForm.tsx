"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Tabs,
  Tab,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  string,
  boolean,
  minLength,
  InferInput,
  pipe,
  any,
} from "valibot";
import CustomDatePicker from "@core/components/mui/DatePicker";
import CustomTextField from "@core/components/mui/TextField";
import { ProgramType } from "@/types/programTypes";
import TextEditor from "@/components/TextEditor";
import FileUploader from "@/components/FileUploader";

// Schema definition
const programSchema = object({
  // Program Info Tab
  organization: string("Organization is required."),
  title: pipe(string(), minLength(1, "Title is required.")),
  startDate: string("Start Date is required."),
  endDate: string("End Date is required."),
  description: pipe(string(), minLength(1, "Description is required.")),
  allowNonCompany: boolean(),
  privateLink: boolean(),

  // Guidelines Tab
  guidelines: string(""),
  guidelinesFile: any(), // Accept any for File object

  // Financial Policy Tab
  financialPolicy: string(""),
  financialPolicyFile: any(), // Accept any for File object

  // Legal Policy Tab
  legalPolicy: string(""),
  legalPolicyFile: any(), // Accept any for File object

  // Mentorship Request Tab
  autoApproveMentorship: boolean(),
});

type ProgramFormInputs = InferInput<typeof programSchema>;

const themeSpacing = (factor: number) => `${factor * 8}px`;

interface ProgramFormProps {
  mode: "new" | "edit";
  program?: ProgramType | undefined;
}

const ProgramForm = ({ mode, program }: ProgramFormProps) => {
  // console.log("ProgramForm rendered with mode:", mode);
  // console.log("Program data:", program);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [currentTab, setCurrentTab] = useState(0);

  const defaultValues = useMemo<ProgramFormInputs>(() => {
    if (mode === "edit" && program) {
      return {
        // Program Info Tab
        organization: program?.organization?.id && program?.organization?.id.toString() || "1",
        title: program?.title || "",
        startDate: program?.duration?.start || "",
        endDate: program?.duration?.end || "",
        description: program?.description || "",
        allowNonCompany: program?.allowNonCompany || false,
        privateLink: program?.privateLink || false,

        // Guidelines Tab
        guidelines: program?.guidelines || "",
        guidelinesFile: program?.guidelinesFile || null,

        // Financial Policy Tab
        financialPolicy: program?.financialPolicy || "",
        financialPolicyFile: program?.financialPolicyFile || null,

        // Legal Policy Tab
        legalPolicy: program?.legalPolicy || "",
        legalPolicyFile: program?.legalPolicyFile || null,

        // Mentorship Request Tab
        autoApproveMentorship: program?.autoApproveMentorship || false,
      };
    }

    return {
      // Program Info Tab
      organization: "1",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      allowNonCompany: false,
      privateLink: false,

      // Guidelines Tab
      guidelines: "",
      guidelinesFile: null,

      // Financial Policy Tab
      financialPolicy: "",
      financialPolicyFile: null,

      // Legal Policy Tab
      legalPolicy: "",
      legalPolicyFile: null,

      // Mentorship Request Tab
      autoApproveMentorship: false,
    };
  }, [mode, program]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProgramFormInputs>({
    resolver: valibotResolver(programSchema),
    defaultValues,
  });

  useEffect(() => {
    // watch for changes in the form values
    const subscription = watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: ProgramFormInputs) => {
    console.log("Validated data:", data);
  };

  const handleReset = () => {
    reset();
  };

  const organizations = [
    { value: 1, label: "Organization 1" },
    { value: 2, label: "Organization 2" },
    { value: 3, label: "Organization 3" },
  ];

  const tabs = [
    { id: "info", label: "Program Info" },
    { id: "guidelines", label: "Guidelines" },
    { id: "financial-policy", label: "Financial Policy" },
    { id: "legal-policy", label: "Legal Policy" },
    { id: "mentorship-request", label: "Mentorship Request" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const TabPanel = (props: {
    children?: React.ReactNode;
    index: number;
    value: number;
  }) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${tabs[index]?.id}`}
        aria-labelledby={`tab-${tabs[index]?.id}`}
        style={{ width: "100%" }}
        {...other}
      >
        {value === index && <Box sx={{ p: { xs: 0, sm: 0 } }}>{children}</Box>}
      </div>
    );
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent className="p-3 sm:p-6">
            <Tabs
              variant="scrollable"
              orientation={isMobile ? "horizontal" : "vertical"}
              value={currentTab}
              onChange={handleTabChange}
              aria-label="Vertical program tabs"
              sx={{ border: 0 }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tabs[index]?.id}`}
                  className="d-flex items-start"
                  sx={{
                    padding: themeSpacing(1.5),
                    fontWeight: currentTab === index ? "bold" : "normal",
                    color:
                      currentTab === index ? "primary.main" : "text.secondary",
                    "&.Mui-selected": {
                      backgroundColor: "action.selected",
                      color: "primary.main",
                    },
                  }}
                />
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={9}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="px-0">
              <Typography
                variant="h6"
                mb={6}
                borderBottom={1}
                pb={2}
                borderColor="divider"
              >
                {mode === "new" ? "Create New Program" : "Edit Program"}
              </Typography>

              <Box sx={{ flexGrow: 1 }}>
                <TabPanel value={currentTab} index={0}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Controller
                        name="organization"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            select
                            fullWidth
                            label="Select Organization"
                            {...field}
                            error={!!errors.organization}
                            helperText={errors.organization?.message}
                          >
                            {organizations.map((org) => (
                              <MenuItem key={org.value} value={org.value}>
                                {org.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            fullWidth
                            label="Title"
                            placeholder="Enter title"
                            {...field}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                          <CustomDatePicker
                            label="Start Date"
                            {...field}
                            error={!!errors.startDate}
                            helperText={errors.startDate?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <CustomDatePicker
                            label="End Date"
                            {...field}
                            error={!!errors.endDate}
                            helperText={errors.endDate?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomTextField
                        fullWidth
                        label="Description"
                        placeholder="Enter program description"
                        multiline
                        rows={4}
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="allowNonCompany"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Switch
                                {...field}
                                checked={field.value}
                                color="primary"
                              />
                            }
                            label="Non-company Participation"
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="privateLink"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Switch
                                {...field}
                                checked={field.value}
                                color="primary"
                              />
                            }
                            label="Private Link"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={currentTab} index={1}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Controller
                        name="guidelines"
                        control={control}
                        render={({ field }) => (
                          <TextEditor
                            {...field}
                            label="Guidelines"
                            placeholder="Enter guidelines"
                            error={!!errors.guidelines}
                            helperText={errors.guidelines?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FileUploader
                        accept="application/pdf"
                        title="Attach Guidelines PDF File"
                        onFilesSelected={(files: File[]): void => {
                          setValue("guidelinesFile", files[0]);
                        }}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={currentTab} index={2}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Controller
                        name="financialPolicy"
                        control={control}
                        render={({ field }) => (
                          <TextEditor
                            {...field}
                            label="Financial Policy"
                            placeholder="Enter financial policy"
                            error={!!errors.financialPolicy}
                            helperText={errors.financialPolicy?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FileUploader
                        accept="application/pdf"
                        title="Attach Financial Policy PDF File"
                        onFilesSelected={(files: File[]): void => {
                          setValue("financialPolicyFile", files[0]);
                        }}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={currentTab} index={3}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Controller
                        name="legalPolicy"
                        control={control}
                        render={({ field }) => (
                          <TextEditor
                            {...field}
                            label="Legal Policy"
                            placeholder="Enter legal policy"
                            error={!!errors.legalPolicy}
                            helperText={errors.legalPolicy?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FileUploader
                        accept="application/pdf"
                        title="Attach Legal Policy PDF File"
                        onFilesSelected={(files: File[]): void => {
                          setValue("legalPolicyFile", files[0]);
                        }}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={currentTab} index={4}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Controller
                        name="autoApproveMentorship"
                        control={control}
                        render={({ field }) => (
                          <>
                            <FormControlLabel
                              control={
                                <Switch
                                  {...field}
                                  checked={field.value}
                                  color="primary"
                                />
                              }
                              label="Auto Approve Mentorship Requests"
                            />
                            <Typography variant="body2" color="text.secondary">
                              Enable this option to automatically approve all
                              mentorship requests for this program.
                            </Typography>
                          </>
                        )}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>

              <Box className="flex justify-end items-center gap-3 mt-12">
                <Button
                  variant="tonal"
                  color="secondary"
                  onClick={handleReset}
                  sx={{ width: "120px" }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "120px" }}
                >
                  {mode === "new" ? "Submit" : "Update"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProgramForm;
