import { format } from './format.js';
import defaultThing from './default.js';

export class Renderer {
  render(value) {
    return format(`${defaultThing}:${value}`);
  }
}

// This constraint must stay with the exported function.
export async function buildMessage(name) {
  // Preserve this whitespace and comment in an exact slice.
  const message = `Hello, ${name}!`;
  return message;
}

export function asiSensitive() {
  return
  'unreachable';
}
