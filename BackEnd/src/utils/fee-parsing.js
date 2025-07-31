export const parseFeeRange = (rangeStr) => {
  if (!rangeStr) return null;

  if (rangeStr === "More than 5 Lakh") return { min: 500000, max: Infinity };

  if (!rangeStr.includes("-")) {
    
    const number = parseFloat(rangeStr.replace(/[^0-9.]/g, ''));
    return { min: number * 100000, max: number * 100000 };
  }

  
  const cleaned = rangeStr.replace(/Lakh/g, '00000');
  const [minStr, maxStr] = cleaned.split('-').map(str =>
    parseInt(str.trim().replace(/,/g, ''), 10)
  );

  return { min: minStr, max: maxStr };
};

export const parseClassLevel = (classStr) => {
  const match = classStr.match(/\d+/);
  return match ? parseInt(match[0]) : null;
};
