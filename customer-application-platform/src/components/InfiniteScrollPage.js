import React, { useEffect, useState } from "react";
import "../index.css";
import { Badge, Box, Avatar, Typography, Button } from "@material-ui/core";
import { JobFilters } from "./JobFilters";
import { connect, useDispatch } from "react-redux";
import {
  updateJdList,
} from "../application-redux/src/actions/jdListActions";

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
// JobCard component
const JobCard = ({ job }) => {
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

      <Box>
        <p>About Company:</p>
        <Typography style={{ fontWeight: 600 }}>About us</Typography>
        <Typography variant="body1" className="company-details-wrapper">
          {job.jobDetailsFromCompany}
        </Typography>
        <Box className="view-job-link">
          <a variant="contained" color="primary" href={job?.jdLink}>
            View Job
          </a>
        </Box>

        <Box style={{ paddingTop: "8px" }}>
          <Typography style={{ color: "#37546D" }}>
            Minimum Experience:
          </Typography>
          <text> {job?.minExp}</text>
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
    </Box>
  );
};

export const InfiniteScrollPage = ({ candidateInfo, jdList }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    employees: "",
    experience: [],
    location: [],
    techstack: [],
    minbasepay: "",
    company: "",
  });
  const [filteredJobCount, setFilteredJobCount] = useState(
    candidateInfo?.totalCount
  );

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
          dispatch(updateJdList([...jdList, ...jdList]));
          setIsLoading(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, isLoading, jdList]);

  const calculateFilteredJobCount = () => {
    const expArray = Array.isArray(selectedFilters.experience)
      ? selectedFilters.experience
      : [selectedFilters.experience];
    const filteredList = candidateInfo?.jdList?.filter((job) => {
      return (
        // Check if the job role matches the selected role(s)
        (selectedFilters.roles?.length === 0 ||
          selectedFilters.roles.includes(job.jobRole)) &&
        // Check if the number of employees matches the selected value
        (selectedFilters.employees === "" ||
          selectedFilters.employees === job.numberOfEmployees) &&
        // Check if the minimum experience matches any of the selected values
        (expArray?.length === 0 || expArray?.includes(job.minExp)) &&
        // Check if the location matches any of the selected values
        (selectedFilters.location?.length === 0 ||
          selectedFilters.location.includes(job.location)) &&
        // Check if the tech stack matches any of the selected values
        (selectedFilters.techstack?.length === 0 ||
          selectedFilters.techstack.includes(job.techstack)) &&
        // Check if the minimum base pay falls within the selected range
        (selectedFilters.minbasepay === "" ||
          calculateSalaryRange(job.minJdSalary, job.maxJdSalary) ===
            selectedFilters.minbasepay) &&
        // Check if the company name includes the specified text
        (selectedFilters.company === "" ||
          job.companyName
            .toLowerCase()
            .includes(selectedFilters.company.toLowerCase()))
      );
    });

    // Return the length of the filtered list
    setFilteredJobCount(filteredList?.length);
    return filteredList?.length;
  };

  useEffect(() => {
    const count = calculateFilteredJobCount();
    setFilteredJobCount(count);
  }, [selectedFilters]);
  useEffect(() => {
    // Set filtered job count to totalCount on initial render
    if (
      selectedFilters.roles?.length === 0 &&
      selectedFilters.employees === "" &&
      selectedFilters.experience?.length === 0 &&
      selectedFilters.location?.length === 0 &&
      selectedFilters.techstack?.length === 0 &&
      selectedFilters.minbasepay === "" &&
      selectedFilters.company === ""
    ) {
      setFilteredJobCount(candidateInfo?.totalCount);
    }
  }, [selectedFilters, candidateInfo]);

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
                {filteredJobCount}
              </Badge>
            </Badge>
          </div>
        </li>
      </ul>
      <JobFilters
        candidateInfo={candidateInfo}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        calculateSalaryRange={calculateSalaryRange}
      />

      <div className="job-cards">
        {jdList?.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  jdList: (jdList) => dispatch(updateJdList(jdList)),
});

const mapStateToProps = (state) => ({
  candidateInfo: {
    jdList: state.jdList,
    totalCount: state.jdList.length,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollPage);
