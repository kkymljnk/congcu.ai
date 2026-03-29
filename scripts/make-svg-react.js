/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
let svg = fs.readFileSync('public/brand/ronnie/laptop-gho-hat-purple-custom.svg', 'utf8');

// remove style="..."
svg = svg.replace(/ style="[^"]*"/g, '');

// camelCase SVG attributes for React
const attrs = [
  'fill-opacity', 'stroke-opacity', 'stroke-width', 
  'stroke-linecap', 'stroke-linejoin', 'fill-rule', 
  'clip-rule', 'font-family', 'font-weight', 
  'font-size', 'letter-spacing', 'text-anchor'
];
attrs.forEach(attr => {
  const camel = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  svg = svg.split(attr + '=').join(camel + '=');
});

// Remove my previous CONGCU.AI text node
svg = svg.replace(/<g transform="translate\(121, 205\) skewX\(-45\)">[\s\S]*?<\/g>/, '');

// Add the requested HTML inside foreignObject using exactly the classes provided by the user
const foreignObj = `
<g transform="translate(121, 205) skewX(-45)">
  <foreignObject x="-80" y="-18" width="160" height="40">
    <div className="flex font-[var(--font-ft-regola)] tracking-tight text-[1.3rem] leading-none whitespace-nowrap select-none font-extrabold uppercase transition-colors w-full h-full items-center justify-center">
      <span className="text-foreground">CONGCU</span>
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 animate-text-gradient bg-clip-text text-transparent">.AI</span>
    </div>
  </foreignObject>
</g>
`;
svg = svg.replace('</svg>', foreignObj + '\n</svg>');

const component = `
import React from 'react';

export const LaptopGhostWithHtml = ({ className }: { className?: string }) => {
  return (
    ${svg.replace('<svg ', '<svg className={className} ')}
  );
};
`;

fs.writeFileSync('src/components/ui/LaptopGhostWithHtml.tsx', component);
console.log('React Component generation complete.');
