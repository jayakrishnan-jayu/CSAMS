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

export type ActiveBatchType = {
  __typename?: 'ActiveBatchType';
  curriculumId?: Maybe<Scalars['ID']>;
  curriculumYear?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isComplete?: Maybe<Scalars['Boolean']>;
  program?: Maybe<Scalars['String']>;
  sem?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type AddBatchExtraCourse = {
  __typename?: 'AddBatchExtraCourse';
  response?: Maybe<AddBatchExtraCourseResponse>;
};

export type AddBatchExtraCourseResponse = {
  __typename?: 'AddBatchExtraCourseResponse';
  activeBatches?: Maybe<Array<Maybe<ActiveBatchType>>>;
  extraCourse?: Maybe<ExtraCourseType>;
};

export type AddCourseAllocation = {
  __typename?: 'AddCourseAllocation';
  response?: Maybe<AllocationsType>;
};

export type AddLabAllocation = {
  __typename?: 'AddLabAllocation';
  response?: Maybe<AllocationsType>;
};

export type AddPreference = {
  __typename?: 'AddPreference';
  response?: Maybe<PrefernceMutationResponse>;
};

export type AllocationBatchType = {
  __typename?: 'AllocationBatchType';
  batchSem?: Maybe<Scalars['Int']>;
  batchYear?: Maybe<Scalars['Int']>;
  courseAllocations?: Maybe<Array<Maybe<CourseAllocationType>>>;
  courseIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  courseLabs?: Maybe<Array<Maybe<AllocationCourseLabType>>>;
  curriculumName?: Maybe<Scalars['String']>;
  curriculumYear?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  labAllocations?: Maybe<Array<Maybe<LabAllocationType>>>;
};

export type AllocationCourseLabType = {
  __typename?: 'AllocationCourseLabType';
  courseId?: Maybe<Scalars['ID']>;
  labId?: Maybe<Scalars['ID']>;
};

export type AllocationManagementType = {
  __typename?: 'AllocationManagementType';
  batches?: Maybe<Array<Maybe<AllocationBatchType>>>;
  bestPreferences?: Maybe<Array<Maybe<Scalars['ID']>>>;
  courses?: Maybe<Array<Maybe<CourseType>>>;
  faculties?: Maybe<Array<Maybe<FacultyType>>>;
  preferences?: Maybe<Array<Maybe<AllocationPreferenceType>>>;
};

export type AllocationPreferenceType = {
  __typename?: 'AllocationPreferenceType';
  courseId?: Maybe<Scalars['ID']>;
  experience?: Maybe<Scalars['Int']>;
  facultyId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  score?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['DateTime']>;
  weigtage?: Maybe<Scalars['Int']>;
};

export type AllocationsType = {
  __typename?: 'AllocationsType';
  courses?: Maybe<Array<Maybe<CourseAllocationType>>>;
  labs?: Maybe<Array<Maybe<LabAllocationType>>>;
};

export type ApprovedAllocationType = {
  __typename?: 'ApprovedAllocationType';
  batches?: Maybe<Array<Maybe<AllocationBatchType>>>;
  courses?: Maybe<Array<Maybe<CourseType>>>;
  faculties?: Maybe<Array<Maybe<FacultyType>>>;
};

export type BatchInfoType = {
  __typename?: 'BatchInfoType';
  info?: Maybe<Array<Maybe<BatchYearSemType>>>;
  program?: Maybe<Scalars['String']>;
};

export type BatchManagementType = {
  __typename?: 'BatchManagementType';
  activeBatches?: Maybe<Array<Maybe<ActiveBatchType>>>;
};

export type BatchType = {
  __typename?: 'BatchType';
  curriculum?: Maybe<CurriculumType>;
  extraCourseLeftToAssign?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  selectedExtraCourses?: Maybe<Array<Maybe<ExtraCourseType>>>;
  sem?: Maybe<Scalars['Int']>;
  semesterExtraCourses?: Maybe<Array<Maybe<SemesterExtraCourseType>>>;
  year?: Maybe<Scalars['Int']>;
};

export type BatchYearSemType = {
  __typename?: 'BatchYearSemType';
  semesters?: Maybe<Array<Maybe<Scalars['Int']>>>;
  year?: Maybe<Scalars['Int']>;
};

export type ConfigType = {
  __typename?: 'ConfigType';
  currentPreferenceSem?: Maybe<IdentiferType>;
  preferenceCount?: Maybe<Scalars['Int']>;
};

export type CourseAllocationPreferenceType = {
  __typename?: 'CourseAllocationPreferenceType';
  courseId?: Maybe<Scalars['ID']>;
  experience?: Maybe<Scalars['Int']>;
  facultyId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  identifierIsEvenSem?: Maybe<Scalars['Boolean']>;
  identifierYear?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['DateTime']>;
  weigtage?: Maybe<Scalars['Int']>;
};

export type CourseAllocationType = {
  __typename?: 'CourseAllocationType';
  courseId?: Maybe<Scalars['ID']>;
  facultyId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
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

export type CoursePreferenceType = {
  __typename?: 'CoursePreferenceType';
  courseId?: Maybe<Scalars['ID']>;
  experience?: Maybe<Scalars['Int']>;
  faculty?: Maybe<FacultyType>;
  id?: Maybe<Scalars['ID']>;
  identifierIsEvenSem?: Maybe<Scalars['Boolean']>;
  identifierYear?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['DateTime']>;
  weigtage?: Maybe<Scalars['Int']>;
};

export type CourseType = {
  __typename?: 'CourseType';
  batchId?: Maybe<Scalars['ID']>;
  batchYear?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['Int']>;
  curriculumYear?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isElective?: Maybe<Scalars['Boolean']>;
  isExtra?: Maybe<Scalars['Boolean']>;
  l?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  p?: Maybe<Scalars['Int']>;
  preferences?: Maybe<Array<Maybe<CoursePreferenceType>>>;
  program?: Maybe<Scalars['String']>;
  sem?: Maybe<Scalars['Int']>;
  t?: Maybe<Scalars['Int']>;
};

export type CurriculumExtraCoursesType = {
  __typename?: 'CurriculumExtraCoursesType';
  courses?: Maybe<Array<Maybe<ExtraCourseType>>>;
  extra?: Maybe<Scalars['String']>;
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

export type DeleteBatchExtraCourse = {
  __typename?: 'DeleteBatchExtraCourse';
  response?: Maybe<DeleteBatchExtraCourseResponse>;
};

export type DeleteBatchExtraCourseResponse = {
  __typename?: 'DeleteBatchExtraCourseResponse';
  activeBatches?: Maybe<Array<Maybe<ActiveBatchType>>>;
  oldExtraCourse?: Maybe<ExtraCourseType>;
};

export type DeleteCourseAllocation = {
  __typename?: 'DeleteCourseAllocation';
  response?: Maybe<AllocationsType>;
};

export type DeleteCurriculumUpload = {
  __typename?: 'DeleteCurriculumUpload';
  response?: Maybe<Array<Maybe<CurriculumUploadType>>>;
};

export type DeleteLabAllocation = {
  __typename?: 'DeleteLabAllocation';
  response?: Maybe<AllocationsType>;
};

export type DeletePreference = {
  __typename?: 'DeletePreference';
  response?: Maybe<PrefernceMutationResponse>;
};

export type ExtraCourseType = {
  __typename?: 'ExtraCourseType';
  code?: Maybe<Scalars['String']>;
  courseType?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
  maxWorkload?: Maybe<Scalars['Int']>;
  minWorkload?: Maybe<Scalars['Int']>;
  track?: Maybe<Scalars['String']>;
  user?: Maybe<UserType>;
  workload?: Maybe<Scalars['Int']>;
};

export type IdentfierInput = {
  /** Odd/Even Sem */
  isEvenSem: Scalars['Boolean'];
  /** Year at which the preference was recorded */
  year: Scalars['Int'];
};

export type IdentiferType = {
  __typename?: 'IdentiferType';
  areCoursesVerified?: Maybe<Scalars['Boolean']>;
  endTimestamp?: Maybe<Scalars['DateTime']>;
  isEvenSem?: Maybe<Scalars['Boolean']>;
  isPaused?: Maybe<Scalars['Boolean']>;
  startTimestamp?: Maybe<Scalars['DateTime']>;
  year?: Maybe<Scalars['Int']>;
};

export type IdentifierInput = {
  isEvenSem: Scalars['Boolean'];
  year: Scalars['Int'];
};

export type LabAllocationType = {
  __typename?: 'LabAllocationType';
  courseId?: Maybe<Scalars['ID']>;
  facultyId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  isInCharge?: Maybe<Scalars['Boolean']>;
};

export type MetaDataType = {
  __typename?: 'MetaDataType';
  config?: Maybe<ConfigType>;
  faculty?: Maybe<FacultyType>;
  user?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBatchExtraCourse?: Maybe<AddBatchExtraCourse>;
  addCourseAllocation?: Maybe<AddCourseAllocation>;
  addLabAllocation?: Maybe<AddLabAllocation>;
  addPreference?: Maybe<AddPreference>;
  deleteBatchExtraCourse?: Maybe<DeleteBatchExtraCourse>;
  deleteCourseAllocation?: Maybe<DeleteCourseAllocation>;
  deleteCurriculumUpload?: Maybe<DeleteCurriculumUpload>;
  deleteLabAllocation?: Maybe<DeleteLabAllocation>;
  deletePreference?: Maybe<DeletePreference>;
  releaseCoursesForFaculty?: Maybe<ReleaseCoursesForFaculty>;
  updateBatchCurriculumExtraCourse?: Maybe<UpdateBatchCurriculumExtraCourse>;
  updateBatchExtraCourse?: Maybe<UpdateBatchExtraCourse>;
  updateCourseAllocation?: Maybe<UpdateCourseAllocation>;
  updateDeadline?: Maybe<UpdateDeadline>;
  updateLabAllocation?: Maybe<UpdateLabAllocation>;
  updatePreference?: Maybe<UpdatePreference>;
  updatePreferenceCount?: Maybe<UpdatePreferenceCount>;
  updateSemIdentifier?: Maybe<UpdateSemIdentifier>;
  updateUser?: Maybe<UpdateUser>;
  updateWorkload?: Maybe<UpdateWorkload>;
  uploadCurriculum?: Maybe<UploadCurriculum>;
  verifyCurriculumUpload?: Maybe<VerifyCurriculumUpload>;
};


export type MutationAddBatchExtraCourseArgs = {
  batchId: Scalars['ID'];
  extraCourseId: Scalars['ID'];
};


export type MutationAddCourseAllocationArgs = {
  courseID: Scalars['ID'];
  facultyID: Scalars['ID'];
};


export type MutationAddLabAllocationArgs = {
  courseID: Scalars['ID'];
  facultyID: Scalars['ID'];
  isInCharge: Scalars['Boolean'];
};


export type MutationAddPreferenceArgs = {
  courseId: Scalars['ID'];
  experience: Scalars['Int'];
  weightage: Scalars['Int'];
};


export type MutationDeleteBatchExtraCourseArgs = {
  batchId: Scalars['ID'];
  oldExtraCourseId: Scalars['ID'];
};


export type MutationDeleteCourseAllocationArgs = {
  allocationID: Scalars['ID'];
  courseID: Scalars['ID'];
};


export type MutationDeleteCurriculumUploadArgs = {
  curriculumUploadID: Scalars['ID'];
};


export type MutationDeleteLabAllocationArgs = {
  allocationID: Scalars['ID'];
  courseID: Scalars['ID'];
};


export type MutationDeletePreferenceArgs = {
  id: Scalars['ID'];
};


export type MutationReleaseCoursesForFacultyArgs = {
  identifier: IdentifierInput;
};


export type MutationUpdateBatchCurriculumExtraCourseArgs = {
  add: Scalars['Boolean'];
  batchId: Scalars['ID'];
  extraCourseType: Scalars['String'];
};


export type MutationUpdateBatchExtraCourseArgs = {
  batchId: Scalars['ID'];
  newExtraCourseId: Scalars['ID'];
  oldExtraCourseId: Scalars['ID'];
};


export type MutationUpdateCourseAllocationArgs = {
  allocationID: Scalars['ID'];
  newFacultyID: Scalars['ID'];
  oldFacultyID: Scalars['ID'];
};


export type MutationUpdateDeadlineArgs = {
  endTimestamp: Scalars['DateTime'];
  identifier: IdentifierInput;
  startTimestamp: Scalars['DateTime'];
};


export type MutationUpdateLabAllocationArgs = {
  allocationID: Scalars['ID'];
  newFacultyID: Scalars['ID'];
  oldFacultyID: Scalars['ID'];
};


export type MutationUpdatePreferenceArgs = {
  experience?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  weightage?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdatePreferenceCountArgs = {
  count: Scalars['Int'];
};


export type MutationUpdateSemIdentifierArgs = {
  isEvenSem: Scalars['Boolean'];
  year: Scalars['Int'];
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

export type PreferenceAllocationFacultyType = {
  __typename?: 'PreferenceAllocationFacultyType';
  batches?: Maybe<Array<Maybe<AllocationBatchType>>>;
  courses?: Maybe<Array<Maybe<CourseType>>>;
  faculties?: Maybe<Array<Maybe<FacultyType>>>;
  preferences?: Maybe<Array<Maybe<CourseAllocationPreferenceType>>>;
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

export type PrefernceMutationResponse = {
  __typename?: 'PrefernceMutationResponse';
  preferences?: Maybe<Array<Maybe<CourseAllocationPreferenceType>>>;
};

export type ProgramType = {
  __typename?: 'ProgramType';
  duration?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allocationManagement?: Maybe<AllocationManagementType>;
  allocations?: Maybe<ApprovedAllocationType>;
  batch?: Maybe<BatchType>;
  batchInfo?: Maybe<BatchInfoType>;
  batchManagement?: Maybe<BatchManagementType>;
  batchSelectedExtraCourses?: Maybe<Array<Maybe<ExtraCourseType>>>;
  batches?: Maybe<Array<Maybe<BatchType>>>;
  course?: Maybe<CourseType>;
  courseLabs?: Maybe<Array<Maybe<CourseLabType>>>;
  courses?: Maybe<Array<Maybe<CourseType>>>;
  coursesForPreference?: Maybe<PreferenceAllocationFacultyType>;
  curriculumExtraCourses?: Maybe<Array<Maybe<CurriculumExtraCoursesType>>>;
  curriculumUpload?: Maybe<CurriculumUploadType>;
  curriculumUploads?: Maybe<Array<Maybe<CurriculumUploadType>>>;
  curriculums?: Maybe<Array<Maybe<CurriculumType>>>;
  faculties?: Maybe<Array<Maybe<FacultyType>>>;
  faculty?: Maybe<FacultyType>;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
  metadata?: Maybe<MetaDataType>;
  preferences?: Maybe<Array<Maybe<PreferenceType>>>;
  programs?: Maybe<Array<Maybe<ProgramType>>>;
  users?: Maybe<Array<Maybe<UserType>>>;
  verifyNewCurriculum?: Maybe<Array<Maybe<BatchType>>>;
  workloads?: Maybe<Array<Maybe<WorkloadType>>>;
};


export type QueryAllocationManagementArgs = {
  identifier?: InputMaybe<IdentifierInput>;
};


export type QueryAllocationsArgs = {
  identifier: IdentifierInput;
};


export type QueryBatchArgs = {
  batchId: Scalars['ID'];
};


export type QueryBatchInfoArgs = {
  program?: InputMaybe<Scalars['String']>;
};


export type QueryBatchSelectedExtraCoursesArgs = {
  batchId: Scalars['ID'];
};


export type QueryBatchesArgs = {
  identifier?: InputMaybe<IdentifierInput>;
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
  identifier?: InputMaybe<IdentfierInput>;
};


export type QueryCurriculumExtraCoursesArgs = {
  curriculumYear: Scalars['Int'];
  extras: Array<InputMaybe<Scalars['String']>>;
  program: Scalars['String'];
};


export type QueryCurriculumUploadArgs = {
  program: Scalars['String'];
  year: Scalars['Int'];
};


export type QueryCurriculumsArgs = {
  program?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryPreferencesArgs = {
  courseId?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<IdentfierInput>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryVerifyNewCurriculumArgs = {
  program: Scalars['String'];
  year: Scalars['Int'];
};

export type ReleaseCoursesForFaculty = {
  __typename?: 'ReleaseCoursesForFaculty';
  response?: Maybe<Scalars['Boolean']>;
};

export type SemesterExtraCourseType = {
  __typename?: 'SemesterExtraCourseType';
  count?: Maybe<Scalars['Int']>;
  isElective?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type SemesterInput = {
  courseLabs: Array<InputMaybe<CourseLabInput>>;
  courses: Array<InputMaybe<CourseInput>>;
  extra: Array<InputMaybe<Scalars['String']>>;
  /** number of semseter eg 1, 2, 3 */
  sem: Scalars['Int'];
};

export type UpdateBatchCurriculumExtraCourse = {
  __typename?: 'UpdateBatchCurriculumExtraCourse';
  response?: Maybe<UpdateBatchCurriculumExtraCourseResponse>;
};

export type UpdateBatchCurriculumExtraCourseResponse = {
  __typename?: 'UpdateBatchCurriculumExtraCourseResponse';
  activeBatches?: Maybe<Array<Maybe<ActiveBatchType>>>;
  semesterExtraCourses?: Maybe<Array<Maybe<SemesterExtraCourseType>>>;
};

export type UpdateBatchExtraCourse = {
  __typename?: 'UpdateBatchExtraCourse';
  response?: Maybe<UpdateBatchExtraCourseResponse>;
};

export type UpdateBatchExtraCourseResponse = {
  __typename?: 'UpdateBatchExtraCourseResponse';
  activeBatches?: Maybe<Array<Maybe<ActiveBatchType>>>;
  newExtraCourse?: Maybe<ExtraCourseType>;
  oldExtraCourse?: Maybe<ExtraCourseType>;
};

export type UpdateCourseAllocation = {
  __typename?: 'UpdateCourseAllocation';
  response?: Maybe<AllocationsType>;
};

export type UpdateDeadline = {
  __typename?: 'UpdateDeadline';
  response?: Maybe<Scalars['Boolean']>;
};

export type UpdateLabAllocation = {
  __typename?: 'UpdateLabAllocation';
  response?: Maybe<AllocationsType>;
};

export type UpdatePreference = {
  __typename?: 'UpdatePreference';
  response?: Maybe<PrefernceMutationResponse>;
};

export type UpdatePreferenceCount = {
  __typename?: 'UpdatePreferenceCount';
  response?: Maybe<Scalars['Boolean']>;
};

export type UpdateSemIdentifier = {
  __typename?: 'UpdateSemIdentifier';
  response?: Maybe<Scalars['Boolean']>;
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
  response?: Maybe<Array<Maybe<CurriculumUploadType>>>;
};

export type WorkloadType = {
  __typename?: 'WorkloadType';
  designation?: Maybe<Scalars['String']>;
  maxHoursPerWeek?: Maybe<Scalars['Int']>;
  minHoursPerWeek?: Maybe<Scalars['Int']>;
  track?: Maybe<Scalars['String']>;
};

export type AddCourseAllocationMutationVariables = Exact<{
  FACULTY_ID: Scalars['ID'];
  COURSE_ID: Scalars['ID'];
}>;


export type AddCourseAllocationMutation = { __typename?: 'Mutation', addCourseAllocation?: { __typename?: 'AddCourseAllocation', response?: { __typename?: 'AllocationsType', courses?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labs?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null } | null };

export type AddLabAllocationMutationVariables = Exact<{
  FACULTY_ID: Scalars['ID'];
  COURSE_ID: Scalars['ID'];
  IS_IN_CHARGE: Scalars['Boolean'];
}>;


export type AddLabAllocationMutation = { __typename?: 'Mutation', addLabAllocation?: { __typename?: 'AddLabAllocation', response?: { __typename?: 'AllocationsType', courses?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labs?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null } | null };

export type UpdateCourseAllocationMutationVariables = Exact<{
  ALLOCATION_ID: Scalars['ID'];
  NEW_FACULTY_ID: Scalars['ID'];
  OLD_FACULTY_ID: Scalars['ID'];
}>;


export type UpdateCourseAllocationMutation = { __typename?: 'Mutation', updateCourseAllocation?: { __typename?: 'UpdateCourseAllocation', response?: { __typename?: 'AllocationsType', courses?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labs?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null } | null };

export type UpdateLabAllocationMutationVariables = Exact<{
  ALLOCATION_ID: Scalars['ID'];
  NEW_FACULTY_ID: Scalars['ID'];
  OLD_FACULTY_ID: Scalars['ID'];
}>;


export type UpdateLabAllocationMutation = { __typename?: 'Mutation', updateLabAllocation?: { __typename?: 'UpdateLabAllocation', response?: { __typename?: 'AllocationsType', courses?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labs?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null } | null };

export type DeleteCourseAllocationMutationVariables = Exact<{
  ALLOCATION_ID: Scalars['ID'];
  COURSE_ID: Scalars['ID'];
}>;


export type DeleteCourseAllocationMutation = { __typename?: 'Mutation', deleteCourseAllocation?: { __typename?: 'DeleteCourseAllocation', response?: { __typename?: 'AllocationsType', courses?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labs?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null } | null };

export type DeleteLabAllocationMutationVariables = Exact<{
  ALLOCATION_ID: Scalars['ID'];
  COURSE_ID: Scalars['ID'];
}>;


export type DeleteLabAllocationMutation = { __typename?: 'Mutation', deleteLabAllocation?: { __typename?: 'DeleteLabAllocation', response?: { __typename?: 'AllocationsType', courses?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labs?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null } | null };

export type UpdatePreferenceCountMutationVariables = Exact<{
  COUNT: Scalars['Int'];
}>;


export type UpdatePreferenceCountMutation = { __typename?: 'Mutation', updatePreferenceCount?: { __typename?: 'UpdatePreferenceCount', response?: boolean | null } | null };

export type UpdateSemIdentifierMutationVariables = Exact<{
  ISEVENSEM: Scalars['Boolean'];
  YEAR: Scalars['Int'];
}>;


export type UpdateSemIdentifierMutation = { __typename?: 'Mutation', updateSemIdentifier?: { __typename?: 'UpdateSemIdentifier', response?: boolean | null } | null };

export type ReleaseCoursesForFacultyMutationVariables = Exact<{
  IDENTIFIER: IdentifierInput;
}>;


export type ReleaseCoursesForFacultyMutation = { __typename?: 'Mutation', releaseCoursesForFaculty?: { __typename?: 'ReleaseCoursesForFaculty', response?: boolean | null } | null };

export type UpdateDeadlineMutationVariables = Exact<{
  IDENTIFIER: IdentifierInput;
  START_TIMESTAMP: Scalars['DateTime'];
  END_TIMESTAMP: Scalars['DateTime'];
}>;


export type UpdateDeadlineMutation = { __typename?: 'Mutation', updateDeadline?: { __typename?: 'UpdateDeadline', response?: boolean | null } | null };

export type UploadCurriculumMutationVariables = Exact<{
  CURRICULUM: CurriculumUploadInput;
}>;


export type UploadCurriculumMutation = { __typename?: 'Mutation', uploadCurriculum?: { __typename?: 'UploadCurriculum', response?: { __typename?: 'CurriculumUploadType', id?: string | null, program?: string | null, year?: number | null, data?: any | null, uploadedOn?: any | null, isPopulated?: boolean | null } | null } | null };

export type AddBatchExtraCourseMutationVariables = Exact<{
  BATCHID: Scalars['ID'];
  EXTRA_COURSEID: Scalars['ID'];
}>;


export type AddBatchExtraCourseMutation = { __typename?: 'Mutation', addBatchExtraCourse?: { __typename?: 'AddBatchExtraCourse', response?: { __typename?: 'AddBatchExtraCourseResponse', extraCourse?: { __typename?: 'ExtraCourseType', id?: string | null, code?: string | null, name?: string | null } | null, activeBatches?: Array<{ __typename?: 'ActiveBatchType', id?: string | null, program?: string | null, curriculumYear?: number | null, curriculumId?: string | null, sem?: number | null, year?: number | null, isComplete?: boolean | null } | null> | null } | null } | null };

export type UpdateBatchExtraCourseMutationVariables = Exact<{
  BATCHID: Scalars['ID'];
  OLD_EXTRA_COURSEID: Scalars['ID'];
  NEW_EXTRA_COURSEID: Scalars['ID'];
}>;


export type UpdateBatchExtraCourseMutation = { __typename?: 'Mutation', updateBatchExtraCourse?: { __typename?: 'UpdateBatchExtraCourse', response?: { __typename?: 'UpdateBatchExtraCourseResponse', oldExtraCourse?: { __typename?: 'ExtraCourseType', id?: string | null, code?: string | null, name?: string | null, courseType?: string | null } | null, newExtraCourse?: { __typename?: 'ExtraCourseType', id?: string | null, code?: string | null, name?: string | null, courseType?: string | null } | null, activeBatches?: Array<{ __typename?: 'ActiveBatchType', id?: string | null, program?: string | null, curriculumYear?: number | null, curriculumId?: string | null, sem?: number | null, year?: number | null, isComplete?: boolean | null } | null> | null } | null } | null };

export type DeleteBatchExtraCourseMutationVariables = Exact<{
  BATCHID: Scalars['ID'];
  OLD_EXTRA_COURSEID: Scalars['ID'];
}>;


export type DeleteBatchExtraCourseMutation = { __typename?: 'Mutation', deleteBatchExtraCourse?: { __typename?: 'DeleteBatchExtraCourse', response?: { __typename?: 'DeleteBatchExtraCourseResponse', oldExtraCourse?: { __typename?: 'ExtraCourseType', id?: string | null, code?: string | null, name?: string | null, courseType?: string | null } | null, activeBatches?: Array<{ __typename?: 'ActiveBatchType', id?: string | null, program?: string | null, curriculumYear?: number | null, curriculumId?: string | null, sem?: number | null, year?: number | null, isComplete?: boolean | null } | null> | null } | null } | null };

export type UpdateBatchCurriculumExtraCourseMutationVariables = Exact<{
  BATCH_ID: Scalars['ID'];
  ADD: Scalars['Boolean'];
  EXTRA_COURSE_TYPE: Scalars['String'];
}>;


export type UpdateBatchCurriculumExtraCourseMutation = { __typename?: 'Mutation', updateBatchCurriculumExtraCourse?: { __typename?: 'UpdateBatchCurriculumExtraCourse', response?: { __typename?: 'UpdateBatchCurriculumExtraCourseResponse', semesterExtraCourses?: Array<{ __typename?: 'SemesterExtraCourseType', isElective?: boolean | null, name?: string | null, count?: number | null } | null> | null, activeBatches?: Array<{ __typename?: 'ActiveBatchType', id?: string | null, program?: string | null, curriculumYear?: number | null, curriculumId?: string | null, sem?: number | null, year?: number | null, isComplete?: boolean | null } | null> | null } | null } | null };

export type DeleteCurriculumUploadMutationVariables = Exact<{
  CURRICULUMUPLOADID: Scalars['ID'];
}>;


export type DeleteCurriculumUploadMutation = { __typename?: 'Mutation', deleteCurriculumUpload?: { __typename?: 'DeleteCurriculumUpload', response?: Array<{ __typename?: 'CurriculumUploadType', id?: string | null, program?: string | null, year?: number | null, uploadedOn?: any | null, isPopulated?: boolean | null } | null> | null } | null };

export type VerifyCurriculumUploadMutationVariables = Exact<{
  CURRICULUMUPLOADID: Scalars['ID'];
}>;


export type VerifyCurriculumUploadMutation = { __typename?: 'Mutation', verifyCurriculumUpload?: { __typename?: 'VerifyCurriculumUpload', response?: Array<{ __typename?: 'CurriculumUploadType', id?: string | null, program?: string | null, year?: number | null, uploadedOn?: any | null, isPopulated?: boolean | null } | null> | null } | null };

export type UpdateUserMutationVariables = Exact<{
  FIRSTNAME: Scalars['String'];
  LASTNAME: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'UpdateUser', user?: { __typename?: 'UserType', firstName?: string | null, lastName?: string | null } | null } | null };

export type AddPreferenceMutationVariables = Exact<{
  COURSEID: Scalars['ID'];
  EXPERIENCE: Scalars['Int'];
  WEIGHTAGE: Scalars['Int'];
}>;


export type AddPreferenceMutation = { __typename?: 'Mutation', addPreference?: { __typename?: 'AddPreference', response?: { __typename?: 'PrefernceMutationResponse', preferences?: Array<{ __typename?: 'CourseAllocationPreferenceType', id?: string | null, identifierYear?: number | null, identifierIsEvenSem?: boolean | null, facultyId?: string | null, courseId?: string | null, weigtage?: number | null, experience?: number | null, timestamp?: any | null } | null> | null } | null } | null };

export type UpdatePreferenceMutationVariables = Exact<{
  ID: Scalars['ID'];
  EXPERIENCE?: InputMaybe<Scalars['Int']>;
  WEIGHTAGE?: InputMaybe<Scalars['Int']>;
}>;


export type UpdatePreferenceMutation = { __typename?: 'Mutation', updatePreference?: { __typename?: 'UpdatePreference', response?: { __typename?: 'PrefernceMutationResponse', preferences?: Array<{ __typename?: 'CourseAllocationPreferenceType', id?: string | null, identifierYear?: number | null, identifierIsEvenSem?: boolean | null, facultyId?: string | null, courseId?: string | null, weigtage?: number | null, experience?: number | null, timestamp?: any | null } | null> | null } | null } | null };

export type DeletePreferenceMutationVariables = Exact<{
  ID: Scalars['ID'];
}>;


export type DeletePreferenceMutation = { __typename?: 'Mutation', deletePreference?: { __typename?: 'DeletePreference', response?: { __typename?: 'PrefernceMutationResponse', preferences?: Array<{ __typename?: 'CourseAllocationPreferenceType', id?: string | null, identifierYear?: number | null, identifierIsEvenSem?: boolean | null, facultyId?: string | null, courseId?: string | null, weigtage?: number | null, experience?: number | null, timestamp?: any | null } | null> | null } | null } | null };

export type UpdateWorkloadMutationVariables = Exact<{
  TRACK: Scalars['String'];
  DESIGNATION: Scalars['String'];
  MINHOURS: Scalars['Int'];
  MAXHOURS: Scalars['Int'];
}>;


export type UpdateWorkloadMutation = { __typename?: 'Mutation', updateWorkload?: { __typename?: 'UpdateWorkload', workload?: { __typename?: 'WorkloadType', track?: string | null, designation?: string | null, minHoursPerWeek?: number | null, maxHoursPerWeek?: number | null } | null } | null };

export type AllocationManagementQueryVariables = Exact<{
  IDENTIFIER?: InputMaybe<IdentifierInput>;
}>;


export type AllocationManagementQuery = { __typename?: 'Query', allocationManagement?: { __typename?: 'AllocationManagementType', bestPreferences?: Array<string | null> | null, batches?: Array<{ __typename?: 'AllocationBatchType', id?: string | null, curriculumYear?: number | null, curriculumName?: string | null, batchYear?: number | null, batchSem?: number | null, courseIds?: Array<string | null> | null, courseLabs?: Array<{ __typename?: 'AllocationCourseLabType', courseId?: string | null, labId?: string | null } | null> | null, courseAllocations?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labAllocations?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null> | null, courses?: Array<{ __typename?: 'CourseType', id?: string | null, code?: string | null, name?: string | null, credit?: number | null, hours?: number | null, l?: number | null, t?: number | null, p?: number | null, isExtra?: boolean | null, isElective?: boolean | null, program?: string | null, curriculumYear?: number | null, batchYear?: number | null, sem?: number | null } | null> | null, preferences?: Array<{ __typename?: 'AllocationPreferenceType', id?: string | null, facultyId?: string | null, courseId?: string | null, weigtage?: number | null, experience?: number | null, timestamp?: any | null, score?: number | null } | null> | null, faculties?: Array<{ __typename?: 'FacultyType', id?: string | null, track?: string | null, designation?: string | null, minWorkload?: number | null, maxWorkload?: number | null, workload?: number | null, user?: { __typename?: 'UserType', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, isStaff?: boolean | null } | null } | null> | null } | null };

export type AllocationsQueryVariables = Exact<{
  IDENTIFIER: IdentifierInput;
}>;


export type AllocationsQuery = { __typename?: 'Query', allocations?: { __typename?: 'ApprovedAllocationType', faculties?: Array<{ __typename?: 'FacultyType', id?: string | null, track?: string | null, designation?: string | null, minWorkload?: number | null, maxWorkload?: number | null, workload?: number | null, user?: { __typename?: 'UserType', email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null } | null } | null> | null, courses?: Array<{ __typename?: 'CourseType', id?: string | null, code?: string | null, name?: string | null, credit?: number | null, hours?: number | null, l?: number | null, t?: number | null, p?: number | null, isExtra?: boolean | null, isElective?: boolean | null, program?: string | null, curriculumYear?: number | null, batchYear?: number | null, sem?: number | null } | null> | null, batches?: Array<{ __typename?: 'AllocationBatchType', id?: string | null, curriculumYear?: number | null, curriculumName?: string | null, batchYear?: number | null, batchSem?: number | null, courseIds?: Array<string | null> | null, courseAllocations?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labAllocations?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null> | null } | null };

export type BatchQueryVariables = Exact<{
  BATCHID: Scalars['ID'];
}>;


export type BatchQuery = { __typename?: 'Query', batch?: { __typename?: 'BatchType', year?: number | null, sem?: number | null, curriculum?: { __typename?: 'CurriculumType', program?: string | null, year?: number | null } | null, semesterExtraCourses?: Array<{ __typename?: 'SemesterExtraCourseType', isElective?: boolean | null, name?: string | null, count?: number | null } | null> | null, selectedExtraCourses?: Array<{ __typename?: 'ExtraCourseType', name?: string | null, courseType?: string | null } | null> | null } | null };

export type BatchManagementQueryVariables = Exact<{ [key: string]: never; }>;


export type BatchManagementQuery = { __typename?: 'Query', batchManagement?: { __typename?: 'BatchManagementType', activeBatches?: Array<{ __typename?: 'ActiveBatchType', id?: string | null, program?: string | null, curriculumYear?: number | null, curriculumId?: string | null, sem?: number | null, year?: number | null, isComplete?: boolean | null } | null> | null } | null };

export type BatchesQueryVariables = Exact<{
  IDENTIFIER?: InputMaybe<IdentifierInput>;
}>;


export type BatchesQuery = { __typename?: 'Query', batches?: Array<{ __typename?: 'BatchType', extraCourseLeftToAssign?: number | null, year?: number | null, sem?: number | null, curriculum?: { __typename?: 'CurriculumType', program?: string | null, year?: number | null } | null, semesterExtraCourses?: Array<{ __typename?: 'SemesterExtraCourseType', isElective?: boolean | null, name?: string | null, count?: number | null } | null> | null, selectedExtraCourses?: Array<{ __typename?: 'ExtraCourseType', id?: string | null, code?: string | null, name?: string | null, l?: number | null, t?: number | null, p?: number | null, credit?: number | null, hours?: number | null, courseType?: string | null } | null> | null } | null> | null };

export type ProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProgramsQuery = { __typename?: 'Query', programs?: Array<{ __typename?: 'ProgramType', id?: string | null, name?: string | null, duration?: string | null } | null> | null };

export type CoursesForPreferenceQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesForPreferenceQuery = { __typename?: 'Query', coursesForPreference?: { __typename?: 'PreferenceAllocationFacultyType', preferences?: Array<{ __typename?: 'CourseAllocationPreferenceType', id?: string | null, identifierYear?: number | null, identifierIsEvenSem?: boolean | null, facultyId?: string | null, courseId?: string | null, weigtage?: number | null, experience?: number | null, timestamp?: any | null } | null> | null, faculties?: Array<{ __typename?: 'FacultyType', id?: string | null, track?: string | null, designation?: string | null, minWorkload?: number | null, maxWorkload?: number | null, workload?: number | null, user?: { __typename?: 'UserType', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null } | null } | null> | null, courses?: Array<{ __typename?: 'CourseType', id?: string | null, code?: string | null, name?: string | null, credit?: number | null, hours?: number | null, l?: number | null, t?: number | null, p?: number | null, isExtra?: boolean | null, isElective?: boolean | null, batchId?: string | null, sem?: number | null } | null> | null, batches?: Array<{ __typename?: 'AllocationBatchType', id?: string | null, curriculumYear?: number | null, curriculumName?: string | null, batchYear?: number | null, batchSem?: number | null, courseIds?: Array<string | null> | null, courseLabs?: Array<{ __typename?: 'AllocationCourseLabType', courseId?: string | null, labId?: string | null } | null> | null, courseAllocations?: Array<{ __typename?: 'CourseAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null } | null> | null, labAllocations?: Array<{ __typename?: 'LabAllocationType', id?: string | null, courseId?: string | null, facultyId?: string | null, isInCharge?: boolean | null } | null> | null } | null> | null } | null };

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

export type CurriculumUploadQueryVariables = Exact<{
  PROGRAM: Scalars['String'];
  YEAR: Scalars['Int'];
}>;


export type CurriculumUploadQuery = { __typename?: 'Query', curriculumUpload?: { __typename?: 'CurriculumUploadType', program?: string | null, year?: number | null, isPopulated?: boolean | null, uploadedOn?: any | null, data?: any | null } | null };

export type CurriculumUploadsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurriculumUploadsQuery = { __typename?: 'Query', curriculumUploads?: Array<{ __typename?: 'CurriculumUploadType', id?: string | null, program?: string | null, year?: number | null, uploadedOn?: any | null, isPopulated?: boolean | null } | null> | null };

export type CurriculumExtraCoursesQueryVariables = Exact<{
  EXTRAS: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  PROGRAM: Scalars['String'];
  CURRICULUMYEAR: Scalars['Int'];
  BATCHID: Scalars['ID'];
}>;


export type CurriculumExtraCoursesQuery = { __typename?: 'Query', curriculumExtraCourses?: Array<{ __typename?: 'CurriculumExtraCoursesType', extra?: string | null, courses?: Array<{ __typename?: 'ExtraCourseType', id?: string | null, code?: string | null, name?: string | null } | null> | null } | null> | null, batchSelectedExtraCourses?: Array<{ __typename?: 'ExtraCourseType', id?: string | null, code?: string | null, name?: string | null, courseType?: string | null } | null> | null };

export type MetadataQueryVariables = Exact<{ [key: string]: never; }>;


export type MetadataQuery = { __typename?: 'Query', metadata?: { __typename?: 'MetaDataType', user?: { __typename?: 'UserType', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, isStaff?: boolean | null, isActive?: boolean | null } | null, faculty?: { __typename?: 'FacultyType', id?: string | null, track?: string | null, designation?: string | null } | null, config?: { __typename?: 'ConfigType', preferenceCount?: number | null, currentPreferenceSem?: { __typename?: 'IdentiferType', year?: number | null, isEvenSem?: boolean | null, startTimestamp?: any | null, endTimestamp?: any | null, isPaused?: boolean | null, areCoursesVerified?: boolean | null } | null } | null } | null };

export type PreferencesQueryVariables = Exact<{
  IDENTIFIER?: InputMaybe<IdentfierInput>;
  COURSEID?: InputMaybe<Scalars['ID']>;
}>;


export type PreferencesQuery = { __typename?: 'Query', preferences?: Array<{ __typename?: 'PreferenceType', id?: string | null, identifierYear?: number | null, identifierIsEvenSem?: boolean | null, weigtage?: number | null, experience?: number | null, timestamp?: any | null, faculty?: { __typename?: 'FacultyType', user?: { __typename?: 'UserType', firstName?: string | null, lastName?: string | null, username?: string | null, email?: string | null } | null } | null, course?: { __typename?: 'CourseType', id?: string | null, code?: string | null, name?: string | null, credit?: number | null, l?: number | null, t?: number | null, p?: number | null, program?: string | null, curriculumYear?: number | null, batchYear?: number | null, sem?: number | null } | null } | null> | null };

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
        "name": "ActiveBatchType",
        "fields": [
          {
            "name": "curriculumId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "curriculumYear",
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
            "name": "isComplete",
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
            "name": "sem",
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
        "name": "AddBatchExtraCourse",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "AddBatchExtraCourseResponse",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AddBatchExtraCourseResponse",
        "fields": [
          {
            "name": "activeBatches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ActiveBatchType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "extraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "ExtraCourseType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AddCourseAllocation",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "AllocationsType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AddLabAllocation",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "AllocationsType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AddPreference",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "PrefernceMutationResponse",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AllocationBatchType",
        "fields": [
          {
            "name": "batchSem",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "batchYear",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "courseAllocations",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseAllocationType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "courseIds",
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
            "name": "courseLabs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "AllocationCourseLabType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "curriculumName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "curriculumYear",
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
            "name": "labAllocations",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "LabAllocationType",
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
        "name": "AllocationCourseLabType",
        "fields": [
          {
            "name": "courseId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "labId",
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
        "name": "AllocationManagementType",
        "fields": [
          {
            "name": "batches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "AllocationBatchType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "bestPreferences",
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
            "name": "preferences",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "AllocationPreferenceType",
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
        "name": "AllocationPreferenceType",
        "fields": [
          {
            "name": "courseId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "facultyId",
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
            "name": "score",
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
        "name": "AllocationsType",
        "fields": [
          {
            "name": "courses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseAllocationType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "labs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "LabAllocationType",
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
        "name": "ApprovedAllocationType",
        "fields": [
          {
            "name": "batches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "AllocationBatchType",
                "ofType": null
              }
            },
            "args": []
          },
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
          }
        ],
        "interfaces": []
      },
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
        "name": "BatchManagementType",
        "fields": [
          {
            "name": "activeBatches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ActiveBatchType",
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
                "kind": "OBJECT",
                "name": "SemesterExtraCourseType",
                "ofType": null
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
        "name": "ConfigType",
        "fields": [
          {
            "name": "currentPreferenceSem",
            "type": {
              "kind": "OBJECT",
              "name": "IdentiferType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "preferenceCount",
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
        "name": "CourseAllocationPreferenceType",
        "fields": [
          {
            "name": "courseId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "facultyId",
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
        "name": "CourseAllocationType",
        "fields": [
          {
            "name": "courseId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "facultyId",
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
        "name": "CoursePreferenceType",
        "fields": [
          {
            "name": "courseId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
        "name": "CourseType",
        "fields": [
          {
            "name": "batchId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "batchYear",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "curriculumYear",
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
            "name": "isElective",
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
            "name": "preferences",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CoursePreferenceType",
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
        "name": "CurriculumExtraCoursesType",
        "fields": [
          {
            "name": "courses",
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
            "name": "extra",
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
        "name": "DeleteBatchExtraCourse",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "DeleteBatchExtraCourseResponse",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DeleteBatchExtraCourseResponse",
        "fields": [
          {
            "name": "activeBatches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ActiveBatchType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "oldExtraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "ExtraCourseType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DeleteCourseAllocation",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "AllocationsType",
              "ofType": null
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
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CurriculumUploadType",
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
        "name": "DeleteLabAllocation",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "AllocationsType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DeletePreference",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "PrefernceMutationResponse",
              "ofType": null
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
            "name": "id",
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
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "maxWorkload",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "minWorkload",
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
          },
          {
            "name": "workload",
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
        "name": "IdentiferType",
        "fields": [
          {
            "name": "areCoursesVerified",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isEvenSem",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isPaused",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "startTimestamp",
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
        "name": "LabAllocationType",
        "fields": [
          {
            "name": "courseId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "facultyId",
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
            "name": "isInCharge",
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
        "name": "MetaDataType",
        "fields": [
          {
            "name": "config",
            "type": {
              "kind": "OBJECT",
              "name": "ConfigType",
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
            "name": "addBatchExtraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "AddBatchExtraCourse",
              "ofType": null
            },
            "args": [
              {
                "name": "batchId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "extraCourseId",
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
            "name": "addCourseAllocation",
            "type": {
              "kind": "OBJECT",
              "name": "AddCourseAllocation",
              "ofType": null
            },
            "args": [
              {
                "name": "courseID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "facultyID",
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
            "name": "addLabAllocation",
            "type": {
              "kind": "OBJECT",
              "name": "AddLabAllocation",
              "ofType": null
            },
            "args": [
              {
                "name": "courseID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "facultyID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "isInCharge",
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
            "name": "addPreference",
            "type": {
              "kind": "OBJECT",
              "name": "AddPreference",
              "ofType": null
            },
            "args": [
              {
                "name": "courseId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "experience",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "weightage",
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
            "name": "deleteBatchExtraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "DeleteBatchExtraCourse",
              "ofType": null
            },
            "args": [
              {
                "name": "batchId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "oldExtraCourseId",
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
            "name": "deleteCourseAllocation",
            "type": {
              "kind": "OBJECT",
              "name": "DeleteCourseAllocation",
              "ofType": null
            },
            "args": [
              {
                "name": "allocationID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "courseID",
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
            "name": "deleteLabAllocation",
            "type": {
              "kind": "OBJECT",
              "name": "DeleteLabAllocation",
              "ofType": null
            },
            "args": [
              {
                "name": "allocationID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "courseID",
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
            "name": "deletePreference",
            "type": {
              "kind": "OBJECT",
              "name": "DeletePreference",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
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
            "name": "releaseCoursesForFaculty",
            "type": {
              "kind": "OBJECT",
              "name": "ReleaseCoursesForFaculty",
              "ofType": null
            },
            "args": [
              {
                "name": "identifier",
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
            "name": "updateBatchCurriculumExtraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateBatchCurriculumExtraCourse",
              "ofType": null
            },
            "args": [
              {
                "name": "add",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "batchId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "extraCourseType",
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
            "name": "updateBatchExtraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateBatchExtraCourse",
              "ofType": null
            },
            "args": [
              {
                "name": "batchId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "newExtraCourseId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "oldExtraCourseId",
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
            "name": "updateCourseAllocation",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateCourseAllocation",
              "ofType": null
            },
            "args": [
              {
                "name": "allocationID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "newFacultyID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "oldFacultyID",
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
            "name": "updateDeadline",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateDeadline",
              "ofType": null
            },
            "args": [
              {
                "name": "endTimestamp",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "identifier",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "startTimestamp",
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
            "name": "updateLabAllocation",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateLabAllocation",
              "ofType": null
            },
            "args": [
              {
                "name": "allocationID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "newFacultyID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "oldFacultyID",
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
            "name": "updatePreference",
            "type": {
              "kind": "OBJECT",
              "name": "UpdatePreference",
              "ofType": null
            },
            "args": [
              {
                "name": "experience",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "weightage",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updatePreferenceCount",
            "type": {
              "kind": "OBJECT",
              "name": "UpdatePreferenceCount",
              "ofType": null
            },
            "args": [
              {
                "name": "count",
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
            "name": "updateSemIdentifier",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateSemIdentifier",
              "ofType": null
            },
            "args": [
              {
                "name": "isEvenSem",
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
        "name": "PreferenceAllocationFacultyType",
        "fields": [
          {
            "name": "batches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "AllocationBatchType",
                "ofType": null
              }
            },
            "args": []
          },
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
            "name": "preferences",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseAllocationPreferenceType",
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
        "name": "PrefernceMutationResponse",
        "fields": [
          {
            "name": "preferences",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseAllocationPreferenceType",
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
            "name": "allocationManagement",
            "type": {
              "kind": "OBJECT",
              "name": "AllocationManagementType",
              "ofType": null
            },
            "args": [
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
            "name": "allocations",
            "type": {
              "kind": "OBJECT",
              "name": "ApprovedAllocationType",
              "ofType": null
            },
            "args": [
              {
                "name": "identifier",
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
            "name": "batch",
            "type": {
              "kind": "OBJECT",
              "name": "BatchType",
              "ofType": null
            },
            "args": [
              {
                "name": "batchId",
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
            "name": "batchManagement",
            "type": {
              "kind": "OBJECT",
              "name": "BatchManagementType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "batchSelectedExtraCourses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ExtraCourseType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "batchId",
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
                "name": "identifier",
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
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseType",
                "ofType": null
              }
            },
            "args": [
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
            "name": "coursesForPreference",
            "type": {
              "kind": "OBJECT",
              "name": "PreferenceAllocationFacultyType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "curriculumExtraCourses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CurriculumExtraCoursesType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "curriculumYear",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "extras",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "program",
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
            "name": "curriculumUpload",
            "type": {
              "kind": "OBJECT",
              "name": "CurriculumUploadType",
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
            "name": "metadata",
            "type": {
              "kind": "OBJECT",
              "name": "MetaDataType",
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
              },
              {
                "name": "userId",
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
        "name": "ReleaseCoursesForFaculty",
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
        "name": "SemesterExtraCourseType",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isElective",
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
        "name": "UpdateBatchCurriculumExtraCourse",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateBatchCurriculumExtraCourseResponse",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateBatchCurriculumExtraCourseResponse",
        "fields": [
          {
            "name": "activeBatches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ActiveBatchType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "semesterExtraCourses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "SemesterExtraCourseType",
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
        "name": "UpdateBatchExtraCourse",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateBatchExtraCourseResponse",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateBatchExtraCourseResponse",
        "fields": [
          {
            "name": "activeBatches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ActiveBatchType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "newExtraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "ExtraCourseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "oldExtraCourse",
            "type": {
              "kind": "OBJECT",
              "name": "ExtraCourseType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateCourseAllocation",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "AllocationsType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateDeadline",
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
        "name": "UpdateLabAllocation",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "AllocationsType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdatePreference",
        "fields": [
          {
            "name": "response",
            "type": {
              "kind": "OBJECT",
              "name": "PrefernceMutationResponse",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdatePreferenceCount",
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
        "name": "UpdateSemIdentifier",
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
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CurriculumUploadType",
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

export const AddCourseAllocationDocument = gql`
    mutation addCourseAllocation($FACULTY_ID: ID!, $COURSE_ID: ID!) {
  addCourseAllocation(facultyID: $FACULTY_ID, courseID: $COURSE_ID) {
    response {
      courses {
        id
        courseId
        facultyId
      }
      labs {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useAddCourseAllocationMutation() {
  return Urql.useMutation<AddCourseAllocationMutation, AddCourseAllocationMutationVariables>(AddCourseAllocationDocument);
};
export const AddLabAllocationDocument = gql`
    mutation addLabAllocation($FACULTY_ID: ID!, $COURSE_ID: ID!, $IS_IN_CHARGE: Boolean!) {
  addLabAllocation(
    facultyID: $FACULTY_ID
    courseID: $COURSE_ID
    isInCharge: $IS_IN_CHARGE
  ) {
    response {
      courses {
        id
        courseId
        facultyId
      }
      labs {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useAddLabAllocationMutation() {
  return Urql.useMutation<AddLabAllocationMutation, AddLabAllocationMutationVariables>(AddLabAllocationDocument);
};
export const UpdateCourseAllocationDocument = gql`
    mutation updateCourseAllocation($ALLOCATION_ID: ID!, $NEW_FACULTY_ID: ID!, $OLD_FACULTY_ID: ID!) {
  updateCourseAllocation(
    allocationID: $ALLOCATION_ID
    newFacultyID: $NEW_FACULTY_ID
    oldFacultyID: $OLD_FACULTY_ID
  ) {
    response {
      courses {
        id
        courseId
        facultyId
      }
      labs {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useUpdateCourseAllocationMutation() {
  return Urql.useMutation<UpdateCourseAllocationMutation, UpdateCourseAllocationMutationVariables>(UpdateCourseAllocationDocument);
};
export const UpdateLabAllocationDocument = gql`
    mutation updateLabAllocation($ALLOCATION_ID: ID!, $NEW_FACULTY_ID: ID!, $OLD_FACULTY_ID: ID!) {
  updateLabAllocation(
    allocationID: $ALLOCATION_ID
    newFacultyID: $NEW_FACULTY_ID
    oldFacultyID: $OLD_FACULTY_ID
  ) {
    response {
      courses {
        id
        courseId
        facultyId
      }
      labs {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useUpdateLabAllocationMutation() {
  return Urql.useMutation<UpdateLabAllocationMutation, UpdateLabAllocationMutationVariables>(UpdateLabAllocationDocument);
};
export const DeleteCourseAllocationDocument = gql`
    mutation deleteCourseAllocation($ALLOCATION_ID: ID!, $COURSE_ID: ID!) {
  deleteCourseAllocation(allocationID: $ALLOCATION_ID, courseID: $COURSE_ID) {
    response {
      courses {
        id
        courseId
        facultyId
      }
      labs {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useDeleteCourseAllocationMutation() {
  return Urql.useMutation<DeleteCourseAllocationMutation, DeleteCourseAllocationMutationVariables>(DeleteCourseAllocationDocument);
};
export const DeleteLabAllocationDocument = gql`
    mutation deleteLabAllocation($ALLOCATION_ID: ID!, $COURSE_ID: ID!) {
  deleteLabAllocation(allocationID: $ALLOCATION_ID, courseID: $COURSE_ID) {
    response {
      courses {
        id
        courseId
        facultyId
      }
      labs {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useDeleteLabAllocationMutation() {
  return Urql.useMutation<DeleteLabAllocationMutation, DeleteLabAllocationMutationVariables>(DeleteLabAllocationDocument);
};
export const UpdatePreferenceCountDocument = gql`
    mutation updatePreferenceCount($COUNT: Int!) {
  updatePreferenceCount(count: $COUNT) {
    response
  }
}
    `;

export function useUpdatePreferenceCountMutation() {
  return Urql.useMutation<UpdatePreferenceCountMutation, UpdatePreferenceCountMutationVariables>(UpdatePreferenceCountDocument);
};
export const UpdateSemIdentifierDocument = gql`
    mutation updateSemIdentifier($ISEVENSEM: Boolean!, $YEAR: Int!) {
  updateSemIdentifier(isEvenSem: $ISEVENSEM, year: $YEAR) {
    response
  }
}
    `;

export function useUpdateSemIdentifierMutation() {
  return Urql.useMutation<UpdateSemIdentifierMutation, UpdateSemIdentifierMutationVariables>(UpdateSemIdentifierDocument);
};
export const ReleaseCoursesForFacultyDocument = gql`
    mutation releaseCoursesForFaculty($IDENTIFIER: IdentifierInput!) {
  releaseCoursesForFaculty(identifier: $IDENTIFIER) {
    response
  }
}
    `;

export function useReleaseCoursesForFacultyMutation() {
  return Urql.useMutation<ReleaseCoursesForFacultyMutation, ReleaseCoursesForFacultyMutationVariables>(ReleaseCoursesForFacultyDocument);
};
export const UpdateDeadlineDocument = gql`
    mutation updateDeadline($IDENTIFIER: IdentifierInput!, $START_TIMESTAMP: DateTime!, $END_TIMESTAMP: DateTime!) {
  updateDeadline(
    identifier: $IDENTIFIER
    startTimestamp: $START_TIMESTAMP
    endTimestamp: $END_TIMESTAMP
  ) {
    response
  }
}
    `;

export function useUpdateDeadlineMutation() {
  return Urql.useMutation<UpdateDeadlineMutation, UpdateDeadlineMutationVariables>(UpdateDeadlineDocument);
};
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
export const AddBatchExtraCourseDocument = gql`
    mutation addBatchExtraCourse($BATCHID: ID!, $EXTRA_COURSEID: ID!) {
  addBatchExtraCourse(batchId: $BATCHID, extraCourseId: $EXTRA_COURSEID) {
    response {
      extraCourse {
        id
        code
        name
      }
      activeBatches {
        id
        program
        curriculumYear
        curriculumId
        sem
        year
        isComplete
      }
    }
  }
}
    `;

export function useAddBatchExtraCourseMutation() {
  return Urql.useMutation<AddBatchExtraCourseMutation, AddBatchExtraCourseMutationVariables>(AddBatchExtraCourseDocument);
};
export const UpdateBatchExtraCourseDocument = gql`
    mutation updateBatchExtraCourse($BATCHID: ID!, $OLD_EXTRA_COURSEID: ID!, $NEW_EXTRA_COURSEID: ID!) {
  updateBatchExtraCourse(
    batchId: $BATCHID
    oldExtraCourseId: $OLD_EXTRA_COURSEID
    newExtraCourseId: $NEW_EXTRA_COURSEID
  ) {
    response {
      oldExtraCourse {
        id
        code
        name
        courseType
      }
      newExtraCourse {
        id
        code
        name
        courseType
      }
      activeBatches {
        id
        program
        curriculumYear
        curriculumId
        sem
        year
        isComplete
      }
    }
  }
}
    `;

export function useUpdateBatchExtraCourseMutation() {
  return Urql.useMutation<UpdateBatchExtraCourseMutation, UpdateBatchExtraCourseMutationVariables>(UpdateBatchExtraCourseDocument);
};
export const DeleteBatchExtraCourseDocument = gql`
    mutation deleteBatchExtraCourse($BATCHID: ID!, $OLD_EXTRA_COURSEID: ID!) {
  deleteBatchExtraCourse(batchId: $BATCHID, oldExtraCourseId: $OLD_EXTRA_COURSEID) {
    response {
      oldExtraCourse {
        id
        code
        name
        courseType
      }
      activeBatches {
        id
        program
        curriculumYear
        curriculumId
        sem
        year
        isComplete
      }
    }
  }
}
    `;

export function useDeleteBatchExtraCourseMutation() {
  return Urql.useMutation<DeleteBatchExtraCourseMutation, DeleteBatchExtraCourseMutationVariables>(DeleteBatchExtraCourseDocument);
};
export const UpdateBatchCurriculumExtraCourseDocument = gql`
    mutation updateBatchCurriculumExtraCourse($BATCH_ID: ID!, $ADD: Boolean!, $EXTRA_COURSE_TYPE: String!) {
  updateBatchCurriculumExtraCourse(
    add: $ADD
    batchId: $BATCH_ID
    extraCourseType: $EXTRA_COURSE_TYPE
  ) {
    response {
      semesterExtraCourses {
        isElective
        name
        count
      }
      activeBatches {
        id
        program
        curriculumYear
        curriculumId
        sem
        year
        isComplete
      }
    }
  }
}
    `;

export function useUpdateBatchCurriculumExtraCourseMutation() {
  return Urql.useMutation<UpdateBatchCurriculumExtraCourseMutation, UpdateBatchCurriculumExtraCourseMutationVariables>(UpdateBatchCurriculumExtraCourseDocument);
};
export const DeleteCurriculumUploadDocument = gql`
    mutation deleteCurriculumUpload($CURRICULUMUPLOADID: ID!) {
  deleteCurriculumUpload(curriculumUploadID: $CURRICULUMUPLOADID) {
    response {
      id
      program
      year
      uploadedOn
      isPopulated
    }
  }
}
    `;

export function useDeleteCurriculumUploadMutation() {
  return Urql.useMutation<DeleteCurriculumUploadMutation, DeleteCurriculumUploadMutationVariables>(DeleteCurriculumUploadDocument);
};
export const VerifyCurriculumUploadDocument = gql`
    mutation verifyCurriculumUpload($CURRICULUMUPLOADID: ID!) {
  verifyCurriculumUpload(curriculumUploadID: $CURRICULUMUPLOADID) {
    response {
      id
      program
      year
      uploadedOn
      isPopulated
    }
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
export const AddPreferenceDocument = gql`
    mutation addPreference($COURSEID: ID!, $EXPERIENCE: Int!, $WEIGHTAGE: Int!) {
  addPreference(
    courseId: $COURSEID
    experience: $EXPERIENCE
    weightage: $WEIGHTAGE
  ) {
    response {
      preferences {
        id
        identifierYear
        identifierIsEvenSem
        facultyId
        courseId
        weigtage
        experience
        timestamp
      }
    }
  }
}
    `;

export function useAddPreferenceMutation() {
  return Urql.useMutation<AddPreferenceMutation, AddPreferenceMutationVariables>(AddPreferenceDocument);
};
export const UpdatePreferenceDocument = gql`
    mutation updatePreference($ID: ID!, $EXPERIENCE: Int, $WEIGHTAGE: Int) {
  updatePreference(id: $ID, experience: $EXPERIENCE, weightage: $WEIGHTAGE) {
    response {
      preferences {
        id
        identifierYear
        identifierIsEvenSem
        facultyId
        courseId
        weigtage
        experience
        timestamp
      }
    }
  }
}
    `;

export function useUpdatePreferenceMutation() {
  return Urql.useMutation<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>(UpdatePreferenceDocument);
};
export const DeletePreferenceDocument = gql`
    mutation deletePreference($ID: ID!) {
  deletePreference(id: $ID) {
    response {
      preferences {
        id
        identifierYear
        identifierIsEvenSem
        facultyId
        courseId
        weigtage
        experience
        timestamp
      }
    }
  }
}
    `;

export function useDeletePreferenceMutation() {
  return Urql.useMutation<DeletePreferenceMutation, DeletePreferenceMutationVariables>(DeletePreferenceDocument);
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
export const AllocationManagementDocument = gql`
    query allocationManagement($IDENTIFIER: IdentifierInput) {
  allocationManagement(identifier: $IDENTIFIER) {
    batches {
      id
      curriculumYear
      curriculumName
      batchYear
      batchSem
      courseLabs {
        courseId
        labId
      }
      courseAllocations {
        id
        courseId
        facultyId
      }
      labAllocations {
        id
        courseId
        facultyId
        isInCharge
      }
      courseIds
    }
    bestPreferences
    courses {
      id
      code
      name
      credit
      hours
      l
      t
      p
      isExtra
      isElective
      program
      curriculumYear
      batchYear
      sem
    }
    preferences {
      id
      facultyId
      courseId
      weigtage
      experience
      timestamp
      score
    }
    faculties {
      id
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
      minWorkload
      maxWorkload
      workload
    }
  }
}
    `;

export function useAllocationManagementQuery(options?: Omit<Urql.UseQueryArgs<AllocationManagementQueryVariables>, 'query'>) {
  return Urql.useQuery<AllocationManagementQuery, AllocationManagementQueryVariables>({ query: AllocationManagementDocument, ...options });
};
export const AllocationsDocument = gql`
    query allocations($IDENTIFIER: IdentifierInput!) {
  allocations(identifier: $IDENTIFIER) {
    faculties {
      id
      track
      designation
      minWorkload
      maxWorkload
      workload
      user {
        email
        firstName
        lastName
        username
      }
    }
    courses {
      id
      code
      name
      credit
      hours
      l
      t
      p
      isExtra
      isElective
      program
      curriculumYear
      batchYear
      sem
    }
    batches {
      id
      curriculumYear
      curriculumName
      batchYear
      batchSem
      courseIds
      courseAllocations {
        id
        courseId
        facultyId
      }
      labAllocations {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useAllocationsQuery(options: Omit<Urql.UseQueryArgs<AllocationsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllocationsQuery, AllocationsQueryVariables>({ query: AllocationsDocument, ...options });
};
export const BatchDocument = gql`
    query batch($BATCHID: ID!) {
  batch(batchId: $BATCHID) {
    curriculum {
      program
      year
    }
    year
    sem
    semesterExtraCourses {
      isElective
      name
      count
    }
    selectedExtraCourses {
      name
      courseType
    }
  }
}
    `;

export function useBatchQuery(options: Omit<Urql.UseQueryArgs<BatchQueryVariables>, 'query'>) {
  return Urql.useQuery<BatchQuery, BatchQueryVariables>({ query: BatchDocument, ...options });
};
export const BatchManagementDocument = gql`
    query batchManagement {
  batchManagement {
    activeBatches {
      id
      program
      curriculumYear
      curriculumId
      sem
      year
      isComplete
    }
  }
}
    `;

export function useBatchManagementQuery(options?: Omit<Urql.UseQueryArgs<BatchManagementQueryVariables>, 'query'>) {
  return Urql.useQuery<BatchManagementQuery, BatchManagementQueryVariables>({ query: BatchManagementDocument, ...options });
};
export const BatchesDocument = gql`
    query batches($IDENTIFIER: IdentifierInput) {
  batches(identifier: $IDENTIFIER) {
    curriculum {
      program
      year
    }
    semesterExtraCourses {
      isElective
      name
      count
    }
    selectedExtraCourses {
      id
      code
      name
      l
      t
      p
      credit
      hours
      courseType
    }
    extraCourseLeftToAssign
    year
    sem
  }
}
    `;

export function useBatchesQuery(options?: Omit<Urql.UseQueryArgs<BatchesQueryVariables>, 'query'>) {
  return Urql.useQuery<BatchesQuery, BatchesQueryVariables>({ query: BatchesDocument, ...options });
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
export const CoursesForPreferenceDocument = gql`
    query coursesForPreference {
  coursesForPreference {
    preferences {
      id
      identifierYear
      identifierIsEvenSem
      facultyId
      courseId
      weigtage
      experience
      timestamp
    }
    faculties {
      id
      track
      designation
      minWorkload
      maxWorkload
      workload
      user {
        id
        email
        firstName
        lastName
      }
    }
    courses {
      id
      code
      name
      credit
      hours
      l
      t
      p
      isExtra
      isElective
      batchId
      sem
    }
    batches {
      id
      curriculumYear
      curriculumName
      batchYear
      batchSem
      courseLabs {
        courseId
        labId
      }
      courseIds
      courseAllocations {
        id
        courseId
        facultyId
      }
      labAllocations {
        id
        courseId
        facultyId
        isInCharge
      }
    }
  }
}
    `;

export function useCoursesForPreferenceQuery(options?: Omit<Urql.UseQueryArgs<CoursesForPreferenceQueryVariables>, 'query'>) {
  return Urql.useQuery<CoursesForPreferenceQuery, CoursesForPreferenceQueryVariables>({ query: CoursesForPreferenceDocument, ...options });
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
export const CurriculumUploadDocument = gql`
    query curriculumUpload($PROGRAM: String!, $YEAR: Int!) {
  curriculumUpload(program: $PROGRAM, year: $YEAR) {
    program
    year
    isPopulated
    uploadedOn
    data
  }
}
    `;

export function useCurriculumUploadQuery(options: Omit<Urql.UseQueryArgs<CurriculumUploadQueryVariables>, 'query'>) {
  return Urql.useQuery<CurriculumUploadQuery, CurriculumUploadQueryVariables>({ query: CurriculumUploadDocument, ...options });
};
export const CurriculumUploadsDocument = gql`
    query curriculumUploads {
  curriculumUploads {
    id
    program
    year
    uploadedOn
    isPopulated
  }
}
    `;

export function useCurriculumUploadsQuery(options?: Omit<Urql.UseQueryArgs<CurriculumUploadsQueryVariables>, 'query'>) {
  return Urql.useQuery<CurriculumUploadsQuery, CurriculumUploadsQueryVariables>({ query: CurriculumUploadsDocument, ...options });
};
export const CurriculumExtraCoursesDocument = gql`
    query curriculumExtraCourses($EXTRAS: [String]!, $PROGRAM: String!, $CURRICULUMYEAR: Int!, $BATCHID: ID!) {
  curriculumExtraCourses(
    extras: $EXTRAS
    program: $PROGRAM
    curriculumYear: $CURRICULUMYEAR
  ) {
    extra
    courses {
      id
      code
      name
    }
  }
  batchSelectedExtraCourses(batchId: $BATCHID) {
    id
    code
    name
    courseType
  }
}
    `;

export function useCurriculumExtraCoursesQuery(options: Omit<Urql.UseQueryArgs<CurriculumExtraCoursesQueryVariables>, 'query'>) {
  return Urql.useQuery<CurriculumExtraCoursesQuery, CurriculumExtraCoursesQueryVariables>({ query: CurriculumExtraCoursesDocument, ...options });
};
export const MetadataDocument = gql`
    query metadata {
  metadata {
    user {
      id
      email
      firstName
      lastName
      username
      isStaff
      isActive
    }
    faculty {
      id
      track
      designation
    }
    config {
      preferenceCount
      currentPreferenceSem {
        year
        isEvenSem
        startTimestamp
        endTimestamp
        isPaused
        areCoursesVerified
      }
    }
  }
}
    `;

export function useMetadataQuery(options?: Omit<Urql.UseQueryArgs<MetadataQueryVariables>, 'query'>) {
  return Urql.useQuery<MetadataQuery, MetadataQueryVariables>({ query: MetadataDocument, ...options });
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
        email
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
      program
      curriculumYear
      batchYear
      sem
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