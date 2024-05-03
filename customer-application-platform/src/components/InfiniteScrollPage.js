import React, { useEffect, useState } from 'react';
import '../index.css';
import { FormControl, InputLabel, MenuItem, Select,TextField, Divider,Chip, Typography} from '@material-ui/core';

// JobCard component
const JobCard = ({ job }) => {
    const cardStyle = {
        padding: '20px', // Add padding to create space around the content
        marginBottom: '20px', // Add margin to create space between job cards
        display: 'flex', // Use flex display to arrange content horizontally
        alignItems: 'left', // Align content vertically in the left
        borderRadius: '8px', // Add border radius for rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for depth
        flexDirection:'column'
    };

    const logoStyle = {
        width: '40px', // Set width of the logo
        height: '40px', // Set height of the logo
        marginRight: '20px', // Add margin to create space between logo and text
    };


    const calculateSalaryRange = (minJdSalary, maxJdSalary) => {
        const salary = (minJdSalary + maxJdSalary) / 2; // Taking average for simplicity
    
        // Define the salary ranges
        const salaryRanges = [
            { range: '0L - 10L', min: 0, max: 10 },
            { range: '11L - 20L', min: 11, max: 20 },
            { range: '21L - 30L', min: 21, max: 30 },
            { range: '31L - 40L', min: 31, max: 40},
            { range: '41L - 50L', min: 41, max: 50 },
            { range: '51L - 60L', min: 51, max: 60 },
            { range: '61L - 70L', min: 61, max: 70 }
        ];
    
        // Find the appropriate range for the salary
        const matchedRange = salaryRanges.find(range => salary >= range.min && salary <= range.max);
    
        return matchedRange ? matchedRange.range : 'Unknown'; // Return the matched range or 'Unknown' if not found
    };
    
    
    return (
        <div className="job-card" style={cardStyle}>
            
            <div>
         
                <div style={{ marginBottom: '10px', display:'flex' }}>
                    <img src={job?.logoUrl} alt="Company Logo" style={logoStyle} />
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <span style={{ fontWeight: 'bold' }}>{job?.companyName}</span>
                    <h2>{job?.jobRole}</h2>
                <p>{job?.location}</p></div>
                </div>
                
            </div>
            <p>Estimated Salary: {calculateSalaryRange(job?.minJdSalary, job?.maxJdSalary)}</p>
            <p>{job?.jobDetailsFromCompany}</p>
           
        </div>
    );
};


const numberOfEmployeesRanges = [
    { label: '1-10', value: '1-10' },
    { label: '10-20', value: '10-20' },
    { label: '21-50', value: '21-50' },
    { label: '51-100', value: '51-100' },
    { label: '101-200', value: '101-200' },
    { label: '500+', value: '500+' }
];

const experienceRanges = Array.from({ length: 10 }, (_, i) => i + 1);

const InfiniteScrollPage = ({ candidateInfo }) => {
    const [jdList, setJdList] = useState(candidateInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [techStack, setTechStack] = useState([]);
    const [minBasePay, setMinBasePay] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        roles: [],
        employees: '',
        experience: [],
        location: [],
        salary: '',
        company: ''
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
                    setJdList(prevJdList => {
                        // Check if prevJdList is an array
                        if (Array.isArray(prevJdList)) {
                            return [...prevJdList, ...candidateInfo];
                        } else {
                            return [...candidateInfo]; // If prevJdList is not an array, return candidateInfo as the new list
                        }
                    });
                    setIsLoading(false);
                }, 1000);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const handleSelectChange = (event) => {
        setSelectedFilters({
            ...selectedFilters,
            employees: event.target.value
        });
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            company: value
        }));
    };


    const handleDeleteChip = (value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            experience: prevFilters.experience.filter(exp => exp !== value)
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
          <div style={{ display:'flex', justifyContent:'center', position: 'relative', alignItems:'center' }}>
            <Typography variant="h6" style={{  borderBottom: '2px solid blue', marginBottom: '8px' }}>
                Search Jobs
            </Typography>
            <Typography variant="body1" style={{ position: 'absolute', top: 0, right: 0, color: 'blue' }}>
                {candidateInfo?.totalCount} 
            </Typography>
            
        </div>
            <div className="job-filters">
            <FormControl variant="outlined" style={{ width: "10%" }}>
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
                    renderValue={(selected) => selected.join(', ')}
                >
                    {candidateInfo.map((job, index) => (
                        <MenuItem key={index} value={job.jobRole}>
                            {job.jobRole}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" style={{ width: "10%" }}>
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
                <FormControl variant="outlined" style={{ width: "10%" }}>
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
                renderValue={(selected) => selected.join(', ')}
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
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
            
            <FormControl >
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
