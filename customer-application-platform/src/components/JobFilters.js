import React, { useEffect } from "react";
import "../index.css";
import { CustomizedSelects } from "./multiSelectDropdown";
import { connect, useDispatch } from "react-redux";
import { updateFilters, updateJdList } from "../application-redux/src/actions/jdListActions";

export const JobFilters = ({
  candidateInfo,
  selectedFilters,
  setSelectedFilters,
  calculateSalaryRange,
}) => {
    const dispatch=useDispatch()
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
    const filteredList = candidateInfo?.jdList?.filter((job) => {
      const salaryRange = calculateSalaryRange(
        job.minJdSalary,
        job.maxJdSalary
      );
      const [minSalary, maxSalary] = salaryRange
        .split("-")
        ?.map((s) => parseInt(s));
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

    dispatch(updateJdList(filteredList));
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

  const handleTechStackChange = (event) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      techstack: event.target.value,
    }));
  };
  const handleRoleChange = (event) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      roles: event.target.value,
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
  const uniqueRoles = Array.from(
    new Set(candidateInfo?.jdList?.map((job) => job.jobRole))
  );
  const techStackOptions = [
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
  ];

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  return (
    <div className="job-filters">
      <CustomizedSelects
        options={uniqueRoles}
        filter={"Roles"}
        handleChange={handleRoleChange}
        selectedFilters={selectedFilters.roles}
      />

      <div className="custom-dropdown">
        <select
          value={selectedFilters.employees}
          onChange={(event) => handleSelectChange(event, "employees")}
        >
          <option value="">Number Of Employees</option>
          {numberOfEmployeesRanges?.map((range, index) => (
            <option key={index} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="custom-dropdown">
        <select
          value={selectedFilters.experience}
          onChange={(event) => handleSelectChange(event, "experience")}
        >
          <option value="">Experience</option>
          {experienceRanges?.map((experience, index) => (
            <option key={index} value={experience}>
              {experience}
            </option>
          ))}
        </select>
      </div>

      <CustomizedSelects
        options={techStackOptions}
        filter={"Tech Stack"}
        handleChange={handleTechStackChange}
        selectedFilters={selectedFilters.techstack}
      />

      <div className="custom-dropdown">
        <select value={selectedFilters.minbasepay} onChange={handlePayChange}>
          <option value="">Minimum Base Pay Salary</option>
          {generatePayRangeOptions()?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div class="custom-form-control">
        <input
          type="text"
          class="custom-text-field"
          placeholder="Search Company Name"
          value={selectedFilters.company}
          onChange={(event) => handleInputChange(event, "company")}
        />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(updateFilters(filters)),
});

const mapStateToProps = (state) => ({
  selectedFilters: state.filters,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobFilters);
