import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from "@mui/material";

function App() {
  const [source, setSource] = useState("");
  const [clickhouseConfig, setClickhouseConfig] = useState({
    host: "",
    port: "",
    database: "",
    user: "",
    jwtToken: "",
  });
  const [fileConfig, setFileConfig] = useState({
    file: null,
    delimiter: ",",
    hasHeader: false,
  });
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClickhouseConnect = () => {
    // Handle ClickHouse connection
  };

  const handleLoadColumns = () => {
    // Handle loading columns
  };

  const handlePreviewData = () => {
    // Handle previewing data
  };

  const handleStartIngestion = () => {
    // Handle starting ingestion
  };

  return (
    <Container maxWidth="md" sx={{ pb: 6 }}>
      <Box
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          py: 2,
          px: 3,
          mb: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          letterSpacing={1}
        >
          Data Ingestion Tool
        </Typography>
      </Box>

      <Card sx={{ mb: 3, p: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Data Source
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <FormControlLabel
              value="clickhouse"
              control={<Radio color="primary" />}
              label="ClickHouse"
            />
            <FormControlLabel
              value="file"
              control={<Radio color="primary" />}
              label="Flat File"
            />
          </RadioGroup>
        </FormControl>
      </Card>

      {source === "clickhouse" && (
        <Card sx={{ mb: 3, p: 3, boxShadow: 3, bgcolor: "#f5faff" }}>
          <Typography variant="h6" gutterBottom>
            ClickHouse Configuration
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Host"
                value={clickhouseConfig.host}
                onChange={(e) =>
                  setClickhouseConfig({
                    ...clickhouseConfig,
                    host: e.target.value,
                  })
                }
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Port"
                type="number"
                value={clickhouseConfig.port}
                onChange={(e) =>
                  setClickhouseConfig({
                    ...clickhouseConfig,
                    port: e.target.value,
                  })
                }
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Database"
                value={clickhouseConfig.database}
                onChange={(e) =>
                  setClickhouseConfig({
                    ...clickhouseConfig,
                    database: e.target.value,
                  })
                }
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="User"
                value={clickhouseConfig.user}
                onChange={(e) =>
                  setClickhouseConfig({
                    ...clickhouseConfig,
                    user: e.target.value,
                  })
                }
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="JWT Token"
                type="password"
                value={clickhouseConfig.jwtToken}
                onChange={(e) =>
                  setClickhouseConfig({
                    ...clickhouseConfig,
                    jwtToken: e.target.value,
                  })
                }
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={handleClickhouseConnect}
              disabled={loading}
              size="large"
              sx={{ minWidth: 140 }}
            >
              {loading ? <CircularProgress size={24} /> : "Connect"}
            </Button>
          </Box>
        </Card>
      )}

      {source === "file" && (
        <Card sx={{ mb: 3, p: 3, boxShadow: 3, bgcolor: "#f5faff" }}>
          <Typography variant="h6" gutterBottom>
            File Configuration
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" component="label" sx={{ mb: 2 }}>
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setFileConfig({ ...fileConfig, file: e.target.files[0] })
                  }
                />
              </Button>
              {fileConfig.file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {fileConfig.file.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Delimiter"
                value={fileConfig.delimiter}
                onChange={(e) =>
                  setFileConfig({ ...fileConfig, delimiter: e.target.value })
                }
                inputProps={{ maxLength: 1 }}
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fileConfig.hasHeader}
                    onChange={(e) =>
                      setFileConfig({
                        ...fileConfig,
                        hasHeader: e.target.checked,
                      })
                    }
                  />
                }
                label="File has header row"
              />
            </Grid>
          </Grid>
        </Card>
      )}

      {tables.length > 0 && (
        <Card sx={{ mb: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom>
            Table Selection
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel>Select Table</InputLabel>
            <Select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              size="small"
            >
              {tables.map((table) => (
                <MenuItem key={table} value={table}>
                  {table}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={handleLoadColumns}
              disabled={!selectedTable || loading}
              size="large"
              sx={{ minWidth: 140 }}
            >
              {loading ? <CircularProgress size={24} /> : "Load Columns"}
            </Button>
          </Box>
        </Card>
      )}

      {columns.length > 0 && (
        <Card sx={{ mb: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom>
            Column Selection
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {columns.map((column) => (
              <Grid item xs={12} sm={6} md={4} key={column}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedColumns.includes(column)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedColumns([...selectedColumns, column]);
                        } else {
                          setSelectedColumns(
                            selectedColumns.filter((col) => col !== column)
                          );
                        }
                      }}
                    />
                  }
                  label={column}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={handlePreviewData}
              disabled={selectedColumns.length === 0 || loading}
              size="large"
              sx={{ minWidth: 140 }}
            >
              {loading ? <CircularProgress size={24} /> : "Preview Data"}
            </Button>
          </Box>
        </Card>
      )}

      {previewData.length > 0 && (
        <Card sx={{ mb: 3, p: 3, boxShadow: 1, bgcolor: "#f9fbe7" }}>
          <Typography variant="h6" gutterBottom>
            Data Preview
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(previewData[0]).map((column) => (
                    <TableCell key={column} sx={{ fontWeight: 600 }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {((source === "clickhouse" && selectedColumns.length > 0) ||
        (source === "file" && fileConfig.file)) && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartIngestion}
            disabled={loading}
            sx={{ minWidth: 180, fontWeight: 600, fontSize: 18 }}
          >
            {loading ? <CircularProgress size={24} /> : "Start Ingestion"}
          </Button>
        </Box>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
