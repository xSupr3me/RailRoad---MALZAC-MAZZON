export const validateSchemaMiddleware = (schema) => {
	return async (req, res, next) => {
		try {
			await schema.parse(req.body);
			next();
		} catch (error) {
			res
				.status(400)
				.send(
					`Validation error: \n${error.errors
						.map((error) => error.message)
						.join("\n")}`
				);
		}
	};
};
