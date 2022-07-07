import { assertEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
import { delay } from "https://deno.land/std@0.86.0/async/delay.ts";

// Delay
Deno.test("Async - Hello test #3", async() => {

    const x = 10 - 2;
    await delay(4000);
    assertEquals(x, 8);

})

Deno.test("test", () => {
    const x = 1 + 2;
    assertEquals(x, 3);

})