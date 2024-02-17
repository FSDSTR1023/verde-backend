export const galleryToObject = (galleryFromMongo) => {

    if (!galleryFromMongo.length) {

        const { _id: id, __v, ...remainder } = galleryFromMongo.toObject();

        return {
            id,
            ...remainder
        }
    }

    return galleryFromMongo.map(mongo => {
        const { _id: id, __v, ...remainder } = mongo.toObject();

        return {
            id,
            ...remainder
        }
    });

}