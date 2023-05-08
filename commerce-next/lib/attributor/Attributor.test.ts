// @ts-nocheck
import { Cookie } from '../dscookies';
import Attributor, { AttributorConfig } from './Attributor';

// Mock the Cookie class
jest.mock('../dscookies', () => {
    return {
        Cookie: jest.fn().mockImplementation(() => {
            const store: Record<string, string> = {};

            return {
                get: jest.fn((key: string) => store[key] || null),
                set: jest.fn((key: string, value: string, _options?: any) => (store[key] = value)),
                clear: jest.fn((key: string) => delete store[key]),
            };
        }),
    };
});

describe('Attributor', () => {
    let attributor: Attributor;
    let cookie: Cookie;

    beforeEach(() => {
        const config: AttributorConfig = {
            cookieDomain: 'example.com',
        };
        attributor = new Attributor(config);
        cookie = new Cookie();
    });

    afterEach(() => {
        attributor.destroy();
    });

    it('should create an instance of Attributor', () => {
        expect(attributor).toBeInstanceOf(Attributor);
    });

    it('should set and get the attribution data correctly', () => {
        const attributionData = attributor.getAttributionData();
        expect(attributionData).toHaveProperty('first');
        expect(attributionData).toHaveProperty('last');
        expect(attributionData).toHaveProperty('cookies');
    });

    it('should update the attribution data correctly', () => {
        attributor.updateAttributionData();
        const attributionData = attributor.getAttributionData();
        expect(attributionData).toHaveProperty('first');
        expect(attributionData).toHaveProperty('last');
        expect(attributionData).toHaveProperty('cookies');
    });

    it('should update the attribution cookie correctly', () => {
        const initialFirstAttributionData = JSON.parse(cookie.get('attr_first')!);
        attributor.updateAttributionCookie();
        const updatedFirstAttributionData = JSON.parse(cookie.get('attr_first')!);
        expect(updatedFirstAttributionData).toEqual(initialFirstAttributionData);
    });

    it('should destroy cookies and reset attribution data correctly', () => {
        attributor.destroy();
        expect(cookie.get('attr_first')).toBeNull();
        expect(cookie.get('attr_last')).toBeNull();
        const attributionData = attributor.getAttributionData();
        expect(attributionData.first).toEqual({
            source: null,
            medium: null,
            campaign: null,
            term: null,
            content: null,
            source_platform: null,
            marketing_tactic: null,
            creative_format: null,
            adgroup: null,
            lp: null,
            date: null,
        });
        expect(attributionData.last).toEqual({
            source: null,
            medium: null,
            campaign: null,
            term: null,
            content: null,
            source_platform: null,
            marketing_tactic: null,
            creative_format: null,
            adgroup: null,
            lp: null,
            date: null,
        });
        expect(attributionData.cookies).toEqual({
            source: null,
            medium: null,
            campaign: null,
            term: null,
            content: null,
            source_platform: null,
            marketing_tactic: null,
            creative_format: null,
            adgroup: null
        });
    });
    describe('readCookieAttribution', () => {
        // ... write tests for readCookieAttribution() method ...
    });

    describe('getAttributionData', () => {
        // ... write tests for getAttributionData() method ...
    });

    describe('updateAttributionData', () => {
        // ... write tests for updateAttributionData() method ...
    });

    describe('updateAttributionCookie', () => {
        // ... write tests for updateAttributionCookie() method ...
    });

    describe('getParam', () => {
        // ... write tests for getParam() method ...
    });

    describe('getDateParam', () => {
        // ... write tests for getDateParam() method ...
    });

    describe('readFirstAttribution', () => {
        // ... write tests for readFirstAttribution() method ...
    });

    describe('readLastAttribution', () => {
        // ... write tests for readLastAttribution() method ...
    });

    describe('destroy', () => {
        // ... write tests for destroy() method ...
    });

    describe('initialize', () => {
        // ... write tests for initialize() method ...
    });
});
