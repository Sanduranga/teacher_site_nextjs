import Link from "next/link";
import { useEffect } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { fetchStudents } from "@/redux/features/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

export interface ourStd {
  _id: string;
  studentName: string;
  studentId: string;
  gender: string;
  subjectName: string;
  subjectMarks: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function OurStudents() {
  const apiUrl = process.env.API_URL;
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents() as any);
  }, [dispatch]);

  const students = useSelector((state: RootState) => state.student.ourStudents);
  const isLoading = useSelector((state: RootState) => state.student.isLoading);

  const handleDelete = async (_id: string) => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`${apiUrl}/api/student?id=${_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <div>
      <div
        className={`${
          isLoading
            ? "flex items-center justify-center w-full h-screen"
            : "hidden"
        }`}
      >
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-800">
          <svg
            fill="none"
            className="w-9 h-9 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>

          <div className="text-xl">Loading ...</div>
        </div>
      </div>
      <div className={`${isLoading ? "hidden" : "block"}`}>
        {students.map((ourStudents: ourStd) => {
          return (
            <div
              className="flex flex-col justify-center items-center p-3 border-2 border-black shadow-md w-auto"
              key={ourStudents?._id}
            >
              <h1>Student name:{ourStudents?.studentName}</h1>
              <div>Student ID:{ourStudents?.studentId}</div>
              <h1>Gender:{ourStudents?.gender}</h1>
              <h1>
                Subject:
                {ourStudents?.subjectName} {""} Marks:
                {ourStudents?.subjectMarks}
              </h1>

              <div className="flex">
                <Link href={`/editStudent/${ourStudents.studentId}`}>
                  <HiPencilAlt size={24} />
                </Link>{" "}
                <h1
                  onClick={() => {
                    handleDelete(ourStudents._id);
                  }}
                  className="text-red-700"
                >
                  <HiOutlineTrash size={24} />
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
