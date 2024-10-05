export default {
  header: {
    gridArea: "header",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
  },
  heading: {
    fontStyle: "italic",
    color: "#FFD700",
    fontSize: "3rem",
    p: 2,
    display: {
      xs: "none",
      sm: "block",
    },
  },
  filters: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    flexWrap: {
      xs: "wrap",
      sm: "nowrap",
    },
  },
};
