import React, { useEffect, useState } from 'react';
import './index.css';


// JobCard component
const JobCard = ({ job }) => {
    return (
        <div className="job-card">
            <h2>{job.jobRole}</h2>
            <p>{job.jobDetailsFromCompany}</p>
            {/* More details need to be added */}
        </div>
    );
};



const InfiniteScrollPage = ({ candidateInfo }) => {
    const [jdList, setJdList] = useState(candidateInfo);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="infinite-scroll-page">
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