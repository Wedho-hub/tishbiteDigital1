/**
 * Pagination & Filtering Middleware
 * Adds pagination and filtering to list endpoints.
 * Usage: Add paginate(Model) to your route handler.
 */
export const paginate = (Model) => async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

  const [results, total] = await Promise.all([
    Model.find(filter).skip(skip).limit(limit),
    Model.countDocuments(filter),
  ]);

  res.json({
    results,
    page,
    totalPages: Math.ceil(total / limit),
    totalResults: total,
  });
};
