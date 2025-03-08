# Future release roadmap

This will serve as the future release roadmap for the application.
Current capabilities are stated as the starting point as to which we will build from.

### Current functionality - 3/7/25

For further information regarding the current functionality and features of the application in it's current state, please refer to the README.

- **Test Organization**: Tests are separated into three distinct contexts (content-validation, user-flows, and interactions)

- **Dynamic Test Sharding**: Automatically calculates optimal number of shards based on test count and configured shard size

- **Flexible Execution**: Run tests locally with or without sharding, or in Docker containers

- **Sequential Shard Execution**: Runs each shard sequentially while continuing even if a shard fails

- **Docker Integration**: Tests run sharded, in separate, context-specific Docker containers.

- **CLI Interface**: Command-line interface for selecting and running specific test contexts

### Future functionality

\*\*These will be edited to break down the large steps into manageable chunks.

- **Jenkins Integration**: Integration with Jenkins for CI/CD pipeline.

- **Test Report**: Generate _Merged_ HTML report of all shards/containers after test execution

  - Remove localhost report generation from Docker Containers

- **Docker CPU Optimization**: Optimize Docker container resources based on available system resources and context-specific requirements for optimal test execution.

- **Test Cleanup**: Cleanup of test data and resources after test execution.

- **Cloud Test Execution**: Implement server-side test execution against other repositories, by copying the test folder contents to the empty folder in the repository, and running the tests. This will work as this application is setup to run against the architecture set forth within the project.
  Afterwards the test folder contents will be removed from the cloud runner's folder.

- **Agentic Self-healing**: Implement an agent that can self-heal failed tests by re-running failed tests in a separate Docker container, compare the DOM changes, and report the results specific to the failed test and it's solution.
