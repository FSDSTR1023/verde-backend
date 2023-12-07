export const photographerToObject = (photographerFromMongo) => {

    const { _id: id, password, __v, ...remainder } = photographerFromMongo.toObject();

    return {
        id,
        ...remainder
    }
}