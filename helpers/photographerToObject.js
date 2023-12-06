export const photographerToObject = (photographerFromMongo) => {

    const { _id: id, name, surname, email } = photographerFromMongo;

    return {
        id,
        name,
        surname,
        email,
    }
}