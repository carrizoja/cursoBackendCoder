import { parse } from "https://deno.land/std/datetime/mod.ts";

console.log(parse("2020-01-01", "yyyy-MM-dd"));
console.log(parse("07-07-2022", "dd-MM-yyyy"));

console.log(format(new Date(2019, 0, 20), "dd-MM-yyyy"));