import React, { useEffect, useState } from "react";
import "../index.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  Chip,
  Badge,
  Box,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";

// JobCard component

const JobCard = ({ job }) => {
  const calculateSalaryRange = (minJdSalary, maxJdSalary) => {
    const salary = (minJdSalary + maxJdSalary) / 2;
    const salaryRanges = [
      { range: "0L - 10L", min: 0, max: 10 },
      { range: "11L - 20L", min: 11, max: 20 },
      { range: "21L - 30L", min: 21, max: 30 },
      { range: "31L - 40L", min: 31, max: 40 },
      { range: "41L - 50L", min: 41, max: 50 },
      { range: "51L - 60L", min: 51, max: 60 },
      { range: "61L - 70L", min: 61, max: 70 },
    ];

    const matchedRange = salaryRanges.find(
      (range) => salary >= range.min && salary <= range.max
    );

    return matchedRange ? matchedRange.range : "Unknown";
  };

  const handlereferralButtonClick = () => {
    window.open("https://jobs.weekday.works/extension/candidate?", "_blank");
  };

  return (
    <Box
      className="job-card"
      display="flex"
      padding="20px"
      marginBottom="20px"
      borderRadius="8px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      flexDirection="column"
    >
      <div className="job-post-date-wrapper">
        <Box className="job-post-date">
          <Typography>⏳ Posted 15 days ago</Typography>
        </Box>
      </div>
      <Box className="individual-card">
        <Avatar src={job.logoUrl} alt="Company Logo" />

        <Box
          marginLeft="20px"
          display="flex"
          flexDirection="column"
          className="company-info-wrapper"
        >
          {" "}
          <a
            href={job?.jdLink}
            style={{
              fontWeight: "bold",
              textDecoration: "none", // Initially, no underline
              color: "grey", // Initially, grey color
            }}
            onFocus={(e) => {
              e.target.style.textDecoration = "underline";
            }} // Add underline on focus
            onBlur={(e) => {
              e.target.style.textDecoration = "none";
            }} // Remove underline when focus is lost
          >
            {job.companyName}
          </a>
          <Typography variant="h2">{job.jobRole}</Typography>
          <Typography variant="body1" className="cards-sub-text">
            {job.location}
          </Typography>
        </Box>
      </Box>
      <Typography style={{ color: "#37546D" }}>
        Estimated Salary:{" "}
        {calculateSalaryRange(job.minJdSalary, job.maxJdSalary)}
      </Typography>
      <p>About Company:</p>
      <Box>
        <Typography style={{ fontWeight: 600 }}>About us</Typography>
        <Typography variant="body1">{job.jobDetailsFromCompany}</Typography>
        <a
          variant="contained"
          color="primary"
          href={job?.jdLink}
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          View Job
        </a>
      </Box>

      <Typography style={{ color: "#37546D" }}>Minimum Experience:</Typography>
      <text> {job?.minExp}</text>
      <Box style={{ paddingTop: "8px" }}>
        <Box>
          <Button
            tabindex="0"
            type="button"
            className="easy-apply-button"
            style={{ backgroundColor: "#55EFC4", marginBottom: "8px" }}
          >
            ⚡ Easy Apply
          </Button>
        </Box>
        <Box>
          <Button
            className="referral-button"
            tabindex="0"
            type="button"
            id="custom-btn"
            onClick={handlereferralButtonClick}
          >
            <div style={{ display: "contents" }}>
              <Avatar>
                <img
                  src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group.png"
                  class="MuiAvatar-img css-1hy9t21"
                />
              </Avatar>
              <div class="MuiAvatar-root MuiAvatar-circular css-1r1mq0y">
                <img
                  src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group(1).png"
                  class="MuiAvatar-img css-1hy9t21"
                />
              </div>
              <p class="MuiTypography-root MuiTypography-body1 css-13uo6gx">
                Unlock referral asks
              </p>
            </div>
            <span class="MuiTouchRipple-root css-w0pj6f"></span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const numberOfEmployeesRanges = [
  { label: "1-10", value: "1-10" },
  { label: "10-20", value: "10-20" },
  { label: "21-50", value: "21-50" },
  { label: "51-100", value: "51-100" },
  { label: "101-200", value: "101-200" },
  { label: "500+", value: "500+" },
];

const experienceRanges = Array.from({ length: 10 }, (_, i) => i + 1);

const InfiniteScrollPage = ({ candidateInfo }) => {
  const [jdList, setJdList] = useState(candidateInfo?.jdList);
  const [isLoading, setIsLoading] = useState(false);
  const [techStack, setTechStack] = useState([]);
  const [minBasePay, setMinBasePay] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    employees: "",
    experience: [],
    location: [],
    salary: "",
    company: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        // Fetch more data when user reaches near the bottom of the page
        setIsLoading(true);
        // Simulate data fetching
        setTimeout(() => {
          setJdList((prevJdList) => {
            // Check if prevJdList is an array
            if (Array.isArray(prevJdList)) {
              return [...prevJdList, ...candidateInfo?.jdList];
            } else {
              return [...candidateInfo?.jdList]; // If prevJdList is not an array, return candidateInfo as the new list
            }
          });
          setIsLoading(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleSelectChange = (event) => {
    setSelectedFilters({
      ...selectedFilters,
      employees: event.target.value,
    });
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
    setTechStack(event.target.value);
  };
  const handlePayChange = (event) => {
    setMinBasePay(event.target.value);
  };

  const generatePayRangeOptions = () => {
    const options = [];
    for (let i = 0; i <= 70; i += 5) {
      options.push(`${i}L`);
    }
    return options;
  };
  return (
    <div className="infinite-scroll-page">
      <ul className="search-jobs-heading-wrapper" role="tablist">
        <li
          className="search-jobs-container"
          role="tab"
          id="tab:rm:0"
          aria-selected="true"
          aria-disabled="false"
          aria-controls="panel:rm:0"
          tabindex="0"
          data-rttab="true"
        >
          <div>
            <Badge class="search-jobs-header">
              Search jobs
              <Badge className="MuiBadge-badge MuiBadge-standard MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular MuiBadge-colorPrimary css-ssfgsn">
                {candidateInfo?.totalCount}
              </Badge>
            </Badge>
          </div>
        </li>
      </ul>
      <div className="job-filters">
        <FormControl variant="outlined" width="max-content">
          <InputLabel htmlFor="roles-dropdown">
            Roles
            <Divider orientation="vertical" flexItem />
          </InputLabel>
          <Select
            label="Roles"
            id="roles-dropdown"
            multiple
            value={selectedFilters.roles}
            onChange={(event) => handleSelectChange(event)}
            renderValue={(selected) => selected.join(", ")}
          >
            {candidateInfo?.jdList.map((job, index) => (
              <MenuItem key={index} value={job.jobRole}>
                {job.jobRole}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="employees-dropdown">
            Number of Employees
            <Divider orientation="vertical" flexItem />
          </InputLabel>
          <Select
            label="Number of Employees"
            id="employees-dropdown"
            value={selectedFilters.employees}
            onChange={(event) => handleSelectChange(event)}
          >
            {numberOfEmployeesRanges.map((range, index) => (
              <MenuItem key={index} value={range.value}>
                {range.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="experience-dropdown">
            Experience
            <Divider orientation="vertical" flexItem />
          </InputLabel>
          <Select
            label="Experience"
            id="experience-dropdown"
            value={selectedFilters.experience}
            onChange={(event) => handleSelectChange(event)}
          >
            {experienceRanges.map((experience, index) => (
              <MenuItem key={index} value={experience}>
                {experience}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <Select
            label="Mode of Work"
            id="Mode-of-Work"
            multiple
            value={selectedFilters.experience}
            onChange={(event) => handleSelectChange(event)}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleDeleteChip(value)}
                  />
                ))}
              </div>
            )}
          >
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
            <MenuItem value="in-office">In-Office</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="tech-stack-label">Tech Stack</InputLabel>
          <Select
            labelId="tech-stack-label"
            id="tech-stack-select"
            multiple
            value={techStack}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="Golang">Golang</MenuItem>
            <MenuItem value="Ruby/Rails">Ruby/Rails</MenuItem>
            <MenuItem value="C++">C++</MenuItem>
            <MenuItem value="Kotlin">Kotlin</MenuItem>
            <MenuItem value="Django">Django</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
            <MenuItem value="GraphQL">GraphQL</MenuItem>
            <MenuItem value="Flask">Flask</MenuItem>
            <MenuItem value="Typescript">Typescript</MenuItem>
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="Javascript">Javascript</MenuItem>
            <MenuItem value="Rust">Rust</MenuItem>
            <MenuItem value="NodeJS">NodeJS</MenuItem>
            <MenuItem value="React">React</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="min-base-pay-label">Min Base Pay</InputLabel>
          <Select
            labelId="min-base-pay-label"
            id="min-base-pay-select"
            value={minBasePay}
            onChange={handlePayChange}
          >
            {generatePayRangeOptions().map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <TextField
            variant="outlined"
            id="company-name-input"
            label="Search by Company Name"
            value={selectedFilters.company}
            onChange={handleInputChange}
          />
        </FormControl>
      </div>

      <div className="job-cards">
        {jdList?.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrollPage;
