const { Builder, Capabilities, By } = require("selenium-webdriver");

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://localhost:62698/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

//test functions

test("Cross movie off", async () => {
  const input = await driver.findElement(By.xpath("//input"));

  const searchTerm = "star wars!";

  await input.sendKeys(searchTerm);

  const theButton = await driver.findElement(By.css("button"));
  await theButton.click();

  const result = await driver.findElement(By.xpath("//li/span"));
  await result.click();

  await driver.sleep(3000);
});

test("delete list item", async () => {
  const input = await driver.findElement(By.xpath("//input"));

  const searchTerm = "Elf";

  await input.sendKeys(searchTerm);

  const theButton = await driver.findElement(By.css("button"));
  await theButton.click();

  const result = await driver.findElement(By.xpath("//li/span"));
  await result.click();

  await driver.sleep(3000);

  const deleteButton = await driver.findElement(By.id(`${searchTerm}`));

  await deleteButton.click();
});

test("delete message", async () => {
  const input = await driver.findElement(By.xpath("//input"));

  const searchTerm = "Leathal Weapon";

  await input.sendKeys(searchTerm);

  const delButton = await driver.findElement(By.css("button"));
  await delButton.click();

  const result = await driver.findElement(By.xpath("//li/span"));
  await result.click();

  await driver.sleep(5000);

  const deletedButton = await driver.findElement(By.id(`${searchTerm}`));
  
  await deletedButton.click();

  const deleteMessage = await driver
    .findElement(By.xpath("//aside"))
    .getText();
  expect(deleteMessage).toContain(`${searchTerm} deleted!`);

  await driver.sleep(3000);
});
