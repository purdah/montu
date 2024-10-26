import {getPlaceAutocomplete} from './maps-api'

export async function getAutoCompleteDetails(address: any): Promise<any> {
    const apiKey = process.env.TOMTOM_API_KEY;

    try {
        const autocompleteResults = await getPlaceAutocomplete(apiKey, address);

        return autocompleteResults;
    } catch (error) {
        if (error instanceof Error) console.error(`Error looking up address '${address}', details: ${error.message}`);
        else console.error(`Error looking up address '${address}'`);
        throw error;
    }
}
