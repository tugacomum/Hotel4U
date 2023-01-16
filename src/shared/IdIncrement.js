function IdIncrement(id) {
    const match = id.match(/[UHQR](\d+)/);  // Extract the numeric portion of the ID
    if (!match) {
      throw new Error(`Invalid ID format: ${id}`);
    }
    const number = parseInt(match[1], 10);  // Parse the numeric portion as an integer
    const nextNumber = number + 1;  // Increment the number by one
    const paddedNumber = nextNumber.toString().padStart(3, "0");  // Pad the number with leading zeros
    return `${id[0]}${paddedNumber}`;  // Return the incremented ID
  }

  module.exports = IdIncrement