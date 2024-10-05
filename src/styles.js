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
  footer: {
    gridArea: "footer",
  },
};
