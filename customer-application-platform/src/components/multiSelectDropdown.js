import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  InputBase,
} from "@material-ui/core";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiSelect-select": {
    minWidth: 64,
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export const CustomizedSelects = ({
  options,
  filter,
  handleChange,
  selectedFilters,
}) => {
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="demo-customized-select-label">{filter}</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          multiple
          value={selectedFilters}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
