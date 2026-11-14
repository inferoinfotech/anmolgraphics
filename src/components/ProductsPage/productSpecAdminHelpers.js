import { getSpecFieldsForCategory } from './productCategorySpecFields';
import { normalizeSpecRows } from './productDetailData';

export function buildSpecificationRows(values, customRows, category) {
  const templateLabels = new Set(getSpecFieldsForCategory(category));
  const rows = [];

  templateLabels.forEach((label) => {
    const value = (values[label] || '').trim();
    if (value) rows.push({ label, value });
  });

  customRows.forEach((row) => {
    const label = (row.label || '').trim();
    const value = (row.value || '').trim();
    if (label && value && !templateLabels.has(label)) {
      rows.push({ label, value });
    }
  });

  return rows;
}

export function specificationRowsToText(rows) {
  return rows.map((r) => `${r.label}: ${r.value}`).join('\n');
}

export function loadSpecFormState(product) {
  const category = product?.category || '';
  const templateFields = getSpecFieldsForCategory(category);
  const templateSet = new Set(templateFields);
  const values = Object.fromEntries(templateFields.map((f) => [f, '']));

  const rows =
    product?.specificationRows?.length > 0
      ? product.specificationRows
      : normalizeSpecRows(product);

  const customRows = [];

  rows.forEach((row, index) => {
    const label = (row.label || '').trim();
    const value = (row.value || '').trim();
    if (!label || !value) return;
    if (templateSet.has(label)) {
      values[label] = value;
    } else {
      customRows.push({ key: `load-${index}-${label}`, label, value });
    }
  });

  return { values, customRows };
}

export function mergeSpecValuesForCategory(prevValues, category) {
  const fields = getSpecFieldsForCategory(category);
  const next = {};
  fields.forEach((f) => {
    next[f] = prevValues[f] || '';
  });
  return next;
}