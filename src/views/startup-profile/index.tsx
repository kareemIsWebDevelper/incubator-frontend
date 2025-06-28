import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Divider,
  Link,
  Avatar,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';

// Helper function to format currency
const formatCurrency = (amount: number | null | undefined, currency?: string): string => {
  if (amount === null || amount === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(amount);
};

interface StartupData {
  name_en?: string;
  logo?: string;
  sector?: string;
  business_categories?: string[];
  country?: { name_en?: string };
  state?: { name_en?: string };
  city?: { name_en?: string };
  est_date?: string;
  years_of_operations?: number;
  info_company?: string;
  idea?: string;
  problem?: string;
  solution?: string;
  team_num?: number;
  working_team_summary?: string;
  stage?: string;
  funding_stage?: string;
  revenue_generating?: boolean;
  currently_fundraising?: boolean;
  desired_funding_amount?: number;
  raised_fund?: number;
  equity_offered?: number;
  Currency?: string;
  Pre_money_Valuation?: number;
  targeted_market?: string;
  Industries?: string[];
  website?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  phone?: string;
  address_en?: string;
  product_photo?: string;
  pitch_deck_summary?: string;
  business_model_description?: string;
  Sustainable_development?: string[];
  development_stage?: string;
}

interface StartupProfileProps {
  startupData: StartupData;
}

function StartupProfile({ startupData }: StartupProfileProps) {
  if (!startupData) {
    return <Typography>Loading startup data...</Typography>; // Or a loading spinner
  }

  const {
    name_en, logo, sector, business_categories, country, state, city, est_date, years_of_operations,
    info_company, idea, problem, solution, team_num, working_team_summary, stage, funding_stage,
    revenue_generating, currently_fundraising, desired_funding_amount, raised_fund, equity_offered,
    Currency, Pre_money_Valuation, targeted_market, Industries, website, linkedin, twitter, email, phone,
    address_en, product_photo, pitch_deck_summary, business_model_description, Sustainable_development
  } = startupData;

  // Calculate establishment year (simple example)
  const establishmentYear = est_date ? new Date(est_date).getFullYear() : 'N/A';

  return (
    <Container maxWidth="lg"> {/* Tailwind padding */}
      {/* --- Header Section --- */}
      <Paper elevation={3} className="mb-6 p-4 md:p-6 rounded-lg bg-white">
        <Grid container spacing={3} alignItems="">
          <Grid item xs={12} sm={3} md={2} className="flex justify-center sm:justify-start">
            <Avatar
              // src={logo || 'https://via.placeholder.com/150?text=Logo'}
              src="https://beta.growthlabs.app/orgnizations/technology-innovation-&-entrepreneurship-center-(tiec)-v2-1.webp"
              alt={`${name_en} Logo`}
              sx={{ width: 150, height: 150, objectFit: 'contain' }}
              variant="rounded"
              className="shadow-md"
            />
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <Typography variant="h4" component="h1" className="font-bold text-gray-800 mb-1">
              {name_en || 'Startup Name'}
            </Typography>
            <Typography variant="subtitle1" className="text-gray-600 mb-4">
              {info_company || 'Startup tagline or brief description.'}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" className="mb-2">
              {sector && <Chip icon={<i className="tabler-building" />} label={sector} color="primary" size="small" />}
              {business_categories?.map((cat) => (
                <Chip key={cat} label={cat} variant="outlined" size="small" />
              ))}
            </Stack>
            
            <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center" className="text-sm text-gray-500 mt-4">
              <Box display="flex" alignItems="center">
                <i className="tabler-map-pin mr-1" />
                <span>{`${city?.name_en || 'City'}, ${state?.name_en || 'State'}, ${country?.name_en || 'Country'}`}</span>
              </Box>
              <Box display="flex" alignItems="center">
                <i className="tabler-calendar mr-1" />
                <span>Est. {establishmentYear} ({years_of_operations || 'N/A'} years)</span>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* --- Main Content Column --- */}
        <Grid item xs={12} md={8}>
          {/* About Section */}
          <Card elevation={2} className="mb-6 rounded-lg">
            <CardContent className="p-5">
              <Typography variant="h6" gutterBottom className="font-semibold text-gray-700 mb-4 border-b pb-2">
                About {name_en}
              </Typography>
              {idea && <InfoItem icon={<i className="tabler-bulb text-yellow-500" />} title="The Idea" content={idea} />}
              {problem && <InfoItem icon={<i className="tabler-alert-circle text-red-500" />} title="The Problem" content={problem} />}
              {solution && <InfoItem icon={<i className="tabler-check-circle text-green-600" />} title="Our Solution" content={solution} />}
              {business_model_description && <InfoItem icon={<i className="tabler-file-description text-indigo-500" />} title="Business Model" content={business_model_description} />}
              {targeted_market && <InfoItem icon={<i className="tabler-world text-teal-500" />} title="Targeted Market" content={targeted_market} />}
              {Industries && Industries.length > 0 && (
                 <Box className="mt-4 pt-3 border-t">
                   <Typography variant="subtitle1" className="font-medium text-gray-600 mb-2">Industries:</Typography>
                   <Stack direction="row" spacing={1} flexWrap="wrap">
                     {Industries.map((industry) => (
                       <Chip key={industry} label={industry} size="small" className="bg-gray 150 text-gray-700"/>
                     ))}
                   </Stack>
                 </Box>
              )}
              {Sustainable_development && Sustainable_development.length > 0 && (
                 <Box className="mt-4 pt-3 border-t">
                   <Typography variant="subtitle1" className="font-medium text-gray-600 mb-2 flex items-center">
                      <i className="tabler-recycle mr-2 text-green-700" /> Sustainable Development Goals (SDGs)
                    </Typography>
                   <Stack direction="row" spacing={1} flexWrap="wrap">
                     {Sustainable_development.map((goal) => (
                       <Chip key={goal} label={goal} size="small" className="bg-green-100 text-green-800"/>
                     ))}
                   </Stack>
                 </Box>
              )}
            </CardContent>
          </Card>

          {/* Product/Visuals Section */}
          {product_photo && (
            <Card elevation={2} className="mb-6 rounded-lg">
              <CardContent className="p-5">
                <Typography variant="h6" gutterBottom className="font-semibold text-gray-700 mb-3 border-b pb-2">
                  Product / Service Visual
                </Typography>
                <CardMedia
                  component="img"
                  image={product_photo}
                  alt="Product Photo"
                  className="rounded-md max-h-96 w-auto mx-auto" // Tailwind max height & centering
                />
              </CardContent>
            </Card>
          )}

          {/* Pitch Deck Section */}
           {pitch_deck_summary && (
            <Card elevation={2} className="mb-6 rounded-lg">
              <CardContent className="p-5">
                <Typography variant="h6" gutterBottom className="font-semibold text-gray-700 mb-3 border-b pb-2 flex items-center">
                 <i className="tabler-file-description mr-2" /> Pitch Deck Summary
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-3">
                  {pitch_deck_summary}
                </Typography>
              </CardContent>
            </Card>
          )}

        </Grid>

        {/* --- Sidebar Column --- */}
        <Grid item xs={12} md={4}>
          {/* Key Info Card */}
          <Card elevation={2} className="mb-6 rounded-lg sticky top-4"> {/* Sticky sidebar */}
            <CardContent className="p-5 space-y-4"> {/* Tailwind spacing */}
              <Typography variant="h6" className="font-semibold text-gray-700 border-b pb-2 mb-3">
                Key Information
              </Typography>

              <KeyInfoItem icon={<i className="tabler-flag text-purple-600" />} label="Stage" value={stage || 'N/A'} isChip chipColor="secondary" />
              <KeyInfoItem icon={<i className="tabler-cash text-orange-600" />} label="Funding Stage" value={funding_stage || 'N/A'} isChip chipColor="warning" />
              <KeyInfoItem icon={<i className="tabler-tools text-cyan-600" />} label="Development Stage" value={startupData.development_stage || 'N/A'} />
              <KeyInfoItem icon={<i className="tabler-users text-blue-600" />} label="Team Size" value={team_num ? `${team_num} members` : 'N/A'} />
              {working_team_summary && <KeyInfoItem icon={<i className="tabler-users text-indigo-500" />} label="Team Summary" value={working_team_summary} isBlock />}
              <KeyInfoItem icon={<i className="tabler-cash text-green-600" />} label="Revenue Generating" value={revenue_generating ? 'Yes' : 'No'} isChip chipColor={revenue_generating ? 'success' : 'default'} />

              <Divider className="my-4" />

              <Typography variant="subtitle1" className="font-medium text-gray-600 flex items-center">
                <i className="tabler-cash mr-2 text-green-700" /> Funding Status
              </Typography>
               {currently_fundraising ? (
                 <Box className="space-y-2 text-sm pl-2 border-l-2 border-green-200 ml-1">
                   <Chip label="Actively Fundraising" color="success" size="small" className="bg-green-100 text-green-800 font-semibold" />
                   <p><strong className="font-medium text-gray-700">Target:</strong> {formatCurrency(desired_funding_amount, Currency)}</p>
                   <p><strong className="font-medium text-gray-700">Raised:</strong> {formatCurrency(raised_fund, Currency)}</p>
                   {Pre_money_Valuation && <p><strong className="font-medium text-gray-700">Pre-Money Valuation:</strong> {formatCurrency(Pre_money_Valuation, Currency)}</p>}
                   {equity_offered && <p><strong className="font-medium text-gray-700">Equity Offered:</strong> {equity_offered}%</p>}
                 </Box>
               ) : (
                  <Chip label="Not Currently Fundraising" size="small" className="bg-gray-100 text-gray-700" />
               )}

              <Divider className="my-4" />

              {/* Contact & Links */}
              <Typography variant="subtitle1" className="font-medium text-gray-600 mb-2">
                Contact & Links
              </Typography>
              <Box className="space-y-3">
                {website && (
                  <Link 
                    href={website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center hover:underline text-blue-600 hover:text-blue-800 transition-colors"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i className="tabler-world mr-2 text-gray-500" /> 
                    <Typography variant="body2" className="truncate">{website}</Typography>
                  </Link>
                )}
                {email && (
                  <Link 
                    href={`mailto:${email}`} 
                    className="flex items-center hover:underline text-blue-600 hover:text-blue-800 transition-colors"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i className="tabler-mail mr-2 text-gray-500" /> 
                    <Typography variant="body2" className="truncate">{email}</Typography>
                  </Link>
                )}
                {phone && (
                  <Box className="flex items-center text-gray-700">
                    <i className="tabler-phone mr-2 text-gray-500" /> 
                    <Typography variant="body2">{phone}</Typography>
                  </Box>
                )}
                {address_en && (
                  <Box className="flex items-start text-gray-700"> 
                    <i className="tabler-map-pin mr-2 mt-0.5 text-gray-500" /> 
                    <Typography variant="body2">{address_en}</Typography>
                  </Box>
                )}
                
                {/* Social Links */}
                {(linkedin || twitter) && (
                  <Box className="pt-2 mt-1 border-t border-gray-100">
                    <Typography variant="subtitle2" className="mb-1.5 text-gray-600">Social Profiles</Typography>
                    <Stack direction="row" spacing={1.5}>
                      {linkedin && (
                        <IconButton 
                          size="small" 
                          href={linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:bg-blue-50"
                          sx={{ border: '1px solid', borderColor: 'rgba(59, 130, 246, 0.3)' }}
                        >
                          <i className="tabler-brand-linkedin" />
                        </IconButton>
                      )}
                      {twitter && (
                        <IconButton 
                          size="small" 
                          href={twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:bg-sky-50"
                          sx={{ border: '1px solid', borderColor: 'rgba(14, 165, 233, 0.3)' }}
                        >
                          <i className="tabler-brand-twitter" />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                )}
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// Helper component for consistent key-info items in the sidebar
interface KeyInfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
  isChip?: boolean;
  chipColor?: ChipProps['color'];
  isBlock?: boolean;
}

function KeyInfoItem({ icon, label, value, isChip = false, chipColor = 'default', isBlock = false }: KeyInfoItemProps) {
  return (
    <Box className={`flex ${isBlock ? 'flex-col items-start' : 'items-center'} text-sm`}>
      <Box className="flex items-center w-3/5 flex-shrink-0 text-gray-500">
        {icon && React.cloneElement(icon, { className: `mr-2 ${icon.props.className}` })}
        <span className="font-medium">{label}:</span>
      </Box>
      <Box className={`w-3/5 ${isBlock ? 'mt-1 pl-6' : 'ml-3'} ${isChip ? '' : 'text-gray-800'}`}>
        {isChip ? (
          <Chip label={value} size="small" color={chipColor} variant={chipColor === 'default' ? 'outlined' : 'filled'} />
        ) : (
          <span>{value}</span>
        )}
      </Box>
    </Box>
  );
}

// Helper component for About section items
interface InfoItemProps {
  icon: React.ReactElement;
  title: string;
  content: string;
}

function InfoItem({ icon, title, content }: InfoItemProps) {
  return (
     <Box className="mb-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-1 flex items-center">
           {icon && React.cloneElement(icon, { className: `mr-2 ${icon.props.className}` })}
           {title}
        </Typography>
        <Typography variant="body2" className="text-gray-600 pl-8"> {/* Indent content */}
           {content}
        </Typography>
     </Box>
  )
}

export default StartupProfile;