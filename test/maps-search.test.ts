import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it ('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street')
            expect(res).toBeInstanceOf(Promise)
        })

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street')
            expect(res).toBeDefined();
            expect(res).toHaveLength(3)
            const firstRes = res[0];
            expect(firstRes).toBeDefined()
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes.placeId).toBeDefined()
            expect(firstRes.placeId).toBe('dmd3cjJBhnvZdGAPLSTmjA')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes.countryCode).toBe('GB')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes.country).toBe('United Kingdom')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes.freeformAddress).toBe('Queen Charlotte Street, Windsor, SL4 1PB')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes.municipality).toBe('Windsor')
        })
    })

    describe('getPlaceAutocomplete', () => {

        it('handles no results', async () => {
            const res = await getPlaceAutocomplete(process.env.TOMTOM_API_KEY, 'asfasffasfasafsafs');
            expect(res).toStrictEqual([])
        })

        it('handles error', async () => {
            expect(getPlaceAutocomplete(process.env.TOMTOM_API_KEY, '')).rejects.toThrow()
        })
    })

})
