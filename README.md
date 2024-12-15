# Todo API

A secure and scalable RESTful API for managing todos with user authentication.

## Tech Stack

- Node.js & Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Zod Validation
- Jest & Supertest
- Swagger Documentation

## Features

- ✅ User authentication (register/login)
- ✅ CRUD operations for todos
- ✅ Input validation
- ✅ Error handling
- ✅ API documentation
- ✅ Test coverage
- ✅ Rate limiting
- ✅ Security headers

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm/yarn

### Installation

1. Clone the repository

## Scripts

- `yarn dev`: Run development server
- `yarn test`: Run tests
- `yarn build`: Build for production
- `yarn start`: Start production server
- `yarn lint`: Run ESLint
- `yarn format`: Format code with Prettier
- `yarn test:watch`: Run tests in watch mode
- `yarn test:coverage`: Generate test coverage report

## API Endpoints

### Authentication
- `POST /api/v1/users/register`: Register new user
- `POST /api/v1/users/login`: Login user

### Todos
- `GET /api/v1/todos`: Get all todos
- `POST /api/v1/todos`: Create todo
- `GET /api/v1/todos/:id`: Get todo by ID
- `PUT /api/v1/todos/:id`: Update todo
- `DELETE /api/v1/todos/:id`: Delete todo

## Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo_db
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Testing

The project uses Jest for testing. Tests are located in `src/test` directory:
- Integration tests
- Controller tests
- Validation tests
- Error handling tests

Run tests with coverage:
```bash
yarn test:coverage
```

## Security Features

- JWT Authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with Zod
- MongoDB injection protection

## Error Handling

Consistent error response format:
```json
{
  "status": "error",
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation message"
    }
  ]
}
```

## API Documentation

The API documentation is available via Swagger UI at:
- Development: `http://localhost:3000/api-docs`
- Production: `https://your-domain.com/api-docs`

The documentation includes:
- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests
- Error responses

You can test the API endpoints directly through the Swagger UI interface.

## Code Quality & Git Hooks

This project uses several tools to ensure code quality:

### Husky & Lint-staged
Pre-commit hooks are configured using Husky to run tests and formatting before each commit. Configuration can be found in `.husky/pre-commit`.

### ESLint & Prettier
- ESLint enforces code quality rules
- Prettier ensures consistent code formatting

Available commands:
```bash
yarn lint     # Run ESLint
yarn format   # Format code with Prettier
```

### TypeScript Configuration
Strict type checking is enabled with the following compiler options:
- Strict mode enabled
- Source maps generation
- ES2016 target
- CommonJS modules
- Experimental decorators
- Decorator metadata emission

See full configuration in `tsconfig.json`.

### Testing
Jest is configured for testing with the following commands:
```bash
yarn test           # Run all tests
yarn test:watch     # Run tests in watch mode
yarn test:coverage  # Generate coverage report
```

All tests must pass before commits are allowed.
