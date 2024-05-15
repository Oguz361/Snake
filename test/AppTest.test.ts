import DataService from '../src/DataService';

test('DataService.getHelloWorld() should return "Hello World!"', async () => {
  const result = await DataService.getHelloWorld();
  expect(result).toBe("Hello World!");
});

test("DataService.getHelloWorld() should return a string", async () => {
  const result = await DataService.getHelloWorld();
  expect(typeof result).toBe("string");
});

test('DataService.getGreeting() should return a greeting message with the given name', async () => {
  const name = "John";
  const result = await DataService.getGreeting(name);
  expect(result).toBe(`Hallo ${name}! Willkommen zurück!`);
});

test('DataService.getGreeting() should return a string', async () => {
  const result = await DataService.getGreeting("John");
  expect(typeof result).toBe("string");
});

test('DataService.getCustomMessage() should return the custom message', async () => {
  const customMessage = "This is a custom message";
  const result = await DataService.getCustomMessage(customMessage);
  expect(result).toBe(customMessage);
});

test('DataService.getCustomMessage() should return a string', async () => {
  const result = await DataService.getCustomMessage("Test");
  expect(typeof result).toBe("string");
});
