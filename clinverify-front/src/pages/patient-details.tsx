import { PatientsDetailLayout } from '@/layouts/patients-detail';
import { useParams } from 'react-router-dom';

export const PatientDetailsPage = () => {
  const { caseBundlingId } = useParams();

  return (
    <PatientsDetailLayout>
      <div>Patient Details for ID: {caseBundlingId}</div>
    </PatientsDetailLayout>
  );
};
