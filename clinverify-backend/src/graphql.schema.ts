/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract patients(): Nullable<Nullable<Patient>[]> | Promise<Nullable<Nullable<Patient>[]>>;

    abstract patient(id: string): Nullable<Patient> | Promise<Nullable<Patient>>;
}

export class Patient {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
}

type Nullable<T> = T | null;
