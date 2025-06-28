import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { getLocalizedUrl } from '@/utils/i18n'
import { useParams, useRouter } from 'next/navigation'
import { Locale } from '@/configs/i18n'

// Type Imports
interface StartupProfileHeaderProps {
  data?: {
    name_en?: string
    info_company?: string
    sector?: string
    business_categories?: string[]
    city?: { name_en: string }
    state?: { name_en: string }
    country?: { name_en: string }
    establishmentYear?: string | number
    years_of_operations?: string | number
  }
}

const StartupProfileHeader = ({ data }: StartupProfileHeaderProps) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const {
    name_en,
    info_company,
    sector,
    business_categories,
    city,
    state,
    country,
    establishmentYear,
    years_of_operations
  } = data || {}

  const onEditClick = (url: string) => {
    if (url) {
      router.push(getLocalizedUrl(url, locale as Locale))
    }
  }

  return (
    <Paper elevation={3} className="mb-6 p-4 md:p-6 rounded-lg bg-white">
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm={3} md={2} className="flex justify-center sm:justify-start">
        <Avatar
          // src={logo || 'https://via.placeholder.com/150?text=Logo'}
          src="https://beta.growthlabs.app/orgnizations/technology-innovation-&-entrepreneurship-center-(tiec)-v2-1.webp"
          alt={`${name_en} Logo`}
          sx={{ width: 100, height: 100, objectFit: 'contain' }}
          variant="rounded"
          className="shadow-md"
        />
      </Grid>
      <Grid item xs={12} sm={9} md={10}>
        <Typography variant="h4" component="h1" className="font-bold text-gray-800 mb-1">
          {name_en || 'Startup Name'}
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 mb-2">
          {info_company || 'Startup tagline or brief description.'}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" className="mb-2">
          {sector && <Chip icon={<i className="tabler-building" />} label={sector} color="primary" size="small" />}
          {business_categories?.map((cat) => (
            <Chip key={cat} label={cat} variant="outlined" size="small" />
          ))}
        </Stack>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center" className="text-sm text-gray-500">
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
  )
}

export default StartupProfileHeader
