import stream from 'stream';
import { promisify } from 'util';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReportInput } from '@/pages/faculty/report';
import { ApprovedAllocationType, AllocationsDocument, FacultyType } from "@/graphql/generated/graphql";
const XLSX = require('xlsx');


const pipeline = promisify(stream.pipeline);
const url = 'https://w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

const table1Data = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'Los Angeles' },
  ];
  
  const table2Data = [
    { country: 'USA', population: 328.2 },
    { country: 'Canada', population: 37.6 },
  ];

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
    // const cell = XLSX.utils.encode_cell({ r: worksheet['!rows'].length, c: 0 });
    // console.log("cell", cell)
    // worksheet[cell] = { v: title, t: 's', s: { bold: true } };
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

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { accessToken } = await getAccessToken(req, res);
    const inp: ReportInput = req.body;
    try {
        if (inp.format === 'xlsx') {
            const workbook = XLSX.utils.book_new(); // Create a new workbook
            const worksheet = XLSX.utils.aoa_to_sheet([]); // Create an empty worksheet
            const {batches, courses, faculties}: ApprovedAllocationType = (await fetchGraphQL(accessToken, courseBookQuery, {IDENTIFIER: inp.identifier}))?.allocations;

            if (inp.type === "courseBook") {
                addHeading(worksheet, 'Main Department of Computer Science & Applications, Amritapuri Campus');
                addSpacing(worksheet);
                addHeading(worksheet, 'COURSE BOOK FOR THE TERM JANUARY - MAY 2023');
                addSpacing(worksheet);
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
                    addSpacing(worksheet);
                })
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // Add the worksheet to the workbook
            
                const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }); // Convert workbook to buffer
                
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
                res.end(excelBuffer);
            }
            
            // res.end(JSON.stringify({message: response.batches}));
                
        }
            
            
            // const mainTitle = ['Main Department of Computer Science & Applications, Amritapuri Campus'];
            // const subTitle = ['COURSE BOOK FOR THE TERM JANUARY - MAY 2023'];
            // const table1Heading = ['S2 BCA DS  2022 Admissions'];
            // const table1DataRows = table1Data.map((row) => Object.values(row));
            // const table2Heading = ['S2 BCA DS  2022 Admissions'];
            // const table2DataRows = table2Data.map((row) => Object.values(row));
            
            
            // XLSX.utils.sheet_add_aoa(worksheet, [mainTitle], { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, [subTitle], { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
            
            // XLSX.utils.sheet_add_aoa(worksheet, [table1Heading], { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, table1DataRows, { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, [table2Heading], { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, table2DataRows, { origin: -1 });
            // XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
            
            
            
        } catch (error) {
            res.setHeader("content-type", "application/json")
            res.status(500).end(JSON.stringify({"error": error.message}));
        }
        // res.end(JSON.stringify({message: inp}));
    })