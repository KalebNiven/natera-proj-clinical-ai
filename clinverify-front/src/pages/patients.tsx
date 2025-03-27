import { PatientListTable } from '@/components/patients/patient-list-table';
import { PatientsLayout } from '@/layouts/patients';

//The idea Here is to use Table navigation -> Kaleb's UI for mocked data.
export const PatientsPage = () => {
  return (
    <PatientsLayout>
      <PatientListTable />
    </PatientsLayout>
  );
};
