import axios from 'axios'

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string) {
    const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json'`, {
        params: {
            key,
            limit: 3,
        }
    });
    return autocomplete.data.results.map((result) => {
        return {
            placeId: result.id,
            streetNumber: result.address?.streetNumber,
            countryCode: result.address?.countryCode,
            country: result.address?.country,
            freeformAddress: result.address?.freeformAddress,
            municipality: result.address?.municipality,
        }
    })
}
