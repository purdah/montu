import axios from 'axios'
import {AddressSuggestion} from "./address-suggestion"

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string) {
    if (key == undefined || key == null || key == '') {
        throw new Error("API key is missing");
    }

    const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json`, {
        params: {
            key,
            countrySet: 'AU',
            limit: 100,
        }
    });
    return autocomplete.data.results.map((result: AddressSuggestion) => {
        const addressSuggestion: AddressSuggestion = {
            placeId: result.id,
            streetNumber: result.address?.streetNumber,
            countryCode: result.address?.countryCode,
            country: result.address?.country,
            freeformAddress: result.address?.freeformAddress,
            municipality: result.address?.municipality,
        };
        return addressSuggestion;
    })
}
