export default {
  main: {
    gridArea: "main",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #BCBCBC",
    borderRadius: "5px",
  },
  container: {
    overflowWrap: "break-word",
    p: 2,
    "&:nth-child(odd)": {
      backgroundColor: "#f0f0f0",
    },
  },
  key: {
    fontWeight: "bold",
  },
  helperText: {
    textAlign: "center",
    p: 2,
  },
};
