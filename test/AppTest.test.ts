import DataService from '../src/DataService.ts';

test('DataService.getHelloWorld() should return "Hello World!"', async () => {
  const result = await DataService.getHelloWorld();
  expect(result).toBe('Hello World!');
});
