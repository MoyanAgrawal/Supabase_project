import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./badge";
import { useEffect, useState } from "react";

export function MainTable({ studentInfoFromDashBoard }) {
  const [studentData, setStudentData] = useState([]);
  const [expandedCourses, setExpandedCourses] = useState({}); // Track expanded courses per student

  const handleToggleCourses = (studentId) => {
    setExpandedCourses((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId], // Toggle visibility of courses for the given student
    }));
  };

  useEffect(() => {
    if (studentInfoFromDashBoard) {
      setStudentData(studentInfoFromDashBoard);
    }
  }, [studentInfoFromDashBoard]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>A list of your recent students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Student Name</TableHead>
            <TableHead>Cohort</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-left">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentData &&
            studentData.map((it) => (
              <TableRow key={it?.id}>
                <TableCell className="font-medium">{it?.students_Name}</TableCell>
                <TableCell className="text-left">{it?.cohort}</TableCell>
                <TableCell className="text-left flex gap-2">
                  {it.courses.slice(0, 2).map((course, idx) => (
                    <Badge
                      key={idx}
                      className="flex gap-2 bg-[#ccc] text-black px-2 rounded"
                    >
                      <img
                        src="https://github.com/shadcn.png"
                        width={20}
                        height={20}
                        alt="Badge icon"
                        className="rounded border"
                      />
                      {course}
                    </Badge>
                  ))}
                  {it.courses.length > 2 && !expandedCourses[it.id] && (
                  <Badge
                    onClick={() => handleToggleCourses(it.id)} // Toggle on click
                    className="flex gap-2 bg-[#ccc] text-black px-2 rounded cursor-pointer"
                  >
                    +{it.courses.length - 2} more
                  </Badge>
                )}

                {/* Show all courses if expanded */}
                {expandedCourses[it.id] && 
                  it.courses.slice(2).map((course, idx) => (
                    <Badge
                      key={idx + 2} // Adjusted key to ensure uniqueness
                      className="flex gap-2 bg-[#ccc] text-black px-2 rounded"
                    >
                      <img
                        src="https://github.com/shadcn.png"
                        width={20}
                        height={20}
                        alt="Badge icon"
                        className="rounded border"
                      />
                      {course}
                    </Badge>
                  ))
                }
                </TableCell>
                <TableCell className="text-left">{it?.date_of_joining}</TableCell>
                <TableCell className="text-left">
                  {it?.last_login ? it?.last_login : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {it?.status ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
