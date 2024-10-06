export default {
  root: {
    height: "100vh",
    p: 2,
    display: "grid",
    gridTemplateRows: "2fr 5fr 5fr 1fr",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateAreas: {
      xs: `
        "header header header header"
        "sidebar sidebar sidebar sidebar"
        "main main main main" 
        "main main main main"
        `,
      sm: `
        "header header header header"
        "sidebar sidebar main main"
        "sidebar sidebar main main" 
        "footer footer footer footer"
        `,
      md: `
        "header header header header"
        "sidebar main main main"
        "sidebar main main main" 
        "footer footer footer footer"
        `,
    },
  },
  footer: {
    gridArea: "footer",
  },
};
