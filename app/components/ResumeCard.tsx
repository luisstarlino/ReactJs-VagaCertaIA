/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-25 20:40
*****************************************************************************************/
import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';
import React, { useEffect, useState } from 'react';
import { usePuterStore } from 'lib/puter';

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {

    // ===== CONSTANTS =====
    const { fs } = usePuterStore();
    const [resumeURL, setResumeURL] = useState('');

    // ===== USE EFFECTS =====
    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath.replaceAll(' ',''));
            if (!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeURL(url);
        };

        loadResume();
    }, [imagePath]);


    return (
        <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000'>
            <div className='resume-card-header'>
                <div className='flex flex-col gap-2'>
                    {companyName && <h2 className='!text-black font-bold break-words'>{companyName}</h2>}
                    {jobTitle && <h3 className='text-lg break-words text-gray-500'>{jobTitle}</h3>}

                    {!companyName && !jobTitle && <h2 className='!text-black font-bold'>Resume</h2>}
                </div>

                <div className='flex-shrink-0'>
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeURL && (
                <div className='gradient=border animate-in fade-in duration-1000'>
                    <div className="w-full h-full">
                        <img
                            src={resumeURL}
                            alt="resume"
                            className={"w-full h-[350px] max-sm:h-[200px] object-cover object-top"}
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}

export default ResumeCard