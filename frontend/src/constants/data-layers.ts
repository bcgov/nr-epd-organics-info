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
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/099d69c5-1401-484d-9e19-c121ccb7977c',
      },
      {
        name: 'Aquifers - Vulnerability',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW',
        styles: '1778',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/099d69c5-1401-484d-9e19-c121ccb7977c',
      },
      {
        name: 'Aquifers - Subtype',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFERS_CLASSIFICATION_SVW',
        styles: '5653',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/099d69c5-1401-484d-9e19-c121ccb7977c',
      },
      {
        name: 'Sea Water Intrusion Vulnerability - Outlined',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP',
        styles: '9499',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/cc4b73c7-c16c-48eb-a069-642cafb5dec5',
      },
      {
        name: 'Sea Water Intrusion Vulnerability - Unconsolidated Aquifers',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP',
        styles: '9500',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/cc4b73c7-c16c-48eb-a069-642cafb5dec5',
      },
      {
        name: 'Sea Water Intrusion Vulnerability - Bedrock Aquifers',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_AQUIFER_VULN_SW_INTRUSN_SP',
        styles: '9501',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/cc4b73c7-c16c-48eb-a069-642cafb5dec5',
      },
      {
        name: 'Groundwater Wells – All',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.GW_WATER_WELLS_WRBC_SVW/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.GW_WATER_WELLS_WRBC_SVW',
        styles: '1833',
        webUrl: 'https://catalogue.data.gov.bc.ca/dataset/groundwater-wells',
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
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/f3a53d7f-da09-4726-ac83-f0032e4bd490',
      },
      {
        name: 'Water Rights - Licences',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_WATER_RIGHTS_LICENCES_SV/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_WATER_RIGHTS_LICENCES_SV',
        styles: '1830',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/5549cae0-c2b1-4b96-9777-529d9720803c',
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
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/bc57faf7-23e4-43fe-918a-e999936dbafa',
      },
      {
        name: 'Major Watersheds - Outlined',
        url: `${BASE_URL}/WHSE_BASEMAPPING.BC_MAJOR_WATERSHEDS/ows`,
        layers: 'pub:WHSE_BASEMAPPING.BC_MAJOR_WATERSHEDS',
        styles: '727',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/8ded3f62-e647-4f00-a115-10753419f466',
      },
      {
        name: 'FWA - Watershed Groups - Outlined',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_WATERSHED_GROUPS_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_WATERSHED_GROUPS_POLY',
        styles: '722',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/51f20b1a-ab75-42de-809d-bf415a0f9c62',
      },
      {
        name: 'FWA - Named Watersheds - Outlined',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_NAMED_WATERSHEDS_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_NAMED_WATERSHEDS_POLY',
        styles: '717',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/ea63ea04-eab0-4b83-8729-f8a93ac688a1',
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
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/freshwater-atlas-stream-network',
      },
      {
        name: 'FWA Wetlands',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_WETLANDS_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_WETLANDS_POLY',
        styles: '708_709_710',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/freshwater-atlas-wetlands',
      },
      {
        name: 'FWA Linear Boundaries',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_LINEAR_BOUNDARIES_SP/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_LINEAR_BOUNDARIES_SP',
        styles: '690',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/freshwater-atlas-linear-boundaries',
      },
      {
        name: 'FWA Lakes',
        url: `${BASE_URL}/WHSE_BASEMAPPING.FWA_LAKES_POLY/ows`,
        layers: 'pub:WHSE_BASEMAPPING.FWA_LAKES_POLY',
        styles: '705_706_707',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/freshwater-atlas-lakes',
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
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/92e17599-ac8a-47c8-877c-107768cb373c',
      },
      {
        name: 'ALC Agricultural Land Reserve Lines',
        url: `${BASE_URL}/WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_BOUNDARY_LINES_SVW/ows`,
        layers: 'pub:WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_BOUNDARY_LINES_SVW',
        styles: '1',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/b23a6be5-c7b0-4a12-a598-bb369a159be1',
      },
      {
        name: 'ALR Notices of Intent (Spatial View)',
        // No public WMS URL for this layer
        url: `${BASE_URL}/WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_NOI_SV/ows`,
        layers: 'pub:WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_NOI_SV',
        styles: '4764',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/43e45e82-b5d8-46a3-bb28-f2b7223423fc',
      },
      {
        name: 'ALR Applications (Spatial View)',
        // No public WMS URL for this layer
        url: `${BASE_URL}/WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_APPLICATIONS_SVW/ows`,
        layers: 'pub:WHSE_LEGAL_ADMIN_BOUNDARIES.OATS_ALR_APPLICATIONS_SVW',
        styles: '4758',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/48165eb9-cd44-4c3a-a178-ab5c0b9d9ebc',
      },
    ],
  },
  {
    name: 'Water License Points of Diversion',
    layers: [
      {
        name: 'Water Licence Points of Diversion – Springs',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_POD_LICENCE_SOURCES_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_POD_LICENCE_SOURCES_SP',
        styles: '1836',
        className: 'wl-pod-springs',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/4bc1cf40-3507-4591-bd89-82e8809440b5',
      },
      {
        name: 'Water Licence Points of Diversion – Drinking Water Sources',
        url: `${BASE_URL}/WHSE_WATER_MANAGEMENT.WLS_BC_POD_DRINKNG_SOURCES_SP/ows`,
        layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_BC_POD_DRINKNG_SOURCES_SP',
        styles: '1835',
        className: 'wl-pod-sources',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/bd3566ed-1101-473b-a3ec-5daefa1fe2c1',
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
        styles: '4883',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/076b8c98-a3f1-429b-9dae-03faed0c6aef',
      },
    ],
  },
  {
    name: 'Crown Lands',
    layers: [
      {
        name: 'PMBC Parcel Cadastre – Crown Provincial',
        url: `${BASE_URL}/WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW/ows`,
        layers: 'pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW',
        styles: '5899', // Provincial Crown Lands
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/4cf233c2-f020-4f7a-9b87-1923252fbc24',
      },
    ],
  },
  {
    name: 'Indian Reserves',
    layers: [
      {
        name: 'Indian Reserves Including Band Names',
        url: 'https://openmaps.gov.bc.ca/geo/pub/WHSE_ADMIN_BOUNDARIES.ADM_INDIAN_RESERVES_BANDS_SP/ows',
        layers: 'pub:WHSE_ADMIN_BOUNDARIES.ADM_INDIAN_RESERVES_BANDS_SP',
        styles: '381_382',
        webUrl:
          'https://catalogue.data.gov.bc.ca/dataset/indian-reserves-and-band-names-administrative-boundaries',
      },
    ],
  },
]
