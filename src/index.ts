import { getPlaceAutocomplete } from './maps-api'

export async function getAutoCompleteDetails(address: any): Promise<any> {
    const apiKey = process.env.TOMTOM_API_KEY;

    // get autocomplete results
    const autocompleteResults = await getPlaceAutocomplete(apiKey, address);

    return autocompleteResults;
}
