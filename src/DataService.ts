class DataService {
  getSnakeText(): Promise<string> {
    return Promise.resolve("Snake");
  }

  getHelloText(): Promise<string> {
    return Promise.resolve("Hello World");
  }
}

export default DataService;
