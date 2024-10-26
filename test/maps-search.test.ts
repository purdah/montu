import {config} from 'dotenv'
import {describe} from '@jest/globals'
import {getPlaceAutocomplete} from '../src/maps-api'
import {getAutoCompleteDetails} from '../src'
import axios from 'axios';


config();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const noDataResponse = {
    data: {
        results: []
    }
};

const standardResponseData = {
    data: {
        results: [{
            id: 'id_value',
            address: {
                streetNumber: "street number",
                streetName: "Great Charlotte Street",
                municipality: "municipality",
                countryCode: "GB",
                country: "United Kingdom",
                freeformAddress: "Queen Charlotte Street, Windsor, SL4 1PB",
            }
        }]
    }
};

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            mockedAxios.get.mockResolvedValue(standardResponseData);
            const res = getAutoCompleteDetails('Charlotte Street')
            expect(res).toBeInstanceOf(Promise)
        })

        it('can fetch from the autocomplete api', async () => {
            mockedAxios.get.mockResolvedValue(standardResponseData);

            const res = await getAutoCompleteDetails('Charlotte Street')

            expect(res).toBeDefined();
            expect(res).toHaveLength(1)
            const firstRes = res[0];
            expect(firstRes).toBeDefined()
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes.placeId).toBeDefined()
            expect(firstRes.placeId).toBe('id_value')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes.streetNumber).toBe('street number')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes.countryCode).toBe('GB')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes.country).toBe('United Kingdom')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes.freeformAddress).toBe('Queen Charlotte Street, Windsor, SL4 1PB')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes.municipality).toBe('municipality')
        })
    })

    describe('getPlaceAutocomplete', () => {

        it('handles no results', async () => {
            mockedAxios.get.mockResolvedValue(noDataResponse);
            const res = await getPlaceAutocomplete(process.env.TOMTOM_API_KEY, 'asfasffasfasafsafs');
            expect(res).toStrictEqual([])
        })

        it('handles invalid address error', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Request failed with status code 400'));
            expect(getPlaceAutocomplete(process.env.TOMTOM_API_KEY, '')).rejects.toThrow('Request failed with status code 400')
        })

        it('handles invalid api key error', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Request failed with status code 403'));
            expect(getPlaceAutocomplete('invalid api key', 'Charlotte Street')).rejects.toThrow('Request failed with status code 403')
        })

        it('handles missing TomTom api key', async () => {
            expect(getPlaceAutocomplete(undefined, '')).rejects.toThrow('API key is missing')
            expect(getPlaceAutocomplete(null, '')).rejects.toThrow('API key is missing')
            expect(getPlaceAutocomplete('', '')).rejects.toThrow('API key is missing')
        })
    })

    describe('calling parameters include the required properties', () => {

        it('calls axios with the correct endpoint and parameters', async () => {
            mockedAxios.get.mockResolvedValue(standardResponseData);

            let inputAddress = 'Charlotte Street';
            const endpoint = `https://api.tomtom.com/search/2/search/${inputAddress}.json`;

            const params = {limit: 100, key: process.env.TOMTOM_API_KEY, countrySet: 'AU'};

            const res = await getPlaceAutocomplete(process.env.TOMTOM_API_KEY, inputAddress)

            expect(mockedAxios.get).toHaveBeenCalledWith(endpoint, {params});


        });

    })
})
