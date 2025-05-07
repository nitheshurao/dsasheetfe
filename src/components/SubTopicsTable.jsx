import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Link,
  Paper,
  Chip,
} from "@mui/material";

const HEADERS = [
  "",
  "Name",
  "LeetCode Link",
  "YouTube Link",
  "Article Link",
  "Level",
  "Status",
];

const getLevelColor = (level) =>
  ({
    EASY: "success",
    MEDIUM: "warning",
    HARD: "error",
  }[level] || "default");
const ExternalLink = ({ url, label }) => (
  <Link href={url} target="_blank" rel="noopener">
    {label}
  </Link>
);

const SubTopicsTable = ({ problems, progress, onCheckChange }) => (
  <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "none" }}>
    <Table>
      <TableHead>
        <TableRow>
          {HEADERS.map((header, idx) => (
            <TableCell key={idx} sx={{ fontWeight: "bold", color: "#000" }}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {problems.map((problem, idx) => {
          const isChecked = progress[problem._id] || false;
          const rowColor = idx % 2 === 0 ? "#ffffff" : "#f3fafa";

          return (
            <TableRow
              key={problem._id}
              sx={{
                backgroundColor: rowColor,
                "&:hover": { backgroundColor: "#e0f7ff" },
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => onCheckChange(problem._id, e.target.checked)}
                />
              </TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell>
                <ExternalLink url={problem.leetcodeLink} label="Practise" />
              </TableCell>
              <TableCell>
                <ExternalLink url={problem.youtubeLink} label="Watch" />
              </TableCell>
              <TableCell>
                <ExternalLink url={problem.articleLink} label="Read" />
              </TableCell>
              <TableCell>
                <Chip
                  label={problem.level}
                  color={getLevelColor(problem.level)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={isChecked ? "Done" : "Pending"}
                  color={isChecked ? "success" : "default"}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default SubTopicsTable;
