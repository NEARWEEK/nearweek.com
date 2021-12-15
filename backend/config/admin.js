module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8fbff283dbb8cd41636c331c667e106d'),
  },
});
