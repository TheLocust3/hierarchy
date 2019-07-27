interface Posn {
  x: number;
  y: number;
}

export function getAbsolutePosition(el: HTMLElement): Posn {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { y: rect.top + scrollTop, x: rect.left + scrollLeft };
}
