export function getFileExtension(filename) {
  return (
    filename && filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
  );
}
