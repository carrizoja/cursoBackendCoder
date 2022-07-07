/* await Deno.writeTextFile("text.txt", "Hello Deno!"); */

const data = await Deno.readTextFile("text.txt");
console.log(data);