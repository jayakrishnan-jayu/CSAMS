import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useState } from 'react';


interface DeadlineProps {
    startTimestamp: Date,
    endTimestamp: Date
}

const Deadline = ({startTimestamp, endTimestamp}: DeadlineProps) => {
    const startTime = startTimestamp.getTime();
    const endTime = endTimestamp.getTime();
    const [value, setValue] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          const currentTime = new Date().getTime();
          setValue(currentTime);
          if (currentTime > endTime) return;

        }, 1000)
        return () => clearInterval(interval);
    });
    const currentTime = value;
    const totalTime = endTime - startTime;
    const elapsedTime = currentTime - startTime;
    const remainingTime = endTime - currentTime;
    const progressPercentage = Number(((elapsedTime / totalTime) * 100).toFixed(1));
    if (progressPercentage < 0) {
        const totalSeconds = (startTime - currentTime)/1000;
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return (
            <>
                <h5>{days} Days, {hours} Hour, {minutes} Minute, {seconds} Seconds left to begin</h5>
            </>
        )
    }
    if (currentTime > endTime) {
        return (
            <>
                <h5>0 Days, 0 Hours, 0 Minutes, 0 Seconds Left</h5>
                <h5>Completed</h5>
                <ProgressBar value={100} />
            </>
        )
    }
    const totalSeconds = remainingTime/1000;
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return (
        <>
            <h5>{days} Days,  {hours} Hour, {minutes} Minute, {seconds} Seconds Left</h5>
            <ProgressBar value={progressPercentage} />
        </>

    )
}

export default Deadline
