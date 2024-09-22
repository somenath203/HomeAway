import { create } from "zustand";


export const usePropertyGlobalState = create(() => {
    return {
        propertyId: '',
        price: 0,
        bookings: [],
        range: undefined
    }
});