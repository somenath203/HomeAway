import countries from "world-countries";


export const formattedCountries = countries?.map((country) => {

    return {
        code: country?.cca2,
        name: country?.name?.common,
        location: country?.latlng, 
        region: country?.region
    }

});


export const findCountryByCode = (code) => {

    return formattedCountries.find((country) => {
        return country?.code === code;
    });
    
}