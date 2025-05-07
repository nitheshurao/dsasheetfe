import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Box,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../components/Navbar";
import axios from "../services/api";
import SubTopicsTable from "../components/SubTopicsTable";
import Loader from "../components/Loader";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 🔴 error state added

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsRes, progressRes] = await Promise.all([
          axios.get("/dsa/topics"),
          axios.get("/dsa/progress"),
        ]);
        setTopics(topicsRes.data);
        setProgress(progressRes.data || {});
      } catch (err) {
        console.error("❌ Failed to fetch topics or progress:", err);
        setError("Failed to load topics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = async (problemId, checked, topicId) => {
    const newProgress = { ...progress, [problemId]: checked };
    setProgress(newProgress);

    try {
      await axios.post("/dsa/update-progress", {
        topicId,
        problemId,
        status: checked,
      });
    } catch (err) {
      console.error("⚠️ Progress update failed:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box textAlign="center" mt={4} mb={2}>
          <Typography variant="h4" color="#1874cb" gutterBottom>
            Topics
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Explore these exciting topics!
          </Typography>
        </Box>

        {error ? (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        ) : (
          topics.map((topic) => {
            const allDone = topic.problems.every((p) => progress[p._id]);
            const statusLabel = allDone ? "Completed" : "Pending";
            const statusColor = allDone ? "success" : "error";

            return (
              <Accordion key={topic._id} sx={{ backgroundColor: "#e9f8fc" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ backgroundColor: "#9dbde0" }}
                >
                  <Typography>{topic.title}</Typography>
                  <Chip
                    label={statusLabel}
                    color={statusColor}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h5" sx={{ m: 2 }} gutterBottom>
                    Sub Topics
                  </Typography>
                  <SubTopicsTable
                    problems={topic.problems}
                    progress={progress}
                    onCheckChange={(problemId, checked) =>
                      handleCheckboxChange(problemId, checked, topic._id)
                    }
                  />
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Container>
    </>
  );
};

export default Topics;
