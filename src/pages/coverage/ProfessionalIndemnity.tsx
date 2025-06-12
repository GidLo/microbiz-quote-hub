
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfessionalIndemnity = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the parameterized route so CoveragePage can detect the type properly
    navigate('/coverage/professional-indemnity', { replace: true });
  }, [navigate]);
  
  return null;
};

export default ProfessionalIndemnity;
