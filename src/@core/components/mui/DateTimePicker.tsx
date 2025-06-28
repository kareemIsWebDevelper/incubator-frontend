import { useId, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateTimePicker,
} from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { Noop, RefCallBack } from "react-hook-form";

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
    //   borderWidth: 2,
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
      padding: "4px 14px",
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
      padding: "7px 16px",
    },
    "&.Mui-focused": {
      "& .MuiInputBase-input": {
        padding: "6px 15px",
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
}));

interface CustomDateTimePickerProps {
  helperText?: any;
  error?: boolean;
  label?: any;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange?: (...event: any[]) => void;
  name?: string;
  ref?: RefCallBack;
  value?: any;
  onBlur?: Noop;
  // DateTimePicker specific props
  maxDateTime?: any;
  minDateTime?: any;
  disablePast?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  shouldDisableDate?: (date: moment.Moment) => boolean;
  shouldDisableTime?: (value: moment.Moment) => boolean;
  // Add any other props you need
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

const CustomDateTimePicker = forwardRef<HTMLInputElement, CustomDateTimePickerProps>((props, ref) => {
  const {
    helperText,
    error,
    label,
    id: propId,
    placeholder,
    fullWidth = false,
    onChange,
    value,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = propId || `custom-datetimepicker-${generatedId}`;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        value={value ? moment(value) : null}
        onChange={(date) => onChange?.(date ? date.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false}
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

CustomDateTimePicker.displayName = "CustomDateTimePicker";
export default CustomDateTimePicker;
