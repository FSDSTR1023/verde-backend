export const clientToObject = (clientFromMongo) => {

    const { _id: id, __v, ...remainder } = clientFromMongo.toObject();

    return {
        id,
        ...remainder
    }
}