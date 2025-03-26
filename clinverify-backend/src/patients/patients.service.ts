import { Injectable } from '@nestjs/common';
import { Patient } from 'src/graphql.schema';

@Injectable()
export class PatientsService {
  async findById(id: number): Promise<Patient> {
    return new Promise((resolve) => {
      setInterval(() => {
        resolve({
          id: id,
          name: 'James May',
          age: 31,
        });
      });
    });
  }
}
