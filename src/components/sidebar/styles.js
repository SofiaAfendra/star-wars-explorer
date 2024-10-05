export default {
  sidebar: {
    gridArea: "sidebar",
    p: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  skeleton: { fontSize: "1rem" },
  list: { height: "100%", width: "100%" },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    px: 1,
    "&:hover": { backgroundColor: "#f0f0f0" },
  },
  selected: { backgroundColor: "#f0f0f0" },
};
