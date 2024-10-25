import { getPlaceAutocomplete } from './maps-api'

export async function getAutoCompleteDetails(address: any): Promise<any> {
    const apiKey = process.env.TOMTOM_API_KEY;
    // get autocomplete results
    const res = getPlaceAutocomplete(process.env.TOMTOM_API_KEY, address).then(async (autocompleteResults) => {
        const mappedResults = autocompleteResults.map((result: any) => {
            return {
                placeId: result.placeId,
                streetNumber: '',
                countryCode: '',
                country: '',
                freeformAddress: '',
                municipality: '',
            };
        });
        return mappedResults;
    })
    // loop over and get details and map results
    return res
}
