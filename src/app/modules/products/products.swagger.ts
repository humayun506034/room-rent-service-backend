export const productsSwaggerDocs = {
  "/api/products/create": {
    post: {
      tags: ["products"],
      summary: "products create",
      description: "This is auto generated products create API",
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "John Doe" } } } } } },
      responses: { 201: { description: "products created successfully" }, 400: { description: "Validation error" } }
    }
  }
};