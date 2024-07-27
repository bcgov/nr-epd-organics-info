import { DataLayerGroup } from '@/interfaces/data-layers'

const BASE_URL = 'https://openmaps.gov.bc.ca/geo/pub'

/**
 * All layer urls and params extracted from the ticket.
 * Many of them have multiple available styles that can be displayed.
 * @see https://github.com/bcgov/nr-epd-organics-info/issues/109
 */
export const DATA_LAYER_GROUPS: DataLayerGroup[] = [
  {
    name: 'Aquifers and Water Wells',
    layers: [
      {
        name: 'Aquifers - All',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW',
        styles: '1759',
      },
      {
        name: 'Aquifers - Vulnerability',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW',
        styles: '1778',
      },
      {
        name: 'Aquifers - Subtype',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW',
        styles: '5653',
      },
      {
        name: 'Sea Water Intrusion Vulnerability - Outlined',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP',
        styles: '9499',
      },
      {
        name: 'Sea Water Intrusion Vulnerability - Unconsolidated Aquifers',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP',
        styles: '9500',
      },
      {
        name: 'Sea Water Intrusion Vulnerability - Bedrock Aquifers',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP',
        styles: '9501',
      },
      {
        name: 'Groundwater Wells – All',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_WATER_WELLS_WRBC_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_WATER_WELLS_WRBC_SVW',
        styles: '1833',
      },
    ],
  },
  {
    name: 'Water Licensing',
    layers: [
      {
        name: 'Water Rights - Applications',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_WATER_RIGHTS_APPLICTNS_SV/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_WATER_RIGHTS_APPLICTNS_SV',
        styles: '7261',
      },
      {
        name: 'Water Rights - Licences',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_WATER_RIGHTS_LICENCES_SV/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_WATER_RIGHTS_LICENCES_SV',
        styles: '1830',
      },
    ],
  },
  {
    name: 'Watersheds',
    layers: [
      {
        name: 'Community Watersheds',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_COMMUNITY_WS_PUB_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_COMMUNITY_WS_PUB_SVW',
        styles: '15',
      },
      {
        name: 'Major Watersheds - Outlined',
        url: `${BASE_URL}/WHSE_BASEMAPPING.BC_MAJOR_WATERSHEDS/ows`,
        layers: 'pub:WHSE_BASEMAPPING.BC_MAJOR_WATERSHEDS',
        styles: '727',
      },
      {
        name: 'FWA - Watershed Groups - Outlined',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_WATERSHED_GROUPS_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_WATERSHED_GROUPS_POLY',
        styles: '722',
      },
      {
        name: 'FWA - Named Watersheds - Outlined',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_NAMED_WATERSHEDS_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_NAMED_WATERSHEDS_POLY',
        styles: '717',
      },
    ],
  },
  {
    name: 'Freshwater Atlas',
    layers: [
      {
        name: 'FWA Stream Network',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_STREAM_NETWORKS_SP/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_STREAM_NETWORKS_SP',
        styles: '698_699',
      },
      {
        name: 'FWA Wetlands',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_WETLANDS_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_WETLANDS_POLY',
        styles: '708_709_710',
      },
      {
        name: 'FWA Linear Boundaries',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_LINEAR_BOUNDARIES_SP/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_LINEAR_BOUNDARIES_SP',
        styles: '690',
      },
      {
        name: 'FWA Lakes',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_LAKES_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_LAKES_POLY',
        styles: '705_706_707',
      },
    ],
  },
  {
    name: 'Agricultural Land Reserve',
    layers: [
      {
        name: 'ALC ALR Polygons',
        url: `${BASE_URL}/WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_POLYS/ows`,
        layers: 'pub:WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_POLYS',
        styles: '2',
      },
      {
        name: 'ALC Agricultural Land Reserve Lines',
        url: `${BASE_URL}/WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_BOUNDARY_LINES_SVW/ows`,
        layers: 'pub:WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_BOUNDARY_LINES_SVW',
        styles: '1',
      },
      {
        name: 'ALR Notices of Intent (Spatial View)',
        url: '',
      },
    ],
  },
  {
    name: 'Water License Points of Diversion',
    layers: [
      {
        name: 'Water points of diversion - Licensed Springs, joined with license information',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_POD_LICENCE_SOURCES_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_POD_LICENCE_SOURCES_SP',
        styles: '1836',
      },
      {
        name: 'Water points of diversion - Drinking Water Sources, consumptive water license points',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_BC_POD_DRINKNG_SOURCES_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_BC_POD_DRINKNG_SOURCES_SP',
        styles: '1835',
      },
    ],
  },
  {
    name: 'Wildlife Species at Risk',
    layers: [
      {
        name: 'Critical Habitat for federally-listed species at risk',
        url: `${BASE_URL}/WHSE_WILDLIFE_MANAGEMENT.WCP_CRITICAL_HABITAT_SP/ows`,
        layers: 'pub:WHSE_WILDLIFE_MANAGEMENT.WCP_CRITICAL_HABITAT_SP',
        styles: '4883_4884',
      },
    ],
  },
  {
    name: 'Crown Lands',
    layers: [
      {
        name: 'PMBC Parcel Cadastre',
        url: `${BASE_URL}/WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW/ows`,
        layers: 'pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW',
        styles: '5899', // Provincial Crown Lands
      },
    ],
  },
]
