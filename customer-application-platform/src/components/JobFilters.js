import React, { useEffect } from "react";
import "../index.css";
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Chip,
} from "@material-ui/core";

export const JobFilters = ({
  candidateInfo,
  selectedFilters,
  setSelectedFilters,
  calculateSalaryRange,
  setJdList,
}) => {
  const numberOfEmployeesRanges = [
    { label: "1-10", value: "1-10" },
    { label: "10-20", value: "10-20" },
    { label: "21-50", value: "21-50" },
    { label: "51-100", value: "51-100" },
    { label: "101-200", value: "101-200" },
    { label: "500+", value: "500+" },
  ];

  const experienceRanges = Array.from({ length: 10 }, (_, i) => i + 1);
  const applyFilters = () => {
    const filteredList = candidateInfo.jdList.filter((job) => {
      const salaryRange = calculateSalaryRange(
        job.minJdSalary,
        job.maxJdSalary
      );
      const [minSalary, maxSalary] = salaryRange
        .split("-")
        .map((s) => parseInt(s));
      if (
        selectedFilters.roles.length > 0 &&
        !selectedFilters.roles.includes(job.jobRole)
      ) {
        return false;
      }
      if (
        selectedFilters.employees &&
        selectedFilters.employees !== job.numberOfEmployees
      ) {
        return false;
      }
      if (
        selectedFilters.experience.length > 0 &&
        !selectedFilters.experience.includes(job.minExp)
      ) {
        return false;
      }
      if (
        selectedFilters.location.length > 0 &&
        !selectedFilters.location.includes(job.location)
      ) {
        return false;
      }
      if (
        selectedFilters.techstack.length > 0 &&
        !selectedFilters.techstack.includes(job.techstack)
      ) {
        return false;
      }
      if (
        selectedFilters.minbasepay &&
        (parseInt(selectedFilters.minbasepay) < minSalary ||
          parseInt(selectedFilters.minbasepay) > maxSalary)
      ) {
        return false;
      }
      if (
        selectedFilters.company &&
        !job.companyName
          .toLowerCase()
          .includes(selectedFilters.company.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    setJdList(filteredList);
  };
  const handleSelectChange = (event, filterName) => {
    const { value } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      company: value,
    }));
  };

  const handleDeleteChip = (value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      experience: prevFilters.experience.filter((exp) => exp !== value),
    }));
  };
  const handleChange = (event) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      techstack: event.target.value,
    }));
  };
  const handlePayChange = (event) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      minbasepay: event.target.value,
    }));
  };

  const generatePayRangeOptions = () => {
    const options = [];
    for (let i = 0; i <= 70; i += 5) {
      options.push(`${i}L`);
    }
    return options;
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  return (
    <div className="job-filters">
      <FormControl sx={{ m: 1, minWidth: 200 }} variant="outlined">
        <Select
          value={selectedFilters.roles}
          onChange={(event) => handleSelectChange(event, "roles")}
          displayEmpty
        >
          <MenuItem value="">
            <em>Roles</em>
          </MenuItem>
          {candidateInfo?.jdList.map((job, index) => (
            <MenuItem key={index} value={job.jobRole}>
              {job.jobRole}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
        <Select
          value={selectedFilters.employees}
          onChange={(event) => handleSelectChange(event, "employees")}
          displayEmpty
        >
          <MenuItem value="">
            <em>Number Of Employees</em>
          </MenuItem>
          {numberOfEmployeesRanges.map((range, index) => (
            <MenuItem key={index} value={range.value}>
              {range.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
        <Select
          value={selectedFilters.experience}
          onChange={(event) => handleSelectChange(event, "experience")}
          displayEmpty
        >
          <MenuItem value="">
            <em>Experience</em>
          </MenuItem>
          {experienceRanges.map((experience, index) => (
            <MenuItem key={index} value={experience}>
              {experience}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
        <Select
          multiple
          value={selectedFilters.location}
          onChange={(event) => handleSelectChange(event, "location")}
          displayEmpty
          renderValue={(selected) => {
            if (!Array.isArray(selected)) {
              return "";
            }
            return selected.length > 0 ? (
              <div>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleDeleteChip(value)}
                  />
                ))}
              </div>
            ) : (
              "Remote"
            );
          }}
        >
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
          <MenuItem value="In-Office">In-Office</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
        <Select
          multiple
          value={selectedFilters.techstack}
          onChange={handleChange}
          renderValue={(selected) => {
            return selected.length > 0 ? selected.join(", ") : "Tech Stack";
          }}
          displayEmpty
        >
          <MenuItem value="">
            <em>Tech Stack</em>
          </MenuItem>
          {[
            "Python",
            "Java",
            "Golang",
            "Ruby/Rails",
            "C++",
            "Kotlin",
            "Django",
            "C#",
            "GraphQL",
            "Flask",
            "Typescript",
            "AWS",
            "Javascript",
            "Rust",
            "NodeJS",
            "React",
          ].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
        <Select
          value={selectedFilters.minbasepay}
          onChange={handlePayChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Minimum Base Pay Salary</em>
          </MenuItem>
          {generatePayRangeOptions().map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
        <TextField
          variant="outlined"
          placeholder="Search Company Name"
          value={selectedFilters.company}
          onChange={(event) => handleInputChange(event, "company")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </div>
  );
};
