const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.alternatives().try(
            Joi.string().uri().allow("", null), // Validate as URL string
            Joi.object({
                url: Joi.string().uri().allow("", null),
                filename: Joi.string().allow("", null).optional(),
            })
        ).optional(),
    })
        .custom((value, helpers) => {
            // Transform listing.image (string) to listing.image.url (object)
            if (typeof value.image === "string") {
                value.image = { url: value.image, filename: null };
            }
            return value;
        })
        .required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required(),
});
