import DataService from '../src/DataService';

test('DataService.getSnakeText() should return "Snake"', async () => {
  const result = await new DataService().getSnakeText();
  expect(result).toBe("Snake");
});

test('DataService.getHelloText() should return "Hello World"', async () => {
  const result = await new DataService().getHelloText();
  expect(result).toBe("Hello World");
});
