export const formatDate = (date, onlyMonth) => {

    const options = {
        year: 'numeric',
        month: 'long',
    }

    // since 'onlyMonth' is optional field thats why we have put this check
    if(!onlyMonth) {
        options.day = 'numeric'
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);

};