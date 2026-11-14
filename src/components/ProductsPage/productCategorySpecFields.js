/**
 * Category-specific specification field labels for admin + storefront.
 * Category names are matched loosely against the product category string.
 */

const FIELD_SETS = {
  attachments: [
    'Hook type',
    'Metal type',
    'Opening size',
    'Finish',
    'Fits',
  ],
  badges: ['Shape', 'Fitting', 'Printing type', 'Size', 'Surface finish'],
  cards: [
    'Card size',
    'Thickness',
    'Material',
    'Printing',
    'Finish',
    'Security features',
    'Magnetic stripe',
  ],
  rfid: [
    'Chip type',
    'Frequency',
    'Read range',
    'Memory size',
    'Compatible readers',
  ],
  lanyards: [
    'Width',
    'Length',
    'Material',
    'Print method',
    'Clip type',
    'Safety breakaway',
  ],
  holders: [
    'Orientation',
    'Material',
    'Card size it fits',
    'Strap or clip included',
  ],
  medals: [
    'Diameter',
    'Finish',
    'Ribbon included',
    'Weight',
    'Box packaging',
  ],
  mug: [
    'Capacity',
    'Print method',
    'Dishwasher safe',
    'Microwave safe',
  ],
  mousepad: ['Size', 'Thickness', 'Base material', 'Print method'],
  gift: ['Size', 'Material', 'Print area', 'Packaging'],
  generic: ['Size', 'Pack of', 'Finish', 'Material', 'Use'],
};

function resolveCategoryKey(category) {
  const c = (category || '').toLowerCase();
  if (c.includes('attach')) return 'attachments';
  if (c.includes('badge')) return 'badges';
  if (c.includes('rfid')) return 'rfid';
  if (c.includes('lanyard')) return 'lanyards';
  if (c.includes('holder')) return 'holders';
  if (c.includes('medal')) return 'medals';
  if (c.includes('mug')) return 'mug';
  if (c.includes('mouse')) return 'mousepad';
  if (
    c.includes('keychain') ||
    c.includes('yoyo') ||
    c.includes('yo-yo') ||
    c.includes('yo yo') ||
    c.includes('gift')
  ) {
    return 'gift';
  }
  if (
    c.includes('id card') ||
    c.includes('membership') ||
    c.includes('corporate') ||
    c.includes('exhibitor') ||
    (c.includes('card') && !c.includes('smart'))
  ) {
    return 'cards';
  }
  return 'generic';
}

export function getSpecFieldsForCategory(category) {
  const key = resolveCategoryKey(category);
  return [...FIELD_SETS[key]];
}

export function getCategorySpecGroupName(category) {
  const key = resolveCategoryKey(category);
  const names = {
    attachments: 'Attachments (hooks, clips)',
    badges: 'Badges',
    cards: 'ID, membership and corporate cards',
    rfid: 'RFID smart cards',
    lanyards: 'Lanyards',
    holders: 'Holders',
    medals: 'Medals',
    mug: 'Mug',
    mousepad: 'Mouse pad',
    gift: 'Keychain, YoYo and gift articles',
    generic: 'General',
  };
  return names[key];
}