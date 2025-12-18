import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Info, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

interface EPRStateData {
  name: string;
  code: string;
  eprStatus: 'epr-law' | 'needs-assessment' | 'bill-introduced' | 'law-passed-2025' | 'none';
  recycledContentStatus?: 'existing' | 'under-development' | 'bill-introduced-2025' | 'none';
  bottleDepositStatus?: 'existing' | 'proposed' | 'none';
  law?: string;
  deadlines: string[];
  requirements?: string;
  notes?: string;
}

const EPRComplianceMap: React.FC = () => {
  const [hoveredState, setHoveredState] = useState<EPRStateData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({ coordinates: [0, 0], zoom: 1 });

  // Comprehensive EPR State Data from all images
  const eprStates: EPRStateData[] = [
    // States with EPR for packaging law (Blue)
    {
      name: 'California',
      code: 'CA',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      bottleDepositStatus: 'existing',
      law: 'SB 54',
      deadlines: ['Nov 2025: First data due', 'Aug 2026: Pre-program fees due', 'Jan 2027: First fees'],
      requirements: 'California SB 54 requires producers to fund recycling infrastructure and achieve specific recycling rates. Existing plastics recycled content law in place.',
      notes: 'EPR for packaging law with existing bottle deposit system'
    },
    {
      name: 'Oregon',
      code: 'OR',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      bottleDepositStatus: 'existing',
      law: 'SB 582',
      deadlines: ['Mar 2025: First data due', 'July 2025: First fees due', 'Jan 2026: Fees (50%)', 'July 2026: Fees (50%)'],
      requirements: 'Oregon EPR legislation requires improved material recovery rates and contamination reduction. Existing plastics recycled content law.',
      notes: 'EPR for packaging law with existing bottle deposit system'
    },
    {
      name: 'Washington',
      code: 'WA',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      bottleDepositStatus: 'proposed',
      law: 'SB 5022',
      deadlines: ['June 2026: Registration', 'Jan 2028: EPR rules finalized'],
      requirements: 'Washington EPR program requires producers to fund recycling infrastructure. Existing plastics recycled content law.',
      notes: 'EPR for packaging law with proposed bottle deposit program'
    },
    {
      name: 'Colorado',
      code: 'CO',
      eprStatus: 'epr-law',
      recycledContentStatus: 'under-development',
      bottleDepositStatus: 'proposed',
      law: 'HB 22-1355',
      deadlines: ['Aug 2025: First data due', 'Jan 2026: First fees (50%)', 'July 2026: Fees (50%)'],
      requirements: 'Colorado EPR program mandates producer responsibility for packaging waste. Recycled content under development in EPR program.',
      notes: 'EPR for packaging law with proposed bottle deposit program'
    },
    {
      name: 'Minnesota',
      code: 'MN',
      eprStatus: 'epr-law',
      recycledContentStatus: 'under-development',
      bottleDepositStatus: 'none',
      law: 'HF 3911',
      deadlines: ['July 2025: Registration', 'July 2028: EPR rules finalized', 'Apr 2029: First data due'],
      requirements: 'Minnesota EPR program requires improved material recovery and reduced contamination. Recycled content under development in EPR program.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Maine',
      code: 'ME',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      bottleDepositStatus: 'existing',
      law: 'LD 1541',
      deadlines: ['May 2026: Registration', 'Q3/Q4 2026: Data due, pre-program fees due'],
      requirements: 'Maine EPR legislation requires producers to fund recycling infrastructure improvements. Existing plastics recycled content law.',
      notes: 'EPR for packaging law with existing bottle deposit system. NE producer registration, data reporting only.'
    },
    {
      name: 'Vermont',
      code: 'VT',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'Vermont has EPR legislation in place. Existing plastics recycled content law.',
      notes: 'EPR for packaging law (Needs Assessment only) with existing bottle deposit system'
    },
    {
      name: 'New Hampshire',
      code: 'NH',
      eprStatus: 'epr-law',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'New Hampshire has EPR legislation in place.',
      notes: 'EPR for packaging law with proposed bottle deposit program'
    },
    {
      name: 'Massachusetts',
      code: 'MA',
      eprStatus: 'epr-law',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'Massachusetts has EPR legislation in place.',
      notes: 'EPR for packaging law with existing bottle deposit system'
    },
    {
      name: 'Rhode Island',
      code: 'RI',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      deadlines: [],
      requirements: 'Rhode Island has EPR legislation in place. Existing plastics recycled content law.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Connecticut',
      code: 'CT',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'Connecticut has EPR legislation in place. Existing plastics recycled content law.',
      notes: 'EPR for packaging law with existing bottle deposit system'
    },
    {
      name: 'New York',
      code: 'NY',
      eprStatus: 'epr-law',
      recycledContentStatus: 'under-development',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'New York has EPR legislation in place. Recycled content under development in EPR program.',
      notes: 'EPR for packaging law with existing bottle deposit system'
    },
    {
      name: 'Maryland',
      code: 'MD',
      eprStatus: 'epr-law',
      recycledContentStatus: 'under-development',
      bottleDepositStatus: 'proposed',
      law: 'SB 222',
      deadlines: ['May 2026: Pre-program fees', 'July 2028: PRO submits plan'],
      requirements: 'Maryland EPR legislation mandates producer responsibility for packaging. Recycled content under development in EPR program.',
      notes: 'EPR for packaging law with proposed bottle deposit program'
    },
    {
      name: 'New Jersey',
      code: 'NJ',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'New Jersey has EPR legislation in place. Existing plastics recycled content law.',
      notes: 'EPR for packaging law with proposed bottle deposit program. May move legislation after election.'
    },
    {
      name: 'Delaware',
      code: 'DE',
      eprStatus: 'law-passed-2025',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'Delaware passed EPR law in 2025.',
      notes: 'EPR law passed in 2025 with existing bottle deposit system'
    },
    // States with Needs Assessment law (Green)
    {
      name: 'Kentucky',
      code: 'KY',
      eprStatus: 'needs-assessment',
      deadlines: [],
      requirements: 'Kentucky has Needs Assessment law in place.',
      notes: 'Needs Assessment law'
    },
    {
      name: 'Hawaii',
      code: 'HI',
      eprStatus: 'needs-assessment',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'Hawaii has Needs Assessment law in place.',
      notes: 'Needs Assessment law (pending governor signature) with existing bottle deposit system'
    },
    // States with Bill introduced in 2025 (Orange)
    {
      name: 'Kansas',
      code: 'KS',
      eprStatus: 'bill-introduced',
      recycledContentStatus: 'bill-introduced-2025',
      deadlines: [],
      requirements: 'Kansas introduced EPR bill in 2025. PCR bill introduced in 2025, includes state procurement bills.',
      notes: 'EPR bill introduced in 2025'
    },
    {
      name: 'Missouri',
      code: 'MO',
      eprStatus: 'bill-introduced',
      recycledContentStatus: 'bill-introduced-2025',
      deadlines: [],
      requirements: 'Missouri introduced EPR bill in 2025. PCR bill introduced in 2025, includes state procurement bills.',
      notes: 'EPR bill introduced in 2025'
    },
    // Additional states with bills introduced (from the map)
    {
      name: 'Illinois',
      code: 'IL',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'none',
      deadlines: [],
      requirements: 'Illinois introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025'
    },
    {
      name: 'Pennsylvania',
      code: 'PA',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'Pennsylvania introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    {
      name: 'Virginia',
      code: 'VA',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'Virginia introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    {
      name: 'North Carolina',
      code: 'NC',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'North Carolina introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    {
      name: 'Georgia',
      code: 'GA',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'Georgia introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    {
      name: 'Florida',
      code: 'FL',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'Florida introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    {
      name: 'Texas',
      code: 'TX',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'Texas introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    {
      name: 'Michigan',
      code: 'MI',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'Michigan introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with existing bottle deposit system'
    },
    {
      name: 'Iowa',
      code: 'IA',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'existing',
      deadlines: [],
      requirements: 'Iowa introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with existing bottle deposit system'
    },
    {
      name: 'Alaska',
      code: 'AK',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'Alaska introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    {
      name: 'Montana',
      code: 'MT',
      eprStatus: 'bill-introduced',
      bottleDepositStatus: 'proposed',
      deadlines: [],
      requirements: 'Montana introduced EPR bill in 2025.',
      notes: 'EPR bill introduced in 2025 with proposed bottle deposit program'
    },
    // States with no EPR legislation (Gray) - added to show all states on map
    {
      name: 'South Carolina',
      code: 'SC',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Alabama',
      code: 'AL',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Mississippi',
      code: 'MS',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Louisiana',
      code: 'LA',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Arkansas',
      code: 'AR',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Oklahoma',
      code: 'OK',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'New Mexico',
      code: 'NM',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Arizona',
      code: 'AZ',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Utah',
      code: 'UT',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Idaho',
      code: 'ID',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'North Dakota',
      code: 'ND',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'South Dakota',
      code: 'SD',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Nebraska',
      code: 'NE',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Indiana',
      code: 'IN',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Ohio',
      code: 'OH',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Wisconsin',
      code: 'WI',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Tennessee',
      code: 'TN',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'West Virginia',
      code: 'WV',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Nevada',
      code: 'NV',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Wyoming',
      code: 'WY',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    // Canadian Provinces and Territories
    {
      name: 'British Columbia',
      code: 'BC',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      deadlines: [],
      requirements: 'British Columbia has comprehensive EPR legislation in place.',
      notes: 'EPR for packaging law with existing recycled content requirements'
    },
    {
      name: 'Alberta',
      code: 'AB',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Alberta has EPR legislation in place.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Saskatchewan',
      code: 'SK',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Saskatchewan has EPR legislation in place.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Manitoba',
      code: 'MB',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Manitoba has EPR legislation in place.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Ontario',
      code: 'ON',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      deadlines: [],
      requirements: 'Ontario has comprehensive EPR legislation with recycled content requirements.',
      notes: 'EPR for packaging law with existing recycled content requirements'
    },
    {
      name: 'Quebec',
      code: 'QC',
      eprStatus: 'epr-law',
      recycledContentStatus: 'existing',
      deadlines: [],
      requirements: 'Quebec has comprehensive EPR legislation with recycled content requirements.',
      notes: 'EPR for packaging law with existing recycled content requirements'
    },
    {
      name: 'New Brunswick',
      code: 'NB',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'New Brunswick has EPR legislation in place.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Nova Scotia',
      code: 'NS',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Nova Scotia has EPR legislation in place.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Prince Edward Island',
      code: 'PE',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Prince Edward Island has EPR legislation in place.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Newfoundland and Labrador',
      code: 'NL',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Newfoundland and Labrador has EPR legislation in place.',
      notes: 'EPR for packaging law'
    },
    {
      name: 'Yukon',
      code: 'YT',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Northwest Territories',
      code: 'NT',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Nunavut',
      code: 'NU',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    // Mexico States with EPR legislation
    {
      name: 'Quintana Roo',
      code: 'MX-QR',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Quintana Roo mandates annual EPR plans for priority wastes.',
      notes: 'EPR law requiring annual EPR plans for priority wastes'
    },
    {
      name: 'Estado de México',
      code: 'MX-MX',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'State of Mexico operates SIREM system for EPR schemes on waste management.',
      notes: 'EPR law with SIREM system for waste management EPR schemes'
    },
    {
      name: 'Mexico City',
      code: 'MX-DF',
      eprStatus: 'epr-law',
      deadlines: [],
      requirements: 'Mexico City enforces separation norms (NADF-024-AMBT-2013) and shared responsibility, focusing on high-impact wastes like organics and recyclables.',
      notes: 'EPR law with separation norms and shared responsibility for high-impact wastes'
    },
    {
      name: 'Puebla',
      code: 'MX-PU',
      eprStatus: 'needs-assessment',
      deadlines: [],
      requirements: 'Puebla generates significant waste and has related policies, but full EPR details remain state-specific.',
      notes: 'Significant waste generation with state-specific EPR policies'
    },
    {
      name: 'Guanajuato',
      code: 'MX-GT',
      eprStatus: 'needs-assessment',
      deadlines: [],
      requirements: 'Guanajuato generates significant waste and has related policies, but full EPR details remain state-specific.',
      notes: 'Significant waste generation with state-specific EPR policies'
    },
    // All other Mexico states (no EPR legislation)
    {
      name: 'Aguascalientes',
      code: 'MX-AG',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Baja California',
      code: 'MX-BC',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Baja California Sur',
      code: 'MX-BS',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Campeche',
      code: 'MX-CM',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Chiapas',
      code: 'MX-CS',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Chihuahua',
      code: 'MX-CH',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Coahuila',
      code: 'MX-CO',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Colima',
      code: 'MX-CL',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Durango',
      code: 'MX-DG',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Guerrero',
      code: 'MX-GR',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Hidalgo',
      code: 'MX-HG',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Jalisco',
      code: 'MX-JA',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Michoacán',
      code: 'MX-MI',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Morelos',
      code: 'MX-MO',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Nayarit',
      code: 'MX-NA',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Nuevo León',
      code: 'MX-NL',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Oaxaca',
      code: 'MX-OA',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Querétaro',
      code: 'MX-QE',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'San Luis Potosí',
      code: 'MX-SL',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Sinaloa',
      code: 'MX-SI',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Sonora',
      code: 'MX-SO',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Tabasco',
      code: 'MX-TB',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Tamaulipas',
      code: 'MX-TM',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Tlaxcala',
      code: 'MX-TL',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Veracruz',
      code: 'MX-VE',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Yucatán',
      code: 'MX-YU',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    },
    {
      name: 'Zacatecas',
      code: 'MX-ZA',
      eprStatus: 'none',
      deadlines: [],
      requirements: 'No EPR legislation currently in place.',
      notes: 'No EPR legislation'
    }
  ];

  const getStateColor = (state: EPRStateData) => {
    // Priority: EPR status first
    if (state.eprStatus === 'epr-law') {
      return '#3b82f6'; // Blue
    }
    if (state.eprStatus === 'needs-assessment') {
      return '#10b981'; // Green
    }
    if (state.eprStatus === 'bill-introduced') {
      return '#f59e0b'; // Orange
    }
    if (state.eprStatus === 'law-passed-2025') {
      return '#ef4444'; // Red (outline)
    }
    return '#e5e7eb'; // Default gray
  };

  const getStateStrokeColor = (state: EPRStateData) => {
    if (state.eprStatus === 'law-passed-2025') {
      return '#ef4444'; // Red outline
    }
    return '#ffffff';
  };

  const handleStateHover = (state: EPRStateData, event: MouseEvent) => {
    setHoveredState(state);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleStateLeave = () => {
    setHoveredState(null);
  };

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({
      ...pos,
      zoom: pos.zoom * 1.5
    }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({
      ...pos,
      zoom: pos.zoom / 1.5
    }));
  };

  const handleResetPan = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  // FIPS code to state abbreviation mapping
  const fipsToStateCode: Record<string, string> = {
    "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
    "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
    "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
    "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
    "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
    "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
    "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
    "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
    "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
    "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
    "56": "WY"
  };




  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
              EPR Compliance Map - United States, Canada & Mexico
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Track Extended Producer Responsibility (EPR) legislation status, recycled content laws, and bottle deposit systems across North America. 
              Hover over states to view compliance deadlines and requirements.
            </p>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-vd-blue/5 to-vd-orange/5 rounded-xl p-6 border border-vd-blue/20 mb-8">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                The US EPR landscape is rapidly expanding, with 236 bills related to plastics recycling or packaging introduced across 34 states and D.C. in 2025. 
                EPR for packaging now covers 20% of the US population, with two new states passing laws this year. Implementation priorities include prioritizing 
                recycled content from North America, metrics to improve packaging design, investments in end market development, streamlined reporting and 
                auditing for recyclers, and broadening the list of recyclable plastic packaging. Attention is shifting toward bottle deposit systems alongside 
                EPR, and 19 bills to restrict or ban PFAS reflect growing chemical concerns. Most states have finished their 2025 legislative sessions, with 
                some potentially moving legislation after elections. The trend points toward broader producer responsibility and more comprehensive recycling 
                infrastructure requirements across North America.
              </p>
            </div>
          </div>


          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
              <span className="text-sm font-medium text-gray-700">EPR for Packaging Law</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: '#10b981' }}></div>
              <span className="text-sm font-medium text-gray-700">Needs Assessment Law</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
              <span className="text-sm font-medium text-gray-700">Bill Introduced in 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded border-4" style={{ borderColor: '#ef4444', backgroundColor: 'transparent' }}></div>
              <span className="text-sm font-medium text-gray-700">Law Passed in 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: '#e5e7eb' }}></div>
              <span className="text-sm font-medium text-gray-700">No EPR Legislation</span>
            </div>
          </div>

          {/* Interactive Map Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 mb-8" style={{ position: 'relative', width: '100%' }}>
            {/* Map Controls */}
            <div className="absolute top-12 right-12 z-10 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="bg-white hover:bg-gray-50 text-vd-orange border-2 border-vd-orange rounded-lg p-3 shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In"
                disabled={position.zoom >= 4}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-white hover:bg-gray-50 text-vd-orange border-2 border-vd-orange rounded-lg p-3 shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out"
                disabled={position.zoom <= 1}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={handleResetPan}
                className="bg-white hover:bg-gray-50 text-vd-orange border-2 border-vd-orange rounded-lg p-3 shadow-lg transition-all duration-200 hover:scale-105"
                title="Reset View"
              >
                <Move className="w-5 h-5" />
              </button>
            </div>
            {/* US & Canada Map using react-simple-maps */}
            <div className="relative w-full" style={{ minHeight: '800px', position: 'relative' }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 500,
                  center: [-100, 40]
                }}
                style={{ width: '100%', height: '800px' }}
              >
                <ZoomableGroup
                  zoom={position.zoom}
                  center={position.coordinates}
                  onMoveStart={(pos) => {
                    if (pos) {
                      setPosition(pos);
                    }
                  }}
                  onMoveEnd={(pos) => {
                    if (pos) {
                      setPosition(pos);
                    }
                  }}
                >
                {/* US States - served from local JSON to avoid CSP issues on Vercel */}
                <Geographies geography="/us-states-10m.json">
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      // Convert FIPS code to state abbreviation
                      const stateCode = fipsToStateCode[geo.id];
                      const stateData = eprStates.find(s => s.code === stateCode);
                      
                      // Show all states, use default gray for states without data
                      const fillColor = stateData ? getStateColor(stateData) : '#e5e7eb';
                      const strokeColor = stateData ? getStateStrokeColor(stateData) : '#d1d5db';
                      const strokeWidth = stateData?.eprStatus === 'law-passed-2025' ? 2 : 0.8;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          style={{
                            default: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth,
                              outline: 'none',
                              opacity: hoveredState?.code === stateCode ? 1 : 0.85,
                              cursor: 'pointer',
                              transition: 'opacity 0.2s ease'
                            },
                            hover: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth + 0.5,
                              outline: 'none',
                              opacity: 1,
                              cursor: 'pointer'
                            },
                            pressed: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth,
                              outline: 'none',
                              opacity: 1
                            }
                          }}
                          onMouseEnter={(e: React.MouseEvent) => {
                            if (stateData) {
                              handleStateHover(stateData, e.nativeEvent);
                            }
                          }}
                          onMouseLeave={handleStateLeave}
                          onMouseMove={(e: React.MouseEvent) => {
                            setTooltipPosition({ 
                              x: e.nativeEvent.clientX, 
                              y: e.nativeEvent.clientY 
                            });
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                {/* Canadian Provinces */}
                {/* eslint-disable @typescript-eslint/no-explicit-any */}
                <Geographies geography="/canada-provinces.json">
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      // Map province names to codes - check multiple property name variations
                      const provinceName = geo.properties?.name || 
                                         geo.properties?.NAME || 
                                         geo.properties?.PRENAME || 
                                         geo.properties?.NAME_1 || 
                                         geo.properties?.province || 
                                         geo.properties?.PROVINCE ||
                                         geo.properties?.NAME_EN ||
                                         geo.properties?.NAME_FR ||
                                         '';
                      
                      const provinceCodeMap: Record<string, string> = {
                        'British Columbia': 'BC',
                        'Alberta': 'AB',
                        'Saskatchewan': 'SK',
                        'Manitoba': 'MB',
                        'Ontario': 'ON',
                        'Quebec': 'QC',
                        'Québec': 'QC',
                        'New Brunswick': 'NB',
                        'Nova Scotia': 'NS',
                        'Prince Edward Island': 'PE',
                        'Newfoundland and Labrador': 'NL',
                        'Newfoundland': 'NL',
                        'Labrador': 'NL',
                        'Yukon': 'YT',
                        'Yukon Territory': 'YT',
                        'Northwest Territories': 'NT',
                        'Nunavut': 'NU'
                      };
                      const provinceCode = provinceCodeMap[provinceName] || '';
                      const stateData = eprStates.find(s => s.code === provinceCode);
                      
                      // Show all provinces, use default gray for provinces without data
                      const fillColor = stateData ? getStateColor(stateData) : '#e5e7eb';
                      const strokeColor = stateData ? getStateStrokeColor(stateData) : '#d1d5db';
                      const strokeWidth = stateData?.eprStatus === 'law-passed-2025' ? 2 : 0.8;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          style={{
                            default: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth,
                              outline: 'none',
                              opacity: stateData && hoveredState?.code === provinceCode ? 1 : 0.85,
                              cursor: 'pointer',
                              transition: 'opacity 0.2s ease'
                            },
                            hover: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth + 0.5,
                              outline: 'none',
                              opacity: 1,
                              cursor: 'pointer'
                            },
                            pressed: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth,
                              outline: 'none',
                              opacity: 1
                            }
                          }}
                          onMouseEnter={(e: React.MouseEvent) => {
                            if (stateData) {
                              handleStateHover(stateData, e.nativeEvent);
                            }
                          }}
                          onMouseLeave={handleStateLeave}
                          onMouseMove={(e: React.MouseEvent) => {
                            setTooltipPosition({ 
                              x: e.nativeEvent.clientX, 
                              y: e.nativeEvent.clientY 
                            });
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                {/* eslint-enable @typescript-eslint/no-explicit-any */}
                {/* Mexico States */}
                {/* eslint-disable @typescript-eslint/no-explicit-any */}
                <Geographies geography="/mexico-states.json">
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      // Map Mexico state names to codes
                      const stateName = geo.properties?.name || '';
                      
                      // Mexico state name to code mapping (using MX- prefix to avoid conflicts)
                      const mexicoStateCodeMap: Record<string, string> = {
                        'Aguascalientes': 'MX-AG',
                        'Baja California': 'MX-BC',
                        'Baja California Sur': 'MX-BS',
                        'Campeche': 'MX-CM',
                        'Chiapas': 'MX-CS',
                        'Chihuahua': 'MX-CH',
                        'Coahuila': 'MX-CO',
                        'Coahuila de Zaragoza': 'MX-CO',
                        'Colima': 'MX-CL',
                        'Distrito Federal': 'MX-DF',
                        'Ciudad de México': 'MX-DF',
                        'Durango': 'MX-DG',
                        'Guanajuato': 'MX-GT',
                        'Guerrero': 'MX-GR',
                        'Hidalgo': 'MX-HG',
                        'Jalisco': 'MX-JA',
                        'México': 'MX-MX',
                        'Estado de México': 'MX-MX',
                        'MAcxico': 'MX-MX',
                        'Michoacán': 'MX-MI',
                        'MichoacAn de Ocampo': 'MX-MI',
                        'Morelos': 'MX-MO',
                        'Nayarit': 'MX-NA',
                        'Nuevo León': 'MX-NL',
                        'Nuevo LeA3n': 'MX-NL',
                        'Oaxaca': 'MX-OA',
                        'Puebla': 'MX-PU',
                        'Querétaro': 'MX-QE',
                        'QuerActaro': 'MX-QE',
                        'Quintana Roo': 'MX-QR',
                        'San Luis Potosí': 'MX-SL',
                        'San Luis PotosA-': 'MX-SL',
                        'Sinaloa': 'MX-SI',
                        'Sonora': 'MX-SO',
                        'Tabasco': 'MX-TB',
                        'Tamaulipas': 'MX-TM',
                        'Tlaxcala': 'MX-TL',
                        'Veracruz': 'MX-VE',
                        'Veracruz de Ignacio de la Llave': 'MX-VE',
                        'Yucatán': 'MX-YU',
                        'YucatAn': 'MX-YU',
                        'Zacatecas': 'MX-ZA'
                      };
                      
                      const stateCode = mexicoStateCodeMap[stateName] || `MX-${stateName.substring(0, 2).toUpperCase()}`;
                      const stateData = eprStates.find(s => s.code === stateCode);
                      
                      // Show all Mexico states, use default gray for states without data
                      const fillColor = stateData ? getStateColor(stateData) : '#e5e7eb';
                      const strokeColor = stateData ? getStateStrokeColor(stateData) : '#d1d5db';
                      const strokeWidth = stateData?.eprStatus === 'law-passed-2025' ? 2 : 0.8;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          style={{
                            default: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth,
                              outline: 'none',
                              opacity: stateData && hoveredState?.code === stateCode ? 1 : 0.85,
                              cursor: 'pointer',
                              transition: 'opacity 0.2s ease'
                            },
                            hover: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth + 0.5,
                              outline: 'none',
                              opacity: 1,
                              cursor: 'pointer'
                            },
                            pressed: {
                              fill: fillColor,
                              stroke: strokeColor,
                              strokeWidth: strokeWidth,
                              outline: 'none',
                              opacity: 1
                            }
                          }}
                          onMouseEnter={(e: React.MouseEvent) => {
                            if (stateData) {
                              handleStateHover(stateData, e.nativeEvent);
                            }
                          }}
                          onMouseLeave={handleStateLeave}
                          onMouseMove={(e: React.MouseEvent) => {
                            setTooltipPosition({ 
                              x: e.nativeEvent.clientX, 
                              y: e.nativeEvent.clientY 
                            });
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                {/* eslint-enable @typescript-eslint/no-explicit-any */}
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Tooltip/Popup */}
            {hoveredState && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute bg-white rounded-xl shadow-2xl p-6 border-2 border-vd-orange z-50 pointer-events-none max-w-sm"
                style={{
                  left: typeof window !== 'undefined' 
                    ? `${Math.min(Math.max(tooltipPosition.x + 20, 20), window.innerWidth - 400)}px` 
                    : `${tooltipPosition.x + 20}px`,
                  top: typeof window !== 'undefined' 
                    ? `${Math.max(tooltipPosition.y - 20, 20)}px` 
                    : `${tooltipPosition.y - 20}px`,
                  transform: typeof window !== 'undefined' && tooltipPosition.x + 400 > window.innerWidth
                    ? 'translateX(-100%)'
                    : 'none'
                }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-5 h-5 text-vd-orange" />
                  <h3 className="text-xl font-bold text-vd-blue-dark">{hoveredState.name}</h3>
                </div>
                
                {hoveredState.law && (
                  <div className="mb-3">
                    <span className="inline-block bg-vd-blue/10 text-vd-blue px-3 py-1 rounded-lg text-sm font-semibold">
                      {hoveredState.law}
                    </span>
                  </div>
                )}
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: getStateColor(hoveredState) }}
                    ></div>
                    <span className="font-semibold text-gray-700">
                      {hoveredState.eprStatus === 'epr-law' && 'EPR for Packaging Law'}
                      {hoveredState.eprStatus === 'needs-assessment' && 'Needs Assessment Law'}
                      {hoveredState.eprStatus === 'bill-introduced' && 'Bill Introduced in 2025'}
                      {hoveredState.eprStatus === 'law-passed-2025' && 'Law Passed in 2025'}
                      {hoveredState.eprStatus === 'none' && 'No EPR Legislation'}
                    </span>
                  </div>
                  
                  {hoveredState.recycledContentStatus && hoveredState.recycledContentStatus !== 'none' && (
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Recycled Content: </span>
                      {hoveredState.recycledContentStatus === 'existing' && 'Existing law'}
                      {hoveredState.recycledContentStatus === 'under-development' && 'Under development in EPR program'}
                      {hoveredState.recycledContentStatus === 'bill-introduced-2025' && 'PCR bill introduced in 2025'}
                    </div>
                  )}
                  
                  {hoveredState.bottleDepositStatus && hoveredState.bottleDepositStatus !== 'none' && (
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Bottle Deposit: </span>
                      {hoveredState.bottleDepositStatus === 'existing' && 'Existing law'}
                      {hoveredState.bottleDepositStatus === 'proposed' && 'Proposed new program'}
                    </div>
                  )}
                </div>
                
                {hoveredState.requirements && (
                  <p className="text-gray-700 mb-3 text-sm">{hoveredState.requirements}</p>
                )}
                
                {hoveredState.deadlines.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm font-semibold text-vd-blue-dark mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Key Deadlines:</span>
                    </div>
                    <ul className="space-y-1">
                      {hoveredState.deadlines.map((deadline, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <Clock className="w-3 h-3 mr-2 mt-1 text-vd-orange flex-shrink-0" />
                          {deadline}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {hoveredState.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-start space-x-2 text-xs text-gray-500">
                      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{hoveredState.notes}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default EPRComplianceMap;

