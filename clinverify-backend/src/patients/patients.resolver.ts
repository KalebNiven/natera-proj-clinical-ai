import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Patient } from 'src/graphql.schema';
import { PatientsService } from './patients.service';

@Resolver()
export class PatientsResolver {
  constructor(private readonly patientService: PatientsService) {}

  @Query(() => Patient)
  async patient(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.findById(id);
  }
}
