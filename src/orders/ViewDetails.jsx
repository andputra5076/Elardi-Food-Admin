import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function ViewDetails({ fid, closeEvent }) {
  const getJsonIndented = (obj) =>
    JSON.stringify(obj, null, 4).replace(/["{[,\}\]]/g, "");

  return (
    <>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <pre>{getJsonIndented(fid)}</pre>
        </Grid>
      </Grid>
    </>
  );
}
