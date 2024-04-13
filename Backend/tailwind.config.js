/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
   darkMode:'class',
  theme: {
    extend: {
      height:{
        header:'560px',
        rate:'400px',
      },
      fontSize:{
        h1:'2.6rem',
      },
      screens:{
        xs:'475px'
      },
      colors:{
        primary:'#171717',
        secondary:'#272727',
        'dark-subtle':"rgba(255,255,255,0.5)",
        'light-subtle':"rgba(255,255,255,0.5)",
        "highlight-dark": "#ffc200",
         highlight: "#058bfb",
         main:"#080A1A",
         subMain:"#F20000",
         dry:"#0B0F29",
         star:"#FFB000",
         text:"#C0C0C0",
         border:"#4b5563",
         dryGray:"#E0D5D5",
      }
    },
  },
  plugins: [],
}
