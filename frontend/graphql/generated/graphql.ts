import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONString: any;
};

export type AllocationFilterInput = {
  isEvenSem?: InputMaybe<Scalars['Boolean']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type BatchInfoType = {
  __typename?: 'BatchInfoType';
  info?: Maybe<Array<Maybe<BatchYearSemType>>>;
  program?: Maybe<Scalars['String']>;
};

export type BatchType = {
  __typename?: 'BatchType';
  curriculum?: Maybe<CurriculumType>;
  extraCourseLeftToAssign?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  selectedExtraCourses?: Maybe<Array<Maybe<ExtraCourseType>>>;
  sem?: Maybe<Scalars['Int']>;
  semesterExtraCourses?: Maybe<Array<Maybe<Scalars['String']>>>;
  year?: Maybe<Scalars['Int']>;
};

export type BatchYearSemType = {
  __typename?: 'BatchYearSemType';
  semesters?: Maybe<Array<Maybe<Scalars['Int']>>>;
  year?: Maybe<Scalars['Int']>;
};

export type CourseAndFacultyType = {
  __typename?: 'CourseAndFacultyType';
  course?: Maybe<CourseType>;
  faculty?: Maybe<FacultyType>;
};

export type CourseInput = {
  C: Scalars['Int'];
  L: Scalars['Int'];
  P: Scalars['Int'];
  T: Scalars['Int'];
  code: Scalars['String'];
  name: Scalars['String'];
};

export type CourseLabInput = {
  courseCode: Scalars['String'];
  labCode: Scalars['String'];
};

export type CourseLabType = {
  __typename?: 'CourseLabType';
  course?: Maybe<CourseType>;
  lab?: Maybe<CourseType>;
};

export type CourseType = {
  __typename?: 'CourseType';
  batch?: Maybe<BatchType>;
  code?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isExtra?: Maybe<Scalars['Boolean']>;
  l?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  p?: Maybe<Scalars['Int']>;
  t?: Maybe<Scalars['Int']>;
};

export type CurriculumType = {
  __typename?: 'CurriculumType';
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  program?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type CurriculumUploadInput = {
  extra: Array<InputMaybe<ExtraInput>>;
  program: Scalars['String'];
  semesters: Array<InputMaybe<SemesterInput>>;
  year: Scalars['Int'];
};

export type CurriculumUploadType = {
  __typename?: 'CurriculumUploadType';
  data?: Maybe<Scalars['JSONString']>;
  id?: Maybe<Scalars['ID']>;
  isPopulated?: Maybe<Scalars['Boolean']>;
  program?: Maybe<Scalars['String']>;
  uploadedOn?: Maybe<Scalars['DateTime']>;
  year?: Maybe<Scalars['Int']>;
};

export type DeleteCurriculumUpload = {
  __typename?: 'DeleteCurriculumUpload';
  response?: Maybe<Scalars['Boolean']>;
};

export type ExtraCourseType = {
  __typename?: 'ExtraCourseType';
  code?: Maybe<Scalars['String']>;
  courseType?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  l?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  p?: Maybe<Scalars['Int']>;
  t?: Maybe<Scalars['Int']>;
};

export type ExtraInput = {
  courses: Array<InputMaybe<CourseInput>>;
  isElective: Scalars['Boolean'];
  name: Scalars['String'];
};

export type FacultyType = {
  __typename?: 'FacultyType';
  designation?: Maybe<Scalars['String']>;
  track?: Maybe<Scalars['String']>;
  user?: Maybe<UserType>;
};

export type IdentfierInput = {
  /** Odd/Even Sem */
  isEvenSem: Scalars['Boolean'];
  /** Year at which the preference was recorded */
  year: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteCurriculumUpload?: Maybe<DeleteCurriculumUpload>;
  updateUser?: Maybe<UpdateUser>;
  updateWorkload?: Maybe<UpdateWorkload>;
  uploadCurriculum?: Maybe<UploadCurriculum>;
  verifyCurriculumUpload?: Maybe<VerifyCurriculumUpload>;
};


export type MutationDeleteCurriculumUploadArgs = {
  curriculumUploadID: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateWorkloadArgs = {
  designation: Scalars['String'];
  maxHoursPerWeek: Scalars['Int'];
  minHoursPerWeek: Scalars['Int'];
  track: Scalars['String'];
};


export type MutationUploadCurriculumArgs = {
  data: CurriculumUploadInput;
};


export type MutationVerifyCurriculumUploadArgs = {
  curriculumUploadID: Scalars['ID'];
};

export type PreferenceType = {
  __typename?: 'PreferenceType';
  course?: Maybe<CourseType>;
  experience?: Maybe<Scalars['Int']>;
  faculty?: Maybe<FacultyType>;
  id?: Maybe<Scalars['ID']>;
  identifierIsEvenSem?: Maybe<Scalars['Boolean']>;
  identifierYear?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['DateTime']>;
  weigtage?: Maybe<Scalars['Int']>;
};

export type ProgramType = {
  __typename?: 'ProgramType';
  duration?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allocation?: Maybe<Array<Maybe<CourseAndFacultyType>>>;
  batchInfo?: Maybe<BatchInfoType>;
  batches?: Maybe<Array<Maybe<BatchType>>>;
  course?: Maybe<CourseType>;
  courseLabs?: Maybe<Array<Maybe<CourseLabType>>>;
  courses?: Maybe<SemesterCourseType>;
  curriculumUploads?: Maybe<Array<Maybe<CurriculumUploadType>>>;
  curriculums?: Maybe<Array<Maybe<CurriculumType>>>;
  faculties?: Maybe<Array<Maybe<FacultyType>>>;
  faculty?: Maybe<FacultyType>;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
  preferences?: Maybe<Array<Maybe<PreferenceType>>>;
  programs?: Maybe<Array<Maybe<ProgramType>>>;
  users?: Maybe<Array<Maybe<UserType>>>;
  verifyNewCurriculum?: Maybe<Array<Maybe<BatchType>>>;
  workloads?: Maybe<Array<Maybe<WorkloadType>>>;
};


export type QueryAllocationArgs = {
  facultyId?: InputMaybe<Scalars['ID']>;
  filter: AllocationFilterInput;
};


export type QueryBatchInfoArgs = {
  program?: InputMaybe<Scalars['String']>;
};


export type QueryBatchesArgs = {
  curriculumId?: InputMaybe<Scalars['ID']>;
  program?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryCourseArgs = {
  code: Scalars['String'];
};


export type QueryCourseLabsArgs = {
  program: Scalars['String'];
  sem?: InputMaybe<Scalars['Int']>;
  year: Scalars['Int'];
};


export type QueryCoursesArgs = {
  program: Scalars['String'];
  sem: Scalars['Int'];
  year: Scalars['Int'];
};


export type QueryCurriculumsArgs = {
  program?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryPreferencesArgs = {
  courseId?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<IdentfierInput>;
};


export type QueryVerifyNewCurriculumArgs = {
  program: Scalars['String'];
  year: Scalars['Int'];
};

export type SemesterCourseType = {
  __typename?: 'SemesterCourseType';
  courses?: Maybe<Array<Maybe<CourseType>>>;
};

export type SemesterInput = {
  courseLabs: Array<InputMaybe<CourseLabInput>>;
  courses: Array<InputMaybe<CourseInput>>;
  extra: Array<InputMaybe<Scalars['String']>>;
  /** number of semseter eg 1, 2, 3 */
  sem: Scalars['Int'];
};

export type UpdateUser = {
  __typename?: 'UpdateUser';
  user?: Maybe<UserType>;
};

export type UpdateWorkload = {
  __typename?: 'UpdateWorkload';
  workload?: Maybe<WorkloadType>;
};

export type UploadCurriculum = {
  __typename?: 'UploadCurriculum';
  response?: Maybe<CurriculumUploadType>;
};

export type UserType = {
  __typename?: 'UserType';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isStaff?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type VerifyCurriculumUpload = {
  __typename?: 'VerifyCurriculumUpload';
  response?: Maybe<Scalars['Boolean']>;
};

export type WorkloadType = {
  __typename?: 'WorkloadType';
  designation?: Maybe<Scalars['String']>;
  maxHoursPerWeek?: Maybe<Scalars['Int']>;
  minHoursPerWeek?: Maybe<Scalars['Int']>;
  track?: Maybe<Scalars['String']>;
};

export type UploadCurriculumMutationVariables = Exact<{
  CURRICULUM: CurriculumUploadInput;
}>;


export type UploadCurriculumMutation = { __typename?: 'Mutation', uploadCurriculum?: { __typename?: 'UploadCurriculum', response?: { __typename?: 'CurriculumUploadType', id?: string | null, program?: string | null, year?: number | null, data?: any | null, uploadedOn?: any | null, isPopulated?: boolean | null } | null } | null };

export type DeleteCurriculumUploadMutationVariables = Exact<{
  CURRICULUMUPLOADID: Scalars['ID'];
}>;


export type DeleteCurriculumUploadMutation = { __typename?: 'Mutation', deleteCurriculumUpload?: { __typename?: 'DeleteCurriculumUpload', response?: boolean | null } | null };

export type VerifyCurriculumUploadMutationVariables = Exact<{
  CURRICULUMUPLOADID: Scalars['ID'];
}>;


export type VerifyCurriculumUploadMutation = { __typename?: 'Mutation', verifyCurriculumUpload?: { __typename?: 'VerifyCurriculumUpload', response?: boolean | null } | null };

export type UpdateUserMutationVariables = Exact<{
  FIRSTNAME: Scalars['String'];
  LASTNAME: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'UpdateUser', user?: { __typename?: 'UserType', firstName?: string | null, lastName?: string | null } | null } | null };

export type UpdateWorkloadMutationVariables = Exact<{
  TRACK: Scalars['String'];
  DESIGNATION: Scalars['String'];
  MINHOURS: Scalars['Int'];
  MAXHOURS: Scalars['Int'];
}>;


export type UpdateWorkloadMutation = { __typename?: 'Mutation', updateWorkload?: { __typename?: 'UpdateWorkload', workload?: { __typename?: 'WorkloadType', track?: string | null, designation?: string | null, minHoursPerWeek?: number | null, maxHoursPerWeek?: number | null } | null } | null };

export type ProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProgramsQuery = { __typename?: 'Query', programs?: Array<{ __typename?: 'ProgramType', id?: string | null, name?: string | null, duration?: string | null } | null> | null };

export type VerifyNewCurriculumQueryVariables = Exact<{
  PROGRAM: Scalars['String'];
  YEAR: Scalars['Int'];
}>;


export type VerifyNewCurriculumQuery = { __typename?: 'Query', verifyNewCurriculum?: Array<{ __typename?: 'BatchType', year?: number | null, sem?: number | null } | null> | null };

export type CurriculumsQueryVariables = Exact<{
  PROGRAM?: InputMaybe<Scalars['String']>;
  YEAR?: InputMaybe<Scalars['Int']>;
}>;


export type CurriculumsQuery = { __typename?: 'Query', curriculums?: Array<{ __typename?: 'CurriculumType', program?: string | null, year?: number | null, duration?: number | null } | null> | null };

export type CurriculumUploadsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurriculumUploadsQuery = { __typename?: 'Query', curriculumUploads?: Array<{ __typename?: 'CurriculumUploadType', id?: string | null, program?: string | null, year?: number | null, data?: any | null, uploadedOn?: any | null, isPopulated?: boolean | null } | null> | null };

export type PreferencesQueryVariables = Exact<{
  IDENTIFIER?: InputMaybe<IdentfierInput>;
  COURSEID?: InputMaybe<Scalars['ID']>;
}>;


export type PreferencesQuery = { __typename?: 'Query', preferences?: Array<{ __typename?: 'PreferenceType', id?: string | null, identifierYear?: number | null, identifierIsEvenSem?: boolean | null, weigtage?: number | null, experience?: number | null, timestamp?: any | null, faculty?: { __typename?: 'FacultyType', user?: { __typename?: 'UserType', firstName?: string | null, lastName?: string | null, username?: string | null } | null } | null, course?: { __typename?: 'CourseType', id?: string | null, code?: string | null, name?: string | null, credit?: number | null, l?: number | null, t?: number | null, p?: number | null, batch?: { __typename?: 'BatchType', year?: number | null, sem?: number | null, curriculum?: { __typename?: 'CurriculumType', program?: string | null, year?: number | null } | null } | null } | null } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserType', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, isStaff?: boolean | null } | null };

export type FacultyQueryVariables = Exact<{ [key: string]: never; }>;


export type FacultyQuery = { __typename?: 'Query', faculty?: { __typename?: 'FacultyType', track?: string | null, designation?: string | null, user?: { __typename?: 'UserType', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, isStaff?: boolean | null } | null } | null };

export type FacultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FacultiesQuery = { __typename?: 'Query', faculties?: Array<{ __typename?: 'FacultyType', track?: string | null, designation?: string | null, user?: { __typename?: 'UserType', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, isStaff?: boolean | null, isActive?: boolean | null } | null } | null> | null };

export type WorkloadsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkloadsQuery = { __typename?: 'Query', workloads?: Array<{ __typename?: 'WorkloadType', track?: string | null, designation?: string | null, minHoursPerWeek?: number | null, maxHoursPerWeek?: number | null } | null> | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "BatchInfoType",
        "fields": [
          {
            "name": "info",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "BatchYearSemType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "program",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BatchType",
        "fields": [
          {
            "name": "curriculum",
            "type": {
              "kind": "OBJECT",
              "name": "CurriculumType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "extraCourseLeftToAssign",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "selectedExtraCourses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ExtraCourseType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "sem",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "semesterExtraCourses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "year",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BatchYearSemType",
        "fields": [
          {
            "name": "semesters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "year",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CourseAndFacultyType",
        "fields": [
          {
            "name": "course",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "faculty",
            "type": {
              "kind": "OBJECT",
              "name": "FacultyType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CourseLabType",
        "fields": [
          {
            "name": "course",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lab",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CourseType",
        "fields": [
          {
            "name": "batch",
            "type": {
              "kind": "OBJECT",
              "name": "BatchType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "credit",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "hours",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isExtra",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "l",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "p",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "t",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CurriculumType",
        "fields": [
          {
            "name": "duration",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "program",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "year",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CurriculumUploadType",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isPopulated",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "program",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "uploadedOn",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "year",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DeleteCurriculumUpload",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ExtraCourseType",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "courseType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "credit",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "hours",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "l",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "p",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "t",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FacultyType",
        "fields": [
          {
            "name": "designation",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "track",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "UserType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "deleteCurriculumUpload",
            "type": {
              "kind": "OBJECT",
              "name": "DeleteCurriculumUpload",
              "ofType": null
            },
            "args": [
              {
                "name": "curriculumUploadID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateUser",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateUser",
              "ofType": null
            },
            "args": [
              {
                "name": "firstName",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "lastName",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateWorkload",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateWorkload",
              "ofType": null
            },
            "args": [
              {
                "name": "designation",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "maxHoursPerWeek",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "minHoursPerWeek",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "track",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "uploadCurriculum",
            "type": {
              "kind": "OBJECT",
              "name": "UploadCurriculum",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "verifyCurriculumUpload",
            "type": {
              "kind": "OBJECT",
              "name": "VerifyCurriculumUpload",
              "ofType": null
            },
            "args": [
              {
                "name": "curriculumUploadID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PreferenceType",
        "fields": [
          {
            "name": "course",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "experience",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "faculty",
            "type": {
              "kind": "OBJECT",
              "name": "FacultyType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "identifierIsEvenSem",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "identifierYear",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "weigtage",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProgramType",
        "fields": [
          {
            "name": "duration",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "allocation",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseAndFacultyType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "facultyId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "batchInfo",
            "type": {
              "kind": "OBJECT",
              "name": "BatchInfoType",
              "ofType": null
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "batches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "BatchType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "curriculumId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "program",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "course",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "courseLabs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseLabType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "sem",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "courses",
            "type": {
              "kind": "OBJECT",
              "name": "SemesterCourseType",
              "ofType": null
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "sem",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "curriculumUploads",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CurriculumUploadType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "curriculums",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CurriculumType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "faculties",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "FacultyType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "faculty",
            "type": {
              "kind": "OBJECT",
              "name": "FacultyType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hello",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "UserType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "preferences",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "PreferenceType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "courseId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "identifier",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "programs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProgramType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "users",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "verifyNewCurriculum",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "BatchType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "workloads",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "WorkloadType",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SemesterCourseType",
        "fields": [
          {
            "name": "courses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseType",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateUser",
        "fields": [
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "UserType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateWorkload",
        "fields": [
          {
            "name": "workload",
            "type": {
              "kind": "OBJECT",
              "name": "WorkloadType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadCurriculum",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "CurriculumUploadType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserType",
        "fields": [
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "firstName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isActive",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isStaff",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "lastName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "VerifyCurriculumUpload",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "WorkloadType",
        "fields": [
          {
            "name": "designation",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "maxHoursPerWeek",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "minHoursPerWeek",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "track",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const UploadCurriculumDocument = gql`
    mutation uploadCurriculum($CURRICULUM: CurriculumUploadInput!) {
  uploadCurriculum(data: $CURRICULUM) {
    response {
      id
      program
      year
      data
      uploadedOn
      isPopulated
    }
  }
}
    `;

export function useUploadCurriculumMutation() {
  return Urql.useMutation<UploadCurriculumMutation, UploadCurriculumMutationVariables>(UploadCurriculumDocument);
};
export const DeleteCurriculumUploadDocument = gql`
    mutation deleteCurriculumUpload($CURRICULUMUPLOADID: ID!) {
  deleteCurriculumUpload(curriculumUploadID: $CURRICULUMUPLOADID) {
    response
  }
}
    `;

export function useDeleteCurriculumUploadMutation() {
  return Urql.useMutation<DeleteCurriculumUploadMutation, DeleteCurriculumUploadMutationVariables>(DeleteCurriculumUploadDocument);
};
export const VerifyCurriculumUploadDocument = gql`
    mutation verifyCurriculumUpload($CURRICULUMUPLOADID: ID!) {
  verifyCurriculumUpload(curriculumUploadID: $CURRICULUMUPLOADID) {
    response
  }
}
    `;

export function useVerifyCurriculumUploadMutation() {
  return Urql.useMutation<VerifyCurriculumUploadMutation, VerifyCurriculumUploadMutationVariables>(VerifyCurriculumUploadDocument);
};
export const UpdateUserDocument = gql`
    mutation updateUser($FIRSTNAME: String!, $LASTNAME: String!) {
  updateUser(firstName: $FIRSTNAME, lastName: $LASTNAME) {
    user {
      firstName
      lastName
    }
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const UpdateWorkloadDocument = gql`
    mutation updateWorkload($TRACK: String!, $DESIGNATION: String!, $MINHOURS: Int!, $MAXHOURS: Int!) {
  updateWorkload(
    track: $TRACK
    designation: $DESIGNATION
    minHoursPerWeek: $MINHOURS
    maxHoursPerWeek: $MAXHOURS
  ) {
    workload {
      track
      designation
      minHoursPerWeek
      maxHoursPerWeek
    }
  }
}
    `;

export function useUpdateWorkloadMutation() {
  return Urql.useMutation<UpdateWorkloadMutation, UpdateWorkloadMutationVariables>(UpdateWorkloadDocument);
};
export const ProgramsDocument = gql`
    query programs {
  programs {
    id
    name
    duration
  }
}
    `;

export function useProgramsQuery(options?: Omit<Urql.UseQueryArgs<ProgramsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProgramsQuery, ProgramsQueryVariables>({ query: ProgramsDocument, ...options });
};
export const VerifyNewCurriculumDocument = gql`
    query verifyNewCurriculum($PROGRAM: String!, $YEAR: Int!) {
  verifyNewCurriculum(program: $PROGRAM, year: $YEAR) {
    year
    sem
  }
}
    `;

export function useVerifyNewCurriculumQuery(options: Omit<Urql.UseQueryArgs<VerifyNewCurriculumQueryVariables>, 'query'>) {
  return Urql.useQuery<VerifyNewCurriculumQuery, VerifyNewCurriculumQueryVariables>({ query: VerifyNewCurriculumDocument, ...options });
};
export const CurriculumsDocument = gql`
    query curriculums($PROGRAM: String, $YEAR: Int) {
  curriculums(program: "BCA", year: 2018) {
    program
    year
    duration
  }
}
    `;

export function useCurriculumsQuery(options?: Omit<Urql.UseQueryArgs<CurriculumsQueryVariables>, 'query'>) {
  return Urql.useQuery<CurriculumsQuery, CurriculumsQueryVariables>({ query: CurriculumsDocument, ...options });
};
export const CurriculumUploadsDocument = gql`
    query curriculumUploads {
  curriculumUploads {
    id
    program
    year
    data
    uploadedOn
    isPopulated
  }
}
    `;

export function useCurriculumUploadsQuery(options?: Omit<Urql.UseQueryArgs<CurriculumUploadsQueryVariables>, 'query'>) {
  return Urql.useQuery<CurriculumUploadsQuery, CurriculumUploadsQueryVariables>({ query: CurriculumUploadsDocument, ...options });
};
export const PreferencesDocument = gql`
    query preferences($IDENTIFIER: IdentfierInput, $COURSEID: ID) {
  preferences(identifier: $IDENTIFIER, courseId: $COURSEID) {
    id
    identifierYear
    identifierIsEvenSem
    faculty {
      user {
        firstName
        lastName
        username
      }
    }
    course {
      id
      code
      name
      credit
      l
      t
      p
      credit
      batch {
        year
        sem
        curriculum {
          program
          year
        }
      }
    }
    weigtage
    experience
    timestamp
  }
}
    `;

export function usePreferencesQuery(options?: Omit<Urql.UseQueryArgs<PreferencesQueryVariables>, 'query'>) {
  return Urql.useQuery<PreferencesQuery, PreferencesQueryVariables>({ query: PreferencesDocument, ...options });
};
export const MeDocument = gql`
    query me {
  me {
    id
    email
    firstName
    lastName
    username
    isStaff
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const FacultyDocument = gql`
    query faculty {
  faculty {
    user {
      id
      email
      firstName
      lastName
      username
      isStaff
    }
    track
    designation
  }
}
    `;

export function useFacultyQuery(options?: Omit<Urql.UseQueryArgs<FacultyQueryVariables>, 'query'>) {
  return Urql.useQuery<FacultyQuery, FacultyQueryVariables>({ query: FacultyDocument, ...options });
};
export const FacultiesDocument = gql`
    query faculties {
  faculties {
    user {
      id
      email
      firstName
      lastName
      username
      isStaff
      isActive
    }
    track
    designation
  }
}
    `;

export function useFacultiesQuery(options?: Omit<Urql.UseQueryArgs<FacultiesQueryVariables>, 'query'>) {
  return Urql.useQuery<FacultiesQuery, FacultiesQueryVariables>({ query: FacultiesDocument, ...options });
};
export const WorkloadsDocument = gql`
    query workloads {
  workloads {
    track
    designation
    minHoursPerWeek
    maxHoursPerWeek
  }
}
    `;

export function useWorkloadsQuery(options?: Omit<Urql.UseQueryArgs<WorkloadsQueryVariables>, 'query'>) {
  return Urql.useQuery<WorkloadsQuery, WorkloadsQueryVariables>({ query: WorkloadsDocument, ...options });
};