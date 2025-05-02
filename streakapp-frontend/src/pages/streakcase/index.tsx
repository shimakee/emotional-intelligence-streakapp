import React from 'react';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

enum StreakState {
    INCOMPLETE = 'INCOMPLETE',
    SAVED = 'SAVED',
    AT_RISK = 'AT_RISK',
    COMPLETED = 'COMPLETED',
  }

interface Day {
    date: string;
    activities: number;
    state: StreakState; // INCOMPLETE | SAVED | AT_RISK | COMPLETED
  }

interface Streak {
id: string;
activitiesToday: number;
total: number;
days: Day[];
}
  
  // Fetch function to get data from the API
  const fetchData = async (streakcase: string | undefined): Promise<Streak> => {
    if(streakcase === undefined || isNaN(Number(streakcase))) {
        throw new Error('Invalid streakcase argument. Must be a number.');
    }
    
    const response = await fetch(`http://localhost:8080/streaks/${streakcase}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

const StreakCase: React.FC = () => {
    const { streakcase } = useParams<{streakcase?: string}>();
    const navigate = useNavigate();
    const { data, error, isLoading, isError } = useQuery(
        { queryKey: ['streakcase', streakcase], queryFn: () =>fetchData(streakcase) },  // Query Key and Query Function wrapped in an object
      );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error instanceof Error) {
        return <p>Error: {error.message}</p>;
    }

    if(!data){
        return <p>No data found</p>;
    }

    if(streakcase === undefined || isNaN(Number(streakcase))) {
        navigate('/home');
        return null;
    }

    const renderStreakState = (state: StreakState) =>state === StreakState.INCOMPLETE ? <FaCheckCircle /> : <GoDotFill />;
    const sortedDays = (days: Day[]) => days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // const isToday = (day: Day) =>{ 
        
        
        
    //     new Date(day.date).getDate === new Date(Date.now()).getDate ? "today" : ""}

    // // const isToday = (day: Day) => {console.log("day", day.date)

    //     return <p></p>;
    // };
    return (
            <div className="streakcase-container">
                <h3>ahead</h3>
                <div className="streakcase-content">
                    <div className="streakcase">
                        <p>
                            {data ? <> Your streak is {data.total} days.</>
                            : <>Your streak has no data.</>}
                        </p>
                        {data && 
                            <div className="streakdays-container">
                                <div className="streakdays">
                                    {sortedDays(data.days).map((day: Day, index: number) => {
                                        
                                        const today = new Date(Date.now());
                                        const dayDate = new Date(day.date);

                                        const isToday = today.getDate() === dayDate.getDate() &&
                                        today.getMonth() === dayDate.getMonth() &&
                                        today.getFullYear() === dayDate.getFullYear();

                                        const wordDay = dayDate.toLocaleString('default', { weekday: 'short' });

                                        console.log("day", new Date(day.date).getDate());
                                        
                                        return (
                                        
                                        <span className={isToday ? "today" : ""}>{renderStreakState(day.state)} {wordDay}</span>
                                    )})}
                                </div>
                                <hr />
                            </div>}
                    </div>
                </div>
            </div>
        );
};

export default StreakCase;

