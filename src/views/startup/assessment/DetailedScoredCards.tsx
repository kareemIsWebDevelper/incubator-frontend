import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const detailedScoreData = [
  {
    title: 'BUSINESS CONCEPT',
    titleBgColor: 'bg-gray-200', // A slightly darker gray for the title bar
    titleTextColor: 'text-gray-700',
    itemPillStyles: 'bg-orange-100 text-orange-700',
    items: [
      { name: 'Business Idea', score: '4.5 %' },
      { name: 'Product Portfolio', score: '0 %' },
      { name: 'Business Model', score: '0 %' },
      { name: 'Customer Portfolio', score: '0 %' },
      { name: 'Market Position', score: '0.3 %' },
    ],
  },
  {
    title: 'ORGANISATION',
    titleBgColor: 'bg-gray-200',
    titleTextColor: 'text-gray-700',
    itemPillStyles: 'bg-green-100 text-green-700',
    items: [
      { name: 'Ownergroup & Board', score: '2.4 %' },
      { name: 'Employees', score: '1 %' },
      { name: 'Business Processes', score: '3.75 %' },
      { name: 'Partnerships', score: '2.25 %' },
      { name: 'Legal Issues', score: '0 %' },
    ],
  },
  {
    title: 'CUSTOMER RELATIONS',
    titleBgColor: 'bg-gray-200',
    titleTextColor: 'text-gray-700',
    itemPillStyles: 'bg-red-100 text-red-700',
    items: [
      { name: 'Network', score: '0.6 %' },
      { name: 'Marketing', score: '0.6 %' },
      { name: 'Sales', score: '0 %' },
      { name: 'Communications & PR', score: '0 %' },
      { name: 'Branding', score: '0 %' },
    ],
  },
  {
    title: 'OPERATIONS',
    titleBgColor: 'bg-gray-200',
    titleTextColor: 'text-gray-700',
    itemPillStyles: 'bg-sky-100 text-sky-700', // Using sky for the light blue pills
    items: [
      { name: 'Management Accounting', score: '0 %' },
      { name: 'Financing', score: '0 %' },
      { name: 'Production Management', score: '0 %' },
      { name: 'IT Systems', score: '0 %' },
      { name: 'Facilities', score: '0 %' },
    ],
  },
];

const scorePillCommonStyles = 'bg-cyan-100 text-cyan-700'; // Common style for all score value pills

const DetailedScoreCards = () => {
  return (
    <Box className="flex flex-wrap gap-4 md:gap-0 justify-center md:justify-between mt-6">
      {detailedScoreData.map((category) => (
        <Paper
          key={category.title}
          elevation={3} // Using a slightly more pronounced shadow
          className="rounded-xl overflow-hidden bg-white shadow-lg flex flex-col w-full md:w-fit" // Added flex flex-col
        >
          <Typography
            variant="h6"
            component="div"
            className={`py-3 px-4 text-center font-semibold uppercase text-sm tracking-wider ${category.titleBgColor} ${category.titleTextColor}`}
          >
            {category.title}
          </Typography>
          <Box className="p-4 sm:p-5 space-y-3 flex-grow"> {/* Added flex-grow for consistent card height if needed */}
            {category.items.map((item) => (
              <Box
                key={item.name}
                className="flex justify-between items-center space-x-2"
              >
                {/* Item Name Pill */}
                <Box
                  component="span"
                  title={item.name} // Tooltip for truncated names
                  className={`${category.itemPillStyles} px-3 py-1.5 rounded-full text-xs font-medium truncate min-w-0`}
                  // min-w-0 is important for truncate to work in a flex item
                >
                  {item.name}
                </Box>

                {/* Score Section */}
                <Box className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                  <Typography variant="caption" className="text-gray-500 text-xs">
                    Score
                  </Typography>
                  <Box
                    component="span"
                    className={`${scorePillCommonStyles} px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}
                  >
                    {item.score}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

// Example of how to use it in your App.js or another component:
// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
//       <div className="w-full max-w-7xl"> {/* Optional max-width container */}
//         <DetailedScoreCards />
//       </div>
//     </div>
//   );
// }
// export default App;

export default DetailedScoreCards;