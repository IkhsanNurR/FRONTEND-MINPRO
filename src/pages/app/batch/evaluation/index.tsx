import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";

const Evaluation = () => {
  const router = useRouter();

  const { id } = router.query;
  console.log("id", id);

  const columns = [
    { name: "No" },
    { name: "Batch" },
    { name: "Technology" },
    { name: "Week " },
    { name: "Evaluated" },
    { name: "Aksi" },
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="mt-20">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {(columns || []).map((col) => (
                <>
                  <TableCell className="bg-gray-200 text-center justify-center items-center">
                    {col.name}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className=" text-center">1</TableCell>
              <TableCell className=" text-center">Batch 1</TableCell>
              <TableCell className=" text-center">NodeJs</TableCell>
              <TableCell className=" text-center">1</TableCell>
              <TableCell className=" text-center">not yet</TableCell>
              <TableCell className=" text-center">
                <button className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-green-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1"
                onClick={()=> router.push(`./evaluation/week/${id}`)}
                >
                  Detail
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Evaluation;
