# Cloud Runner

This project provides a solution for running Playwright tests in Docker containers, separated by context with dynamic sharding.

##Overview

Test Organization: Tests are separated into three distinct contexts (content-validation, user-flows, and interactions)

Dynamic Test Sharding: Automatically calculates optimal number of shards based on test count and configured shard size

Flexible Execution: Run tests locally with or without sharding, or in Docker containers

Sequential Shard Execution: Runs each shard sequentially while continuing even if a shard fails

Docker Integration: Tests run sharded, in separate, context-specific Docker containers.

CLI Interface: Command-line interface for selecting and running specific test contexts

## Project Structure

The project assumes the following structure:

```
/Users/username/Docker/project/
├── tests/
│   ├── content-validation/
│   ├── user-flows/
│   └── interactions/
```

## Sharding Thresholds

The tests will be dynamically sharded based on the following thresholds:

- **Content Validation**: Shard every 40 test cases

  - Ex: If there are 100 tests, this would create 3 shards (40, 40, and 20 tests)

- **User Flows**: Shard every 20 test cases

  - Ex: If there are 50 tests, this would create 3 shards (20, 20, and 10 tests)

- **Interactions**: Shard every 40 test cases
  - Ex: If there are 90 tests, this would create 3 shards (40, 40, and 10 tests)

The sharding will dynamically scale based on the actual number of test cases in each context. Each context will run in its own Docker container, with tests sharded according to the specified thresholds.

## Running the Tests

### Running Tests Locally

#### Running Tests Without Sharding

To run tests locally without sharding:

```bash
# Run all tests
npm test

# Run specific test contexts
npm run test:content-validation
npm run test:user-flows
npm run test:interactions
```

#### Running Tests With Sharding

To run tests locally with sharding without docker:

```bash
# Run all tests with sharding (will prompt for context selection)
npm run test:sharded

# Run specific test contexts with sharding (no docker)
npm run test:sharded:content-validation
npm run test:sharded:user-flows
npm run test:sharded:interactions
```

The sharded test execution will automatically:

1. Count the number of test files in the specified context
2. Calculate the optimal number of shards based on the configured shard size
3. Run each shard sequentially
4. Report the results of all shards

### Running Tests in Docker

**Note: you will need to have docker installed to run tests in docker**

#### Building the Docker Images

To build the Docker images for all three contexts:

```bash
npm run docker:build
```

Or using docker-compose directly:

```bash
docker-compose build
```

#### Running All Tests

To run all tests in all three contexts:

```bash
npm run docker:run:all
```

Or using docker-compose directly:

```bash
docker-compose up
```

#### Running Tests for a Specific Context

To run tests for a specific context:

```bash
# Content Validation tests
npm run docker:run:content-validation

# User Flows tests
npm run docker:run:user-flows

# Interactions tests
npm run docker:run:interactions
```

Or using docker-compose directly:

```bash
# Content Validation tests
docker-compose up content-validation

# User Flows tests
docker-compose up user-flows

# Interactions tests
docker-compose up interactions
```

## Validating the Setup

To verify that the tests are running correctly with the specified sharding:

1. Check the console output, which will show:

   - The total number of test files found in each context
   - The shard size for each context
   - The total number of shards created
   - The execution of each shard

2. Examine the Playwright HTML report after the tests complete:

   ```bash
   npx playwright show-report
   ```

3. To verify sharding is working correctly, you can add more test files to a context and observe how the number of shards automatically adjusts based on the sharding thresholds.

## Handling Test Failures

The system is designed to handle test failures gracefully:

1. When tests fail in a specific shard, the system will:

   - Log the failure with detailed error messages
   - Continue running the remaining shards to completion
   - Exit with a non-zero status code to indicate failure
   - Automatically stop the Docker container

2. The Docker containers are configured with `restart: "no"` to ensure they exit properly when tests fail.

3. The exit code from the test process is properly propagated to the Docker container, ensuring CI/CD systems can detect test failures.

## Troubleshooting

If you encounter any issues:

1. Check that Docker is running correctly on your system
2. Verify that the test files have the correct `.spec.ts` extension
3. Ensure that TypeScript and ts-node are installed correctly
4. Check the Docker container logs for detailed error messages

```bash
docker-compose logs
```

5. If containers don't exit properly after test failures, check:
   - The Docker service configuration in `docker-compose.yml`
   - The error handling in `src/utils/testRunner.ts`
   - The exit code handling in `src/cli/index.ts`
