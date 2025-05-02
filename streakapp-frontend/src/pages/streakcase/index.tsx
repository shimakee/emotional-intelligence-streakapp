import React from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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
  const fetchData = async (streakcase: string | undefined): Promise<Streak[]> => {
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

    if(streakcase === undefined || isNaN(Number(streakcase))) {
        navigate('/home');
        return null;
    }

    return (
            <div className="streakcase">
                Streak case {+streakcase}

                <p>
                    {JSON.stringify(data)}
                </p>
            </div>

        );
};

export default StreakCase;