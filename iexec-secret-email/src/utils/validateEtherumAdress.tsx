export const isValidEthereumAddressFormat = (address: string) => {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
};
