import stream from 'stream';
import { promisify } from 'util';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReportInput } from '@/pages/faculty/report';
import { ApprovedAllocationType, AllocationsDocument, FacultyType, AllocationBatchType, CourseType } from "@/graphql/generated/graphql";
const XLSX = require('xlsx');


const courseBookQuery = `query($IDENTIFIER: IdentifierInput!){
    allocations(identifier: $IDENTIFIER){
        faculties{
            id
            user{
                email
                firstName
                lastName
                username
            }
            }
            courses{
            id
            code
            name
            credit
            l
            t
            p
            }
            batches{
            id
            curriculumYear
            curriculumName
            batchYear
            batchSem
            courseIds
            courseAllocations{
                id
                courseId
                facultyId
            }
            labAllocations{
                id
                courseId
                facultyId
                isInCharge
            }
        }
    }
}
`;

const fetchGraphQL = async (accessToken: string, query: string, variables?: any) => {
    const response = await fetch(process.env.BACKEND_GRAPHQL_ENDPOINT || 'http://127.0.0.1:8000/api/graphql/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ accessToken,
        },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  
    const { data, errors } = await response.json();
  
    if (errors) {
      throw new Error(errors[0].message);
    }
  
    return data;
  };

const addHeading = (worksheet: any, title: string) => {
    XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: -1 });
}

const addSpacing = (worksheet: any, rows?: number) => {
    if (rows) 
        for (let i=1; i < rows; i++) 
            XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
}

const addTableData = (worksheet: any, data: any) => {
    XLSX.utils.sheet_add_aoa(worksheet, data, { origin: -1 });
}

const courseBookXLSX = (worksheet: any, batches: AllocationBatchType[], courses: CourseType[], faculties: FacultyType[]) => {
    batches.forEach((b, i)=> {
        addHeading(worksheet, `S${b.batchSem} ${b.curriculumName} ${b.batchYear} Admissions`);
        if (i === 0 ) addTableData(worksheet, [['Code', 'Name', 'L', 'T', 'P', 'Cr', 'Faculty']]);
        const batchCourses = b.courseIds.map(cID => {
            const course = courses.find(c => c.id === cID)
            const courseAllocation = b?.courseAllocations.filter(ca => ca.courseId == course.id);
            const labAllocation = b?.labAllocations.filter(la => la.courseId == course.id);
            let facultyNames: String[] = [];
            if (courseAllocation) {
                courseAllocation.forEach(ca => {
                    const faculty = faculties.find(f=> f.id === ca.facultyId);
                    if (faculty)
                        facultyNames.push(faculty?.user?.firstName + " " + faculty?.user?.lastName);
                })
            }
            if (labAllocation) {
                labAllocation.forEach(la => {
                    const faculty = faculties.find(f => f.id === la.facultyId);
                    if (faculty)
                        facultyNames.push(faculty?.user?.firstName + " " + faculty?.user?.lastName);
                })
            }
            const facultyField = facultyNames.join(" / ");
            return [course.code, course.name, course.l, course.t, course.p, course.credit, facultyField];
        });
        addTableData(worksheet, batchCourses);
    })
}

const workloadXLSX = (worksheet: any, batches: AllocationBatchType[], courses: CourseType[], faculties: FacultyType[]) => {
    addTableData(worksheet, [['Name', 'L', 'T', 'P', 'Cr', 'Total Hours']]);
    faculties.forEach((f, i) => {
        const courseIds = batches.flatMap(b=>b.courseAllocations.filter(ca=>ca.facultyId===f.id).map(ca=>ca.courseId));
        const facultyCourses = courseIds.map(cid => courses.find(c => c.id == cid));
        const initialTotal = { l: 0, t: 0, p: 0, cr: 0 };
        const totals = facultyCourses.reduce((acc, course) => {
            acc.l += course.l;
            acc.t += course.t;
            acc.p += course.p;
            acc.cr += course.credit;
            return acc;
        }, initialTotal);
        const facultyName = f?.user?.firstName + " " + f?.user?.lastName;
        addTableData(worksheet, [[facultyName, totals.l, totals.t, totals.p, totals.cr, totals.l + totals.t + totals.p]]);
    });
}

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { accessToken } = await getAccessToken(req, res);
    const inp: ReportInput = req.body;
    try {

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([]);
        const {batches, courses, faculties}: ApprovedAllocationType = (await fetchGraphQL(accessToken, courseBookQuery, {IDENTIFIER: inp.identifier}))?.allocations;

        addHeading(worksheet, 'Main Department of Computer Science & Applications, Amritapuri Campus');
        addSpacing(worksheet);
        addHeading(worksheet,  `${inp.type === 'courseBook' ? 'COURSE BOOK' : 'FACULTY WORKLOAD'} FOR THE TERM JANUARY - MAY 2023`);
        addSpacing(worksheet);
        let fileName = '';

        if (inp.type === "courseBook") {    
            fileName = 'Coursebook_JAN_MAY_2023';
            courseBookXLSX(worksheet, batches, courses, faculties);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Course Book'); // Add the worksheet to the workbook
        } else {
            fileName = 'Faculty_Workload_JAN_MAY_2023';
            console.log(fileName);
            workloadXLSX(worksheet, batches, courses, faculties);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Faculty Workload');
        } 
        
        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }); // Convert workbook to buffer
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
        res.end(excelBuffer);


        } catch (error) {
            res.setHeader("content-type", "application/json")
            res.status(500).end(JSON.stringify({"error": error.message}));
        }
        // res.end(JSON.stringify({message: inp}));
    })