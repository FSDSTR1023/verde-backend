export const galleryToObject = (galleryFromMongo) => {

    const { _id: id, __v, ...remainder } = galleryFromMongo.toObject();

    return {
        id,
        ...remainder
    }
}