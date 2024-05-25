import { OmrrData } from '../types/omrr-data';
import { OMRR_QUERY } from './omrr-query';
import * as assert from 'node:assert';

describe('Omrr Query', () => {
  it('validate the column names', async () => {
    const columnNames = getColumnNames(OMRR_QUERY);
    const omrrDataInstance: OmrrData = {
      'Manure': false,
      'Untreated and Unprocessed Wood Residuals': false,
      'Domestic Septic Tank Sludge': false,
      'Operation Type': 'Land Application Biosolids',
      'Latitude': 49,
      'Yard Waste': false,
      'Fish Wastes': false,
      'Whey': false,
      'Animal Bedding': false,
      'Biosolids': false,
      'Hatchery Waste': false,
      'Last Amendment Date': null,
      'Intended Dates of Land Application': 'sept 24',
      'Authorization Status': 'Active',
      'Authorization Number': 112247,
      'Waste Discharge Regulation': null,
      'Milk Processing Waste': false,
      'Material Land Applied': 'Class A Biosolids',
      'Poultry Carcasses': false,
      'Authorization Type': 'Notification',
      'Effective/Issue Date': new Date(),
      'Longitude': -135,
      'Facility Location': 'test',
      'Type of Compost Produced': null,
      'Facility Design Capacity (t/y)': '50',
      'Brewery Waste/Wine Waste': false,
      'Regulated Party': 'BABAR CAT',
      'Food Waste': false
    };
    const keys = Object.keys(omrrDataInstance);
    for (const key of keys) {
      assert.ok(columnNames.includes(key));
    }
  });
});

function getColumnNames(query: string): string[] {
  const regex = /"(.*?)"/g;
  let match;
  const columnNames = [];

  while ((match = regex.exec(query)) !== null) {
    columnNames.push(match[1]);
  }

  return columnNames;
}

