import { useId, forwardRef } from "react"; // Added forwardRef import
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimePickerFieldProps } from "@mui/x-date-pickers/TimePicker";
import { Noop, RefCallBack } from "react-hook-form";
import moment from "moment";

// Custom styled Input base (TextField without its own label management)
const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiInputLabel-root": {
    transform: "none",
    width: "fit-content",
    maxWidth: "100%",
    lineHeight: 1.153,
    position: "relative",
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing(1),
    color: "var(--mui-palette-text-primary)",
    "&:not(.Mui-error).MuiFormLabel-colorPrimary.Mui-focused": {
      color: "var(--mui-palette-primary-main) !important",
    },
    "&.Mui-disabled": {
      color: "var(--mui-palette-text-disabled)",
    },
    "&.Mui-error": {
      color: "var(--mui-palette-error-main)",
    },
  },
  "& .MuiInputBase-root": {
    backgroundColor: "transparent !important",
    // border: `1px solid var(--mui-palette-customColors-inputBorder)`,
    // "&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover": {
    //   borderColor: "var(--mui-palette-action-active)",
    // },
    "&:before, &:after": {
      display: "none",
    },
    "&.MuiInputBase-sizeSmall": {
      borderRadius: "var(--mui-shape-borderRadius)",
    },
    // "&.Mui-error": {
    //   borderColor: "var(--mui-palette-error-main)",
    // },
    // "&.Mui-focused": {
    //   borderWidth: 1,
    //   "& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder":
    //     {
    //       transform: "translateX(4px)",
    //     },
    //   "& :not(textarea).MuiFilledInput-input": {
    //     padding: "6.25px 13px",
    //   },
    //   "&:not(.Mui-error).MuiInputBase-colorPrimary": {
    //     borderColor: "var(--mui-palette-primary-main)",
    //     boxShadow: "var(--mui-customShadows-primary-sm)",
    //   },
    //   "&.MuiInputBase-colorSecondary": {
    //     borderColor: "var(--mui-palette-secondary-main)",
    //   },
    //   "&.MuiInputBase-colorInfo": {
    //     borderColor: "var(--mui-palette-info-main)",
    //   },
    //   "&.MuiInputBase-colorSuccess": {
    //     borderColor: "var(--mui-palette-success-main)",
    //   },
    //   "&.MuiInputBase-colorWarning": {
    //     borderColor: "var(--mui-palette-warning-main)",
    //   },
    //   "&.MuiInputBase-colorError": {
    //     borderColor: "var(--mui-palette-error-main)",
    //   },
    //   "&.Mui-error": {
    //     borderColor: "var(--mui-palette-error-main)",
    //   },
    // },
    "&.Mui-disabled": {
      backgroundColor: "var(--mui-palette-action-hover) !important",
    },
  },

  // Adornments
  "& .MuiInputAdornment-root": {
    marginBlockStart: "0px !important",
    "&.MuiInputAdornment-positionStart + .MuiInputBase-input:not(textarea)": {
      paddingInlineStart: "0px !important",
    },
  },
  "& .MuiInputBase-inputAdornedEnd.MuiInputBase-input": {
    paddingInlineEnd: "0px !important",
  },

  "& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart.Mui-focused": {
    paddingInlineStart: "13px",
    "& .MuiInputBase-input": {
      paddingInlineStart: "0px !important",
    },
  },
  "& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart:not(.MuiAutocomplete-inputRoot)":
    {
      paddingInlineStart: "14px",
    },
  "& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd:not(.MuiAutocomplete-inputRoot)":
    {
      paddingInlineEnd: "14px",
    },
  "& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd.Mui-focused:not(.MuiAutocomplete-inputRoot)":
    {
      paddingInlineEnd: "13px",
      "& .MuiInputBase-input": {
        paddingInlineEnd: "0px !important",
      },
    },
  "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart.Mui-focused": {
    paddingInlineStart: "15px",
    "& .MuiInputBase-input": {
      paddingInlineStart: "0px !important",
    },
  },
  "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart": {
    paddingInlineStart: "16px",
  },
  "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd.Mui-focused": {
    paddingInlineEnd: "15px",
    "& .MuiInputBase-input": {
      paddingInlineEnd: "0px !important",
    },
  },
  "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd": {
    paddingInlineEnd: "16px",
  },
  "& .MuiInputAdornment-sizeMedium": {
    "i, svg": {
      fontSize: "1.25rem",
    },
  },

  "& .MuiInputBase-input": {
    "&:not(textarea).MuiInputBase-inputSizeSmall": {
      padding: "4px 14px", // Reduced from 7.25px to 4px
    },
    "&:not(.MuiInputBase-readOnly):not([readonly])::placeholder": {
      transition: theme.transitions.create(["opacity", "transform"], {
        duration: theme.transitions.duration.shorter,
      }),
    },
  },
  "& :not(.MuiInputBase-sizeSmall).MuiInputBase-root": {
    borderRadius: "8px",
    fontSize: "17px",
    lineHeight: "1.41",
    "& .MuiInputBase-input": {
      padding: "7px 16px", // Reduced from 10.8px to 7px
    },
    "&.Mui-focused": {
      "& .MuiInputBase-input": {
        padding: "6px 15px", // Reduced from 9.8px to 6px
      },
    },
  },
  "& .MuiFormHelperText-root": {
    lineHeight: 1.154,
    margin: theme.spacing(1, 0, 0),
    fontSize: theme.typography.body2.fontSize,
    "&.Mui-error": {
      color: "var(--mui-palette-error-main)",
    },
    "&.Mui-disabled": {
      color: "var(--mui-palette-text-disabled)",
    },
  },

  // For Select
  "& .MuiSelect-select.MuiInputBase-inputSizeSmall, & .MuiNativeSelect-select.MuiInputBase-inputSizeSmall":
    {
      "& ~ i, & ~ svg": {
        inlineSize: "1.125rem",
        blockSize: "1.125rem",
      },
    },
  "& .MuiSelect-select": {
    // lineHeight: 1.5,
    minHeight: "unset !important",
    lineHeight: "1.4375em",
    "&.MuiInputBase-input": {
      paddingInlineEnd: "32px !important",
    },
  },
  "& .Mui-focused .MuiSelect-select": {
    "& ~ i, & ~ svg": {
      right: "0.9375rem",
    },
  },

  "& .MuiSelect-select:focus, & .MuiNativeSelect-select:focus": {
    backgroundColor: "transparent",
  },

  // For Autocomplete
  "& :not(.MuiInputBase-sizeSmall).MuiAutocomplete-inputRoot": {
    paddingBlock: "3px", // Reduced from 5.55px to 3px
    "& .MuiAutocomplete-input": {
      paddingInline: "8px !important",
      paddingBlock: "3px !important", // Reduced from 5.25px to 3px
    },
    "&.Mui-focused .MuiAutocomplete-input": {
      paddingInlineStart: "7px !important",
    },
    "&.Mui-focused": {
      paddingBlock: "2px !important", // Reduced from 4.55px to 2px
    },
    "& .MuiAutocomplete-endAdornment": {
      top: "calc(50% - 12px)",
    },
  },
  "& .MuiAutocomplete-inputRoot.MuiInputBase-sizeSmall": {
    paddingBlock: "2px !important", // Reduced from 4.75px to 2px
    paddingInlineStart: "10px",
    "&.Mui-focused": {
      paddingBlock: "1.75px !important", // Reduced from 3.75px to 1.75px
      paddingInlineStart: "9px",
      ".MuiAutocomplete-input": {
        paddingBlock: "1.5px", // Reduced from 2.5px to 1.5px
        paddingInline: "3px !important",
      },
    },
    "& .MuiAutocomplete-input": {
      paddingInline: "3px !important",
    },
  },
  "& .MuiAutocomplete-inputRoot": {
    display: "flex",
    gap: "0.25rem",
    "& .MuiAutocomplete-tag": {
      margin: 0,
    },
  },
  "& .MuiAutocomplete-inputRoot.Mui-focused .MuiAutocomplete-endAdornment": {
    right: ".9375rem",
  },

  // For Textarea
  "& .MuiInputBase-multiline": {
    "&.MuiInputBase-sizeSmall": {
      padding: "4px 14px", // Reduced from 6px to 4px
      "&.Mui-focused": {
        padding: "3px 13px", // Reduced from 5px to 3px
      },
    },
    "& textarea.MuiInputBase-inputSizeSmall:placeholder-shown": {
      overflowX: "hidden",
    },
  },
}));

// Use Pick to select only specific props from TimePickerFieldProps
// and create a new interface that doesn't extend TimePickerFieldProps directly
interface CustomTimePickerProps {
  helperText?: string | React.ReactNode;
  error?: boolean;
  label?: string | React.ReactNode;
  id?: string; 
  placeholder?: string;
  fullWidth?: boolean;
  onChange?: (value: string | null) => void;
  name?: string;
  ref?: RefCallBack;
  value?: string | null;
  onBlur?: Noop;
  // Make all TimePicker props optional
  minTime?: moment.Moment;
  maxTime?: moment.Moment;
  minutesStep?: number;
  ampm?: boolean;
  // Add any other TimePickerFieldProps you need as optional
  disabled?: boolean;
  readOnly?: boolean;
  // Add common time picker props
  format?: string;
  shouldDisableTime?: (value: moment.Moment, view: string) => boolean;
  // And include a catch-all for other props
  [key: string]: any;
}

// Create a forwarded ref TextField component for the slot
const CustomTextField = forwardRef<HTMLDivElement, TextFieldProps>((params, ref) => {
  const { inputProps, id, label, helperText, error, placeholder, ...rest } = params;
  
  return (
    <TextFieldStyled
      {...rest}
      id={id}
      ref={ref}
      inputProps={{
        ...inputProps,
        "aria-labelledby": label ? `label-for-${id}` : undefined,
        placeholder: placeholder || inputProps?.placeholder,
      }}
      fullWidth
      helperText={helperText}
      error={error}
      label={label}
    />
  );
});

CustomTextField.displayName = 'CustomTextField';

const CustomTimePicker = forwardRef<HTMLInputElement, CustomTimePickerProps>((props, ref) => {
  const {
    helperText,
    error,
    label,
    id: propId,
    placeholder,
    fullWidth = false,
    onChange,
    value,
    ampm = true, // Default to 12-hour format
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = propId || `custom-timepicker-${generatedId}`;

  // Always store in 24-hour format internally for consistency
  // but display in 12-hour format with AM/PM when ampm=true
  const inputFormat = "HH:mm";

  // Parse the value properly - handle both string formats
  const parseValue = (val: string | null) => {
    if (!val) return null;
    
    // Try to parse the value in 24-hour format first
    let parsed = moment(val, inputFormat, true);
    
    // If that fails, try 12-hour format
    if (!parsed.isValid()) {
      parsed = moment(val, ["h:mm A", "hh:mm A", "H:mm", "HH:mm"], true);
    }
    
    // If still not valid, try without strict parsing
    if (!parsed.isValid()) {
      parsed = moment(val, inputFormat);
    }
    
    return parsed.isValid() ? parsed : null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        value={parseValue(value || null)}
        onChange={(time) => {
          // Always store in 24-hour format
          const formattedTime = time && time.isValid() ? time.format(inputFormat) : null;
          onChange?.(formattedTime);
        }}
        enableAccessibleFieldDOMStructure={false}
        ampm={ampm}
        {...rest}
        slots={{
          textField: CustomTextField,
        }}
        slotProps={{
          textField: {
            id: inputId,
            label,
            error,
            helperText,
            placeholder,
            inputRef: ref,
          }
        }}
      />
    </LocalizationProvider>
  );
});

CustomTimePicker.displayName = "CustomTimePicker";
export default CustomTimePicker;