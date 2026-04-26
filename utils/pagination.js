// For reuse in other parts if needed, but currently logic is in model.
// This file can be used to provide standardized response structure.
module.exports = {
  paginate: ({ page, limit, total, data }) => ({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data
  })
};
