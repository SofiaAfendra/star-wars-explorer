export default {
  root: {
    height: "100vh",
    display: "grid",
    gridTemplateRows: "2fr 5fr 5fr 1fr",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateAreas: `
        "header header header header"
        "sidebar main main main"
        "sidebar main main main" 
        "footer footer footer footer"
        `,
  },
  header: {
    // backgroundColor: "#1C1E22",
    gridArea: "header",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontStyle: "italic",
    color: "#FFD700",
    fontSize: "3rem",
    p: 2,
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1em",
  },
  main: {
    // backgroundColor: "#272B30",
    gridArea: "main",
  },
  sidebar: {
    // backgroundColor: "#1C1E22",
    gridArea: "sidebar",
  },
  listItem: {
    p: 2,
  },
  footer: {
    // backgroundColor: "#1C1E22",
    gridArea: "footer",
  },
};
