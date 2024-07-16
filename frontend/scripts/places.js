import fs from 'fs'
import { parse } from 'csv-parse/sync'

/**
 * Calculates the distance between two latlngs in kilometers
 * using the Haversine formula.
 * @see https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
 */
function distance(lat1, lng1, lat2, lng2) {
  if (lat1 === lat2 && lng1 === lng2) {
    return 0
  }
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lng1 - lng2
  const radtheta = (Math.PI * theta) / 180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = (Math.acos(dist) * 180) / Math.PI
  dist = dist * 60 * 1.1515
  // In KM
  return dist * 1.609344
}

// These are the feature types to include in the output JSON file
// see the CSV for the full list of 226 types.
const featureTypes = [
  'City',
  'Community',
  'District Municipality (1)',
  'First Nation Village',
  'Landing (1)',
  'Locality',
  'Mountain Resort Municipality',
  'Recreational Community',
  'Resort Municipality',
  'Town',
  'Urban Community',
  'Village (1)',
]

// Read and parse the CSV file
const data = fs.readFileSync('places.csv', 'utf-8')
const lines = parse(data, {
  columns: true,
  skip_empty_lines: true,
})

if (Array.isArray(lines)) {
  const output = []
  // There are duplicates place names - some are the same place and some
  // are different places - so only keep ones that are far enough apart
  const seen = new Map()
  const names = new Map()
  let excludedCount = 0
  let includedCount = 0
  lines.forEach((line) => {
    const { name, featureType: type, code } = line
    if (featureTypes.indexOf(type) !== -1) {
      const lat = parseFloat(line.lat)
      const lng = parseFloat(line.lng)
      // By using 1 digit of precision for the latlng this will differentiate
      // between points that are less than 11 km apart
      const key = `${name}-${lat.toFixed(1)}-${lng.toFixed(1)}`
      if (seen.has(key)) {
        const prev = seen.get(key)
        const dist = distance(lat, lng, prev.lat, prev.lng).toFixed(1)
        console.log(
          '** Excluding duplicate place',
          name,
          line,
          prev,
          `${dist} km`,
        )
        excludedCount++
      } else {
        if (names.has(name)) {
          const prev = names.get(name)
          const dist = distance(lat, lng, prev.lat, prev.lng).toFixed(1)
          console.log(
            '** Including duplicate place',
            name,
            line,
            prev,
            `${dist} km`,
          )
          includedCount++
        }
        names.set(name, { name, lat, lng, type, code })
        seen.set(key, { name, lat, lng, type, code })

        output.push({
          name,
          pos: [lat, lng],
          // Include feature type and code?
          // type: type.replace(' (1)', ''),
          // code,
        })
      }
    }
  })

  // Sort the output alphabetically
  output.sort((p1, p2) => p1.name.localeCompare(p2.name))

  // Save to the output place.json file
  const outputContents = JSON.stringify(output, null, 2)
  fs.writeFileSync('places.json', outputContents)

  console.log()
  console.log(`Saved ${output.length} places to places.json`)
  console.log(`File size: ${Math.round(outputContents.length / 1024)} kb`)
  console.log(
    `Duplicates: excluded ${excludedCount} places, included ${includedCount}`,
  )
}
