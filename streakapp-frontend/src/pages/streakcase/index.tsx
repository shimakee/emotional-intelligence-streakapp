import React from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';

const StreakCase: React.FC = () => {
    const { streakcase } = useParams<{streakcase?: string}>();
    const navigate = useNavigate();


    if(streakcase === undefined || isNaN(Number(streakcase))) {
        navigate('/home');
        return null;
    }

    return (
            <div className="streakcase">
                Streak case {+streakcase}
            </div>

        );
};

export default StreakCase;